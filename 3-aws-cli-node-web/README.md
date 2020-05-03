> SSH into the AWS EC2 machine. Please refer to [link](/aws-cli-create-ec2) on how to create a new EC2 machine.
```
ssh -i ravi-aws-web.pem ec2-user@<ip-address>
```

> Install Node using NVM
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
```

> Install git client
```
sudo yum install git -y
```

```
mkdir app
cd app
npm init -y
npm in
```


> Intall


```
<<EOF > index.js

var http = require('http')
var url = require('url')

http.createServer(onRequest).listen(3000);
console.log('Server has started');

function onRequest(request, response){
  var pathName = url.parse(request.url).pathname
  console.log('pathname' + pathName);
  response.writeHead(200);
  response.write('Hello Noders');
  response.end();
}

EOF

```

