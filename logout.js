const express=require('express');
const path=require('path');


module.exports.logout=function(req,res)
{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        console.log("done");
        res.sendFile(__dirname + "/" + "done.html" );
    });
   
}