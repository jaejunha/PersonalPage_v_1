var home = 1;
var string_subMenu;
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

		var int_menuWidth = $(window).width()-20; 
		$('header').css('width',int_menuWidth);
		for(var i=1;i<=7;i++)
			$('.li_outerMenu:nth-of-type('+i+')').css('width',$('.li_outerMenu:nth-of-type('+i+')').width()+85);
		
});
function switchMenu(to,sub){

	string_subMenu = '';
	$('#content').css('opacity','0');

	if(to=='home'){
		$('#content').load('home/frame');
	}
	else if(to=='about'){
		$('#content').load('about/frame');
	}
	else if(to=='portfolio'){
		string_subMenu = 'program';		
		if(sub)
			string_subMenu = sub;
		$('#content').load('portfolio/frame');
	}
	else if(to=='reference'){
		$('#content').load('reference/frame');
	}

	if(to!='home'){
		home--;
	}
}
