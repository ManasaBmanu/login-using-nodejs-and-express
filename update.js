var connection=require('./config');
//var details=require('./authenticate');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

//let detail=details.detail;
//var check=details[0];
//var idex=details[1];

module.exports.update=function(req,res){

    var encdString = bcrypt.hashSync(req.body.password, salt);
    var users={
        "Title":req.body.Title,
        "username":req.body.username,
        "email":req.body.email,
        "password":encdString
    }
    var blog={
        "contact_phone_number":req.body.contact_phone_number
     }
    console.log(idex);
    var check;
    connection.query('SELECT sessionID FROM users where id=?',idex,function(error,results,fields)
    {
        if(error){
            res.json({
             status:false,
             message:'error in retriveing the sessionId'
            })
        }
    else{
    check=results[0].sessionID;
    var idex=results[0].id;
    if(check==req.sessionID){
    connection.query('UPDATE users SET ? WHERE id = ? ',[users,idex],function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
              })
        }else{
            connection.query('UPDATE blog SET ? WHERE id = ? ',[blog,idex],function (error, results, fields) {
                if (error) {
                    res.json({
                      status:false,
                      message:'there are some error with query'
                      })
                }else{
                    res.sendFile( __dirname + "/" + "welcome_page.html" );  
                }
            })  
        }
    })}

else{
    res.json('There is some problem in updating..try angin');
}
    }
})
}
