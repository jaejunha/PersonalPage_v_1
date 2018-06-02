function switchSubMenu(to){
	$('#div_inner').css('opacity','0');
	$('.a_program').css('color','#aaaaaa');
	$('.a_art').css('color','#aaaaaa');
	$('.a_marathon').css('color','#aaaaaa');

	if(to == 'program'){
		$('#div_inner').load('portfolio/program');
		$('.a_program').css('color','#ffffff');
	}
	else if(to == 'art'){
		$('#div_inner').load('portfolio/art');
		$('.a_art').css('color','#ffffff');
	}
	else{
		$('#div_inner').load('portfolio/marathon');
		$('.a_marathon').css('color','#ffffff');
	}
}
