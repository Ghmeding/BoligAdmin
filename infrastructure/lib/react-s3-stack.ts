import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";

export class ReactS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const reactBucket = new Bucket(this, "reactbucket", {
      bucketName: `reactbucket-dev-${this.account}-${this.region}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const distribution = new Distribution(this, "CloudFrontDistribution", {
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(reactBucket)
      }
    });

    reactBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [`${reactBucket.bucketArn}/*`],
        principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
        conditions: {
          StringEquals: { "AWS:SourceArn": distribution.distributionArn }
        }
      })
    );

    new BucketDeployment(this, "DeployReactApp", {
      sources: [
        Source.asset(
          "/Users/gmeding/Documents/Repositories/BoligAdmin/services/frontend/build"
        )
      ],
      destinationBucket: reactBucket,
      distributionPaths: ["/*"],
      distribution
    });
  }
}
