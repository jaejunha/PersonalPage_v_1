var home = 1;
$(document).ready( function() {
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if(isMobile)
		location.href='mobile';
		switchMenu('home');
		var bar = new ProgressBar.Circle(container, {
			strokeWidth: 6,
  			easing: 'easeInOut',
  			duration: 1000,
  			color: '#FFFFFF',
			trailColor: '#555',
			trailWidth: 2,
  			svgStyle: null
		});
		
		bar.animate(1.0);
		setTimeout(function(){$("#screen").remove();}, 1500);

		var int_menuWidth = $(window).width()-10; 
		$('header').css('width',int_menuWidth);
});
function switchMenu(to){

	$('#content').css('opacity','0');

	if(to=='home'){
		$('#content').load('home/frame');
	}
	else if(to=='about'){
		$('#content').load('about/frame');
	}
	else if(to=='portfolio'){
		$('#content').load('portfolio/frame');
	}
	else if(to=='reference'){
		$('#content').load('reference/frame');
	}
}
