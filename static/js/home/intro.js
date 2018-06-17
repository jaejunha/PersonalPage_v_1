var clock, camera, scene, renderer;

/* mixers and bool_animate are located at index.js */
var action_star, action_bird;
var index_star = 0, index_bird = 0;
var time_start;
var int_threeScale = 1.5;

$(document).ready( function() {
	$('.span_loading').css('display','none');
	$('#div_content').animate({opacity:1}, 1000);

	if(home < 0){
			$('#first').css('animation-delay','5s');
			$('#second').css('animation-delay','5.6s');
			$('#third').css('animation-delay','6.1s');
			$('#fourth').css('animation-delay','6.6s');
	}

	$('#first').html(static_intro0.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
	$('#second').html(static_intro1.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
	$('#third').html(static_intro2.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
	$('#fourth').html(static_intro3.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
});
$(window).resize(function (){
	if(from == 0)
		resize('frame');
});

function loadStar(){
	new THREE.JSONLoader().load(static_star, function (geometry, materials) {
		materials.forEach(function (material) { material.skinning = true; });
		var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
		mixer_star = new THREE.AnimationMixer(model);
		action_star = new Array(geometry.animations.length);

		for(var i = 0; i < action_star.length; i++){
			action_star[i] = mixer_star.clipAction(geometry.animations[i]);
			action_star[i].setEffectiveWeight(1);
			action_star[i].enabled = true;
			if(i == 0)
				action_star[i].setLoop(THREE.LoopOnce, 0);
		}
		scene.add(model);
		window.addEventListener('resize', onWindowResize, false);

    		action_star[index_star].play();
		animate();
	});
}

function loadBird(){
	new THREE.JSONLoader().load(static_bird, function (geometry, materials) {
		materials.forEach(function (material) { material.skinning = true; });
		var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
		mixer_bird = new THREE.AnimationMixer(model);
		action_bird = new Array(geometry.animations.length);
		for(var i = 0; i < action_bird.length; i++){
			action_bird[i] = mixer_bird.clipAction(geometry.animations[i]);
			action_bird[i].setEffectiveWeight(1);
			action_bird[i].enabled = true;
		}
		scene.add(model);

		window.addEventListener('resize', onWindowResize, false);

    		action_bird[index_bird].play();
		animate();
	});
}

function changeAction (type) {
	var from, to;
	if(type == 0){
		from = action_star[index_star - 1].play();
		to = action_star[index_star].play();
	}
	else{
		from = action_bird[index_bird - 1].play();
		to = action_bird[index_bird].play();
	}

  	from.enabled = true;
  	to.enabled = true;
	from.crossFadeTo(to, 4);
}

function onWindowResize () {
	var int_width = $(window).width() - 200;
	var int_height = $(window).height()-$('header').offset().top-$('header').height()-$('#div_content').offset().top-$('#div_content').height();
	camera.aspect = int_width / int_height;
	camera.updateProjectionMatrix();
			
	var int_marginTop = -int_height*(int_threeScale - 1);
	var int_marginLeft = -int_width*(int_threeScale - 1)/2;
	$('#div_threejs').css('height',int_height);
	renderer.setSize(int_width*int_threeScale, int_height*int_threeScale);
	$('#div_threejs canvas').css('margin-top',int_marginTop+'px');
	$('#div_threejs canvas').css('margin-left',int_marginLeft+'px');
}

function animate() {
	if(bool_animate == false)
		return ;
	requestAnimationFrame(animate);
	if(mixer_star != undefined){
		if(index_star == 0){
			if(new Date().getTime() - time_start > 2000){
				loadBird();
				mixer_star = undefined;
			}
		}
		mixer_star.update(clock.getDelta());
	}
	if(mixer_bird != undefined){
		if(index_bird == 0){
			if(new Date().getTime() - time_start < 4000){
				index_bird++;
				changeAction(1);
			}
		}
		mixer_bird.update(clock.getDelta());
	}
	renderer.render(scene, camera);
}