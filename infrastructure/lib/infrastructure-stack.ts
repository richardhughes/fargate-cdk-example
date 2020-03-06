import * as cdk from '@aws-cdk/core';
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import {FargateTaskDefinition} from "@aws-cdk/aws-ecs";
import {TaskDefinition} from "@aws-cdk/aws-ecs/lib/base/task-definition";

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "MyVpc", {
            maxAzs: 3
        });

        const fargateTaskDefinition = new FargateTaskDefinition(this, 'fargateTaskDef', {
            memoryLimitMiB: 512,
            cpu: 256,
        });

        this.addContainerToTaskDefinition(fargateTaskDefinition, 'PhpContainer', '..');
        this.addContainerToTaskDefinition(fargateTaskDefinition, 'WebContainer', '../docker/nginx');

        this.createFargateService(vpc, fargateTaskDefinition, true);
    }

    createFargateService(vpc: ec2.Vpc, taskDefinition: TaskDefinition, isPublic: boolean) {
        const cluster = new ecs.Cluster(this, "MyCluster", {
            vpc: vpc
        });

        new ecs.FargateService(this, 'Fargate', {
            cluster: cluster,
            taskDefinition: taskDefinition,
            assignPublicIp: isPublic
        });
    }

    addContainerToTaskDefinition(taskDefinition: TaskDefinition, id: string, pathToDockerFile: string) {
        taskDefinition.addContainer(
            id,
            {
                image: ecs.AssetImage.fromAsset(pathToDockerFile)
            }
        )
    }
}
