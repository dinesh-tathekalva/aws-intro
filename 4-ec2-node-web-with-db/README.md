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

> SSH into the AWS EC2 machine
```
ssh -i ravi-aws-web.pem ec2-user@<ip-address>
```

> Install git client
```
sudo yum install git -y
```

> Clone this repository in EC2 machine
```
git clone https://github.com/rbotla/aws-intro.git
cd aws-intro
```

> Install Node using the install-node.sh script
```
install-node.sh
```

> Install packages
```
npm install
```

> Run the application
```
npm start
```

> Access the application via browser. Get the public IP adresss of the EC2 machine.
```
http://<ec2-public-ip-address>:3000
```
