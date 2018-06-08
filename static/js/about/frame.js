var int_width;
var int_height;
var int_marginLeft = 100;
var int_marginTop = 40;

$(document).ready( function() {
	initContent();
	setTimeout(function() {  
		resizeContent();
		resizeTop();
	}, 100);
});

$(window).resize(function (){
	if(string_subMenu=='about'){
		resizeContent();
		resizeTop();
	}
});

function initContent(){
	$('#div_inner').load('about/personal');
}

function resizeContent(){
	int_width = $(window).width();
	int_height = $(window).height();	
	$('#div_inner').css('width', (int_width - 2*int_marginLeft)+'px');
	$('#div_inner').css('height', (int_height - $('hr').offset().top +$('hr').height()+ int_marginTop) +'px');
}
function resizeTop(){
	if(int_width > 650)
		$('hr').css('width',int_width-2*int_marginLeft);
}