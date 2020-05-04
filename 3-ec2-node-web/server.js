const express = require('express')
const getIP = require('../4-ec2-node-web-alb/node_modules/external-ip')();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  getIP((err, ip) => {
    if (err) throw err;
    res.status(200).send('Hello World! from - '+ ip)
  });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))