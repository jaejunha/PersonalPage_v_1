var init = 1;
var from = 0;//0:activity1:favorite
var blink = 0;//activity button blink
var switch_blink;//blink switch

$(document).ready( function() {
	var width = $(window).width();
	$('#intro_content').load('home/intro');
	$('#favorite_content').load('home/favorite');
	$('#favorite_content').css('position','absolute');
	$('#favorite_content').css('left',width+'px');
	$('#activity_content').load('home/activity');
	$('#activity_content').css('position','absolute');
	$('#activity_content').css('left',width+'px');
	$('#activity_content').css('width',(width-200)+'px');

	var height = $(window).height() - $('#activity_content').offset().top;
	$('#activity_content').css('height',height+'px');
	$('#favorite_content').css('height',height+'px');

	if(window.Worker){
		var w = new Worker("/static/js/home/worker.js");
        	w.onmessage = function(event) {
			clearInterval(switch_blink);
			if(init == 1 && home >= 0)
			from=switch_screen(init--,from,'activity');
        	};
		w.postMessage("Hello");
	}
	if(from == 0)
		$('#favorite_content').css('left',$(window).width());

	//delete animation
	if(home != 1){
		$('#favorite').css('animation','appear_tab 0s');
		$('#favorite').css('opacity','1');
		$('#activity').css('animation','appear_tab 0s');
		$('#activity').css('opacity','1');
		$('hr').css('animation','appear_tab 0s');
		$('hr').css('opacity','1');	
		$('#title').css('animation','appear_tab 0s');
		$('#bird').css('animation','appear_bird 0s');
		clearInterval(switch_blink);
	}else{
		switch_blink = setInterval(function() {
		blink++;
		if(blink % 2 == 1)
			$('#activity').css('color','#ffffff');
		else
			$('#activity').css('color','#aaaaaa');
		}, 750);
	}
	home--;
});
$(window).resize(function (){
	if(init == 1){
		var width = $(window).width();
		$('#favorite_content').css('left',width+'px');
		$('#activity_content').css('left',width+'px');
		$('#activity_content').css('width',(width-200)+'px');

		var height = $(window).height() - $('#activity_content').offset().top;
		$('#activity_content').css('height',height+'px');
	}

	if(from == 0)
		$('#favorite_content').css('left',$(window).width());
});
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
