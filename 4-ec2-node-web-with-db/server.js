var express = require("express");
var mysql = require('mysql');
var app = express();
const config = require('config');

var pool = mysql.createPool({
  connectionLimit: 100, //important
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  debug: false
});

pool.query('CREATE TABLE IF NOT EXISTS app_ideas (id INT AUTO_INCREMENT PRIMARY KEY, idea VARCHAR(255))',(err, data) => {
  if(err) {
      console.error(err);
      return;
  }
  console.log(data);
});

function insertSampleRecords() {
  const ideas = ['A weight tracker app','A calculator app','A book database','A recipes app','A bill tracker','An expenses tracker','A chat application','A notes app','A personal diary app','A pomodoro app','A meme generator','Tic-tac-toe game','The game of life','A blog engine','A QA engine','A forum engine','An embeddable live chat','A Hacker News client','A Reddit client','An Instagram client','A GitHub API client','An Unsplash API client']
  
  var sql = "INSERT INTO app_ideas (idea) VALUES ?";
  con.query(sql, [ideas.map(i => [i])], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

function queryAllRows() {
  let selectQuery = 'SELECT idea FROM ideas';
  pool.query(query,(err, data) => {
      if(err) {
          console.error(err);
          return;
      }
      // rows fetch
      console.log(data);
  });
}

app.get("/", function (req, res) {
  queryAllRows();
  res.status(200).res.send('hello world')
});

app.listen(3000);




