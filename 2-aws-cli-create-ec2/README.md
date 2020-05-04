# Creating an EC2 machine with CLI
> Make sure you complete the CLI setup - [instructions](/1-aws-cli-setup).

> Create a virtual firewall that we will associate with our EC2 machine
```
aws ec2 create-security-group --group-name ec2SecurityGroup --description "A firewall to our EC2 machine"
```
Make a note of the group id retruned by the above command. We will use this security group id for creating the EC2 machine.

> Add firewall rules to allow inbound port 22 and 3000 from anywhere (0.0.0.0/0)
```
aws ec2 authorize-security-group-ingress --group-name example --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name example --protocol tcp --port 3000 --cidr 0.0.0.0/0
```

> Create a keypair. We will use this key pair to SSH into the EC2 machine from a remote machine. ***Make sure you keep this key pair file safe.** This is key pair is the key to your environemnt.
```
aws ec2 create-key-pair --key-name my-key-pair --query 'KeyMaterial' --output text > my-key-pair.pem
```
Your key should look something like the following<br />
-----BEGIN RSA PRIVATE KEY-----
EXAMPLEKEYKCAQEAy7WZhaDsrA1W3mRlQtvhwyORRX8gnxgDAfRt/gx42kWXsT4rXE/b5CpSgie/
vBoU7jLxx92pNHoFnByP+Dc21eyyz6CvjTmWA0JwfWiW5/akH7iO5dSrvC7dQkW2duV5QuUdE0QW
Z/aNxMniGQE6XAgfwlnXVBwrerrQo+ZWQeqiUwwMkuEbLeJFLhMCvYURpUMSC1oehm449ilx9X1F
G50TCFeOzfl8dqqCP6GzbPaIjiU19xX/azOR9V+tpUOzEL+wmXnZt3/nHPQ5xvD2OJH67km6SuPW
WBhd4xHZtmCqpBPlAymEjr/TOlbxyARmXMnIOWIAnNXMGB4KGSyl1mzSVAoQ+fqR+cJ3d0dyPl1j
jjb0Ed/NY8frlNDxAVHE8BSkdsx2f6ELEyBKJSRr9snRAoGAMrTwYneXzvTskF/S5Fyu0iOegLDa
NWUH38v/nDCgEpIXD5Hn3qAEcju1IjmbwlvtW+nY2jVhv7UGd8MjwUTNGItdb6nsYqM2asrnF3qS
VRkAKKKYeGjkpUfVTrW0YFjXkfcrR/V+QFL5OndHAKJXjW7a4ejJLncTzmZSpYzwApc=<br/>
-----END RSA PRIVATE KEY-----

> Change permisisons on your keypair file (on Mac or Linux)
```
chmod 400 my-key-pair.pem
```

> Run the following commands to get the EC2 image AMI
```
aws ec2 describe-images --owners amazon --filters 'Name=name,Values=amzn2-ami-hvm-2.0.????????-x86_64-gp2'
'Name=state,Values=available' --output json | jq -r '.Images | sort_by(.CreationDate) | last(.[]).ImageId'
```

> Use "t2.micro" for this example. For the complete list of EC2 machine types visit [link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html).

> Replace the above identified information (security group id, AMI id, and key name) in the following command and execute on the CLI
```
aws ec2 run-instances --image-id ami-xxxxxxxx --security-group-ids xxxxxxxxx --instance-type t2.micro --key-name my-key-pair
```
The above command returns the ec2 instance id.

> Replace the instance id (returned by the above command) in the following command and run on the command line. Use describe-instances to get all the details about the instance. 
```
aws ec2 describe-instances --instance-ids i-xxxxxxxxxxxxxxx --query 'Reservations[0].Instances[0].PublicIpAddress'
```

> SSH into the machine using the ip adress returned by the above command.
```
ssh -i my-key-pair.pem ec2-user@<ip-address>
```

> To stop and terminate the instance, use the following commands
```
aws ec2 stop-instances --instance-ids i-xxxxxxxxxxxxxxxxxx
aws ec2 terminate-instances --instance-ids i-xxxxxxxxxxxxxxxxxx
```