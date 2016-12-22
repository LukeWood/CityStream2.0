const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const tag_routing = require("./graph/tag_routing.js");
const gen_uid = require("./util/gen_uid.js");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/getEvents", require("./routes/getEvents.js"));
app.get("/next_xp",tag_routing.next_xp);
app.get("/next_tag",tag_routing.next_tag);
app.post("/clicked",tag_routing.clicked);

app.use(express.static("public"));

app.listen(8000);
