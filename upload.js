var multer  = require('multer');
const app =require('./index');

upload=function(req,res){
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var ext = require('path').extname(file.originalname);
            ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
            require('crypto').pseudoRandomBytes(16, function (err, raw) {
                cb(null, (err ? undefined : raw.toString('hex') ) + ext);
            });
        }
     });

     var upload = multer({ storage: storage });
     console.log(storage);
    res.sendFile( __dirname + "/" + "uploaded.html" );  
    upload.any();
 //var upload = multer({ storage: storage });

}

