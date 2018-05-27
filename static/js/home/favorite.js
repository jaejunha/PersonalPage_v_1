var int_width;
var int_margin = 100;

$(document).ready( function() {
	$('.span_loading').css('display','none');

	resize();
});
$(window).resize(function (){
	resize();
});

function resize(){
	int_width = $(window).width()-2*int_margin;
	$('#main').css('width',int_width);

	$('a').css('text-decoration','none');

	$('.icon').css('position','relative');
	$('.icon').css('width',0.16*int_width);
	$('.icon').css('height',0.15*int_width);
	$('.icon').css('float','left');
	$('.icon').css('display','block');
	$('.icon').css('background-color','rgba(255,255,255,0.2)');
	$('.icon').css('overflow','hidden');

	$('.desc').css('width',0.16*int_width);
	$('.desc').css('height',0.03*int_width);		
	$('.desc').css('position','absolute');
	$('.desc').css('top',0.12*int_width);
	$('.desc').css('font-size',0.008*int_width+'pt');

	$('.gradation').css('width',0.16*int_width);
	$('.gradation').css('height',0.12*int_width);		
	$('.gradation').css('position','absolute');	
	$('.gradation').css('top',0);	
	$('.gradation').css('background','-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0) 100%)');
	$('.gradation').css('z-index','1');

	$('.icon img').css('width',0.10*int_width);
	$('.icon img').css('height',0.10*int_width);
	$('.icon img').css('position','absolute');
	$('.icon img').css('top',0.025*int_width);	
	$('.icon img').css('left',0.03*int_width);	
	$('.icon img').css('z-index','-1');	
	$('.icon img').css('display','block');	

	//must locate behind icon img
	$('.favi').css('left',0.005*int_width);
	$('.favi').css('top',0.005*int_width);
	$('.favi').css('width',0.02*int_width);
	$('.favi').css('height',0.02*int_width);
}
