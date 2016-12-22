//forcing
var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 256,
	'tolerance': 70
});

// Toggle button
document.querySelector('.toggle-button').addEventListener('click', function() {
	slideout.toggle();
});

Vue.component("square",{
	props: ["event"],
	template:
	`
 		<div v-bind:id=event.id v-bind:style=event.outerstyle>
			<div  v-bind:style=event.styleObject v-bind:class=event.classObject style='border-radius:10%;'>
				<img v-bind:src=event.image style='width:100%; height:70%; margin-bottom:3px; display: block; margin-left: auto; margin-right: auto' data-toggle="modal" data-target="#myModal"></img>
				<center style=' color: #fff; bottom:1%; width:90%; margin-left:10px;font-size:14px; font-family:Raleway'>
						<div style='font-size: 15px; font-family:Raleway-Bold '> {{event.title}} </div>
						<a style='font-size: 12px; color: #fff; ' href='/templates/Spot-Profile.html'> {{event.venue}}		</a>
						<div style=' font-size: 10px;'>   {{event.description}}		</div>
			 </center>
			 <center style= 'display: block; margin-top:6px;'>
				 <div style = 'float:left; width:33.33%'>
							 <img src="img/icons/friends-placeholder.png">
				 </div>
				 <div style = 'float:left; ; width:33.33%'>
							 <img src="img/icons/time-placeholder.png">
				 </div>
				 <div style = 'float:left; ; width:33.33%'>
						 <div style='float: right; margin-right:20px;  height: 10px; '>
							 <p style="color:#fff; font-size:14px; margin-top:5px;"> $$$ </p>"
						 </div>
				 </div>
			 </center>

			 <!-- Modal -->
				 <div class="modal fade" id="myModal" role="dialog">
					 <div class="modal-dialog">
			 <!-- Modal content-->
						 <div class="modal-content">
							 <div class="modal-header">
								 <button type="button" class="close" data-dismiss="modal">&times;</button>
								 <h4 class="modal-title" style="color: #000;"> Business </h4>
							 </div>
						 <div class="modal-body">
							  <iframe width="100%" height="50%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDR5_3La87OA7oNMVGXJu_8-s08RTdJm2Y&q=Banditos,Dallas+TX" allowfullscreen></iframe>

						 <div id="btns-container" style="margin-top:20px;">
						 <table style="width:100%">
						 		<tr>
									<td width="100%" align="center">
									<img src=../img/uber-ride-request-btn.png width="230px">
									</td>
								</tr>
							</table>
							<table style="width:100%">
								<tr>
										<td width="33.33%" style="border-right: 0px solid #b2b2b2;" align="right">
												<a class="btn btn-primary btn-sm" style="margin:5px; background-color:#0dfaf2; color: #656565; border-color: #fff" href="tel:1-602-999-0056"> <i class="ion-ios-telephone"></i> Call </a>
										</td>
										<td width="33.33%" style="border-right: 0px solid #b2b2b2;" align="center">
												<a class="btn btn-primary btn-sm" style="margin:5px; background-color:#0dfaf2; color: #656565; border-color: #fff" href="www.banditostexmex.com"> <i class="ion-log-out"> Website </a>
										</td>
										<td width="33.33%" align="left">
												<a class="btn btn-primary btn-sm" style="margin:5px; background-color:#0dfaf2; color: #656565; border-color: #fff" href="website" ><i class="ion-pricetags"> Offer </a>
										</td>
							  </tr>
							</table>
						 </div>
				 </div>
				 <div class="modal-footer">
					 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				 </div>
			 </div>


			</div>
		</div>
	`
});

Vue.component("moodtag",{
	props: ["mood"],
	template:
	`
			<li v-bind:id="mood.txt">{{mood.txt}}</li>
	`
});



var timestamp = 0;
var feed1 = new Vue({
	el:"#grid-container",
	data: {
		events: []
	},
	methods:{
					add_mood:function(tag){
						var evts = this.events;
						for(var i = 0; i < evts.length; i++){
							var evt = evts[i];
							for(var j = 0; j < evt.tags.length; j++){
								if(evt.tags[j] === tag){
									evt.score++;
								}
							}
						}
						this.events = evts;
					},
					remove_mood:function(tag){
						var evts = this.events;
						for(var i = 0; i < evts.length; i++){
							var evt = evts[i];
							for(var j = 0; j < evt.tags.length; j++){
								if(evt.tags[j] === tag){
									evt.score = evt.score-1;
								}
							}
						}
						this.events = evts;
					}
	},
	computed: {
    // a computed getter
    sorted: function () {
      // `this` points to the vm instance\
			if(this.events.length){
				var score = this.events[0].score;
				var different = false;
				for(var i = 0; i < this.events.length; i++){
						if(this.events[i].score != score){
								different = true;
								break;
						}
				}
				if(!different){
						return _.shuffle(this.events);
				}
	      return this.events.sort(function(x,y){return x.score < y.score});
			}
			return [];
    }
  }
});

var current_moods = {};

function toggle_mood(mood){
	if(current_moods.hasOwnProperty(mood) && current_moods[mood]){
			feed1.remove_mood(mood);
			current_moods[mood] = false;
	}
	else{
		current_moods[mood] = true;
		feed1.add_mood(mood);
	}
	console.log(current_moods);
}

var colorIndex = 0;
function randomColor(){
		var colors = ["#02adf9"];

		return colors[colorIndex++ % colors.length];
}

var j = 0;
$.getJSON("/getEvents",function(data){
	data.forEach(function(event){
		j++;
		feed1.events.push(
			{
					outerstyle:{
						display:"inline-block",
						margin:"10px"
					},
					styleObject:{
						width:"350px",
						height:"360px",
						backgroundColor:randomColor(),
						display:"inline-block",
						overflow:"hidden"
					},
					image:event.image,
					title:event.title,
					score:0,
					id:j,
					venue: event.venue,
					tags:event.tags,
					description: event.bio
			}
		);
	});
});
