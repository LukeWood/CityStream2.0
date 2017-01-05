Vue.component("navitem",{
  template:`
    <a href="#" style="margin:10px; color:black" v-on:mouseover="mouseOver" >{{message}}</a>
  `,
  props:["message"],
  methods: {
        mouseOver: function(){
            alert("This event is triggering because I am a vue component");
        }
  }
});

new Vue({
  el:"#navbar",
  data:{
    items:["home","not home","fuck yeah components are working"]
  }
});


$(document).ready(function() {
    $("#cf2").click(function() {
    $("#cf2 img.top").toggleClass("transparent");
  });
});
