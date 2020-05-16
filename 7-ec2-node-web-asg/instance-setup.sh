#!/bin/bash
yum -y update
yum install -y git
cd /home/ec2-user
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
git clone https://github.com/rbotla/aws-intro.git
cd aws-intro/6-ec2-node-web-with-alb
npm install
nohup node server.js &
