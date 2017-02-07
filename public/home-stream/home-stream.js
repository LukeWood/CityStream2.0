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
var searcher = document.getElementById("searcher");

Vue.component("square",{
	props: ["event"],
	template:
	`
 		<div v-bind:id=event.id v-bind:style=event.outerstyle>
			<div  v-bind:style=event.styleObject v-bind:class=event.classObject style='border-radius:8%;'>
			<div style='position: relative'>
				<img v-bind:src=event.image style='width:100%; height:70%; margin-bottom:3px; display: block; margin-left: auto; margin-right: auto' data-toggle="modal" data-target="#myModal"></img>
				<div style='position:absolute; bottom:5px; right:10px; color: #fff; cursor: pointer;  opacity: 0.9; font-size: 16px;'>
					 <i class="ion-plus-circled"></i>
				</div>
				<div style='position:absolute; bottom:5px; left:10px; color: #fff; cursor: pointer;  opacity: 0.9; font-size: 12px; '>
					 <i class="ion-thumbsup"></i> 304 likes
				</div>
				<div style='position:absolute; top:10px; right:15px; color: #fff; opacity: 0.75; '>
					XP
				</div>
			</div>

				<center style=' color: #fff; bottom:1%; width:90%; margin-left:10px;font-size:14px; font-family:Raleway'>
						<div style='font-size: 15px; font-family:Raleway-Bold '> {{event.title}} </div>
						<a style='font-size: 12px; color: #fff; ' href='/business-profile/'> {{event.venue}}		</a>
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
									<td width="100%" align="center" style="display: block;" >
									<img src=../img/uber-ride-request-btn.png width="230px">
									<img src=../img/ticketmaster-btn.jpeg width="180px" height="43px">
									</td>
								</tr>
							</table>
							<table style="width:100%">
								<tr>
										<td width="33.33%" style="border-right: 0px solid #656565;" align="right">
												<a class="btn btn-primary " style="margin:5px; background-color:#000; color: #fff; border-radius: 15%; " href="tel:1-602-999-0056"> <i class="ion-ios-telephone"></i> Call </a>
										</td>
										<td width="33.33%" style="border-right: 0px solid #656565;" align="center">
												<a class="btn btn-primary " style="margin:5px; background-color:#000; color: #fff; border-radius: 15%;" href="www.banditostexmex.com"> <i class="ion-log-out"> Website </a>
										</td>
										<td width="33.33%" align="left">
												<a class="btn btn-primary" style="margin:5px; background-color:#000; color: #fff; border-radius: 15%;" href="website" ><i class="ion-pricetags"> Offer </a>
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

var active_mtags = new Vue({
	el:"#active_moods",
	data:{
		moods:[]
	}
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

			http.onreadystatechange = function(res) {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
						get_xps();;

						refresh_tags();
						if(active_mtags.moods.slice(-3).indexOf(mood) == -1)
							active_mtags.moods.push(mood);
						active_mtags.moods=active_mtags.moods.slice(-3);
			    }
			}
			searcher.value = "";
			searcher_cb();
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


var old_tags = null;
function searcher_cb(e){
  if(searcher.value.length == 0){
		if(old_tags != null){
			mtags.moods = old_tags;
			old_tags=null;
		}
  }
	else{
		if(old_tags == null){
			old_tags = mtags.moods.slice();
		}
		Toast.getJSON("/search?search="+searcher.value.toLowerCase(),"mtags.moods = data.slice()");
	}
}

searcher.addEventListener("keyup",searcher_cb);


function delete_from_tags(mood){
	var index = mtags.moods.indexOf(mood);
	if (index > -1) {
			var cp = mtags.moods.slice();
	   	cp.splice(index, 1);
			mtags.moods = cp;
	}
}

Toast.getJSON("/next_tag",function(tags){
	mtags.moods = tags.reverse();
});

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

Toast.getJSON("/next_xp",function(events){
		for(var j = 0; j < events.length; j++){
			var event = events[j];
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
		}
	});


function refresh_tags(){
	Toast.getJSON("/next_tag",function(tags){
		mtags.moods = tags;
	});
}


function get_xps(){
			$.getJSON("/next_xp",function(events){
				for(var j = events.length-1; j >=0; j--){
					var event = events[j];
					feed1.events.unshift({
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
					feed1.events.pop();
				}
			});
}
