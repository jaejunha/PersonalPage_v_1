function switch_screen(init,from,to){
	var size = $(window).width();
	var margin = 100;
	var right = $('#right_content');
	var left = $('#left_content');
	var activity = $('#activity');
	var favorite = $('#favorite');


	if(init == 1){		
		right.css('opacity','1');
		if(to == 'activity'){		
			left.css('position','absolute');	//위치 이동 금지
			left.load('sub/home/activity.html');
			left.css('left',size+margin+'px');	
			right.animate({ opacity:0},1500);
			left.animate({ left:margin+'px'},1500);
		}
		else{
			right.css('position','absolute');		//위치 이동 금지
			right.load('sub/home/favorite.html');
			right.css('left',size+margin+'px');	
			left.animate({ opacity:0},1500);
			right.animate({ left:margin+'px'},1500);
		}
		setTimeout(function(){
			if(to == 'activity'){
				right.css('position','absolute');		//위치 이동 금지
				right.css('left',size+margin+'px');
				right.load('sub/home/favorite.html');
			}
			else{			
				left.css('position','absolute');	//위치 이동 금지
				left.css('left',-size+margin+'px');
				left.load('sub/home/activity.html');
			}
		}, 1600);
		if(to == 'activity'){
			activity.css('color','#ffffff');
			favorite.css('color','#aaaaaa');
			return 0;
		}
		else{
			activity.css('color','#aaaaaa');
			favorite.css('color','#ffffff');
			return 1;
		}
       	}
	else{
		right.css('opacity','1');		//위치 이동 금지
		left.css('opacity','1');		//위치 이동 금지
		if(to == 'activity'){
			if(from == 0)
				return 0;
			left.animate({ left:margin+'px'},1500);
			right.animate({ left:size+margin+'px'},1500);
			activity.css('color','#ffffff');
			favorite.css('color','#aaaaaa');
			return 0;
		}
		else{
			if(from == 1)
				return 1;
			left.animate({ left:-size+margin+'px'},1500);
			right.animate({ left:margin+'px'},1500);
			activity.css('color','#aaaaaa');
			favorite.css('color','#ffffff');
			return 1;
		}
	}
}
