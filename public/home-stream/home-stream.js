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
			<div  v-bind:style=event.styleObject v-bind:class=event.classObject style='border-radius:8%;'>
			<div style='position: relative'>
				<img v-bind:src=event.image style='width:100%; height:70%; margin-bottom:3px; display: block; margin-left: auto; margin-right: auto' data-toggle="modal" data-target="#myModal"></img>
				<div style='position:absolute; bottom:5px; right:10px; color: #fff; '>
					 <i class="ion-plus-circled"></i>
				</div>
				<div style='position:absolute; bottom:5px; left:10px; color: #fff; '>
					 <i class="ion-thumbsup"></i> 304 likes
				</div>
				<div style='position:absolute; top:10px; right:15px; color: #fff; opacity: 0.7; '>
					XP
				</div>
			</div>

				<center style=' color: #fff; bottom:1%; width:90%; margin-left:10px;font-size:14px; font-family:Raleway'>
						<div style='font-size: 15px; font-family:Raleway-Bold '> {{event.title}} </div>
						<a style='font-size: 12px; color: #fff; ' href='/business-profile/business-profile.html'> {{event.venue}}		</a>
						<div style=' font-size: 10px; font-size: 10px; max-height: 30px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;'>   {{event.description}}		</div>
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
							 <p style="color:#fff; font-size:14px; margin-top:5px;"> $$$ </p>
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
								 <h4 class="modal-title" style="color: #000;"> {{event.title}} </h4>
							 </div>
						 <div class="modal-body">
							  <iframe width="100%" height="300px;" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDR5_3La87OA7oNMVGXJu_8-s08RTdJm2Y&q=Banditos,Dallas+TX" allowfullscreen></iframe>

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
		<div style="cursor:pointer;" v-bind:id="mood" class="moodtag" v-on:click="handleClicks(mood)">
			<div class="moodtag-icon" >
					<img v-if="imageExists(computeFPath(mood))" v-bind:src="computeFPath(mood)" width="18px" height="18px"/>
					<img v-else src="img/moodtags/default2.png" width="18px" height="18px"/>

			</div>
			<div class="moodtag-label">
				{{mood? mood.split("_").join(" "):""}}
			</div>
		</div>
		`,
	methods:{
		computeFPath(mood){
			return "img/moodtags/"+mood+".png";
		},
		handleClicks(mood){
			var http = new XMLHttpRequest();
			var url = "/clicked";
			var params = "val="+mood;
			http.open("POST", url, true);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
						add_five_xps();
						next_tag();
			    }
			}
			http.send(params);
		},
		imageExists(image_url){

	    var http = new XMLHttpRequest();

	    http.open('HEAD', image_url, false);
	    http.send();

	    return http.status != 404;

	}

	}
});

var mtags = new Vue({
	el:"#moods",
	data:{
		moods:[]
	}
})

function delete_from_tags(mood){
	var index = mtags.moods.indexOf(mood);
	if (index > -1) {
			var cp = mtags.moods.slice();
	   	cp.splice(index, 1);
			mtags.moods = cp;
	}
}

for(var i = 0; i < 15; i++){
	$.getJSON("/next_tag",function(tag){
		mtags.moods.push(tag.tagname);
	});
}

var timestamp = 0;
var feed1 = new Vue({
	el:"#grid-container",
	data: {
		events: []
	},
	methods: {
	 shuffle: function () {
		 this.events = _.shuffle(this.events)
	 }
 }
});


var colorIndex = 0;
function randomColor(){
		var colors = ["#02adf9"];

		return colors[colorIndex++ % colors.length];
}

for(var j = 0; j < 50; j++){
	$.getJSON("/next_xp",function(event){
		feed1.events.push({
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
			image:event.Image,
			title:event.Title,
			id:j,
			venue:event.Venue,
			tag:event.Tags,
			description:event.Description
		});
});
}

function next_tag(){
	mtags.moods = [];

	for(var i = 0; i < 15; i++){
		$.getJSON("/next_tag",function(tag){
			mtags.moods.push(tag.tagname);
		});
	}
}


function add_five_xps(){
	var temp = [];
	(function cb(i){
			$.getJSON("/next_xp",function(event){
				temp.push({
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
					image:event.Image,
					title:event.Title,
					id:j,
					venue:event.Venue,
					tag:event.Tags,
					description:event.Description
				});
				if(i == 5){
					while(temp.length != 0 ){
						feed1.events.unshift(temp.pop());
						feed1.events.pop();
					}
				}
				else{
					cb(i+1);
				}
			});
	})(0);
}
