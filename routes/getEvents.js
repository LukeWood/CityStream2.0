var fs = require("fs");

function route(req,res,next){
    //call data
    //get geographic
    fs.readFile("private/sample-db.json","utf8",function(err,contents){
        res.send(contents);
    });
}

module.exports = route;
