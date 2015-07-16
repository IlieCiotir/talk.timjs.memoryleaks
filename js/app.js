var soundManager = (function(document) {
	function linkSounds(sounds) {
		var first = sounds[0];
		var tail =sounds.slice(1);
		var previous = first;
		tail.forEach(function(sound) {
			previous.addEventListener('ended', function() {
				sound.play();
			});
			previous = sound;
		});

		return first;
	}

	var mourningSounds = [].slice.call(document.querySelectorAll('.mourn'));
	var rejoiceSounds = [].slice.call(document.querySelectorAll('.rejoice'));
	var mournStarter = linkSounds(mourningSounds);

	///////////////

	return {
		mourn : function() {
			mournStarter.play();
		},

		rejoice: function() {}
	};

})(document);

var app = (function(window, document, soundManager) {
	function Character(name) {
		var elem;
		function init() {
			elem = document.createElement("DIV");
			var img = document.createElement("IMG");
			img.src = "img/" + name.toLowerCase() + ".jpg";
			elem.id = name;
			elem.appendChild(img);
		}

		init();

		///////////////////

		return {
			elem: elem,
			name: name,
		};
	}

	///////////////////

	function initScene() {
		var scene = document.getElementById('scene');
		if(!scene) {
			var scene = document.createElement("main");
			scene.id = 'scene';
			scene.className  = 'content';
			document.querySelector('body').appendChild(scene);
		}
		return scene;
	}

	var scene;
	var charactersToKill = [];
	
	///////////////

	return {
		init: function() {
			for(var i=0; i<100; i++) {
				scene = initScene();
				var kenny = new Character('Kenny');
				charactersToKill.push(kenny);
				scene.appendChild(new Character('Eric').elem);
				scene.appendChild(kenny.elem);
				scene.appendChild(new Character('Kyle').elem);
				scene.appendChild(new Character('Stan').elem);	
			}
		},
		killKennys: function() {
			soundManager.mourn();
			charactersToKill.forEach(function(character) {
				try {
					scene.removeChild(character.elem);
				} catch (e) {console.log(e);}
			});
			
			setTimeout(function() {
				for(var i=0; i<100; i++) {
					var kenny = new Character('Kenny');
					charactersToKill.push(kenny);
					scene.insertBefore(kenny.elem, scene.children[Math.floor(Math.random() * scene.children.length)]);
				}
			}, 1500);
		},
		endShow: function(event) {
			if(event) {
				charactersToKill = [];
				scene.remove();
				scene = null;
			}	
		}
	};

})(window, document, soundManager);
