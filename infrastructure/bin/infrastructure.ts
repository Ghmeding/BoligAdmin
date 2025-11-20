#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { ReactS3Stack } from "../lib/react-s3-stack";
import { RdsStack } from "../lib/rds-stack";
import { EcsStack } from "../lib/ecs-stack";
import { NetworkStack } from "../lib/network-stack";
import { AlbStack } from "../lib/alb-stack";
import { AuthFargateServiceStack } from "../lib/auth-fargateservice-stack";
import { EcrStack } from "../lib/ecr-stack";
import { ApiGatewayStack } from "../lib/api-gateway-stack";

const app = new App();

const ecrStack = new EcrStack(app, "EcrStack");
const networkStack = new NetworkStack(app, "NetworkStack");
const rdsStack = new RdsStack(app, "RdsStack", {
    vpc: networkStack.vpc
});
const ecsStack = new EcsStack(app, "EcsStack", {
    vpc: networkStack.vpc
});
const albStack = new AlbStack(app, "AlbStack", {
    vpc: networkStack.vpc
});

const authFargateServiceStack = new AuthFargateServiceStack(app, "AuthFargateStack", {
    vpc: networkStack.vpc,
    ecrRepository: ecrStack.authEcrRepository,
    loadBalancer: albStack.loadBalancer,
    targetGroup: albStack.authTargetGroup,
    cluster: ecsStack.cluster,
    albSecurityGroup: albStack.albSecurityGroup
});

const apiGatewayStack = new ApiGatewayStack(app, "ApiGatewayStack", {
    vpcLink: networkStack.vpcLink,
    albListener: albStack.loadBalancerListener
});

const reactS3Stack = new ReactS3Stack(app, "ReackS3Stack");

rdsStack.addDependency(networkStack);
ecsStack.addDependency(networkStack);
albStack.addDependency(networkStack);
authFargateServiceStack.addDependency(networkStack);
authFargateServiceStack.addDependency(ecrStack);
authFargateServiceStack.addDependency(albStack);
authFargateServiceStack.addDependency(ecsStack);
apiGatewayStack.addDependency(networkStack);
apiGatewayStack.addDependency(albStack);









