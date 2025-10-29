import { Duration, Stack, StackProps }  from 'aws-cdk-lib';
import { ContainerImage, FargateService, FargateTaskDefinition, LogDrivers, ICluster } from 'aws-cdk-lib/aws-ecs';
import { IApplicationLoadBalancer, IApplicationTargetGroup } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { Vpc, SubnetType, SecurityGroup, Peer, Port, ISecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from 'constructs';

export const PREFIX = "BA_AUTH";

export interface AuthFargateServiceProps extends StackProps {
    vpc: Vpc;
    ecrRepository: IRepository;
    loadBalancer: IApplicationLoadBalancer;
    targetGroup: IApplicationTargetGroup;
    cluster: ICluster;
    albSecurityGroup: ISecurityGroup;
}

export class AuthFargateServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: AuthFargateServiceProps) {
        super(scope, id, props);

        const cluster = props.cluster;
        const vpc = props.vpc;

        // TASK IAM ROLE
        const executionRole = new Role(this, "FargateExecutionRole", {
        assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
        managedPolicies: [
            ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AmazonECSTaskExecutionRolePolicy"
            )
        ]
        });

        // TASK DEFINITION
        const taskDef = new FargateTaskDefinition(this, 'TaskDef', {
            executionRole: executionRole,
            memoryLimitMiB: 512,
            cpu: 256
        });

            // Create security group for Fargate tasks
        const fargateServiceSg = new SecurityGroup(this, 'FargateServiceSG', {
            vpc: vpc,
            description: 'Security group for Fargate Service',
            allowAllOutbound: true
        });

        // Allow inbound port 8080 from ALB security group
        fargateServiceSg.addIngressRule(
            Peer.securityGroupId(props.albSecurityGroup.securityGroupId),
            Port.tcp(8080),
            'Allow ALB health check and traffic'
        );

        // Allow inbound from VPC for internal service-to-service calls
        fargateServiceSg.addIngressRule(
            Peer.ipv4(props.vpc.vpcCidrBlock),
            Port.tcp(8080),
            'Allow internal VPC traffic for service-to-service calls'
        );

        const container = taskDef.addContainer('AppContainer', {
            image: ContainerImage.fromEcrRepository(props.ecrRepository),
            memoryLimitMiB: 512,
            cpu: 256,
            //TODO: insert secrets dynamically
            environment: {
                SPRING_DATASOURCE_URL: "",
                SPRING_DATASOURCE_USERNAME: "",
                SPRING_DATASOURCE_PASSWORD: "",
                JWT_SECRET_KEY: "",
                SUPPORT_EMAIL: "",
                APP_PASSWORD: ""
            },
            healthCheck: {
                command: [
                    "CMD-SHELL",
                    "wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1"
                ],
                interval: Duration.seconds(30),
                timeout: Duration.seconds(10),
                retries: 3,
                startPeriod: Duration.seconds(90)
            }
        });

        container.addPortMappings({ containerPort: 8080 });

        // Create Fargate Service
        const fargateService = new FargateService(this, 'FargateService', {
            serviceName: `${PREFIX}-service`,
            cluster,
            taskDefinition: taskDef,
            securityGroups: [fargateServiceSg],
            desiredCount: 2,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS
            },
            assignPublicIp: false
        });

        // Assign fargate service to the target group
        props.targetGroup.addTarget(fargateService);

        // Toggle autoscaling
        fargateService.autoScaleTaskCount({ minCapacity: 2, maxCapacity: 3 });
    }
}
