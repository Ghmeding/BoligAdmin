import { CfnOutput, Stack, RemovalPolicy, StackProps, SecretValue, Duration } from 'aws-cdk-lib';
import { Vpc, SecurityGroup, Port, Peer, SubnetType, InstanceType, InstanceClass, InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, Credentials, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface RdsStackProps extends StackProps {
    vpc: Vpc;
}

export class RdsStack extends Stack {
    constructor(scope: Construct, id: string, props: RdsStackProps) {
        super(scope, id, props);

        const vpc = props.vpc;
        const engine = DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_16 });
        const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
        const port = 5432;
        const dbName = "BA_DB";

        // create database master user secret and store it in Secrets Manager
        const masterUserSecret = new Secret(this, "BA_DB_SECRET", {
            secretName: "BA_DB_SECRET",
            description: "BA_DB_SECRET",
            secretStringValue: SecretValue.unsafePlainText(JSON.stringify({
                SPRING_DATASOURCE_URL: process.env.SPRING_DATASOURCE_URL,
                SPRING_DATASOURCE_USERNAME: process.env.SPRING_DATASOURCE_USERNAME,
                JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
                SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
                APP_PASSWORD: process.env.APP_PASSWORD
            }))
        });

        const dbSg = new SecurityGroup(this, 'RdsSecurityGroup', {
            securityGroupName: "BA_DB_SG",
            vpc: vpc
        });


        dbSg.addIngressRule(
            Peer.ipv4(vpc.vpcCidrBlock),
            Port.tcp(port),
            `Allow port ${port} for database connection from only within the VPC (${vpc.vpcId})`
        );

        // create RDS instance (PostgreSQL)
        const db = new DatabaseInstance(this, "DB-1", {
            vpc: vpc,
            vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },
            instanceType,
            engine,
            port,
            securityGroups: [dbSg],
            databaseName: dbName,
            credentials: Credentials.fromSecret(masterUserSecret),
            backupRetention: Duration.days(0),
            deleteAutomatedBackups: true,
            removalPolicy: RemovalPolicy.DESTROY
        });

        new CfnOutput(this, 'BA_DB_ENDPOINT', {
            value: db.dbInstanceEndpointAddress,
            description: 'Database endpoint (host)'
        });

        new CfnOutput(this, 'BA_DB_PORT', {
            value: db.dbInstanceEndpointPort,
            description: 'Database port'
        });

        new CfnOutput(this, 'BA_VPC', {
            value: vpc.vpcArn,
            description: 'VPC ARN'
        });
    }
}
