import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";

import { Construct } from "constructs";
import config from "../config";

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucketLogs = new Bucket(this, "website-logs", {
      bucketName: config.app
        .name("-buildspace-web3appsolidity-logs")
        .toLowerCase(),
      removalPolicy: RemovalPolicy.RETAIN,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
    });

    const websiteBucket = new Bucket(this, "website", {
      bucketName: config.app.name("-buildspace-web3appsolidity").toLowerCase(),
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      serverAccessLogsBucket: websiteBucketLogs,
    });

    const websiteDeployment = new BucketDeployment(this, "website-deployment", {
      sources: [Source.asset(config.website.artifacts)],
      destinationBucket: websiteBucket,
    });

    new CfnOutput(this, "Website Endpoint", {
      value: `${websiteBucket.bucketWebsiteUrl}/index.html`,
      description: "Website URL",
    });
  }
}
