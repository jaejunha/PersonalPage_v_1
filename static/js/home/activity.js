var int_currentYear;
var int_currentMonth;

$(document).ready( function() {
	$(".feed").css('width',$('.calendar').width());
	$('#main').css('width',$(window).width()-200);

	$(".exercise").css('width',$('.calendar').width());
	$(".exercise_desc").css('width',$('.calendar').width()-16);

	var d = new Date();	
	int_currentYear = d.getFullYear();
	int_currentMonth = d.getMonth();
	loadActivity(int_currentYear, int_currentMonth);
	
	if(window.Worker){
		var w = new Worker("/static/js/home/worker_activity.js");
        	w.onmessage = function(event) {
			loadActivity(int_currentYear, int_currentMonth);
        	};
		w.postMessage("Hello");
	}		
});

$(document).resize( function() {
	$('#main').css('width',$(window).width()-200);

	$(".exercise_desc").css('width',$('.calendar').width()-16);
});

function loadActivity(year, month){
	GitHubCalendar(".calendar", "jaejunha");
	GitHubActivity.feed({ username: 'jaejunha', selector: '.feed' });

	$(".exercise").load('home/calendar?year='+year+'&month='+month);
}