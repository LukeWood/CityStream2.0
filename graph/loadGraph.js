const graph = require("./graph.js");
const fs = require("fs");
function deserialize(fname){
  var data = JSON.parse(fs.readFileSync(fname, 'utf8'));

  var to_ret = new graph();
  for(var i in data.nodes){
    if(data.nodes.hasOwnProperty(i)){
      for(let j = 0; j < data.nodes[i].children.length; j++){
        to_ret.addEdge(data.nodes[i].val,data.nodes[i].children[j]);
      }
    }
  }
  to_ret.default_xps = data.default_xps;
  to_ret.default_tags = data.default_tags;
  return to_ret;
}

module.exports = deserialize;
