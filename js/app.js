var soundManager = (function(document) {
	var chars = []
	return {
		registerCharacter: function(character) {
			chars.push(character);
		},

		mourn: function() {
			var previousSound;
			chars.forEach(function(character) {
				var mournSound = document.getElementById(character.sounds.mourn);
				if(mournSound) {
					if(previousSound && !previousSound.ended) {
						previousSound.addEventListener('ended', function() {
							console.log(mournSound);
							previousSound.pause();
							mournSound.play();
						});
					} else {
						mournSound.play();
					}
					previousSound = mournSound;
				}
			});
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
			sounds: {
				mourn: name.toLowerCase() + '_mourn',
				rejoice: name.toLowerCase() + '_rejoice'
			}
		};
	}

	var eric, kenny, kyle, stan, scene;

	///////////////

	return {
		init: function() {

			scene = document.getElementById('scene');
			eric = new Character('Eric');
			kenny = new Character('Kenny');
			kyle = new Character('Kyle');
			stan = new Character('Stan');

			scene.appendChild(eric.elem);
			scene.appendChild(kenny.elem);
			scene.appendChild(kyle.elem);
			scene.appendChild(stan.elem);
			
			soundManager.registerCharacter(eric);
			soundManager.registerCharacter(kenny);
			
			soundManager.registerCharacter(stan);
			soundManager.registerCharacter(kyle);

		},

		killKenny: function() {
			scene.removeChild(kenny.elem);
			soundManager.mourn();

			/*setTimeout(function() {
				kenny = new Character('Kenny');
				scene.appendChild(kenny.elem);
			}, 3000);*/
		}
	};

})(window, document, soundManager);

console.log(screen);