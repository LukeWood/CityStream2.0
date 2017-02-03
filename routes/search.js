

function node(){
  var children = Object.create(null);
  var isWord = false;

  function search(word,prefix,result){

    if(word.length == 0){
      if(isWord){
        result.push(prefix);
      }
    }
    else{
      if(word[0] in children){
        children[word[0]].search(word.slice(1),prefix+word[0],result);
      }

      if(isWord)
        result.push(prefix);
      return;
    }


    for(var c in children){
      if(result.length > 10)
        return;
      if(word.length == 0 || word[0] != c)
        children[c].search(word.slice(1),prefix+c,result);
    }

  }

  function insert(word){
    if(word.length == 0){
      isWord = true;
    }
    else{
      if(!(word[0] in children)){children[word[0]] = new node();}
      children[word[0]].insert(word.slice(1));
    }
  }

  this.insert = insert.bind(this);
  this.search = search.bind(this);
}

var base = new node();

function _insert(word){
  base.insert(word);
}

function _search(query){
  var result = [];
  base.search(query,"",result);
  return result;
}

// initialization
var all_tags = require("../graph/states/tag_stack_mapping.json");
for(var i  in all_tags){
  if(Object.prototype.hasOwnProperty.call(all_tags,i)){
    base.insert(i.replace(" ","_"));
  }
}

function get(req,res,next){
  if(req.query.search == null){
    res,send(JSON.stringify([]))
    return;
  }
  res.send(JSON.stringify(_search(req.query.search.replace(" ","_"))))
  return;
}

module.exports = {
  search:_search,
  insert:_insert,
  get:get
};
