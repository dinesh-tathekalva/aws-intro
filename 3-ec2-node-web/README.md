> SSH into the AWS EC2 machine. Please refer to [link](/aws-cli-create-ec2) on how to create a new EC2 machine.
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
