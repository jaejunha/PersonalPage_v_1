$(document).ready( function() {
        GitHubCalendar(".calendar", "jaejunha");
	$(".feed").css('width',$('.calendar').width());
	GitHubActivity.feed({ username: 'jaejunha', selector: '.feed' });
	$('#main').css('width',$(window).width()-200);

	var d = new Date();	
	$(".exercise").css('width',$('.calendar').width());	
	$(".exercise").load('home/calendar?year='+d.getFullYear()+'&month='+d.getMonth());	
	$(".exercise_desc").css('width',$('.calendar').width()-16);	
});
$(document).resize( function() {
	$('#main').css('width',$(window).width()-200);

	$(".exercise_desc").css('width',$('.calendar').width()-16);
});