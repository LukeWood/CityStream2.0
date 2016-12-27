var graph = require("../graph.js");
var config = require("../../config.json");
var heap = require("heap");

//initialize graph, load information created from python script.
var g = new graph();

var information = require("../../database/graphdata/dump.json");


var counts = Object.create(null);

for(var key in information){
  if(!information.hasOwnProperty(key))
    continue;

  if(key in counts)
    counts[key]++;
  else
    counts[key] = 0;

  for(let i = 0; i < information[key].length; i++){
    g.addUniEdge({val:key,type:"tag"},{val:information[key][i],type:"xp"});
    g.default_xps.push(information[key][i]);
    for(let j = i+1; j < information[key].length; j++){
      g.addUniEdge({val:information[key][i],type:"xp"},{val:information[key][j],type:"xp"});
    }
  }
}

var h = new heap(function(a,b){return counts[b]-counts[a];});

for(key in counts){
  if(h.size() < 25){
    h.push(key);
    continue;
  }
  if(counts[key] > counts[h.peek()])
  {
    h.pushpop(key);
  }
}

while(!h.empty()){
  g.default_tags.push(h.peek());
  h.pop();
}

g.serialize("../states/current.json");
