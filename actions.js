$(document).ready(function() {
	//words should fit the "id" format
	var words = ['unbrave','unbruised','journeyer','ives','ursa','contented','ionian','maize','geordie','tanbark','gruelling','saadi','snowbound','glegness','eternise','augmentor','kinfolks','consist','point','pouter','precisian','sundew','tomium','sparrow','delative','polyxenus','unawake','undue','darius','pannage','chillum','amanda','lam','nicotine','handiwork','dumpily','beadily','sukkoth','bonelike','hylozoic','puss','gibbon','suharto','molasses','checkroom','agora','mobocracy','cosiest','slatier','anarch','redundant','corpora','spinozism','kloesse','xanthous','ozocerite','maremma','sleepers','swit','fare','lunated','meleager','prevision','tumaco','unfetter','emissary','botvinnik','rev','giorgione','exciting','famished','kenova','unhuddle','kubango','prelect','hard','andoroba','nauch','publicity','apodemal','argyle','bismarck','hottest','expansile','bigger','poromeric','heron','jungfrau','oidia','pandavas','razeeing','zymologic','roseless','delicia','agacles','unjuicily','coalesce','revoting','thimphu','anatomy','feminie','pyxidia','parousia','shabbier','tempura','vagal','diatribe','deftly','ava','ginkgo','unexhumed','cocoyam','aydelotte','connexion','bagh','alost','machinist','sloane','china','attingent','pustule','yirr','valdosta','interlace','popish','unknelled','redenied','phallus','epaulet','unechoic','angora','church','teledu','quickly','reground','runty','cheshire','scurrile','sheeney','fathomer','sarasvati','gypsyism','ignition','spewer','tankless','unusurped','vale','rejection','anxiety','lacuna','madonna','wider','profferer','sporty','markevich','burger','ephippia','jail','davey','molise','aft','forth','caldaria','outjet','zionist','halachot','recourse','margareta','danseuse','kamet','redefeat','ivor','sitzkrieg','judaea','dupr','backward','gari','discomfit','calgary','complice','colonised','mass','pretender','unionize','manoeuvre','holloaed','paccha','nereid','cardhouse','unfacile','bouillon','accessory','american','unequal','quidnunc','observe','irishised','hoylake','tarried','decried','merl','urolith','trustable','similarly','melpomene','fraught','mango','dana','palencia','margin','zibeline','elucidate','nouma','cete','larum','unpeopled','kanji','unstrewn','aslant','bing','shovel','firework','rampager','antipodes','phrensied','eulogy','idiotise','adamant','preguess','showmanly','tendril','felicidad','liou','senza','ambulated','siloxane','cunt','scientist','illumed','unsmooth','agonist','pyalla','submiss','celluloid','flighty','apriorism','minuend','choicer','preexact','fushun','contusion','acol','foreskin','hostaging','lynchet','atresia','exalter','adieus','unflowing','cousinry','quittable','atomist','rooflike','gavotte','faunally','steampipe','canoodle','unsponged','boltlike','penance','podiums','commit','finalize','landsmaal','natant','tropical','enigma','ticknor','nastiness','varicose','kopje','umbonal','vignette','warded','rainbird','mewar','bullet','narceine','leangle','curtesy','devastate','furrily','strobic','theomancy','mfd','embolus','perutz','eurhythmy','sayers','shapka','goadlike','timbale','ligating','cutwater','salmon','fretwork','mobutu','descartes','craftiest','idyll','capsid','handsewn','abbotcy','absonant','deface','scroop','rort','pup','incarnate','kirigami','frog','unicycle','burgher','allobaric','bizerta','disjaskit','void','dinkiest','gawkier','duello','boresome','snowcreep','autoharp','begabled','foxberry','lumberer','purer','muticous','auber','topiaries','hereupon','elegantly','ranee','haywire','unbay','sorceries','baker','caucasia','cooing','underfed','biography','nonethnic','ozonizer','bowerlike','cullis','pip','exeter','cloakroom','shembe','mycelium','falderol','saltier','smetana','attrahent','diabolize','vampiric','pretimely','fetial','asterion','topmost','phyton','aseity','autobahn','impinger','draftiest','chapatti','orator','dunedin','beatitude','danbury','greg','celebrate','scrip','pithead','iapigia','carbuncle','manila','holler','marital','bisection','shapable','terrier','gullable','syndromic','overwrite','niceness','athetoid','duka','degummed','floc','wady','dogcart','vatted','deckhead','sapwood','addition','plication','sucrose','stanton','lollardy','befall','teughness','alcalde','galumph','panoptic','oriental','wellesley','mutualism','ductwork','everybody','covin','cosiness','pelican','meagerly','wittily','outshaped','baghlan','kelson','vivace','wagnerite','caboodle','wifelike','foretaste','enuring','aspen','cavatina','durban','dulciana','dissenter','outreckon','richfield','retrorse','kerkyra','diosgenin','engage','pulsating','cheddar','melodist','hide','thiazole','bassano','loppy','dabble','nerve','oncost','kay','usa','hechshers','afire','enfetter','useable','poleax','decameron','subhall','ophore','gentisate','cultigen','ampersand','genetic','unwhite','prologise','brynza','unnipped','jag','keifer','schedular','creosotic','homocercy','trogon','chuprassi','pizzicato','lilyan','enc','heeze','verier','archfiend','nares','sorgho','tuberoid','pickled','peanuts','casemate','frond','ghazi','sloshiest','viand','volta','thespiae','greenberg','brand'];

	//var words = ['aaa', 'bbb', 'ccc', 'ddd', 'eee','fff', 'ggg', 'hhh'];
	var levels = {

		//testing levels
		'-2': {
	        speed: 80,
	        fallingLapse: 200,
	        words: 40
	    },
	    '-1': {
	        speed: 80,
	        fallingLapse: 300,
	        words: 80
	    },
	    '0': {
	        speed: 16,
	        fallingLapse: 200,
	        words: 80
	    },


		//game levels
	    '1': {
	        speed: 18,
	        fallingLapse: 3000,
	        words: 6
	    },
	    '2': {
	        speed: 17,
	        fallingLapse: 2800,
	        words: 9
	    },
	    '3': {
	        speed: 16,
	        fallingLapse: 2600,
	        words: 11
	    },
	    '4': {
	        speed: 15,
	        fallingLapse: 2400,
	        words: 13
	    },
	    '5': {
	        speed: 14,
	        fallingLapse: 2100,
	        words: 15
	    },
	    '6': {
	        speed: 13,
	        fallingLapse: 1800,
	        words: 22
	    },
	    '7': {
	        speed: 12,
	        fallingLapse: 1500,
	        words: 27
	    },
	    '8': {
	        speed: 12,
	        fallingLapse: 1200,
	        words: 34
	    },
	    '9': {
	        speed: 11,
	        fallingLapse: 1000,
	        words: 34
	    },
	    '10': {
	        speed: 10,
	        fallingLapse: 1000,
	        words: 34
	    },
	    '11': {
	        speed: 9,
	        fallingLapse: 1000,
	        words: 34
	    },
	    '12': {
	        speed: 9,
	        fallingLapse: 850,
	        words: 34
	    },
	    '13': {
	        speed: 8.5,
	        fallingLapse: 850,
	        words: 34
	    },
	   	'14': {
	        speed: 8,
	        fallingLapse: 800,
	        words: 34
	    },
	   	'15': {
	        speed: 7,
	        fallingLapse: 750,
	        words: 34
	    },
	   	'16': {
	        speed: 7,
	        fallingLapse:700,
	        words: 34
	    },
	   	'17': {
	        speed: 6,
	        fallingLapse: 650,
	        words: 34
	    },
	    '18': {
	        speed: 6,
	        fallingLapse: 600,
	        words: 34
	    },
	    '19': {
	        speed: 6,
	        fallingLapse: 500,
	        words: 34
	    },
	    '20': {
	        speed: 6,
	        fallingLapse: 400,
	        words: 34
	    }
	};

	var speed = 18*1000;
	var fallingLapse = 4000;
	var soundEnabled = true;
	var level = -2;
	var limitImpacts = 3;
	var game = $('#game');
	var levelj = $('#level')[0];
	var mysound = [];
	var sounds = [
		'gameOver',
		'background',
		'newLevel',
		'destroyWord',
		'noLetter',
		'hit',
		'missile'
	];


	var easing = 'ease-out';
	var scenario = { width: game.width() };
	var citiesWidth = $('#city1').width();

	//getting the cities left and right coordinates 
	var cities = {
		city1: {
			left: $('#city1').position().left,
			impacts: 0
		},
		city2: {
			left: $('#city2').position().left,
			impacts: 0
		},
		city3: {
			left: $('#city3').position().left,
			impacts: 0
		}
	};

	$.each(cities, function(index, value){
		cities[index].right = cities[index].left + citiesWidth;
	});


	var allwords = '';

	//creating the words
	$.each(words, function (index, wordText) {
	    var word = '';
	    var characters = wordText.split('');

	    //for each character
	    for (var i = 0; i < characters.length; i++) {
	        var letter = characters[i];
	        word = word + '<span>' + letter + '</span>';
	    }

	    allwords = allwords + '<div class="word" data-word="'+wordText+'" id="'+wordText+'">' + word + '</div>';
	});

	//adding words to the page
	game.append(allwords);
	createSounds(sounds);

	playSound('background', 'loop');

	var activeLetters = {};
	$('.word').each(function(){
		var left = getRandom(scenario.width);
		var right = left + $(this).width();
		if (right >= scenario.width){
			left = left - $(this).width() - 30;
		}
	    $(this).css('left', left);
	    $(this).attr('data-left', left).attr('data-right', right);

	    activeLetters[$(this).data('word')] = 0;
	});


	var cont = 1;
	var interval;

	throwWords();

	var spliceOne = function(arr, index) {
             var len=arr.length;
             if (!len) { return }
             while (index<len) {
                   arr[index] = arr[index+1]; index++ }
             arr.length--;
    };

	function throwWords(){
		interval = setInterval(function () {
		    //moving word down
		    var random = getRandom(words.length);
		    var text = words[random];
		    var word = $('.word[data-word="'+text+'"]');

		    //removing the word from our words array
		    spliceOne(words, random);
		    word[0].classList.add('active');
	    	setSpeed(word, level);

	    	if(cont == 1){
	            levelj.style.display = 'none';
	    	}

		    cont++;

		    if(cont > levels[level].words){
		        level++;
		        cont=1;
		        clearInterval(interval);

		        //lapse between levels
		        setTimeout(function(){
		        	playSound('newLevel');

		        	//hidding current level
		        	var span = document.getElementById("text").getElementsByTagName("span")[0];
		        	span.style.display = 'none';
		            span.innerHTML = level;
		            levelj.innerHTML = "Level" + level;
		            levelj.style.display = 'block';
		            playSound('newLevel');
		        	throwWords();
		        }, 4000);

		    }

		}, levels[level].fallingLapse);
	}

	$(document).keypress(function (e) {
	    var value = String.fromCharCode(e.which);

	    //for each non active letter of each active word
	    var words = document.getElementsByClassName("word active");

		for(var a = 0; a < words.length; a++){
	    	var word = words[a];
	    	var currentLetter = $(word).find('span:not(.active)').first();
	        var wordText = word.getAttribute('data-word');

	        if(currentLetter.is(':first-child') ||  currentLetter.prev().hasClass('active')){
	            if (isWordInProgress(wordText) && currentLetter.text() == value) {
	            	playSound('hit');
	                currentLetter[0].classList.add('active');
	                activeLetters[wordText]++;

	                //remove the word, well done!
	                if(currentLetter.is(':last-child')){
       	            	launchMissile(word);
	                    delete activeLetters[wordText];
	                }
	            }else{
	            	playSound('noLetter');

	            	//removeClass(active);
					var span = word.querySelectorAll('span.active');

					if(span.length){
						//removing the active letters from other words
	            		activeLetters[wordText] = activeLetters[wordText] - word.querySelectorAll('span.active').length;

	            		for (var i = 0; i < span.length; i++) {
					  	  span[i].removeAttribute('class');
						}
					}
	            }
	        }else{
	        	playSound('noLetter');
	        }
	    }
	});

	$(".word").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		checkImpact(this);
		if(!Object.keys(cities).length){
			gameOver();
		}
	});


	$(".missile").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
	    $(this).remove();
	});

	function checkImpact(word){
		var wordLeft = word.getAttribute('data-left');
		var wordRight = word.getAttribute('data-right');

				var wordText = word.getAttribute('data-word');

		for (var key in cities) {
			if( 
				(wordLeft > cities[key].left && wordLeft < cities[key].right) 
				|| (wordRight > cities[key].left && wordLeft < cities[key].left) ){
				impactCity(key);
			}
		}
	}

	function impactCity(key){
		var impacts = ++cities[key].impacts;

		if( impacts >= limitImpacts){
			//console.log("LIMIT - city: " + key);

			document.getElementById(key).style.background = 'black';
			delete cities[key];
		}
		if(impacts == 1){
			//console.log("1 - city: " + key);
			document.getElementById(key).style.background = 'yellow';
		}
		else if(impacts == 2){
			//console.log("2 - city: " + key);
			document.getElementById(key).style.background = 'orange';
		}
	}

	function launchMissile(word){
        var wordText = word.getAttribute('data-word');
		var missile = $('<span class="missile">|</span>');

		var axisX = word.offsetLeft + word.offsetWidth / 2;

		//addCss3Property(missile, 'transition', 'all 4000ms ease');
		missile[0].setAttribute('data-word', wordText);
		missile[0].style.left = axisX + 'px';

		game.append(missile);
		playSound('missile');

		//syncronously removing the class after the animation has been applied.
		setTimeout(function(){
			missile[0].classList.add('active');
		},10);
	}

	var checkCollisions = setInterval(function(){
		$('.missile').each(function(){
			var word = $('#'+ this.getAttribute('data-word'));

			//force reflow (for 3d transformations)
            this.style.visibility = 'visible';

			if( this.getBoundingClientRect().top <= word[0].getBoundingClientRect().top ){
				$(this).remove();
				word.remove();
            	playSound('destroyWord');
			}
		});
	},13);

	function setSpeed(word, level){
		var speed = levels[level].speed * 1000;

		//summing or substracting a random number randomly
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		var random = getRandom( ((22 * speed)/ 100) ) * plusOrMinus;
		speed = speed + random;

	    var transition = 'all ' + speed + 'ms ' + easing;

	    //adding the animation
	    word.css({
	        '-webkit-transition': transition,
	            'transition': transition
	    });
	}

	/**
	* Adds transition animations for the given element
	*/
	function addAnimation(element, transition){
		return element.css({
			'-webkit-transform': transition,
 			'transform': transition
   		});
	}

    function addCss3Property(element, type, values) {
        var css3 = {};

        css3['-webkit-' + type] = values;
        css3['-moz-' + type] = values;
        css3['-ms-' + type] = values;
        css3['-o-' + type] = values;

        element.css(css3);
    }

	/**
	 * Returnsn a random number between two values.
	 */
	function getRandom(limit) {
	    return Math.floor(Math.random() * limit);
	}


	function isWordInProgress(wordText){
	    var word = wordText;

	    //getting the max value from the activeLetters object
	    //http://stackoverflow.com/questions/11142884/fast-way-to-get-the-min-max-values-among-properties-of-object
	    var arr = Object.keys(activeLetters).map(function (key) {
		    return activeLetters[key];
		});
		var max = Math.max.apply(null, arr);

	    return activeLetters[wordText] == max || (activeLetters[wordText] + 1 == max);
	}


	function gameOver(){
	    $('.word').remove();
	    playSound('gameOver');
	    $('#game').append('<div class="gameOver"><div>Game Over</div></div>');

	   	clearInterval(checkCollisions);
	    clearInterval(interval);
		setTimeout(function(){
			pauseSounds(sounds);
		}, 3700);
	}


	 /**
     * Notification sound for every browser.
     */
    function playSound(fileName, options){
        if(soundEnabled){
        	var sound = mysound[fileName];
 
            sound.play();
            sound.currentTime=0
            if(options == 'loop'){
        		sound.loop = true;
        	}
        }
    }



     /**
     * Notification sound for every browser.
     */
    function createSound(fileName){
    	if(soundEnabled){
    		mysound.push(fileName);
            var sound;

            if (!isMpeg()) {
               	sound = new Audio('audio/' + fileName + ".ogg");
            }else{
            	sound = new Audio('audio/' + fileName + ".mp3");
            }

            mysound[fileName] = sound;
        }
    }

    function createSounds(sounds){
    	for(var i=0; i<sounds.length; i++){
    	  	createSound(sounds[i]);
    	}
    }

    function pauseSounds(sounds){
    	for(var i=0; i<sounds.length; i++){
    	  	mysound[sounds[i]].pause();
    	}
    }

    //http://stackoverflow.com/questions/17791602/sound-notifications-in-opera
    function isMpeg(){
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    }

});



