#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { ReactS3Stack } from "../lib/react-s3-stack";
import { RdsStack } from "../lib/rds-stack";
import { EcsStack } from "../lib/ecs-stack";
import { NetworkStack } from "../lib/network-stack";
import { AlbStack } from "../lib/alb-stack";
import { AuthFargateServiceStack } from "../lib/auth-fargateservice-stack";
import { EcrStack } from "../lib/ecr-stack";

const app = new App();

const ecrStack = new EcrStack(app, "EcrStack");
const networkStack = new NetworkStack(app, "NetworkStack");
const reactS3Stack = new ReactS3Stack(app, "ReackS3Stack");
const rdsStack = new RdsStack(app, "RdsStack", {
    vpc: networkStack.vpc
});
const ecsStack = new EcsStack(app, "Ecs", {
    vpc: networkStack.vpc
});
const albStack = new AlbStack(app, "Alb", {
    vpc: networkStack.vpc
});

const authFargateServiceStack = new AuthFargateServiceStack(app, "AuthFargate", {
    vpc: networkStack.vpc,
    ecrRepository: ecrStack.authEcrRepository,
    loadBalancer: albStack.loadBalancer,
    targetGroup: albStack.authTargetGroup,
    cluster: ecsStack.cluster,
    albSecurityGroup: albStack.albSecurityGroup
});

//TODO: Add API GATEWAY!




