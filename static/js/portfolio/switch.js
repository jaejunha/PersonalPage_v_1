function switch_screen(to){
	$('#program').css('opacity',0.5);
	$('#program').css('color','#aaaaaa');
	$('#art').css('opacity',0.5);
	$('#art').css('color','#aaaaaa');
	$('#marathon').css('opacity',0.5);
	$('#marathon').css('color','#aaaaaa');

	if(to == 'program'){
		$('#inner_content').load('portfolio/program');
		$('#program').css('opacity',1);
		$('#program').css('color','#ffffff');
	}
	else if(to == 'art'){
		$('#inner_content').load('portfolio/art');
		$('#art').css('opacity',1);
		$('#art').css('color','#ffffff');
	}
	else{
		$('#inner_content').load('portfolio/marathon');
		$('#marathon').css('opacity',1);
		$('#marathon').css('color','#ffffff');
	}
}
