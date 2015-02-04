$(document).ready(function() {
	var words = [{"word":"Abednego"},{"word":"Abramsky"},{"word":"Airedale"},{"word":"Anjouan"},{"word":"Anthony"},{"word":"Appley"},{"word":"Asoka"},{"word":"Baggies"},{"word":"Britten"},{"word":"Bryan"},{"word":"Bursa"},{"word":"Claus"},{"word":"Cordilleras"},{"word":"Cropper"},{"word":"Darius"},{"word":"Datalist"},{"word":"Deutschmark"},{"word":"Elara"},{"word":"Erick"},{"word":"Garonne"},{"word":"Hanukkah"},{"word":"Hawkeye State"},{"word":"Himself"},{"word":"Hortense"},{"word":"Icelandic"},{"word":"Irwin"},{"word":"Khronos"},{"word":"Langland"},{"word":"Lydia's"},{"word":"Marlowe"},{"word":"Merton"},{"word":"Moqui"},{"word":"Occidentalism"},{"word":"Ockham"},{"word":"Ossetian"},{"word":"Royal Navy"},{"word":"Rubbia"},{"word":"Seljuk"},{"word":"Tenishia"},{"word":"Tobler"},{"word":"Torontonian"},{"word":"Uncle Toms"},{"word":"Van Buren"},{"word":"Vogel"},{"word":"Voltaic"},{"word":"Wisconsinite"},{"word":"Wizard of Oz"},{"word":"Zukerman"},{"word":"a-line"},{"word":"abaka"},{"word":"accentuation"},{"word":"accredits"},{"word":"acropolis"},{"word":"adopting"},{"word":"adrenalized"},{"word":"advertizement"},{"word":"affray"},{"word":"agronomists"},{"word":"allotropism"},{"word":"amercements"},{"word":"amplifiable"},{"word":"anticipatory"},{"word":"anticoagulants"},{"word":"antislavery"},{"word":"antistatism"},{"word":"antisymmetric"},{"word":"arbusta"},{"word":"arching"},{"word":"arrastre"},{"word":"arteriola"},{"word":"artistry"},{"word":"asininity"},{"word":"aurantium"},{"word":"availed"},{"word":"axmen"},{"word":"backstrokers"},{"word":"baroreflex"},{"word":"baseband"},{"word":"beerier"},{"word":"beild"},{"word":"bender"},{"word":"beneficient"},{"word":"benorth"},{"word":"beside"},{"word":"bituminous"},{"word":"bleats"},{"word":"blether"},{"word":"breadbox"},{"word":"brits"},{"word":"browning"},{"word":"buck-naked"},{"word":"bulbous"},{"word":"bull-pups"},{"word":"burners"},{"word":"bye-bye"},{"word":"cables"},{"word":"carboy"},{"word":"carefreely"},{"word":"cat-flap"},{"word":"categorizations"},{"word":"chapbook"},{"word":"chemosensors"},{"word":"cinct"},{"word":"cluster"},{"word":"co-processor"},{"word":"coalescences"},{"word":"cock-sparrow"},{"word":"common-law"},{"word":"commutability"},{"word":"compressibility"},{"word":"concerti"},{"word":"confirmable"},{"word":"consists"},{"word":"constructionist"},{"word":"consumpt"},{"word":"contactable"},{"word":"contemneth"},{"word":"coracoid"},{"word":"corella"},{"word":"cosmopolite"},{"word":"coulometric"},{"word":"coverts"},{"word":"crab-shell"},{"word":"crackerlike"},{"word":"crowberry"},{"word":"crupper"},{"word":"cuculi"},{"word":"cultivating"},{"word":"cummed"},{"word":"curtness"},{"word":"cybercafes"},{"word":"cyberslacking"},{"word":"cyberterrorist"},{"word":"cytochrome"},{"word":"dark-skinned"},{"word":"dauphiness"},{"word":"daylilies"},{"word":"dead-on"},{"word":"decremental"},{"word":"defendants"},{"word":"demonstrance"},{"word":"derma"},{"word":"describer"},{"word":"desolateness"},{"word":"desorption"},{"word":"desse"},{"word":"destigmatized"},{"word":"detorted"},{"word":"dextrocardia"},{"word":"dickweed"},{"word":"dielectric"},{"word":"diesels"},{"word":"diffusiveness"},{"word":"dingoes"},{"word":"disadvantage"},{"word":"disbound"},{"word":"disclaims"},{"word":"discontinues"},{"word":"disect"},{"word":"dishearteningly"},{"word":"dissaving"},{"word":"dogfooded"},{"word":"dovecote"},{"word":"down-time"},{"word":"dryads"},{"word":"durational"},{"word":"earth-ball"},{"word":"edited"},{"word":"electrophorus"},{"word":"electroweak"},{"word":"emittance"},{"word":"energies"},{"word":"enigmatical"},{"word":"enslaver"},{"word":"etendue"},{"word":"ethylenediamine"},{"word":"eudaemonia"},{"word":"euryceros"},{"word":"eventuation"},{"word":"ex-husband"},{"word":"excerpt"},{"word":"excise-tax"},{"word":"explicated"},{"word":"fabbing"},{"word":"factorship"},{"word":"fambly"},{"word":"fanaticized"},{"word":"farm-hand"},{"word":"fault-scarp"},{"word":"fayre"},{"word":"fayres"},{"word":"fecundation"},{"word":"fetchingly"},{"word":"figurante"},{"word":"finishes"},{"word":"flaked"},{"word":"fleecing"},{"word":"flexitime"},{"word":"floors"},{"word":"forejudged"},{"word":"four-petaled"},{"word":"fourteenth"},{"word":"frabbit"},{"word":"fraile"},{"word":"fraughts"},{"word":"freeform"},{"word":"freeloads"},{"word":"freeskiing"},{"word":"frictional"},{"word":"functorial"},{"word":"gaffled"},{"word":"gateless"},{"word":"geoarchaeology"},{"word":"gipsying"},{"word":"glacis"},{"word":"glad-hands"},{"word":"go-betweens"},{"word":"go-off"},{"word":"goethite"},{"word":"goloshes"},{"word":"grinding"},{"word":"groom-porter"},{"word":"guest-house"},{"word":"gunfighters"},{"word":"guttling"},{"word":"half-bound"},{"word":"harvestable"},{"word":"hebdomad"},{"word":"hedonics"},{"word":"high-risers"},{"word":"histrionism"},{"word":"honey"},{"word":"hooning"},{"word":"hooplas"},{"word":"horrent"},{"word":"humanise"},{"word":"humate"},{"word":"hussy"},{"word":"hybrid"},{"word":"hydrinos"},{"word":"hydrobromide"},{"word":"hypochlorites"},{"word":"icosahedrons"},{"word":"illegalise"},{"word":"impoundment"},{"word":"inconscient"},{"word":"indegree"},{"word":"infraclavicular"},{"word":"inmost"},{"word":"innerbelt"},{"word":"inopportunity"},{"word":"inorganical"},{"word":"insane"},{"word":"inspirable"},{"word":"interictal"},{"word":"interpositive"},{"word":"intervene"},{"word":"ironware"},{"word":"irreverent"},{"word":"irrevocableness"},{"word":"jerrybuilt"},{"word":"jocularities"},{"word":"journalers"},{"word":"kalimbas"},{"word":"kashag"},{"word":"ketoses"},{"word":"kilter"},{"word":"kitchenette"},{"word":"lactivist"},{"word":"lagtime"},{"word":"landfilling"},{"word":"lapidaries"},{"word":"lateen"},{"word":"layoffs"},{"word":"leadbelly"},{"word":"leggers"},{"word":"lemony"},{"word":"life-ring"},{"word":"lightships"},{"word":"lingered"},{"word":"linguistics"},{"word":"linkers"},{"word":"liverless"},{"word":"loseable"},{"word":"lovyers"},{"word":"lowse"},{"word":"maidism"},{"word":"mandolinlike"},{"word":"manse"},{"word":"mariner"},{"word":"match-maker"},{"word":"matchmaking"},{"word":"matchwood"},{"word":"memorialized"},{"word":"mesoporous"},{"word":"microbrew"},{"word":"midshow"},{"word":"miscalculated"},{"word":"misease"},{"word":"mocker"},{"word":"molecule"},{"word":"monocalcium"},{"word":"moobs"},{"word":"mulched"},{"word":"mullions"},{"word":"multiheaded"},{"word":"mummify"},{"word":"munchkin"},{"word":"mustiest"},{"word":"nacre"},{"word":"naiads"},{"word":"naias"},{"word":"naturists"},{"word":"nifedipine"},{"word":"nizatidine"},{"word":"noblewoman"},{"word":"nonfit"},{"word":"nonmembers"},{"word":"nonmetastatic"},{"word":"nonprosecution"},{"word":"nonthreatening"},{"word":"obesse"},{"word":"obliviously"},{"word":"operativeness"},{"word":"originative"},{"word":"outfight"},{"word":"overcorrects"},{"word":"overheatedness"},{"word":"overshoes"},{"word":"pacificator"},{"word":"pacificism"},{"word":"padrao"},{"word":"palmistry"},{"word":"pantlegs"},{"word":"partitional"},{"word":"pedants"},{"word":"perquisites"},{"word":"persued"},{"word":"perusing"},{"word":"phantasma"},{"word":"philias"},{"word":"phony"},{"word":"pinhead"},{"word":"piranha"},{"word":"pleonasms"},{"word":"plomb"},{"word":"plummet"},{"word":"pnictide"},{"word":"polytomies"},{"word":"poormouth"},{"word":"potentilla"},{"word":"prandial"},{"word":"predated"},{"word":"prelates"},{"word":"preplan"},{"word":"presphenoid"},{"word":"prevalent"},{"word":"protracted"},{"word":"pseudochrysalis"},{"word":"psoralens"},{"word":"psyllids"},{"word":"puericulture"},{"word":"puritanic"},{"word":"quacker"},{"word":"quadragesima"},{"word":"qualms"},{"word":"radiometry"},{"word":"radon"},{"word":"rakyat"},{"word":"ransacking"},{"word":"rasterised"},{"word":"reasserts"},{"word":"reciprocation"},{"word":"recreating"},{"word":"red-throated"},{"word":"redemptive"},{"word":"redownloading"},{"word":"reforging"},{"word":"regimen"},{"word":"reinflamed"},{"word":"repin"},{"word":"retailor"},{"word":"reviewers"},{"word":"revocatory"},{"word":"rewinded"},{"word":"ridges"},{"word":"rinpoche"},{"word":"ruminantly"},{"word":"salvific"},{"word":"saurischian"},{"word":"scape"},{"word":"sclerophylly"},{"word":"scrying"},{"word":"sea-sickness"},{"word":"semimonthly"},{"word":"sepium"},{"word":"serging"},{"word":"servery"},{"word":"sex-plus"},{"word":"shelve"},{"word":"shiatsu"},{"word":"shill"},{"word":"shortened"},{"word":"shortlist"},{"word":"showbiz"},{"word":"skeezy"},{"word":"skiagraph"},{"word":"sleepe"},{"word":"slept"},{"word":"snaggers"},{"word":"sophistically"},{"word":"sorrily"},{"word":"spaceship"},{"word":"spinoffs"},{"word":"sponge"},{"word":"spriggy"},{"word":"squillion"},{"word":"steamboating"},{"word":"stencil"},{"word":"stencils"},{"word":"stereochemical"},{"word":"sticklike"},{"word":"stochastic"},{"word":"stonker"},{"word":"struth"},{"word":"subletting"},{"word":"subtask"},{"word":"supervisory"},{"word":"swiveling"},{"word":"swivelling"},{"word":"symlink"},{"word":"tea-biscuit"},{"word":"telemarketing"},{"word":"termed"},{"word":"termer"},{"word":"termini"},{"word":"terrariums"},{"word":"testator"},{"word":"third-world"},{"word":"throughout"},{"word":"titleholder"},{"word":"toadish"},{"word":"tokens"},{"word":"tonged"},{"word":"traceried"},{"word":"tractate"},{"word":"tranched"},{"word":"traumatize"},{"word":"treasurable"},{"word":"triliteral"},{"word":"tripoli"},{"word":"tripped"},{"word":"triviality"},{"word":"trochophore"},{"word":"tubectomy"},{"word":"ubiquinol"},{"word":"umble"},{"word":"umbrello"},{"word":"unaltered"},{"word":"unbonnet"},{"word":"uncredible"},{"word":"underlayers"},{"word":"unenquiring"},{"word":"unguardable"},{"word":"unindent"},{"word":"unplausible"},{"word":"unputdownable"},{"word":"unseemly"},{"word":"unshare"},{"word":"unstocked"},{"word":"unsubsidized"},{"word":"unwalled"},{"word":"upstair"},{"word":"upwelled"},{"word":"urticaria"},{"word":"vagrant"},{"word":"valving"},{"word":"vandalization"},{"word":"varve"},{"word":"vaults"},{"word":"verily"},{"word":"villatic"},{"word":"virality"},{"word":"vittles"},{"word":"voluntaryist"},{"word":"wagon-lit"},{"word":"wakeboarding"},{"word":"wanderjahr"},{"word":"war-ridden"},{"word":"wargame"},{"word":"watcher"},{"word":"wattage"},{"word":"well-in"},{"word":"wolf-sized"},{"word":"woodenly"},{"word":"yearly"},{"word":"yellow-spotted"},{"word":"yonker"},{"word":"zappier"},{"word":"etoiles"}];
	var levels = {
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
	var level = 6;

	var easing = 'ease-out';
	var scenario = { width: $('.game').width() };

	//adding words to the page
	$.each(words, function (index, value) {
	    var word = '';
	    var characters = value.word.split('');

	    //for each character
	    for (var i = 0; i < characters.length; i++) {
	        var letter = characters[i];
	        word = word + '<span>' + letter + '</span>';
	    }

	    $('.game').append('<div class="word" data-word="'+value.word+'">' + word + '</div>');
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

	function throwWords(){
		interval = setInterval(function () {
		    //moving word down
		    var random = getRandom(words.length);
		    var text = words[random].word;
		    var word = $('.word[data-word="'+text+'"]');

		    //removing the word from our words array
		    words.splice(random, 1);

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
	    $('.word.active span:not(.active)').each(function () {
	        var word = $(this).closest('.word');
	        var wordText = word.data('word');
	        if($(this).is(':first-child') ||  $(this).prev().hasClass('active')){
	            console.log("is in progress: " + isWordInProgress(wordText));
	            if ($(this).text() == value && isWordInProgress(wordText)) {
	            	playSound('hit');
	                $(this).addClass('active');
	                activeLetters[wordText]++;

	                //remove the word, well done!
	                if($(this).is(':last-child')){
	                    console.log("borro: " + $(this).closest('.word').attr('data-word'));
	                     $(this).closest('.word').remove();
	                    delete activeLetters[wordText];
	                }
	            }else{
	            	playSound('noLetter');
	            }
	        }
	    });

	    $('.word').each(function(){
	        var wordText = $(this).data('word');

	        var lastActiveLetter = $(this).find('span.active').last();
	        if(typeof lastActiveLetter !== 'undefined' &&
	           lastActiveLetter.text() != value){
	           activeLetters[wordText] = parseInt(activeLetters[wordText] - $(this).find('span.active').length);
	            $(this).find('span').removeClass('active');

	        }
	    });

	});

	$(".word").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
	    gameOver();
	});


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
	    console.log(activeLetters[wordText]  + " vs " + max);
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



