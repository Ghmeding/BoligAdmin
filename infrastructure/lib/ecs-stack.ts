import { Stack, StackProps }  from 'aws-cdk-lib';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export const PREFIX = "BA_AUTH";

export interface EcsStackProps extends StackProps {
    vpc: Vpc;
}

export class EcsStack extends Stack {
    public readonly cluster: Cluster;

    constructor(scope: Construct, id: string, props: EcsStackProps) {
        super(scope, id, props);

        const vpc = props.vpc;

        // Create ECS Cluster
        this.cluster = new Cluster(this, 'EcsCluster', {
            vpc: vpc,
            clusterName: `${PREFIX}-cluster`

        });
    }
}
