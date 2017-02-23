const traversals = Object.create(null);
const config = require("../config.json");
const loadGraph = require("./loadGraph.js");
const getExperience = require("../database/getExperience.js");

var g = loadGraph(config.graph_path);

function ensure_traversal(id){
  if(!(id in traversals)){
    traversals[id] = g.getTraversal();
  }
}

function next_tag(req,res){
  ensure_traversal(req.sessionID);


  var traversal = traversals[req.sessionID];

  var result = [];
  for(var i = 0; i < 25; i++){
    result.push(traversal.nextTag());
  }
  res.send(JSON.stringify(result));
}

function next_xp(req,res){
  ensure_traversal(req.sessionID);

  var traversal = traversals[req.sessionID];

  var items = new Array(25);
  for(var i = 0; i < 25; i++){items[i] = traversal.nextXP();}
  res.send(JSON.stringify(items.map(getExperience)));
}

function clicked(req,res){
  if(req == null)
    return;
  var val = req.body.val;
  ensure_traversal(req.sessionID);
  traversals[req.sessionID].clicked(val);
  res.send(JSON.stringify({"error":false}));
}

module.exports = {
  next_tag:next_tag,
  next_xp:next_xp,
  clicked:clicked
};
