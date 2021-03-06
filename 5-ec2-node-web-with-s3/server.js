const express = require("express");
const mysql = require('mysql');
const AWS = require('aws-sdk');
const config = require('./config');
const fileupload = require('express-fileupload')
const path = require("path");

const app = express();

// https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascript/example_code/s3

/***************Create S3 Bucket*****************************/
AWS.config.update({region: config.region});
const ID = config.AccessKeyId;
const SECRET = config.SecretAccessKey;
const S3BUCKET = config.s3Bucket;
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: ID,
  secretAccessKey: SECRET
});

/***********************************************************/

let pool = mysql.createPool({
  connectionLimit: 100, //important
  host: config.host,
  user: config.user,
  password: config.password,
  debug: false
});

pool.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`,(err, data) => {
  if(err) {
      console.error(err);
      return;
  }
  console.log(config.database, ' database is successfully created.');
});
pool = mysql.createPool({
  connectionLimit: 100, //important
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database, // <<<< set database
  debug: false
});

pool.query('CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), message VARCHAR(800), creation_date DATETIME NOT NULL DEFAULT NOW())',(err, data) => {
  if(err) {
      console.error(err);
      return;
  }
  console.log('MESSAGES table is successfully created.');
});

pool.query('CREATE TABLE IF NOT EXISTS proposals (id INT AUTO_INCREMENT PRIMARY KEY, s3_url VARCHAR(255), creation_date DATETIME NOT NULL DEFAULT NOW())',(err, data) => {
  if(err) {
      console.error(err);
      return;
  }
  console.log('Proposals table is successfully created.');
});

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'))
//app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(fileupload({ fileSize: 5 * 1024 * 1024 }))

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.get('/proposals', (req, res) => {
  res.sendFile( __dirname + "/public/" + "proposals.html" );
})

app.post("/api/proposals", function (req, res) {
  // Read content from the file
  const fileContent  = Buffer.from(req.files.filetoupload.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
      Bucket: S3BUCKET,
      Key: 'proposals/'+req.files.filetoupload.name, // File name you want to save as in S3
      Body: fileContent,
      ACL:'public-read'
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) throw err;
      console.log(`File uploaded successfully. ${data.Location}`);

      let insertQuery = 'INSERT INTO proposals (s3_url) VALUES (?)';
      let query = mysql.format(insertQuery,[data.Location]);
      
      pool.query(query,(err, data) => {
        if(err) {
          console.error(err);
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({link: data.Location});
      });
  });
});

app.get("/api/proposals", function (req, res) {

  pool.query('select s3_url from proposals',(err, data) => {
    if(err) {
      console.error(err);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    const ndata = Object.values(JSON.parse(JSON.stringify(data)))
    res.send(ndata);
  });
});

app.post("/api/message", function (req, res) {
  const {name, email, message} = req.body;
  let insertQuery = 'INSERT INTO messages (name, email, message) VALUES (?,?,?)';
  let query = mysql.format(insertQuery,[name, email, message]);
  
  pool.query(query,(err, data) => {
    if(err) {
      console.error(err);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({id: JSON.parse(JSON.stringify(data)).insertId});
  });
});

app.listen(3000);

function formatHTML(ideas) {
  return ideas.map(i => {
    const is = `<div style="width:300px; border: 1px solid blue; padding: 10px; margin: 10px;">${i.idea}</div>`;
    return is;
  }).join(' ');
} 