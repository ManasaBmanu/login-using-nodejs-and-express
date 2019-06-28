var connection=require('./config');

module.exports.details=function(req,res){
    var sql="select * from users";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
}