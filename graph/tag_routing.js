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
  ensure_traversal(req.session.id);
  var tag = traversals[req.session.id].nextTag();
  res.send(JSON.stringify({
      url:null,
      tagname:tag
  }));
}

function next_xp(req,res){
  ensure_traversal(req.session.id);
  var xp = traversals[req.session.id].nextXP();
  res.send(JSON.stringify({
      url:null,
      name:xp
  }));
}

function clicked(req,res){

}

module.exports = {
  next_tag:next_tag,
  next_xp:next_xp,
  clicked:clicked
};
