
if(!Object.prototype.hasOwnProperty.call(window,"$")){
  addScript('/libs/jquery-3.1.1.js');
}
if(!Object.prototype.hasOwnProperty.call(window,"Vue")){
  addScript("/libs/vue.js");
}
if(!Object.prototype.hasOwnProperty.call(window,"_")){
  addScript("/libs/underscore.js");
}

function addScript(script_name){
  var tag = document.createElement("script");
  tag.type = "text/javascript";
  tag.async=false;
  tag.src=script_name;
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(tag);
}

function addComponent(component,div){
  function checkReady(){
     return (!Object.prototype.hasOwnProperty.call(window,"Vue") || !Object.prototype.hasOwnProperty.call(window,"$"));
  }

  if(checkReady()){
      setTimeout(function(){addComponent(component,div)},100);
      return;
  }

  $.ajax({
    url: "/"+component+"/"+component+".html",
    dataType: 'text',
    type: 'GET',
    async: true,
    statusCode: {
        404: function (response) {
            alert("DEBUG MESSAGE: ERROR LOADING COMPONENT");
        },
        200: function (response) {
            div.innerHTML = response;
            var scriptStr = "/"+component+"/"+component+".js";
            addScript(scriptStr);
        }
    },
    error: function (jqXHR, status, errorThrown) {
        alert('error');
    }
  });
}
