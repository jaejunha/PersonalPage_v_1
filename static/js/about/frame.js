var int_width;
var int_margin = 100;

$(document).ready( function() {
	$('#div_inner').load('about/personal');
	resizeContent();
});

$(window).resize(function (){
	if(string_subMenu=='about'){
		resizeContent();
	}
});

function resizeContent(){
	int_width = $(window).width();
	var int_height = $(window).height() - $('#div_inner').offset().top;
	$('#div_inner').css('width',(int_width - 2*int_margin)+'px');
	$('#div_inner').css('height',int_height+'px');
}