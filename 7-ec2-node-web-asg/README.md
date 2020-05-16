# Autoscaling Application

```
aws autoscaling create-launch-configuration \
  --launch-configuration-name knowvial-launch-cfg \
  --image-id ami-009d6802948d06e52 \
  --key-name ravi-aws-web \
  --iam-instance-profile CodeDeployDemo-EC2-Instance-Profile \
  --instance-type t2.micro \ 
  --user-data file://path/to/instance-setup.sh
```

```
aws ec2 describe-availability-zones --region us-east-1
```

```
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name knowvial-web-asg \
  --launch-configuration-name knowvial-launch-cfg \
  --min-size 1 \
  --max-size 3 \
  --desired-capacity 2 \
  --availability-zones us-east-1b
```

```
aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names CodeDeployDemo-AS-Group --query "AutoScalingGroups[0].Instances[*].[HealthStatus, LifecycleState]" --output text
```
