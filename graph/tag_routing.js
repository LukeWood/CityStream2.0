const traverals = Object.create(null);
const config = require("../config.json");
const loadGraph = require("./loadGraph.js");
var g = loadGraph(config.graph_path);

function next_tag(req,res){
  var id = req.session.id;
  if(!(id in traverals)){
    traverals[id] = g.get_traversal();
  }
}

function next_xp(req,res){

}

function clicked(req,res){

}

module.exports = {
  next_tag:next_tag,
  next_xp:next_xp,
  clicked:clicked
};
