var graph = require("../graph.js");
var config = require("../../config.json");

//initialize graph, load information created from python script.
var g = new graph();

var information = require("../../database/graphdata/dump.json");
this.default_tags = [];
this.default_xps = [];

for(var key in information){
  if(!information.hasOwnProperty(key))
    continue;

  for(let i = 0; i < information[key].length; i++){
    g.addUniEdge({val:key,type:"tag"},{val:information[key][i],type:"xp"});
    g.default_tags.push(key);
    g.default_xps.push(information[key][i]);
    for(let j = i+1; j < information[key].length; j++){
      g.addUniEdge({val:information[key][i],type:"xp"},{val:information[key][j],type:"xp"});
    }
  }

}

g.serialize("../states/current.json");
