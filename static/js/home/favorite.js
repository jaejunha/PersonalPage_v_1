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
	$('#p_main').css('width',int_width);

	$('.div_icon').css('position','relative');
	$('.div_icon').css('width',0.16*int_width);
	$('.div_icon').css('height',0.15*int_width);
	$('.div_icon').css('float','left');
	$('.div_icon').css('display','block');
	$('.div_icon').css('background-color','rgba(255,255,255,0.2)');
	$('.div_icon').css('overflow','hidden');

	$('.div_desc').css('width',0.16*int_width);
	$('.div_desc').css('height',0.03*int_width);		
	$('.div_desc').css('position','absolute');
	$('.div_desc').css('top',0.12*int_width);
	$('.div_desc').css('font-size',0.008*int_width+'pt');

	$('.div_gradation').css('width',0.16*int_width);
	$('.div_gradation').css('height',0.12*int_width);		
	$('.div_gradation').css('position','absolute');	
	$('.div_gradation').css('top',0);	
	$('.div_gradation').css('background','-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0) 100%)');
	$('.div_gradation').css('z-index','1');

	$('.img_screenshot').css('width',0.10*int_width);
	$('.img_screenshot').css('height',0.10*int_width);
	$('.img_screenshot').css('position','absolute');
	$('.img_screenshot').css('top',0.025*int_width);	
	$('.img_screenshot').css('left',0.03*int_width);	
	$('.img_screenshot').css('z-index','-1');	
	$('.img_screenshot').css('display','block');	

	//must locate behind icon img
	$('.img_favicon').css('left',0.005*int_width);
	$('.img_favicon').css('top',0.005*int_width);
	$('.img_favicon').css('width',0.02*int_width);
	$('.img_favicon').css('height',0.02*int_width);
}
