$(document).ready( function() {
	$('.span_loading').css('display','none');

	resize();
});
$(window).resize(function (){
	resize();
});

function resize(){
	var size = $(window).width()-200;
	$('#main').css('width',size);

	$('a').css('text-decoration','none');

	$('.icon').css('position','relative');
	$('.icon').css('width',0.16*size);
	$('.icon').css('height',0.15*size);
	$('.icon').css('float','left');
	$('.icon').css('display','block');
	$('.icon').css('background-color','rgba(255,255,255,0.2)');
	$('.icon').css('overflow','hidden');

	$('.desc').css('width',0.16*size);
	$('.desc').css('height',0.03*size);		
	$('.desc').css('position','absolute');
	$('.desc').css('top',0.12*size);

	$('.gradation').css('width',0.16*size);
	$('.gradation').css('height',0.12*size);		
	$('.gradation').css('position','absolute');	
	$('.gradation').css('top',0);	
	$('.gradation').css('background','-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0) 100%)');
	$('.gradation').css('z-index','1');

	$('.icon img').css('width',0.10*size);
	$('.icon img').css('height',0.10*size);
	$('.icon img').css('position','absolute');
	$('.icon img').css('top',0.025*size);	
	$('.icon img').css('left',0.03*size);	
	$('.icon img').css('z-index','-1');	
	$('.icon img').css('display','block');	

	//must locate behind icon img
	$('.favi').css('left',0.005*size);
	$('.favi').css('top',0.005*size);
	$('.favi').css('width',0.02*size);
	$('.favi').css('height',0.02*size);
}
