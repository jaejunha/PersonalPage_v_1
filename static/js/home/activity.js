$(document).ready( function() {
	$(".feed").css('width',$('.calendar').width());
	$('#main').css('width',$(window).width()-200);

	var d = new Date();	
	$(".exercise").css('width',$('.calendar').width());
	$(".exercise_desc").css('width',$('.calendar').width()-16);

	loadActivity(d);
	
	if(window.Worker){
		var w = new Worker("/static/js/home/worker_activity.js");
        	w.onmessage = function(event) {
        		loadActivity(d);
        	};
		w.postMessage("Hello");
	}		
});

$(document).resize( function() {
	$('#main').css('width',$(window).width()-200);

	$(".exercise_desc").css('width',$('.calendar').width()-16);
});

function loadActivity(d){
	GitHubCalendar(".calendar", "jaejunha");
	GitHubActivity.feed({ username: 'jaejunha', selector: '.feed' });

	$(".exercise").load('home/calendar?year='+d.getFullYear()+'&month='+d.getMonth());
}