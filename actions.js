$(document).ready(function() {
	//var words = [{"word":"A-gays"},{"word":"Achaea"},{"word":"Ailantus"},{"word":"Anglian"},{"word":"Babylonia"},{"word":"Bakelite"},{"word":"Barbary"},{"word":"Bertie"},{"word":"Bruegel"},{"word":"Burbage"},{"word":"Carter"},{"word":"Caxton"},{"word":"Chameleon"},{"word":"Chechnya"},{"word":"Chleuh"},{"word":"Coalsack"},{"word":"Corbin"},{"word":"Dekker"},{"word":"Dreaming"},{"word":"Erica"},{"word":"Galiza"},{"word":"Gaussian"},{"word":"Georgians"},{"word":"Gironde"},{"word":"Guendolen"},{"word":"Haley"},{"word":"Hawkeye"},{"word":"Iviza"},{"word":"Jinan"},{"word":"Joannes"},{"word":"Lammas"},{"word":"Lanner"},{"word":"Leninism"},{"word":"Lilia"},{"word":"Logroño"},{"word":"Marat"},{"word":"Mawlamyine"},{"word":"Media"},{"word":"Memphis"},{"word":"Midianites"},{"word":"Modon"},{"word":"Mohican"},{"word":"Montespan"},{"word":"Notts"},{"word":"Novembr"},{"word":"O'Reilly"},{"word":"Odinist"},{"word":"Paulist"},{"word":"Podolsk"},{"word":"Powell"},{"word":"Rising Sun"},{"word":"Sagamihara"},{"word":"Santa Ana"},{"word":"Scotticism"},{"word":"Scouters"},{"word":"Sofians"},{"word":"Stettin"},{"word":"Stilwell"},{"word":"Tereus"},{"word":"Timur"},{"word":"Unixy"},{"word":"Velachery"},{"word":"West Allis"},{"word":"Wynette"},{"word":"Zinsser"},{"word":"abrogating"},{"word":"acerbic"},{"word":"adenoma"},{"word":"adiabats"},{"word":"adsorbents"},{"word":"adsorptive"},{"word":"adulterer"},{"word":"afeared"},{"word":"afflicteth"},{"word":"afforests"},{"word":"agamic"},{"word":"aging"},{"word":"airlocks"},{"word":"alcabala"},{"word":"aliquoting"},{"word":"aliskiren"},{"word":"aller"},{"word":"amethyst"},{"word":"amper"},{"word":"anchovy"},{"word":"anthills"},{"word":"antifolk"},{"word":"apathist"},{"word":"aport"},{"word":"arboreous"},{"word":"arbours"},{"word":"armourers"},{"word":"assinine"},{"word":"attics"},{"word":"avenue"},{"word":"avidness"},{"word":"ballistae"},{"word":"bandolier"},{"word":"barratry"},{"word":"bashaw"},{"word":"bazaars"},{"word":"beaute"},{"word":"begynnynge"},{"word":"believable"},{"word":"bellyflop"},{"word":"besties"},{"word":"biggish"},{"word":"billowy"},{"word":"bolide"},{"word":"bolshies"},{"word":"bookishly"},{"word":"boongs"},{"word":"boudoir"},{"word":"brassic"},{"word":"breather"},{"word":"britch"},{"word":"broadside"},{"word":"browned"},{"word":"bugfree"},{"word":"bumming"},{"word":"by-wash"},{"word":"cached"},{"word":"cacography"},{"word":"cafetorium"},{"word":"call-board"},{"word":"cambered"},{"word":"carnage"},{"word":"carom"},{"word":"carthorse"},{"word":"catalysts"},{"word":"cavernlike"},{"word":"celebrates"},{"word":"chagan"},{"word":"chalazae"},{"word":"chartists"},{"word":"cheapen"},{"word":"chicaned"},{"word":"chits"},{"word":"cingulum"},{"word":"clamberer"},{"word":"clasper"},{"word":"clientage"},{"word":"co-wives"},{"word":"coagulants"},{"word":"cob-house"},{"word":"coffinlike"},{"word":"coital"},{"word":"comic"},{"word":"conduit"},{"word":"confusions"},{"word":"connotate"},{"word":"contrasts"},{"word":"corbet"},{"word":"corrival"},{"word":"corrupter"},{"word":"crocks"},{"word":"cumbering"},{"word":"daftest"},{"word":"datarates"},{"word":"dealign"},{"word":"debatably"},{"word":"decalin"},{"word":"deictic"},{"word":"deskwork"},{"word":"dinitrate"},{"word":"diode"},{"word":"discede"},{"word":"discretize"},{"word":"disjoins"},{"word":"disputer"},{"word":"ditambah"},{"word":"djembe"},{"word":"doesnt"},{"word":"dognappers"},{"word":"dominions"},{"word":"dorme"},{"word":"doubters"},{"word":"downdraft"},{"word":"doxepin"},{"word":"dressable"},{"word":"drift-ice"},{"word":"dwell"},{"word":"dynamite"},{"word":"echoey"},{"word":"ecstatical"},{"word":"editting"},{"word":"educator"},{"word":"embracive"},{"word":"en-suite"},{"word":"enmity"},{"word":"entitling"},{"word":"eoraptor"},{"word":"episternal"},{"word":"equatable"},{"word":"erotical"},{"word":"escheats"},{"word":"evaded"},{"word":"exonerates"},{"word":"extracted"},{"word":"eyecup"},{"word":"facedown"},{"word":"fades"},{"word":"faggoting"},{"word":"fateless"},{"word":"faulter"},{"word":"feaster"},{"word":"ferally"},{"word":"fetishize"},{"word":"fillip"},{"word":"finalizing"},{"word":"fineless"},{"word":"firelog"},{"word":"firings"},{"word":"fissure"},{"word":"fitters"},{"word":"fjordlike"},{"word":"flabbier"},{"word":"flaff"},{"word":"flashboard"},{"word":"flowed"},{"word":"follet"},{"word":"footgear"},{"word":"foregather"},{"word":"fosterage"},{"word":"foxberry"},{"word":"frigates"},{"word":"frighting"},{"word":"frotteur"},{"word":"furigana"},{"word":"fuscous"},{"word":"galingale"},{"word":"garnished"},{"word":"gastrin"},{"word":"gemstones"},{"word":"ghoti"},{"word":"giantish"},{"word":"gingerous"},{"word":"gjetost"},{"word":"go-go"},{"word":"godmother"},{"word":"goujons"},{"word":"gravesite"},{"word":"guitarfish"},{"word":"half-uncle"},{"word":"handers"},{"word":"handing"},{"word":"hawbuck"},{"word":"hepps"},{"word":"hissyfit"},{"word":"hittable"},{"word":"hobbly"},{"word":"homemaker"},{"word":"honey"},{"word":"honied"},{"word":"horse-boy"},{"word":"horsehair"},{"word":"hortatives"},{"word":"hothoused"},{"word":"ice-skates"},{"word":"incubators"},{"word":"infare"},{"word":"insipidly"},{"word":"interferon"},{"word":"ivied"},{"word":"jam-packed"},{"word":"japanned"},{"word":"jeoparding"},{"word":"jointing"},{"word":"kalima"},{"word":"katmandu"},{"word":"keycodes"},{"word":"kiloliters"},{"word":"kinit"},{"word":"knotte"},{"word":"knouted"},{"word":"knuckly"},{"word":"landskips"},{"word":"laned"},{"word":"latter"},{"word":"legate"},{"word":"legatura"},{"word":"leggie"},{"word":"lidded"},{"word":"life-guard"},{"word":"loadable"},{"word":"lolcats"},{"word":"longyi"},{"word":"loopers"},{"word":"looters"},{"word":"loquacious"},{"word":"lorica"},{"word":"low-priced"},{"word":"lychgate"},{"word":"madame"},{"word":"madge"},{"word":"managed"},{"word":"mawashi"},{"word":"medevac"},{"word":"medullated"},{"word":"meire"},{"word":"meninges"},{"word":"meshy"},{"word":"mesjid"},{"word":"mildewing"},{"word":"misdialed"},{"word":"misprize"},{"word":"monoids"},{"word":"monomachy"},{"word":"movings"},{"word":"mycetes"},{"word":"nabit"},{"word":"near-blind"},{"word":"nearest"},{"word":"negotiate"},{"word":"nigella"},{"word":"nogoodniks"},{"word":"nonplayer"},{"word":"nooky"},{"word":"noria"},{"word":"nother"},{"word":"numbs"},{"word":"négligée"},{"word":"obtuseness"},{"word":"odorously"},{"word":"one-celled"},{"word":"ophiolites"},{"word":"orogeny"},{"word":"oscines"},{"word":"outclass"},{"word":"outgive"},{"word":"ovenlike"},{"word":"owning"},{"word":"oxidisers"},{"word":"oxymel"},{"word":"pacing"},{"word":"pagus"},{"word":"palettes"},{"word":"palolo"},{"word":"palters"},{"word":"pantlegs"},{"word":"paraben"},{"word":"pardah"},{"word":"partlet"},{"word":"peludo"},{"word":"pemican"},{"word":"pending"},{"word":"phosphoric"},{"word":"photoshop"},{"word":"piddled"},{"word":"pilau"},{"word":"piper"},{"word":"pisang"},{"word":"pisky"},{"word":"plaints"},{"word":"plumery"},{"word":"political"},{"word":"polypoidal"},{"word":"polypore"},{"word":"pomato"},{"word":"positron"},{"word":"power-up"},{"word":"prated"},{"word":"preleased"},{"word":"presagers"},{"word":"presider"},{"word":"privileges"},{"word":"problemed"},{"word":"promise"},{"word":"publicizes"},{"word":"purgation"},{"word":"putamen"},{"word":"pyrex"},{"word":"quadrantes"},{"word":"quilombo"},{"word":"quotum"},{"word":"ramadas"},{"word":"ranching"},{"word":"rapacity"},{"word":"rased"},{"word":"raunchy"},{"word":"refolded"},{"word":"regardless"},{"word":"regelate"},{"word":"rejectable"},{"word":"reoffering"},{"word":"repairmen"},{"word":"repointed"},{"word":"resid"},{"word":"restruck"},{"word":"resumption"},{"word":"rethread"},{"word":"revealment"},{"word":"revest"},{"word":"rhone"},{"word":"ricochets"},{"word":"riesling"},{"word":"rifted"},{"word":"ringside"},{"word":"risers"},{"word":"roaringly"},{"word":"rockmelon"},{"word":"rose-red"},{"word":"sandpiles"},{"word":"saxophones"},{"word":"scramming"},{"word":"scroll"},{"word":"scuppers"},{"word":"seedeaters"},{"word":"self-aware"},{"word":"shadowers"},{"word":"shadowlike"},{"word":"sharara"},{"word":"sheened"},{"word":"shoeful"},{"word":"shot-guns"},{"word":"sigil"},{"word":"skillions"},{"word":"skoff"},{"word":"slavered"},{"word":"slogged"},{"word":"slowcoach"},{"word":"smokier"},{"word":"sniggerers"},{"word":"snowdog"},{"word":"snuck"},{"word":"snudge"},{"word":"sodger"},{"word":"soles"},{"word":"sous-chef"},{"word":"spawns"},{"word":"spittoons"},{"word":"splain"},{"word":"steepish"},{"word":"sterility"},{"word":"stirringly"},{"word":"struldbrug"},{"word":"subplots"},{"word":"subtrees"},{"word":"sural"},{"word":"swappable"},{"word":"syrup"},{"word":"tap-hole"},{"word":"teak-tree"},{"word":"tehsils"},{"word":"temption"},{"word":"terat"},{"word":"thallium"},{"word":"thawy"},{"word":"theorise"},{"word":"thymocytes"},{"word":"time-gun"},{"word":"timepoints"},{"word":"tiros"},{"word":"toling"},{"word":"tongued"},{"word":"tootled"},{"word":"touting"},{"word":"triacle"},{"word":"triatomic"},{"word":"tubercules"},{"word":"tuskers"},{"word":"typescript"},{"word":"ulceration"},{"word":"unberufen"},{"word":"uncunning"},{"word":"uneligible"},{"word":"united"},{"word":"unranked"},{"word":"unseized"},{"word":"unsolid"},{"word":"uroscopy"},{"word":"utilized"},{"word":"valdecoxib"},{"word":"valure"},{"word":"vampish"},{"word":"varoom"},{"word":"vastest"},{"word":"vaulter"},{"word":"versicolor"},{"word":"vicarius"},{"word":"vice-dean"},{"word":"visualised"},{"word":"warmup"},{"word":"washeteria"},{"word":"water-pig"},{"word":"waterbus"},{"word":"welldoing"},{"word":"whammo"},{"word":"wheals"},{"word":"whitings"},{"word":"wholesales"},{"word":"willn't"},{"word":"woodstove"},{"word":"wroken"},{"word":"xiphoid"},{"word":"xylenes"},{"word":"yetis"},{"word":"yinzer"},{"word":"younguns"},{"word":"zealously"}];

	var words = [{'word': 'aaaaaa'}, {'word': 'abbb'}, {'word': 'aabb'}, {'word': 'bbbbbbbb'}, {'word': 'ccccccc'}, {'word': 'dddddddd'}, {'word': 'ffffff'}, {'word': 'ggggggg'}, {'word': 'hhhhhhhhh'}, {'word': 'iiiiiii'}, {'word': 'jjjjjjjj'}, {'word': 'qqqqqqq'}, {'word': 'wwwwwww'}, {'word': 'vvvvvvvv'}, {'word': 'mmmmmmmm'}];
	var levels = {
		'0': {
	        speed: 29,
	        fallingLapse: 1000,
	        words: 6
	    },
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
	var level = 0;

	var easing = 'ease-out';
	var scenario = { width: $('.game').width() };

	//adding words to the page
	$.each(words, function (index, value) {
	    var word = '';
	    var characters = value.word.split('');
	    var wordText = value.word;

	    //for each character
	    for (var i = 0; i < characters.length; i++) {
	        var letter = characters[i];
	        word = word + '<span>' + letter + '</span>';
	    }

	    $('.game').append('<div class="word" data-word="'+wordText+'" id="'+wordText+'">' + word + '</div>');
	});

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
		    var text = words[random].word;
		    var word = $('.word[data-word="'+text+'"]');

		    //removing the word from our words array
		    spliceOne(words, random);

		    word.addClass('active');
	    	setSpeed(word, level);

		    cont++;

		    if(cont > levels[level].words){
		        level++;
		        cont=1;
		        clearInterval(interval);

		        //lapse between levels
		        setTimeout(function(){
		            $('.text span').fadeOut().html('').delay(500).html("Level" + level).fadeIn();

		        	throwWords();
		        }, 4000);

		    }

		}, levels[level].fallingLapse);
	}

	$(document).keypress(function (e) {
	    var value = String.fromCharCode(e.which);

	    //for each non active letter of each active word
	    $('.word.active').each(function () {
	    	var currentLetter = $(this).find('span:not(.active)').first();
	        var word = currentLetter.closest('.word');
	        var wordText = word.data('word');

	        if(currentLetter.is(':first-child') ||  currentLetter.prev().hasClass('active')){
	            if (currentLetter.text() == value && isWordInProgress(wordText)) {
	            	playSound('hit');
	                currentLetter.addClass('active');
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
        var wordText = word.data('word');
		var missile = $('<span class="missile">|</span>');
		var axisX = word.position().left + word.width() / 2;

		//addCss3Property(missile, 'transition', 'all 4000ms ease');
		missile.attr('data-word', wordText).css('left', axisX + 'px');

		$('.game').append(missile);

		//syncronously removing the class after the animation has been applied.
		setTimeout(function(){
			addCss3Property(missile, 'transform', 'translateY(-620px)');
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
	    $('.game').append('<div class="gameOver"><div>Game Over</div></div>');
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

            return audioElement;
        }
    }


    //http://stackoverflow.com/questions/17791602/sound-notifications-in-opera
    function isMpeg(){
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    }

});



