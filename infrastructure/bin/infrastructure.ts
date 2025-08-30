#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { ReactS3Stack } from "../lib/react-s3-stack";

const app = new App();
const reactS3Stack = new ReactS3Stack(app, "ReackS3Stack");
