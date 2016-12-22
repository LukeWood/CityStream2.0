const crypto = require('crypto');

var taken = Object.create(null);

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    var sval = sha.digest('hex');
    if(sval in taken){
      return generate_key();
    }
    else {
      return sval;
    }
};

module.exports = generate_key;
