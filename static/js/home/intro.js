/* some variables related to Three.js are located at index.js */
var clock, camera, scene, renderer, orbit;

var action_star, action_bird, action_text;
var index_star = ANI_STAR_ACTION1;
var index_bird = ANI_BIRD_ACTION1;
var index_text = ANI_WAIT;
var time_start, time_now;

var double_delta;
var double_opacity = 0;
var material_text;
/* some variables related to Three.js are located at index.js */

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
		model.position.set(0, -4, 0);
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
		model.position.set(0, -4, 0);
		model.rotateOnAxis(AXIS_X, 15 * DEGREE);
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
	});
}

function loadText(){
	new THREE.JSONLoader().load(static_text, function (geometry, materials) {
		materials.forEach(function (material) { material.skinning = true; });
		var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
		model.position.set(0, -4, 0);
		material_text = materials[0];
		material_text.transparent = true;
		material_text.opacity = 0;
		mixer_text = new THREE.AnimationMixer(model);
		action_text = new Array(geometry.animations.length);
		for(var i = 0; i < action_text.length; i++){
			action_text[i] = mixer_text.clipAction(geometry.animations[i]);
			action_text[i].setEffectiveWeight(1);
			action_text[i].enabled = true;
			action_text[i].setLoop(THREE.LoopOnce, 0);
		}
		scene.add(model);

		window.addEventListener('resize', onWindowResize, false);
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
		if(index_star == ANI_STAR_ACTION1){
			if(time_now - time_start > 5 * FRAME){
				index_star = ANI_WAIT;
				loadBird();
			}
		}
		else if(index_star == ANI_WAIT){
			if(time_now - time_start > 9 * FRAME){
				index_star = ANI_STAR_ACTION2;
				changeAction('star');
			}
		}
		else if(index_star == ANI_STAR_ACTION2){
			if(time_now - time_start > 13 * FRAME){
				mixer_star = undefined;
				index_star++;
			}
		}
		if(index_star <= ANI_STAR_ACTION2)
			mixer_star.update(double_delta);
	}
	if(mixer_bird != undefined){
		if(index_bird == ANI_BIRD_ACTION1){
			if(time_now - time_start > 9 * FRAME){
				index_bird = ANI_BIRD_ACTION2;
				changeAction('bird');
				double_opacity = 0;
				loadText();
			}
		}
		else if(index_bird == ANI_BIRD_ACTION2){
			if(time_now - time_start > 13 * FRAME){
				index_bird = ANI_BIRD_ACTION3;
				changeAction('bird');
			}
		}
		mixer_bird.update(double_delta);
	}
	if(mixer_text != undefined){
		if(index_text == ANI_WAIT){
			if(time_now - time_start > 12*FRAME){
				index_text = ANI_TEXT_ACTION1;
				action_text[index_text].play();
			}
		}else if(index_text == ANI_TEXT_ACTION1){	
			if(double_opacity <= 1.0){
				double_opacity += 0.01;
				material_text.opacity = Math.sin(double_opacity);
			}
		}
		mixer_text.update(double_delta);
	}
	requestAnimationFrame(animate);
	orbit.update();
	renderer.render(scene, camera);
}