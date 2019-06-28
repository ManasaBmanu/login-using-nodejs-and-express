var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./config');
//var cryptr = new Cryptr('myTotalySecretKey');
var CryptoJS = require("crypto-js");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
 
module.exports.register=function(req,res){
//  var encryptedString = window.btoa(req.body.password);
//var encryptedString = CryptoJS.AES.encrypt(req.body.password, 'myTotalySecretKey').toString();
var encryptedString = bcrypt.hashSync(req.body.password, salt);
//var encryptedString = bytes.toString(CryptoJS.enc.Utf8);
 console.log('enc',encryptedString);
    var users={
        "id":req.body.id,
        "Title":req.body.Title,
        "username":req.body.username,
        "email":req.body.email,
        "password":encryptedString,
    }
    var blog={
       "contact_phone_number":req.body.contact_phone_number,
       "user_id":req.body.id
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
        connection.query('INSERT INTO blog SET ?',blog, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
          }else{
            res.sendFile( __dirname + "/" + "login.html" );
          }
        })
      }
    });
}
