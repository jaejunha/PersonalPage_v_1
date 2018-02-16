function switchSubMenu(to){
	$('#inner_content').css('opacity','0');
	$('.a_program').css('color','#aaaaaa');
	$('.a_art').css('color','#aaaaaa');
	$('.a_marathon').css('color','#aaaaaa');

	if(to == 'program'){
		$('#inner_content').load('portfolio/program');
		$('.a_program').css('color','#ffffff');
	}
	else if(to == 'art'){
		$('#inner_content').load('portfolio/art');
		$('.a_art').css('color','#ffffff');
	}
	else{
		$('#inner_content').load('portfolio/marathon');
		$('.a_marathon').css('color','#ffffff');
	}
}
