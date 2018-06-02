var bool_introWorking = true;
var from = 0;			//0:activity1:favorite
var blink = 0;			//activity button blink
var switch_blink;		//blink switch
var int_margin = 100;
var int_width;

$(document).ready( function() {
	initContent();
	resizeContent();
	resizeTop();
	initAnimation();
});
$(window).resize(function (){
	if(string_subMenu=='home'){
		resizeContent();
		resizeTop();
	}
});

function initContent(){
	$('#div_intro').load('home/intro');
	$('#div_favorite').load('home/favorite');
	$('#div_favorite').css('position','absolute');
	$('#div_activity').load('home/activity');
	$('#div_activity').css('position','absolute');
}
function resizeContent(){
	int_width = $(window).width();
	var int_height = $(window).height() - $('#div_activity').offset().top;

	/*	While intro is running			*
	 *	Order: index | activity | favorite	*/
	if(bool_introWorking){
		$('#div_favorite').css('left',int_width+'px');
		$('#div_activity').css('left',int_width+'px');
		$('#div_activity').css('width',(int_width - 2*int_margin)+'px');
	}
	/*	When intro is ended			*/
	else{
		$('#div_activity').css('width',(int_width - 2*int_margin)+'px');

	 	/*	Order: favorite | activity	*/
		if(from == 1){
			$('#div_activity').css('left',-int_width + int_margin + 'px');
			$('#div_favorite').css('left',int_margin+'px');
		}
		/*	Order: activity | favorite	*/
		else{
			$('#div_activity').css('left',int_margin+'px');
			$('#div_favorite').css('left',int_width+'px');
		}
	}

	$('#div_activity').css('height',int_height+'px');
	$('#div_favorite').css('height',int_height+'px');
}

function resizeTop(){
	$('hr').css('width',int_width-2*int_margin);
	$('hr').css('margin',0.005*int_width+'px 0 0 0');;

	$('#div_content').css('width',int_width-2*int_margin);
	$('#font_title').css('font-size',0.02*int_width+'pt');
	$('#a_activity').css('font-size',0.01*int_width+'pt');
	$('#a_favorite').css('font-size',0.01*int_width+'pt');
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
		$('#a_favorite').css('animation','appear_tab 0s');
		$('#a_favorite').css('opacity','1');
		$('#a_activity').css('animation','appear_tab 0s');
		$('#a_activity').css('opacity','1');
		$('hr').css('animation','appear_tab 0s');
		$('hr').css('opacity','1');	
		$('#title').css('animation','appear_tab 0s');
		$('#bird').css('animation','appear_bird 0s');
		clearInterval(switch_blink);
	}else{
		switch_blink = setInterval(function() {
		blink++;
		if(blink % 2 == 1)
			$('#a_activity').css('color','#ffffff');
		else
			$('#a_activity').css('color','#aaaaaa');
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
	var div_favorite = $('#div_favorite');
	var div_activity = $('#div_activity');
	var div_intro = $('#div_intro');
	var activity = $('#a_activity');
	var favorite = $('#a_favorite');

	if(from < 0){
		if(bool_introWorking){
			bool_introWorking = false;
			div_intro.animate({ opacity:0},1500,function(){div_intro.remove();});
		}
		if(to == 'activity'){			
			div_activity.css('left',int_margin + 'px');
		}
		else{
			div_activity.css('left',(-int_width + int_margin)+'px');	
			div_favorite.css('left',int_margin+'px');
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
			div_intro.animate({ opacity:0},1500,function(){div_intro.remove();});
			if(to == 'activity'){			
				div_activity.animate({ left:int_margin+'px'},1500);
			}
			else{
				div_activity.css('left',-int_width+int_margin+'px');	
				div_favorite.animate({ left:int_margin+'px'},1500);
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
				div_activity.animate({ left:int_margin + 'px'},1500);
				div_favorite.animate({ left:int_width + int_margin+'px'},1500);
				activity.css('color','#ffffff');
				favorite.css('color','#aaaaaa');
				return 0;
			}
			else{
				if(from == 1)
					return 1;
				div_activity.animate({ left:-int_width + int_margin + 'px'},1500);
				div_favorite.animate({ left:int_margin + 'px'},1500);
				activity.css('color','#aaaaaa');
				favorite.css('color','#ffffff');
				return 1;
			}
		}
	}
}
