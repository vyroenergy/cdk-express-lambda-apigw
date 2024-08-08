#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { ApiStack } from "../lib/api-stack";

const app = new cdk.App();

const system = `my-cdk-express-lambda-apigw`;

new ApiStack(app, `${system}-api-stack`, {
  system,
});
