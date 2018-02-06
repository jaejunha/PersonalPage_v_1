onmessage = function(event){
	setInterval(function(){
		postMessage(0);
	}, 60000);
};