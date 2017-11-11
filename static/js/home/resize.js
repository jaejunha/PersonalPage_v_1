function resize(from){
	if(from=='favorite'){
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

		$('.title').css('width',0.16*size);
		$('.title').css('height',0.01*size);
		$('.title').css('padding-left',0.01*size);
		$('.title').css('top',0);

		$('.desc').css('width',0.16*size);
		$('.desc').css('height',0.03*size);		
		$('.desc').css('position','absolute');
		$('.desc').css('top',0.12*size);	
		$('.desc').css('background-color','#cccccc');	
		$('.desc').css('color','#ffffff');
		$('.desc').css('font-size','15pt');	
		$('.desc').css('z-index','0');

		$('.gradation').css('width',0.16*size);
		$('.gradation').css('height',0.12*size);		
		$('.gradation').css('position','absolute');	
		$('.gradation').css('top',0);	
		$('.gradation').css('background','-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0) 100%)');
		$('.gradation').css('z-index','1');

		$('.icon img').css('width',0.09*size);
		$('.icon img').css('height',0.09*size);
		$('.icon img').css('position','absolute');
		$('.icon img').css('top',0.03*size);	
		$('.icon img').css('left',0.035*size);	
		$('.icon img').css('z-index','-1');	
		$('.icon img').css('display','block');
	//	$('.icon img').css('background-color','#ffffff');

	}else if(from=='activity'){	
		$('#main').css('width',$(window).width()-200);
	}else if(from=='frame'){
		$('#favorite_content').css('left',$(window).width());
	}
}