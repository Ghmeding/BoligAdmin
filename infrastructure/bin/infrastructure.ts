#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { ReactS3Stack } from "../lib/react-s3-stack";
import { RdsStack } from "../lib/rds-stack";
import { EcsStack } from "../lib/ecs-stack";
import { NetworkStack } from "../lib/network-stack";

const app = new App();
const networkStack = new NetworkStack(app, "NetworkStack");
const reactS3Stack = new ReactS3Stack(app, "ReackS3Stack");
const rdsStack = new RdsStack(app, "RdsStack", {
    vpc: networkStack.vpc
});
const ecsStack = new EcsStack(app, "Ecs", {
    vpc: networkStack.vpc
});


