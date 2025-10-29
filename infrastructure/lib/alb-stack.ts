import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { IVpc, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import { ApplicationLoadBalancer, ApplicationProtocol, ApplicationTargetGroup, ListenerAction, ListenerCondition, Protocol, TargetType } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

export interface LoadBalancerStackProps extends StackProps {
  vpc: IVpc;
}

export class AlbStack extends Stack {
    public readonly loadBalancer: ApplicationLoadBalancer;
    public readonly authTargetGroup: ApplicationTargetGroup;
    public readonly coreTargetGroup: ApplicationTargetGroup;
    public readonly albSecurityGroup: SecurityGroup;

    constructor(scope: Construct, id: string, props: LoadBalancerStackProps) {
        super(scope, id, props);

        // Create security group for ALB
        this.albSecurityGroup = new SecurityGroup(this, 'ALBSecurityGroup', {
            vpc: props.vpc,
            description: 'Security group for Application Load Balancer',
            allowAllOutbound: true
        });

        this.loadBalancer = new ApplicationLoadBalancer(this, 'ALB', {
            vpc: props.vpc,
            internetFacing: false,
            deletionProtection: false,
            securityGroup: this.albSecurityGroup,
            // Set to maximum ALB idle timeout (4000 seconds ~= 66 minutes)
            // AWS maximum is 4000 seconds for Application Load Balancers
            idleTimeout: Duration.seconds(4000)
        });

            // Create a default HTTP target group
        this.authTargetGroup = new ApplicationTargetGroup(this, 'DefaultTargetGroup', {
            vpc: props.vpc,
            port: 8080,
            protocol: ApplicationProtocol.HTTP,
            targetType: TargetType.IP,
            healthCheck: {
                path: '/health',
                interval: Duration.seconds(30),
                healthyHttpCodes: '200'
            }
        });

        const listener = this.loadBalancer.addListener('Listener', {
            port: 80,
            protocol: ApplicationProtocol.HTTP,
            defaultTargetGroups: [this.authTargetGroup]
        });

        listener.addAction('AuthRouting', {
            priority: 10,
            conditions: [ListenerCondition.pathPatterns(['/auth/*'])],
            action: ListenerAction.forward([this.authTargetGroup])
        });

        listener.addAction('CoreRouting', {
            priority: 20,
            conditions: [ListenerCondition.pathPatterns(['/core/*'])],
            action: ListenerAction.forward([this.coreTargetGroup])
        });

        new CfnOutput(this, 'AlbDnsName', {
            value: this.loadBalancer.loadBalancerDnsName,
            exportName: 'AlbDnsName'
        });
    }
}
