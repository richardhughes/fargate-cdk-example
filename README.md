# Fargate CDK Example
Example Repo for compiling and deploying a fargate project using CDK. This will compile a Ngix and PHP container and output a `phpinfo` page

## Usage
1. `cd infrastructure`
1. `cdk bootstrap` - if not already run before
1. `npm install`
1. `npm run build`
1. `cdk deploy` 

## Delete the stack
1. `cdk destroy`

## TODO

1. Apply a Application LB to the Service
1. Once done ^^ we can do Blue/Green Deployments by changing the Service DeploymentType (`deploymentController` property)
1. Write / Investigate Testing

