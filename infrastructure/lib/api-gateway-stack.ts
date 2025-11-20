import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { IApplicationListener } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { HttpApi, HttpMethod, IVpcLink } from "aws-cdk-lib/aws-apigatewayv2";
import { Construct } from "constructs";
import { HttpAlbIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export interface ApiGatewayStackProps extends StackProps {
  vpcLink: IVpcLink;
  albListener: IApplicationListener;
}

export class ApiGatewayStack extends Stack {

  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, "HttpApi");

    const albIntegration = new HttpAlbIntegration("AlbIntegration", props.albListener, {
      vpcLink: props.vpcLink
    });

    api.addRoutes({
      path: "/auth/{proxy+}",
      methods: [HttpMethod.ANY],
      integration: albIntegration
    });
  }
}
