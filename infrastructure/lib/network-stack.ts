import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class NetworkStack extends Stack {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC that will be shared between Redis and Fargate
    this.vpc = new Vpc(this, "SharedVpc", {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
            name: 'public',
            subnetType: SubnetType.PUBLIC
        },
        {
            name: 'private',
            subnetType: SubnetType.PRIVATE_WITH_EGRESS
        },
        {
            name: 'isolated',
            subnetType: SubnetType.PRIVATE_ISOLATED
        }
      ]
    });

    // Output the VPC ID for cross-stack references
    new CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      exportName: 'SharedVpcId'
    });
  }
}
