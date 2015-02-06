$(document).ready(function() {
	//words should fit the "id" format
	var words = ['unbrave','unbruised','journeyer','ives','ursa','contented','ionian','maize','geordie','tanbark','gruelling','saadi','snowbound','glegness','eternise','augmentor','kinfolks','consist','point','pouter','precisian','sundew','tomium','sparrow','delative','polyxenus','unawake','undue','darius','pannage','chillum','amanda','lam','nicotine','handiwork','dumpily','beadily','sukkoth','bonelike','hylozoic','puss','gibbon','suharto','molasses','checkroom','agora','mobocracy','cosiest','slatier','anarch','redundant','corpora','spinozism','kloesse','xanthous','ozocerite','maremma','sleepers','swit','fare','lunated','meleager','prevision','tumaco','unfetter','emissary','botvinnik','rev','giorgione','exciting','famished','kenova','unhuddle','kubango','prelect','hard','andoroba','nauch','publicity','apodemal','argyle','bismarck','hottest','expansile','bigger','poromeric','heron','jungfrau','oidia','pandavas','razeeing','zymologic','roseless','delicia','agacles','unjuicily','coalesce','revoting','thimphu','anatomy','feminie','pyxidia','parousia','shabbier','tempura','vagal','diatribe','deftly','ava','ginkgo','unexhumed','cocoyam','aydelotte','connexion','bagh','alost','machinist','sloane','china','attingent','pustule','yirr','valdosta','interlace','popish','unknelled','redenied','phallus','epaulet','unechoic','angora','church','teledu','quickly','reground','runty','cheshire','scurrile','sheeney','fathomer','sarasvati','gypsyism','ignition','spewer','tankless','unusurped','vale','rejection','anxiety','lacuna','madonna','wider','profferer','sporty','markevich','burger','ephippia','jail','davey','molise','aft','forth','caldaria','outjet','zionist','halachot','recourse','margareta','danseuse','kamet','redefeat','ivor','sitzkrieg','judaea','dupr','backward','gari','discomfit','calgary','complice','colonised','mass','pretender','unionize','manoeuvre','holloaed','paccha','nereid','cardhouse','unfacile','bouillon','accessory','american','unequal','quidnunc','observe','irishised','hoylake','tarried','decried','merl','urolith','trustable','similarly','melpomene','fraught','mango','dana','palencia','margin','zibeline','elucidate','nouma','cete','larum','unpeopled','kanji','unstrewn','aslant','bing','shovel','firework','rampager','antipodes','phrensied','eulogy','idiotise','adamant','preguess','showmanly','tendril','felicidad','liou','senza','ambulated','siloxane','cunt','scientist','illumed','unsmooth','agonist','pyalla','submiss','celluloid','flighty','apriorism','minuend','choicer','preexact','fushun','contusion','acol','foreskin','hostaging','lynchet','atresia','exalter','adieus','unflowing','cousinry','quittable','atomist','rooflike','gavotte','faunally','steampipe','canoodle','unsponged','boltlike','penance','podiums','commit','finalize','landsmaal','natant','tropical','enigma','ticknor','nastiness','varicose','kopje','umbonal','vignette','warded','rainbird','mewar','bullet','narceine','leangle','curtesy','devastate','furrily','strobic','theomancy','mfd','embolus','perutz','eurhythmy','sayers','shapka','goadlike','timbale','ligating','cutwater','salmon','fretwork','mobutu','descartes','craftiest','idyll','capsid','handsewn','abbotcy','absonant','deface','scroop','rort','pup','incarnate','kirigami','frog','unicycle','burgher','allobaric','bizerta','disjaskit','void','dinkiest','gawkier','duello','boresome','snowcreep','autoharp','begabled','foxberry','lumberer','purer','muticous','auber','topiaries','hereupon','elegantly','ranee','haywire','unbay','sorceries','baker','caucasia','cooing','underfed','biography','nonethnic','ozonizer','bowerlike','cullis','pip','exeter','cloakroom','shembe','mycelium','falderol','saltier','smetana','attrahent','diabolize','vampiric','pretimely','fetial','asterion','topmost','phyton','aseity','autobahn','impinger','draftiest','chapatti','orator','dunedin','beatitude','danbury','greg','celebrate','scrip','pithead','iapigia','carbuncle','manila','holler','marital','bisection','shapable','terrier','gullable','syndromic','overwrite','niceness','athetoid','duka','degummed','floc','wady','dogcart','vatted','deckhead','sapwood','addition','plication','sucrose','stanton','lollardy','befall','teughness','alcalde','galumph','panoptic','oriental','wellesley','mutualism','ductwork','everybody','covin','cosiness','pelican','meagerly','wittily','outshaped','baghlan','kelson','vivace','wagnerite','caboodle','wifelike','foretaste','enuring','aspen','cavatina','durban','dulciana','dissenter','outreckon','richfield','retrorse','kerkyra','diosgenin','engage','pulsating','cheddar','melodist','hide','thiazole','bassano','loppy','dabble','nerve','oncost','kay','usa','hechshers','afire','enfetter','useable','poleax','decameron','subhall','ophore','gentisate','cultigen','ampersand','genetic','unwhite','prologise','brynza','unnipped','jag','keifer','schedular','creosotic','homocercy','trogon','chuprassi','pizzicato','lilyan','enc','heeze','verier','archfiend','nares','sorgho','tuberoid','pickled','peanuts','casemate','frond','ghazi','sloshiest','viand','volta','thespiae','greenberg','brand'];

	//var words = [{'word': 'aaaaaa'}, {'word': 'aaaaab'}, {'word': 'aaaaac'}, {'word': 'aaaaad'}];
	var levels = {

		//testing levels
		'-2': {
	        speed: 16,
	        fallingLapse: 1000,
	        words: 6
	    },
	    '-1': {
	        speed: 16,
	        fallingLapse: 1000,
	        words: 6
	    },
	    '0': {
	        speed: 16,
	        fallingLapse: 1000,
	        words: 6
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
	        words: 12
	    },
	    '4': {
	        speed: 15,
	        fallingLapse: 2400,
	        words: 15
	    },
	    '5': {
	        speed: 14,
	        fallingLapse: 2100,
	        words: 19
	    },
	    '6': {
	        speed: 13,
	        fallingLapse: 1800,
	        words: 24
	    },
	    '7': {
	        speed: 12,
	        fallingLapse: 1500,
	        words: 29
	    },
	    '8': {
	        speed: 11,
	        fallingLapse: 1200,
	        words: 36
	    }
	};

	var speed = 18*1000;
	var fallingLapse = 4000;
	var soundEnabled = true;
	var level = 2;
	var game = $('#game');
	var levelj = $('#level')[0];

	var easing = 'ease-out';
	var scenario = { width: game.width() };

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
	playSound('background');

	var activeLetters = {};
	$('.word').each(function(){
		var left = getRandom(scenario.width);
		if (left + $(this).width() >= scenario.width){
			left = left - $(this).width() - 30;
		}
	    $(this).css('left', left);
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
	            console.log("hide!!!!");
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
		            console.log("display!!!");
		            playSound('newLevel');
		        	throwWords();
		        }, 4000);

		    }

		}, levels[level].fallingLapse);
	}

	$(document).keypress(function (e) {
	    var value = String.fromCharCode(e.which);

	    //for each non active letter of each active word
	    $('.word.active').each(function () {
	    	var word = $(this);
	    	var currentLetter = $(this).find('span:not(.active)').first();
	        var wordText = word[0].getAttribute('data-word');

	        if(currentLetter.is(':first-child') ||  currentLetter.prev().hasClass('active')){
	            if (currentLetter.text() == value && isWordInProgress(wordText)) {
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

        		    //removing the active letters from other words
	            	activeLetters[wordText] = parseInt(activeLetters[wordText] - $(this).find('span.active').length);

	       			$(this).find('span').removeClass('active');
	            }
	        }else{
	        	playSound('noLetter');
	        }
	    });
	});

	$(".word").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
	    gameOver();
	});


	$(".missile").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
	    $(this).remove();
	});

	function launchMissile(word){
        var wordj = word[0];
        var wordText = wordj.getAttribute('data-word');
		var missile = $('<span class="missile">|</span>');
		console.log(wordj.getBoundingClientRect());
		var axisX = wordj.offsetLeft + wordj.offsetWidth / 2;

		//addCss3Property(missile, 'transition', 'all 4000ms ease');
		missile[0].setAttribute('data-word', wordText);
		missile[0].style.left = axisX + 'px';

		console.log(missile);

		game.append(missile);

		//syncronously removing the class after the animation has been applied.
		setTimeout(function(){
			missile[0].classList.add('active');
		},10);
	}

	setInterval(function(){
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
	},10);

	function setSpeed(word, level){
		var speed = levels[level].speed * 1000;

		//summing or substracting a random number randomly
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		var random = getRandom(4000) * plusOrMinus;
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
	    var max = 0;
	    var word = wordText;

	    $.each(activeLetters, function(index, value){
	        if(max < value){
	            max = value;
	            word = index;
	        }
	    });

	    return activeLetters[wordText] == max || (activeLetters[wordText] + 1 == max);
	}


	function gameOver(){
	    $('.word').remove();
	    playSound('gameOver');
	    $('#game').append('<div class="gameOver"><div>Game Over</div></div>');
	}


	 /**
     * Notification sound for every browser.
     */
    function playSound(fileName){
        if(soundEnabled){
            var audioElement = document.createElement('audio');

            if (!isMpeg()) {
                audioElement.setAttribute('src', "audio/" + fileName + ".ogg");
                audioElement.setAttribute('type', 'audio/ogg');
            }else{
                audioElement.setAttribute('src', "audio/" + fileName + ".mp3");
                audioElement.setAttribute('type', 'audio/mpeg');
            }

            audioElement.setAttribute('autoplay', 'autoplay');

            audioElement.addEventListener("load", function() {
                audioElement.play();
            }, true);
        }
    }


    //http://stackoverflow.com/questions/17791602/sound-notifications-in-opera
    function isMpeg(){
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    }

});



