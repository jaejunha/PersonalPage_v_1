function resize(from){
	if(from=='favorite'){
		var size = $(window).width()-200;
		$('#main').css('width',size);

		$('a').css('text-decoration','none');

		$('.icon').css('width',0.16*size);
		$('.icon').css('height',0.18*size);
		$('.icon').css('float','left');
		$('.icon').css('background-color','rgba(255,255,255,0.2)');

		$('.desc').css('width',0.16*size);
		$('.desc').css('height',0.03*size);	
		$('.desc').css('top',0.07*size+'px');	
		$('.desc').css('position','relative');
		$('.desc').css('background-color','rgba(255,255,255,0.75)');	
		$('.desc').css('text-align','center');
		$('.desc').css('vertical-align','middle');
		$('.desc').css('display','table-cell');
		$('.desc').css('color','#555555');
		$('.desc').css('font-size','15pt');

		$('.gradation').css('width',0.16*size);
		$('.gradation').css('height',0.12*size);		
		$('.gradation').css('position','relative');	
		$('.gradation').css('top',-0.11*size+'px');	
		$('.gradation').css('background','-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0) 100%)');
		$('.gradation').css('z-index','1');
	
		$('.icon img').css('width',0.08*size);
		$('.icon img').css('height',0.08*size);	
		$('.icon img').css('position','relative');	
		$('.icon img').css('top',0.04*size+'px');
		$('.icon img').css('left',0.04*size+'px');
		$('.icon img').css('z-index','0');	
	}else if(from=='activity'){	
		$('#main').css('width',$(window).width()-200);
	}else if(from=='frame'){
		$('#favorite_content').css('left',$(window).width());
	}
}