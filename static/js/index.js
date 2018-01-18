var home = 1;
$(document).ready( function() {
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if(isMobile)
		location.href='mobile';
		switch_menu('home');
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
});
function switch_menu(to){
	$('header a').css('color','#555555');
	if(to=='home'){
		$('#content').load('home/frame');
		$('header a:nth-child(1)').css('color','#ffffff');
	}
	else if(to=='about'){
		$('#content').load('about/frame');
		$('header a:nth-child(2)').css('color','#ffffff');
	}
	else if(to=='portfolio'){
		$('#content').load('portfolio/frame');
		$('header a:nth-child(3)').css('color','#ffffff');
	}
}
