//select the information from mongodb

var db = require("./raw/tempdb.json");

function getxp(id){
  return db[parseInt(id)-1];
}

module.exports = getxp;
