function switch_screen(to){
	$('#personal').css('opacity',0.5);
	$('#personal').css('color','#aaaaaa');
	$('#bucketlist').css('opacity',0.5);
	$('#bucketlist').css('color','#aaaaaa');
	$('#history').css('opacity',0.5);
	$('#history').css('color','#aaaaaa');

	if(to == 'personal'){
		$('#inner_content').load('about/personal');
		$('#personal').css('opacity',1);
		$('#personal').css('color','#ffffff');
	}
	else if(to == 'bucketlist'){
		$('#inner_content').load('about/bucketlist');
		$('#bucketlist').css('opacity',1);
		$('#bucketlist').css('color','#ffffff');
	}
	else{
		$('#inner_content').load('about/history');
		$('#history').css('opacity',1);
		$('#history').css('color','#ffffff');
	}
}
