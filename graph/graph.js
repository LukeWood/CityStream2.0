var fs = require("fs");

function node(val,type){
	this.val = val;
	this.type = type;
	this.children = [];
}

function graph(){

	var visited = Object.create(null);

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

	function addUniEdge(a,b){
		addEdge(a,b);
		addEdge(b,a);
	}

	function getTraversal(){

		var xpstack = this.default_xps.slice();
		var tagstack = this.default_tags.slice();

		function clicked(val){
			if(!(val in nodes))
				return false;

			var c = nodes[val].children;
			for(let i = 0; i < c.length; i++){
				if(nodes[c[i]].type =="xp"){
					xpstack.push(c[i]);
				}
				else{
					tagstack.push(c[i]);
				}
				visited[c[i].val] = true;
			}

			return true;
		}

		function nxp(){
			if(xpstack.length == 0){
				xpstack = this.default_xps.slice();
			}
			return xpstack.pop();
		}

		function nxt(){
			if(tagstack.length == 0){
				tagstack = this.default_tags.slice();
				visited = Object.create(null);
				console.log("resetting tagstack");
			}
			var p = tagstack.pop();
			if(p in visited){
				return nxt.call(this);
			}
			visited[p] = true;
			return p;
		}

		return {
			clicked:clicked,
			nextXP:nxp.bind(this),
			nextTag:nxt.bind(this)
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
	this.addUniEdge = addUniEdge.bind(this);
}

module.exports = graph;
