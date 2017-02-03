var search = require("./search.js");
var insert = search.insert;
search = search.search;

insert("Hello");
insert("Hell");
insert("Hellfuckingyeah");
insert("H");

console.log(search("H"));
