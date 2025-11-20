import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontWebDistribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class ReactS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const reactBucket = new Bucket(this, "reactbucket", {
      bucketName: `reactbucket-dev-${this.account}-${this.region}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const distribution = new CloudFrontWebDistribution(
      this,
      "ReactDeploymentDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: reactBucket,
              originAccessIdentity: new OriginAccessIdentity(this, 'OAI')
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            responsePagePath: "/index.html",
            responseCode: 200,
            errorCachingMinTtl: 10
          }
        ]
      }
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
