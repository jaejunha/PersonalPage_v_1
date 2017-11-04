function switch_menu(to){
	if(to!='local'){
		$('header a').css('color','#555555');
		if(to=='home'){
			$('#content').load('home/frame');
			$('header a:nth-child(1)').css('color','#ffffff');
		}
		if(to=='about'){
			$('#content').load('about/frame');
			$('header a:nth-child(2)').css('color','#ffffff');
		}
		if(to=='education'){
			$('#content').load('education');
			$('header a:nth-child(3)').css('color','#ffffff');
		}
	}else
		$('#content').load('local');
}