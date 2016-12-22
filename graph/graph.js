var fs = require("fs");

function node(val,type){
	this.val = val;
	this.type = type;
	this.children = [];
}

function graph(){

	var nodes = Object.create(null);
	this.default_tags = [];
	this.default_xps = [];

	function addEdge(a,b){
		if(!(a.val in nodes))
			nodes[a.val] = new node(a.val,a.type);
		if(!(b.val in nodes))
			nodes[b.val] = new node(b.val,b.type);

		nodes[a.val].children.push(b.val);
	}

	function getTraversal(){

		var xpstack = this.default_xps.slice();
		var tagstack = this.default_tags.slice();

		function clicked(val){
			if(!(val in nodes))
				return false;

			var c = nodes[val].children;
			for(let i = 0; i < c.length; i++){
				if(nodes[c[i]].type =="xp")
					xpstack.push(c[i]);
				else
					tagstack.push(c[i]);
			}

			return true;
		}

		function nxp(){
			if(xpstack.length == 0){
				// add random xps
				return "no more xps";
			}
			return xpstack.pop();
		}

		function nxt(){
			if(tagstack.length == 0){
				//add random tags
				return "no more tags";
			}
			return tagstack.pop();
		}

		return {
			clicked:clicked,
			nextXP:nxp,
			nextTag:nxt
		};

	}

	function serialize(fname){
		fs.writeFile(fname,JSON.stringify({
			nodes:nodes,
			default_xps:this.default_xps,
			default_tags:this.default_tags
		}),function(err){
			if(err){
				console.log("Error serializing graph to "+fname);
				return;
			}
			else{
				console.log("Successfully serialized graph to "+fname);
			}
		});
	}

	this.addEdge = addEdge.bind(this);
	this.getTraversal = getTraversal.bind(this);
	this.serialize = serialize.bind(this);
	this.addUniEdge = (function(a,b){this.addEdge(a,b);this.addEdge(b,a)}).bind(this);
}

module.exports = graph;
