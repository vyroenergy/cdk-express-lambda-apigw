import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";

import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

interface ApiStackProps extends StackProps {
  system: string;
}

export class ApiStack extends Stack {
  public hostname: string;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const codeDirectory = path.join(__dirname, "../../api");
    const handler = new NodejsFunction(this, `${props.system}-api`, {
      functionName: `${props.system}-api`.slice(0, 64),
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(codeDirectory, "src/app-lambda.ts"),
      depsLockFilePath: path.join(__dirname, "../../pnpm-lock.yaml"),
    });

    const api = new apiGateway.RestApi(this, `${props.system}-api-gateway`, {
      restApiName: props.system,
      deployOptions: {
        loggingLevel: apiGateway.MethodLoggingLevel.INFO,
      },
    });

    const integration = new apiGateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    api.root.addProxy({
      defaultIntegration: integration,
      anyMethod: true,
    });
  }
}
