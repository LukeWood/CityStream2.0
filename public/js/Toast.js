!function(t){"use strict";function e(t,e,n){function s(t,e){console.error("Toast Error: "+t+" in function '"+e+"'")}function a(t,e){var n=new XMLHttpRequest;return"undefined"!=typeof XDomainRequest&&(n=new XDomainRequest),n.open(t,e,!0),n}function o(t){var e="?";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e.slice(0,-1)}function r(){if(0==arguments.length)return void(this.debug&&s("No arguments passed.","parseArgs"));var t=arguments.length>=1?arguments[0]:null,e=arguments.length>=2?arguments[1]:null,n=arguments.length>=3?arguments[2]:null,a=arguments.length>=4?arguments[3]:null;return"object"==typeof arguments[0]?(this.debug&&console.log("Argument 0 is an object, arguments are being parsed as an object"),arguments[0].hasOwnProperty("callback")&&(e=arguments[0].callback),arguments[0].hasOwnProperty("fail")&&(n=arguments[0].fail),arguments[0].hasOwnProperty("url")&&(t=arguments[0].url),arguments[0].hasOwnProperty("params")&&(a=arguments[0].params)):this.debug&&console.log("Arguments are being passed in comma separated format."),"string"==typeof e&&(e=new Function("data",e)),"string"==typeof n&&(n=new Function("data",e)),"object"!=typeof a&&(a=null,this.debug&&s("params were not passed as an object","parseArgs")),{url:t,callback:e,fail:n,params:a}}function i(){function t(){4===c.readyState&&(200===c.status?null!=i&&"function"==typeof i&&i(c.responseText):null!=l&&"function"==typeof l?l(c.statusText):s("Request to "+n+" has failed ","get"))}var e=r.apply(this,arguments),n=e.url,i=e.callback,l=e.fail,u=e.params,c=this.crossOrigin?a("GET",n+o(u)):new XMLHttpRequest;this.crossOrigin||c.open("GET",n+o(u)),c.onreadystatechange=t,c.send()}function l(){var t=r.apply(this,arguments),e=t.url,n=t.callback,a=t.fail,l=t.params,u=this;i.call(this,e+o(l),function(t){try{var o=JSON.parse(t);n(o)}catch(t){a(t.message),u.debug&&(s("JSON could not be parsed for url '"+e+"'","json"),console.error(t.message))}},a)}function u(){function t(){4===u.readyState&&(200===u.status?null!=o&&"function"==typeof o&&o(u.responseText):null!=i&&"function"==typeof i?i(u.statusText):s("Request to "+n+" has failed ","get"))}var e=r.apply(this,arguments),n=e.url,o=e.callback,i=e.fail,l=null!=e.params?JSON.stringify(e.params):null;"string"==typeof o&&(o=new Function("data",o)),"string"==typeof i&&(i=new Function("data",o));var u=this.crossOrigin?a("POST",n):new XMLHttpRequest;this.crossOrigin||u.open("POST",n),u.onreadystatechange=t,null!=e&&(u.setRequestHeader("Content-type","application/json; charset=utf-8"),u.setRequestHeader("Content-length",l.length),u.setRequestHeader("Connection","close"),u.send(l))}return this.crossOrigin=!1,this.debug=!1,window.XMLHttpRequest?(this[t]=i.bind(this),this[e]=l.bind(this),void(this[n]=u.bind(this))):void console.error("Toast needs XMLHttpRequest to work")}null==t||""===t?e.call(window,"get","getJSON","post"):window[t]=new e("get","getJSON","post")}("Toast");