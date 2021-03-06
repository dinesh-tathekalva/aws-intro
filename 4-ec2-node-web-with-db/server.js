var express = require("express");
var mysql = require('mysql');
var app = express();
const config = require('./db.config');

var pool = mysql.createPool({
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

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.post("/api/message", function (req, res) {
  console.log(req.body);
  const {name, email, message} = req.body;
  let insertQuery = 'INSERT INTO messages (name, email, message) VALUES (?,?,?)';
  let query = mysql.format(insertQuery,[name, email, message]);
  
  pool.query(query,(err, data) => {
    if(err) {
      console.error(err);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({id: data.insertId});
  });
});

app.listen(3000);

function formatHTML(ideas) {
  return ideas.map(i => {
    const is = `<div style="width:300px; border: 1px solid blue; padding: 10px; margin: 10px;">${i.idea}</div>`;
    return is;
  }).join(' ');
} 