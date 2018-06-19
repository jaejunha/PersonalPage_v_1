var home = 1;
var string_subMenu;
var mixer_star, mixer_bird;
var bool_animate = false;

$(document).ready( function() {
	checkMobile();
	showIntro();
	resizeHeader();
	resizeLoadingCircle();
});

$(window).resize(function() {
	resizeHeader();
});

function checkMobile(){
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if(isMobile)
		location.href='mobile';
}

function showIntro(){
	switchMenu('home');
	var bar = new ProgressBar.Circle(div_container, {
		strokeWidth: 6,
  		easing: 'easeInOut',
  		duration: 1000,
  		color: '#FFFFFF',
		trailColor: '#555',
		trailWidth: 2,
  		svgStyle: null
	});
		
	bar.animate(1.0);
	setTimeout(function(){$("#div_screen").remove();}, 1500);
}

function resizeHeader(){
	var int_menuWidth = $(window).width()-20;
	var int_contentWidth = (int_menuWidth - 100) / 7;
	var int_outerFontSize = $(window).width() * 0.009 + 1;
	var int_innerFontSize = $(window).width() * 0.007 + 1;

	$('header').css('width',int_menuWidth);
	$('.li_outerMenu').css('font-size', int_outerFontSize+'pt');
	$('.li_innerMenu').css('font-size', int_innerFontSize+'pt');
	for(var i=1;i<=7;i++){
		$('.li_outerMenu:nth-of-type('+i+')').css('width', int_contentWidth);
	}
}

function switchMenu(to,sub){
	if(home!=1){
		bool_animate = false;
		mixer_star = mixer_bird = undefined;
	}
	string_subMenu = '';
	$('.span_loading').css('display','block');
	$('#div_content').css('opacity','0');

	if(to=='home'){
		string_subMenu='home';
		if(sub)
			string_subMenu = sub;
		$('#div_content').load('home/frame');
	}
	else if(to=='about'){
		string_subMenu='about';
		$('#div_content').load('about/frame');
	}
	else if(to=='portfolio'){
		string_subMenu = 'program';		
		if(sub)
			string_subMenu = sub;
		$('#div_content').load('portfolio/frame');
	}
	else if(to=='reference'){
		$('#div_content').load('reference/frame');
	}

	if(to!='home'){
		home--;
	}
}

function resizeLoadingCircle(){
	var div_loading = $('#div_loading');
	var int_width = $(window).width();
	var int_height = $(window).height();
	var int_radius = Math.max(int_width, int_height) / 5;
	div_loading.css('width', int_radius);
	div_loading.css('height', int_radius);
	div_loading.css('left', (int_width - int_radius)/2);
	div_loading.css('top', (int_height - int_radius)/2);        
}