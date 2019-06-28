const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
var connection = require('./config');
var multer  = require('multer');
var fs = require("fs");
const uuid = require('uuid/v4');

var routes = require('./uploadmysql');
var http = require('http');
var path = require('path');
var busboy = require("then-busboy");
var fileUpload = require('express-fileupload');

var app = express();
module.exports=app;

 
var authenticateController=require('./authenticate');
var registerController=require('./Register');
var logoutController=require('./logout');
var updateController=require('./update');
var uploadController=require('./routes/index');

//app.use(session({secret: 'manasa',saveUninitialized: true,resave: true}));

app.use(session({
  cookie:{
   maxAge:1000*6*6,//one houer
   sameSite:true,
   resave: false,
   saveUninitialized: true
  },
   secret: 'manasa',
   name:'checking'
   
 }))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/register.html', function (req, res) { 
   console.log(req.sessionID); 
   res.sendFile( __dirname + "/" + "Register.html" ); 
});  

app.get('/', function (req, res) { 
   console.log(req.sessionID); 
   res.sendFile( __dirname + "/" + "home.html" ); 
});  
  
app.get('/login.html', function (req, res) {  
   console.log(req.sessionID); 
    res.sendFile( __dirname + "/" + "login.html" );  
 });
 
 app.get('/welcome_page.html', function (req, res) {  
   console.log(req.sessionID); 
   res.sendFile( __dirname + "/" + "welcome_page.html" );  
});

app.get('/update_page.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "update_page.html" );  
});

app.get('/check.ejs', function (req, res) {  
   res.sendFile( __dirname + "/" + "check.ejs" );  
});



app.get('/upload.html', function(req,res){
   res.sendFile( __dirname + "/" + "upload.html" );
});
app.get('/profile/:id', function(req,res){
   res.sendFile( __dirname + "/" + "uploaded.html" ); 
});

/*
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "upload.html" );
})
*/
//app.post('/api/register',registerController.register);
//app.post('/api/authenticate',authenticateController.authenticate);

//var upload = multer({ storage: storage });

app.post('/Register', registerController.register);
app.post('/authenticate', authenticateController.authenticate);
app.post('/logout',logoutController.logout);
app.post('/update',updateController.update);
app.post('/routes/index',uploadController.index);
app.listen(5000);