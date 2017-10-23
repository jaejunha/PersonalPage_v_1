function switch_screen(init,from,to){
	var size = $(window).width();
	var margin = 100;
	var favorite_content = $('#favorite_content');
	var activity_content = $('#activity_content');
	var intro_content = $('#intro_content');
	var activity = $('#activity');
	var favorite = $('#favorite');

	if(init == 1){		
		intro_content.animate({ opacity:0},1500,function(){intro_content.remove();});
		if(to == 'activity'){			
			activity_content.animate({ left:margin+'px'},1500);
		}
		else{
			activity_content.css('left',-size+margin+'px');	
			favorite_content.animate({ left:margin+'px'},1500);
		}
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
		if(to == 'activity'){
			if(from == 0)
				return 0;
			activity_content.animate({ left:margin+'px'},1500);
			favorite_content.animate({ left:size+margin+'px'},1500);
			activity.css('color','#ffffff');
			favorite.css('color','#aaaaaa');
			return 0;
		}
		else{
			if(from == 1)
				return 1;
			activity_content.animate({ left:-size+margin+'px'},1500);
			favorite_content.animate({ left:margin+'px'},1500);
			activity.css('color','#aaaaaa');
			favorite.css('color','#ffffff');
			return 1;
		}
	}
}
