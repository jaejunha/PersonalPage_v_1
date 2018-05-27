var bool_introWorking = true;
var from = 0;			//0:activity1:favorite
var blink = 0;			//activity button blink
var switch_blink;		//blink switch
var int_margin = 100;
var int_width;

$(document).ready( function() {
	int_width = $(window).width();
	initContent();
	resizeContent();
	resizeTop();
	initAnimation();
});
$(window).resize(function (){
	int_width = $(window).width();
	resizeContent();
	resizeTop();
});

function initContent(){
	$('#intro_content').load('home/intro');
	$('#favorite_content').load('home/favorite');
	$('#favorite_content').css('position','absolute');
	$('#activity_content').load('home/activity');
	$('#activity_content').css('position','absolute');
}
function resizeContent(){
	var int_height = $(window).height() - $('#activity_content').offset().top;

	/*	While intro is running			*
	 *	Order: index | activity | favorite	*/
	if(bool_introWorking){
		$('#favorite_content').css('left',int_width+'px');
		$('#activity_content').css('left',int_width+'px');
		$('#activity_content').css('width',(int_width - 2*int_margin)+'px');
	}
	/*	When intro is ended			*/
	else{
		$('#activity_content').css('width',(int_width - 2*int_margin)+'px');

	 	/*	Order: favorite | activity	*/
		if(from == 1){
			$('#activity_content').css('left',-int_width + int_margin + 'px');
			$('#favorite_content').css('left',int_margin+'px');
		}
		/*	Order: activity | favorite	*/
		else{
			$('#activity_content').css('left',int_margin+'px');
			$('#favorite_content').css('left',int_width+'px');
		}
	}

	$('#activity_content').css('height',int_height+'px');
	$('#favorite_content').css('height',int_height+'px');
}

function resizeTop(){
	$('hr').css('width',int_width-2*int_margin);
	$('hr').css('margin',0.005*int_width+'px 0 0 0');;

	$('#div_content').css('width',int_width-2*int_margin);
	$('#font_title').css('font-size',0.02*int_width+'pt');
	$('#activity').css('font-size',0.01*int_width+'pt');
	$('#favorite').css('font-size',0.01*int_width+'pt');
}

function initAnimation(){
	if(window.Worker){
		var w = new Worker("/static/js/home/worker_frame.js");
        	w.onmessage = function(event) {
			clearInterval(switch_blink);
			if(bool_introWorking && home >= 0)
			from=switchSubMenu('activity');
        	};
		w.postMessage("Hello");
	}

	//delete animation
	if(home != 1){
		$('#font_title').css('animation','appear_tab 0s');
		$('#font_title').css('opacity','1');	
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
	if(string_subMenu != 'home'){
		from = -1;
		from = switchSubMenu(string_subMenu);
	}
}

function switchSubMenu(to){
	int_width = $(window).width();
	var favorite_content = $('#favorite_content');
	var activity_content = $('#activity_content');
	var intro_content = $('#intro_content');
	var activity = $('#activity');
	var favorite = $('#favorite');

	if(from < 0){
		if(bool_introWorking){
			bool_introWorking = false;
			intro_content.animate({ opacity:0},1500,function(){intro_content.remove();});
		}
		if(to == 'activity'){			
			activity_content.css('left',int_margin + 'px');
		}
		else{
			activity_content.css('left',(-int_width + int_margin)+'px');	
			favorite_content.css('left',int_margin+'px');
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
		if(bool_introWorking){	
			bool_introWorking = false;	
			intro_content.animate({ opacity:0},1500,function(){intro_content.remove();});
			if(to == 'activity'){			
				activity_content.animate({ left:int_margin+'px'},1500);
			}
			else{
				activity_content.css('left',-int_width+int_margin+'px');	
				favorite_content.animate({ left:int_margin+'px'},1500);
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
				activity_content.animate({ left:int_margin + 'px'},1500);
				favorite_content.animate({ left:int_width + int_margin+'px'},1500);
				activity.css('color','#ffffff');
				favorite.css('color','#aaaaaa');
				return 0;
			}
			else{
				if(from == 1)
					return 1;
				activity_content.animate({ left:-int_width + int_margin + 'px'},1500);
				favorite_content.animate({ left:int_margin + 'px'},1500);
				activity.css('color','#aaaaaa');
				favorite.css('color','#ffffff');
				return 1;
			}
		}
	}
}
