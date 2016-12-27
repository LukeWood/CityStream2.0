const traversals = Object.create(null);
const config = require("../config.json");
const loadGraph = require("./loadGraph.js");
const getExperience = require("../database/getExperience.js");

var g = loadGraph(config.graph_path);
function ensure_traversal(id){
  if(!(id in traversals)){
    console.log("adding to traversals");
    traversals[id] = g.getTraversal();
  }
}

function next_tag(req,res){
  ensure_traversal(req.sessionID);
  var tag = traversals[req.sessionID].nextTag();
  res.send(JSON.stringify({
      tagname:tag
  }));
}

function next_xp(req,res){
  ensure_traversal(req.sessionID);
  var xpid = traversals[req.sessionID].nextXP();
  res.send(JSON.stringify(getExperience(xpid)));
}

function clicked(req,res){
  var val = req.body.val;
  ensure_traversal(req.sessionID);

  traversals[req.sessionID].clicked(val);

  res.send(JSON.stringify({"error":false}));
  //push everything onto that person's traversal.
}

module.exports = {
  next_tag:next_tag,
  next_xp:next_xp,
  clicked:clicked
};
