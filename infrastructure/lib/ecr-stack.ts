import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository, RepositoryEncryption } from 'aws-cdk-lib/aws-ecr';

export class EcrStack extends Stack {
    public readonly authEcrRepository: Repository;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        // Create the ECR repository for Auth
        this.authEcrRepository = new Repository(this, 'NexusRepository', {
            repositoryName: 'auth',
            imageScanOnPush: true,
            encryption: RepositoryEncryption.KMS
        });
    }
}
