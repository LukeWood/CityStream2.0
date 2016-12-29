const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const tag_routing = require("./graph/tag_routing.js");
const gen_uid = require("./util/gen_uid.js");
const path = require('path');


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/next_xp",tag_routing.next_xp);
app.get("/next_tag",tag_routing.next_tag);
app.get("/img_exist",function(req,res){
  if(req.query.fname == null){
    res.send(JSON.stringify({success:false}));
    return;
  }
  path.exists("public/"+req.query.fname, function(exists) {
    if (exists) {
      res.send(JSON.stringify({success:true}));
    }
    else{
      res.send(JSON.stringify({success:false}));
    }
  });
});

app.post("/clicked",tag_routing.clicked);

app.use(express.static("public"));

app.listen(8000);
