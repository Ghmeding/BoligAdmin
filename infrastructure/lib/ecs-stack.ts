import { Stack, StackProps, CfnOutput, Fn }  from 'aws-cdk-lib';
import { Cluster, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export const PREFIX = "BA_AUTH";

export interface EcsStackProps extends StackProps {
    vpc: Vpc;
}

export class EcsStack extends Stack {
    constructor(scope: Construct, id: string, props: EcsStackProps) {
        super(scope, id, props);

        const vpc = props.vpc;

        // Create ECS Cluster
        const cluster = new Cluster(this, 'EcsCluster', {
            vpc: vpc,
            clusterName: `${PREFIX}-cluster`
        });

        // Create Fargate Service
        const fargateService = new ApplicationLoadBalancedFargateService(this, 'FargateService', {
            serviceName: `${PREFIX}-service`,
            loadBalancerName: `${PREFIX}-alb`,
            memoryLimitMiB: 512,
            cpu: 256,
            cluster: cluster,
            taskImageOptions: {
                image: ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
                containerPort: 80,
                environment: {
                    SPRING_DATASOURCE_URL: Fn.importValue("RdsEndpoint"),
                    SPRING_DATASOURCE_USERNAME: "...",
                    JWT_SECRET_KEY: "...",
                    SUPPORT_EMAIL: "...",
                    APP_PASSWORD: "..."
                }
            },
            desiredCount: 2
        });

        fargateService.targetGroup.configureHealthCheck({
            path: "/"
        });

        // Output the Load Balancer DNS
        new CfnOutput(this, 'LoadBalancerDNS', {
            value: fargateService.loadBalancer.loadBalancerDnsName
        });
    }
}
