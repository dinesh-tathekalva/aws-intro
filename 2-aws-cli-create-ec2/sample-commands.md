# Sample Commands

Following commands
```
aws ec2 describe-images --owners amazon --filters 'Name=name,Values=amzn2-ami-hvm-2.0.????????-x86_64-gp2'
'Name=state,Values=available' --output json | jq -r '.Images | sort_by(.CreationDate) | last(.[]).ImageId'

aws ec2 run-instances --image-id ami-009d6802948d06e52 --security-group-ids sg-83365bd9 --instance-type t2.micro --key-name ravi-aws-web

aws ec2 describe-instances --instance-ids i-0fc282b8157cea665 --query 'Reservations[0].Instances[0].PublicIpAddress'

ssh -i ravi-aws-web.pem ec2-user@3.84.149.160

sudo yum update -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"


aws ec2 stop-instances --instance-ids i-0fc282b8157cea665
aws ec2 terminate-instances --instance-ids i-0fc282b8157cea665
```

