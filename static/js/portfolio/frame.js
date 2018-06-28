var int_width;
var int_height;
var int_marginLeft = 100;
var int_marginTop = 40;

$(document).ready( function() {

	initContent();
	setTimeout(function() {  
		resizeContent();
		resizeTop();
	}, 100);
});

$(window).resize(function (){
	if(string_subMenu=='program' || string_subMenu=='art' || string_subMenu=='marathon'){
		resizeContent();
		resizeTop();
	}
});

function initContent(){
	$('#a_'+string_subMenu).css('color','#ffffff');
	$('#a_'+string_subMenu).css('opacity',1);
	$('#div_inner').load('portfolio/'+string_subMenu);
}

function resizeContent(){
	int_width = $(window).width();
	int_height = $(window).height();

	$('#div_inner').css('width',(int_width - 2*int_marginLeft)+'px');
	$('#div_inner').css('height',int_height - $('hr').offset().top+ $('hr').height() + int_marginTop +'px');
}

function resizeTop(){
	if(int_width < 480){
		$('#a_program').css('display','none');
		$('#a_art').css('display','none');
		$('#a_marathon').css('display','none');
	}else{
		$('#a_program').css('display','block');
		$('#a_art').css('display','block');
		$('#a_marathon').css('display','block');
		$('hr').css('width',int_width-2*int_marginLeft);

		$('#div_content').css('width',int_width-2*int_marginLeft);
		$('#a_program').css('font-size', Math.min(19, 0.01 * int_width)+'pt');
		$('#a_program').css('margin-top',$('#font_title').height()-$('#a_program').height());
		$('#a_art').css('font-size', Math.min(19, 0.01 * int_width)+'pt');
		$('#a_art').css('margin-top',$('#font_title').height()-$('#a_art').height());
		$('#a_marathon').css('font-size', Math.min(19, 0.01*int_width)+'pt');
		$('#a_marathon').css('margin-top',$('#font_title').height()-$('#a_marathon').height());
	}
}