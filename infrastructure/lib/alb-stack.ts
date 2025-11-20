import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { IVpc, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import { ApplicationListener, ApplicationLoadBalancer, ApplicationProtocol, ApplicationTargetGroup, ListenerAction, ListenerCondition, Protocol, TargetType } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

export interface LoadBalancerStackProps extends StackProps {
  vpc: IVpc;
}

export class AlbStack extends Stack {
    public readonly loadBalancer: ApplicationLoadBalancer;
    public readonly loadBalancerListener: ApplicationListener;
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
            idleTimeout: Duration.seconds(4000)
        });

        this.loadBalancerListener = this.loadBalancer.addListener('Listener', {
            port: 80,
            protocol: ApplicationProtocol.HTTP,
        });

        // Create a auth target group
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

        // attach the auth target to the listenet
        this.loadBalancerListener.addTargetGroups("authTargetGroup", {
            targetGroups: [this.authTargetGroup],
        });

        // add auth-routing to the listener
        this.loadBalancerListener.addAction('AuthRouting', {
            priority: 10,
            conditions: [ListenerCondition.pathPatterns(['/auth/*'])],
            action: ListenerAction.forward([this.authTargetGroup])
        });

        // listener.addAction('CoreRouting', {
        //     priority: 20,
        //     conditions: [ListenerCondition.pathPatterns(['/core/*'])],
        //     action: ListenerAction.forward([this.coreTargetGroup])
        // });

        new CfnOutput(this, 'AlbDnsName', {
            value: this.loadBalancer.loadBalancerDnsName,
            exportName: 'AlbDnsName'
        });
    }
}
