const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var getEvents = require("./routes/getEvents.js");

app.get("/getEvents", getEvents);

app.use(express.static("public"));

app.listen(8000);
