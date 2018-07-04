/* some variables related to Three.js are located at index.js */
var clock, camera, scene, renderer, orbit, particles;

var action_star, action_bird, action_text;
var index_star = ANI_STAR_ACTION1;
var index_bird = ANI_BIRD_ACTION1;
var index_text = ANI_WAIT;
var index_snow = ANI_WAIT;
var time_start, time_now;

var double_delta;
var opacity_snow = 0;
var opacity_text = 0;
var material_text, material_particle;
/* some variables related to Three.js are located at index.js */

var bool_font = false;
var bool_img = false;

$(document).ready( function() {
	$('#div_loading').css('display','none');
	$('#div_content').animate({opacity:1}, 1000);

	if(home < 1){
			$('#first').css('animation-delay','5.1s');
			$('#second').css('animation-delay','5.7s');
			$('#img_habit').css('animation-delay','6.3s');
	}

	$('#first').html(static_intro0.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
	$('#second').html(static_intro1.replace(/&lt;/g,"<").replace(/&gt;/g,">"));

	resizeFont();
	resizeHabit();
});
$(window).resize(function (){
	resizeFont();
	resizeHabit();
});

function resizeFont(){
	var int_width = $(window).width();
	if(int_width < 800){
		$('#first').css('display', 'none');
		$('#second').css('display', 'none');
		bool_font = true;
	}else{
		if(bool_font == true){
			bool_font = false;
			$('#first').css('display', 'block');
			$('#second').css('display', 'block');
			$('#first').css('animation-delay', '0s');
			$('#second').css('animation-delay', '0s');
		}
		$('#first').css('font-size', 0.015 * int_width + 'pt');
		$('#second').css('font-size', 0.01 * int_width + 'pt');
	}	
	
}

function resizeHabit(){
	var int_width = $(window).width();
	var int_height = $(window).height();
	var int_textBottom = $('#second').offset().top+$('#second').height();
	$('#img_habit').css('width', 0.4 * int_width - 100);
	var int_imgHeight = $('#img_habit').height();
	
	if(int_height - int_textBottom < int_imgHeight + 20){
		$('#img_habit').css('display', 'none');
		bool_img = true;
	}else if(int_width < 800){
		$('#img_habit').css('display', 'none');
		bool_img = true;
	}else{
		if(bool_img == true){
			bool_img = false;
			$('#img_habit').css('animation-delay', '0s');
			$('#img_habit').css('display', 'block');
		}
	}
}

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
			action_star[i].clampWhenFinished = true;
		}
		scene.add(model);

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
	});
}

function loadSnow(){
	var int_width = $(window).width() - 200;
	var int_height = $(window).height()-120;
	var nx = int_width / 24;
	var mx = nx * 2;
	var ny = int_height / 36;
	var my = ny * 2;
	var nz = int_width / 36;
	var mz = nz * 2;
	particles = new THREE.Geometry;
	for (var i = 0, particle, x, y, z; i < int_particleCount; i++) {
		x = Math.random() * mx - nx;
		y = Math.random()* my - ny;
		z = Math.random()* mz - nz;
		particle = new THREE.Vector3(x, y, z);
		particle.velocity = {};
		particle.velocity.y = - 0.4 * Math.random() - 0.1;
		particles.vertices.push(particle);
	}
	material_particle = new THREE.PointsMaterial({
		size: 4,
		map: new THREE.TextureLoader().load(static_snow),
		blending: THREE.AdditiveBlending,
		depthTest: true,
		transparent: true
	});
	scene.add(new THREE.Points(particles, material_particle));
	index_snow++;
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

function updateSnow(){
	var int_height = $(window).height()-120;
	var double_limit = int_height * 0.03;
	for(var i = int_particleCount - 1, particle; i >= 0; i--) {
		particle = particles.vertices[i];
		if (particle.y < -double_limit) 
			particle.y = double_limit;
		particle.y += particle.velocity.y;
	}
	particles.verticesNeedUpdate = true;
};

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
				loadSnow();
			}
		}
		else if(index_star == ANI_WAIT){
			if(time_now - time_start > 9 * FRAME){
				index_star = ANI_STAR_ACTION2;
				changeAction('star');
			}
		}
		mixer_star.update(double_delta);
	}
	if(mixer_bird != undefined){
		if(index_bird == ANI_BIRD_ACTION1){
			if(time_now - time_start > 9 * FRAME){
				index_bird = ANI_BIRD_ACTION2;
				changeAction('bird');
				opacity_text = 0;
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
			if(opacity_text <= 1.0){
				opacity_text += 0.01;
				material_text.opacity = Math.sin(opacity_text);
			}
		}
		mixer_text.update(double_delta);
	}
	requestAnimationFrame(animate);
	orbit.update();
	renderer.render(scene, camera);
	if(index_snow != ANI_WAIT){
		if(opacity_snow <= 1.0){
			opacity_snow += 0.01;
			material_particle.opacity = Math.sin(opacity_snow);
		}
		updateSnow();
	}
}