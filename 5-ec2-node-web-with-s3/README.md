# Web app with S3
> If you don't already have an EC2 instance, refer to [link](/2-aws-cli-create-ec2) to create an EC2 machine.

> Create new access key. We will use this key for our NodeJS application runnig on EC2 machine to upload / read document into S3 bucket.
```
aws iam create-access-key
```
{
    "AccessKey": {
        "UserName": "ravi",
        "AccessKeyId": "your-access-key-id",
        "Status": "Active",
        "SecretAccessKey": "your-secret-access-key",
        "CreateDate": "2020-05-09T16:11:34+00:00"
    }
}

> Create a S3 bucket. Replace 98452 with a random to make it a unique name within the region.
```
aws s3api create-bucket --bucket aws-learning-98452 --region us-east-1
```
Make a note of the S3 bucket name. You will use this bucket name later.

> SSH into the AWS EC2 machine
```
ssh -i ravi-aws-web.pem ec2-user@<ip-address>
```

> Clone this repository in EC2 machine if you already didn't.
```
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
http://<ec2-public-ip-address>:3000/proposals
```
Upload file and refresh page.

> Install mysql client on EC2
```
sudo yum install mysql -y
mysql -u master -h db-instance.cfb1dqjdq1bs.us-east-1.rds.amazonaws.com -p aws_learning
password: secret99

select * from proposals
```

--- you don't need to do the following ---

> Create a new Cognito Pool
```
aws cognito-idp create-user-pool --pool-name KnowvialAuth
```

> Run the following command to check if the user pool is created successfully.
```
aws cognito-idp list-user-pools --max-results 10
```
You should see an output as shown below.
```json
{
    "UserPools": [
        {
            "Id": "us-east-1_xyzzzzzzzzzz",
            "Name": "KnowvialAuth",
            "LambdaConfig": {},
            "LastModifiedDate": "2020-05-15T06:22:39.301000-07:00",
            "CreationDate": "2020-05-15T06:22:39.301000-07:00"
        }
    ]
}
```