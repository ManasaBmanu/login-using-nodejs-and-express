var Cryptr = require('cryptr'); 
 cryptr = new Cryptr('myTotalySecretKey');
 const session = require('express-session');
var connection = require('./config');



module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
 var CryptoJS = require("crypto-js");
 var bcrypt = require('bcryptjs');
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
   console.log(password);
            if(bcrypt.compareSync(password, results[0].password)){
             // sess = req.session;
              //console.log(sess);
            // check=req.sessionID;
             connection.query('UPDATE users SET sessionID=? WHERE id=?',[req.sessionID,results[0].id],function(error,results,fields)
             {
               if(error)
               res.json({
                 status:false,
                 message:'error in entering the sessionID'
               })
             })
             var idex;
             global.idex=results[0].id;
              //module.exports=idex;
              console.log(idex);
              res.sendFile( __dirname + "/" + "welcome_page.html" );
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
