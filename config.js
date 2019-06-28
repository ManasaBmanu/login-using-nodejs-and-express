const mysql=require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'manasa'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //insert
  var sql = "select * from users";
    //delet
   // var sql = "DELETE FROM users WHERE email = 'sakshi@gmail.com'";  
   //update
   //var sql = "UPDATE users SET email = 'manasabl@gmail.com' WHERE email = 'manasakb@yahoo.com'";
 connection.query(sql, function (err, result) {
     if (err) throw err;
     // console.log(result);
    });
  });

  module.exports = connection;