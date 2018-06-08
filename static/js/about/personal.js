$(document).ready( function() {
	if(string_subMenu=='about')
		hideContent();
});

$(window).resize( function() {
	if(string_subMenu=='about')
		hideContent();
});
function hideContent(){
	if($('table:nth-of-type(1) tbody').height() > 300)
		$('#div_inner').css('visibility','hidden');
	else
		$('#div_inner').css('visibility','visible');
}

function expandTable(name){
	var status=$('.'+name+' td:nth-child(1) a').text();
	if(status.indexOf('▶')>-1){
		$('.'+name+' td:nth-child(1) a').text(status.replace('▶','▼'));
		$('.'+name.replace('history','content')).css('display','');
		$('.'+name.replace('history','content')).css('font-size','12pt');
	}
	else{
		$('.'+name+' td:nth-child(1) a').text(status.replace('▼','▶'));
		$('.'+name.replace('history','content')).css('display','none');
	}
}