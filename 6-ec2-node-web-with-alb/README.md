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

