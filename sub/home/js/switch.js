function switch_screen(init,from,to){
	var left_loc = -$(window).width()+100;
	var center_loc = 100;
	var right_loc = $(window).width()+100;

	if(init == 1){	
		if(to == 'activity')
			$('#right_content').load('sub/home/activity.html');
		else
			$('#right_content').load('sub/home/favorite.html');
		$('#right_content').css('position','absolute');		//위치 이동 금지
		$('#right_content').css('left',right_loc+'px');	
		$('#left_content').animate({ opacity:0},1500);
		$('#right_content').animate({ left:center_loc+'px'},1500);
		setTimeout(function(){
			$('#left_content').css('position','absolute');	//위치 이동 금지
			$('#left_content').css('opacity','1');		//위치 이동 금지
			$('#left_content').load('sub/home/activity.html');
			$('#right_content').load('sub/home/favorite.html');
			if(to == 'activity'){
				$('#left_content').css('left',center_loc+'px');
				$('#right_content').css('left',right_loc+'px');
			}
			else{
				$('#left_content').css('left',left_loc+'px');
				$('#right_content').css('left',center_loc+'px');
			}
		}, 2000);
		if(to == 'activity'){
			return 0;
		}
		else{
			return 1;
		}
       	}
	else{
		if(to == 'activity'){
			if(from == 0)
				return 0;
			$('#left_content').animate({ left:center_loc+'px'},1500);
			$('#right_content').animate({ left:right_loc+'px'},1500);
			return 0;
		}
		else{
			if(from == 1)
				return 1;
			$('#left_content').animate({ left:left_loc+'px'},1500);
			$('#right_content').animate({ left:center_loc+'px'},1500);
			return 1;
		}
	}
}
