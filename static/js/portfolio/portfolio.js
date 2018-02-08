function switch_screen(to){
	$('#program').css('color','#aaaaaa');
	$('#art').css('color','#aaaaaa');
	$('#marathon').css('color','#aaaaaa');

	if(to == 'program'){
		$('#inner_content').load('portfolio/program');
		$('#program').css('color','#ffffff');
	}
	else if(to == 'art'){
		$('#inner_content').load('portfolio/art');
		$('#art').css('color','#ffffff');
	}
	else{
		$('#inner_content').load('portfolio/marathon');
		$('#marathon').css('color','#ffffff');
	}
}
