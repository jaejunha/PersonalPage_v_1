var int_width;
var int_height;

var string_welcome = "Welcome To My Page!"
var int_welcome = 0;
var timer_welcome;

var home = 1;
var string_subMenu;

/* related to Three.js */
var int_scale = 0;

var mixer_star, mixer_bird, mixer_text;
var bool_animate = false;

const int_particleCount = 200;

const ANI_WAIT = -1;

const ANI_STAR_ACTION1 = 0;
const ANI_STAR_ACTION2 = 1;

const ANI_BIRD_ACTION1 = 0;
const ANI_BIRD_ACTION2 = 1;
const ANI_BIRD_ACTION3 = 2;

const ANI_TEXT_ACTION1 = 0;

const AXIS_X = new THREE.Vector3(1, 0, 0); 
const AXIS_Y = new THREE.Vector3(0, 1, 0); 
const DEGREE = Math.PI / 180;
const FRAME = 2500/6;
/* related to Three.js */

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
	typeString();
	setTimeout(function(){$("#div_screen").remove();}, 3000);
}

function typeString(){ 
	$('#span_typing').html(string_welcome.substring(0, int_welcome) + "_");
	int_welcome++;
	timer_welcome = setTimeout('typeString()', 50);

	if(string_welcome.length < int_welcome){
		$('#span_typing').html(string_welcome);	
		clearTimeout(timer_welcome);
	}
}

function resizeHeader(){
	int_width = $(window).width();
	var int_menuWidth = int_width - 20;
	var int_contentWidth = (int_menuWidth - 100) / 7;
	var int_outerFontSize = Math.min(19, int_width * 0.009 + 1);
	var int_innerFontSize = Math.min(15, int_width * 0.007 + 1);

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
		mixer_star = mixer_bird = mixer_text = undefined;
	}
	string_subMenu = '';
	$('#div_loading').css('display','block');
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
	int_width = $(window).width();
	int_height = $(window).height();
	var div_circle = $('#div_circle');
	var int_radius = Math.max(int_width, int_height) / 5;
	div_circle.css('width', int_radius);
	div_circle.css('height', int_radius);
	div_circle.css('left', (int_width - int_radius)/2);
	div_circle.css('top', (int_height - int_radius)/2);        
}

function loadSphere(name){
	var scene = new THREE.Scene();

	int_width = $('#'+name).width();
	int_height = $('#'+name).height();

	var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(int_width, int_height);

	$('#'+name).append(renderer.domElement);
	$('#'+name).css('overflow','hidden');

	var camera = new THREE.OrthographicCamera( -int_width / 50, int_width / 50, int_height / 50, -int_height / 50, - 1000, 1000);
	camera.position.set(0, 0, 0);
			
	var geometry = new THREE.SphereGeometry( 1, 16, 16 );
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );
	var line = new THREE.LineSegments( geometry, lineMaterial );
	scene.add(line);

	var render = function () {
		requestAnimationFrame(render);
		int_scale += 2;
		line.scale.x = 1 + 0.3 * Math.sin(int_scale * DEGREE);
		line.scale.y = 1 + 0.3 * Math.sin(int_scale * DEGREE);
		line.scale.z = 1 + 0.3 * Math.sin(int_scale * DEGREE);
		line.rotation.x += 2 * DEGREE;
		line.rotation.y += 2 * DEGREE;
		renderer.render(scene, camera);
	};
	render();
}