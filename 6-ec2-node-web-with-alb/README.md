# Web app with ALB
> If you don't already have an EC2 instance, refer to [link](/2-aws-cli-create-ec2) to create an EC2 machine.

> Let's create one more EC2 instance to horizontally scale. Change AMI id, security group id and key name in the following command as mentioned in [link](/2-aws-cli-create-ec2).
```
aws ec2 run-instances --image-id ami-009d6802948d06e52 --security-group-ids sg-83365bd9 --instance-type t2.micro --key-name ravi-aws-web
```
Make a note of hte InstanceId returned by the above query.
```
aws ec2 describe-instances --instance-ids i-xxxxxxxxxxxxxxx --query 'Reservations[0].Instances[0].PublicIpAddress'
```

> SSH into that machine
```
ssh -i my-key-pair.pem ec2-user@<ip-address>
```

> Clone this repository in EC2 machine if you already didn't.
```
sudo yum install git -y
git config --global credential.helper store
git clone https://github.com/rbotla/aws-intro.git
```

> Run the following commands
```
cd aws-intro/4-ec2-node-web-with-db
npm install
```
> Create a file with filename - config.js and add the following entries
```
const config = {
  "host": "db-instance.cfb1dqjdq1bs.us-east-1.rds.amazonaws.com",
  "user": "master",
  "port": 3306,
  "password": "secret99",
  "database": "aws_learning",
  "s3Bucket": "*****YOUR BUCKET NAME*****",
  "region": "us-east-1",
  "AccessKeyId": ""*****YOUR ACCESS KEY ID*****",
  "SecretAccessKey": ""*****YOUR SECRET ACCESS KEY*****"
}
module.exports = config;
```

> Run the application
```
npm start
```

> Access the application via browser. Get the public IP adresss of the EC2 machine.
```
http://<ec2-public-ip-address>:3000
```

> Create load balancer
Pick any 2 subnet ids from the following command output
```
aws ec2 describe-subnets
```
Update your appropriate subnets and the security group (firewall) - I'm using the same security group that I used for EC2.
```
aws elbv2 create-load-balancer --name knowvial-alb  --subnets subnet-f83f5cc6 subnet-39998f36 --security-groups sg-83365bd9
```
You should get a Arn such as arn:aws:elasticloadbalancing:us-east-1:918700838480:loadbalancer/app/knowvial-alb/69d46e03f226f8cd. We will use this Arn in the following commands.

> Create target group

Get the VPC Id by running the following command
```
aws ec2 describe-vpcs
```
Use the VPC Id returned in the above command to create a target group.
```
aws elbv2 create-target-group --name knowvial-web-tg --protocol HTTP --port 3000 --vpc-id vpc-d45c34ae
```
You should see JSON payload with a Target Group Arn such as arn:aws:elasticloadbalancing:us-east-1:918700838480:targetgroup/knowvial-web-tg/9c36425d7505875f. Make a note of this Arn. We will use this in the following commands.

> Register targets with the above target group
Find out your EC2 instance ids by running the following command
```
aws ec2 describe-instances --query 'Reservations[].Instances[].[PublicIpAddress,InstanceId,Tags[?Key==`Name`].Value[]]' --output text | sed 's/None$/None\n/' | sed '$!N;s/\n/ /'
```

```
aws elbv2 register-targets --target-group-arn targetgroup-arn  --targets Id=i-0fc282b8157cea665 Id=i-0985fe89ff2c905d7

```

> Create load balancer listener
```
aws elbv2 create-listener --load-balancer-arn loadbalancer-arn --protocol HTTP --port 80  --default-actions Type=forward,TargetGroupArn=targetgroup-arn
```

> Find out the load balancer for the ALB
```
aws elbv2 describe-load-balancers
```
Make a note of the "DNSName" attribute. That will be the URL you will use to access the application.

http://knowvial-alb-99652294.us-east-1.elb.amazonaws.com