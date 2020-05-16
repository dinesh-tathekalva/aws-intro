# Web app with database

> If you don't already have an EC2 instance, refer to [link](/2-aws-cli-create-ec2) to create an EC2 machine.

> Create a "mysql" database with instance name: test-instance, 20GB storage, username: master, password: secret99
```
aws rds create-db-instance \
    --allocated-storage 20 --db-instance-class db.t2.micro \
    --db-instance-identifier db-instance \
    --engine mysql \
    --enable-cloudwatch-logs-exports '["audit","error","general","slowquery"]' \
    --master-username master \
    --master-user-password secret99
```

The database creation takes few minutes time. If the following command returns null, try again.
```
aws rds describe-db-instances --db-instance-identifier db-instance --query 'DBInstances[0].Endpoint'
```

You should see a similar output as the following:
```json
{
    "Address": "db-instance.cfb1dqjdq1bs.us-east-1.rds.amazonaws.com",
    "Port": 3306,
    "HostedZoneId": "Z2R2ITUGPM61AM"
}
```
We will use database host address, port, username, password and database name to connect to the database from NodeJS application.

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

> Update db.config file with the database details created above 
```
{
  "host": "db-instance.cfb1dqjdq1bs.us-east-1.rds.amazonaws.com",
  "user": "master",
  "port": 3306,
  "password": "secret99",
  "database": "db-instance"
}
```

> Run the application
```
npm start
```
> Access the application via browser. Get the public IP adresss of the EC2 machine.
```
http://<ec2-public-ip-address>:3000
```

> Install mysql client on EC2
```
sudo yum install mysql -y
mysql -u master -h db-instance.cfb1dqjdq1bs.us-east-1.rds.amazonaws.com -p aws_learning
password: secret99
```