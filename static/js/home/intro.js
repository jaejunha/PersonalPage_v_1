var clock, camera, scene, renderer;

/* mixers and bool_animate are located at index.js */
var action_star, action_bird;
var index_star = 0, index_bird = 0;
var time_start, time_now;

var vec_x = new THREE.Vector3(1, 0, 0); 
var double_degree = Math.PI / 180;
var double_delta;
var double_frame = 2500/6;

$(document).ready( function() {
	$('.span_loading').css('display','none');
	$('#div_content').animate({opacity:1}, 1000);

	if(home < 1){
			$('#first').css('animation-delay','5.1s');
			$('#second').css('animation-delay','5.7s');
			$('#third').css('animation-delay','6.3s');
			$('#fourth').css('animation-delay','6.9s');
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
		model.rotateOnAxis(vec_x, 15 * double_degree);
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
	if(type == 'star'){
		from = action_star[index_star - 1].play();
		to = action_star[index_star].play();
	}
	else if(type == 'bird'){
		from = action_bird[index_bird - 1].play();
		to = action_bird[index_bird].play();
	}

  	from.enabled = true;
  	to.enabled = true;
	from.crossFadeTo(to, 0);
}

function onWindowResize () {
	var int_width = $(window).width() - 200;
	var int_height = $(window).height()-$('header').offset().top-$('header').height()-$('#div_content').offset().top-$('#div_content').height();
	camera.updateProjectionMatrix();
			
	$('#div_threejs').css('height',int_height);
	renderer.setSize(int_width, int_height);
}

function animate() {
	if(bool_animate == false)
		return ;
	double_delta = clock.getDelta();
	time_now = new Date().getTime();
	if(mixer_star != undefined){
		if(index_star == 0){
			if(time_now - time_start > 5*double_frame){
				index_star = -1;
				loadBird();
			}
		}
		else if(index_star == -1){
			if(time_now - time_start > 9*double_frame){
				index_star = 1;
				changeAction('star');
			}
		}
		else if(index_star == 1){
			if(time_now - time_start > 13*double_frame)
				mixer_star = undefined;
		}
		mixer_star.update(double_delta);
	}
	if(mixer_bird != undefined){
		if(index_bird == 0){
			if(time_now - time_start > 9*double_frame){
				index_bird++;
				changeAction('bird');
			}
		}
		else if(index_bird == 1){
			if(time_now - time_start > 13*double_frame){
				index_bird++;
				changeAction('bird');
			}
		}
		mixer_bird.update(double_delta);
	}
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}