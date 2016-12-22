var graph = require("../graph.js");
var config = require("../../config.json");

//initialize graph, load information created from python script.
var g = new graph();

var information = require("../../database/graphdata/dump.json");

for(var key in information){
  if(!information.hasOwnProperty(key))
    continue;

  for(let i = 0; i < information[key].length; i++){
    g.addUniEdge(key,information[key][i]);
    for(let j = i+1; j < information[key].length; j++){
      g.addUniEdge(information[key][i],information[key][j]);
    }
  }

}

console.log(g);
