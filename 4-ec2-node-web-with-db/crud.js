
function handle_database(req,res) {
  // connection will be acquired automatically
  pool.query("select * from user",function(err,rows){
    if(err) {
      return res.json({'error': true, 'message': 'Error occurred'+err});
    }
    res.json(rows);
  });
}

function addRow(data) {
  let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
  let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
  pool.query(query,(err, response) => {
      if(err) {
          console.error(err);
          return;
      }
      // rows added
      console.log(response.insertId);
  });
}

function queryRow(userName) {
  let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
  let query = mysql.format(selectQuery,["todo","user", userName]);
  // query = SELECT * FROM `todo` where `user` = 'shahid'
  pool.query(query,(err, data) => {
      if(err) {
          console.error(err);
          return;
      }
      // rows fetch
      console.log(data);
  });
}

function updateRow(data) {
  let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
  let query = mysql.format(updateQuery,["todo","notes",data.value,"user",data.user]);
  // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
  pool.query(query,(err, response) => {
      if(err) {
          console.error(err);
          return;
      }
      // rows updated
      console.log(response.affectedRows);
  });
}

function deleteRow(userName) {
  let deleteQuery = "DELETE from ?? where ?? = ?";
  let query = mysql.format(deleteQuery, ["todo", "user", userName]);
  // query = DELETE from `todo` where `user`='shahid';
  pool.query(query,(err, response) => {
      if(err) {
          console.error(err);
          return;
      }
      // rows deleted
      console.log(response.affectedRows);
  });
}

deleteRow('shahid');

addRow({
  "user": "Shahid",
  "value": "Just adding a note"
});

let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
let values = [["shahid","hello"],["Rohit","Hi"]]; // each array is one row
let query = mysql.format(insertQuery,["todo","user","notes",values]);

updateRow({
  "user": "Shahid",
  "value": "Just updating a note"
});


queryRow('shahid');