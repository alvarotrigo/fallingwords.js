/*!
 * Falling Words Game 1.0.0
 * https://github.com/alvarotrigo/fallingwords.js
 * @license MIT licensed
 *
 * Copyright (C) 2017 alvarotrigo.com - A project by Alvaro Trigo
 */
(function($) {

    //polify
    var requestAnimFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    window.fallingWords = function(){
        var self = this;

        //selectors
        var WORD_SEL = '.word';
        var MISSILE_SEL = '.missile';

        var $g_game = $('#game');
        var $g_level = $('#level')[0];
        var $g_score = $('.gameInfo-score-value')[0];

        //words should fit the "id" format
        var g_words = ['unbrave','unbruised','journeyer','ives','ursa','contented','ionian','maize','geordie','tanbark','gruelling','saadi','snowbound','glegness','eternise','augmentor','kinfolks','consist','point','pouter','precisian','sundew','tomium','sparrow','delative','polyxenus','unawake','undue','darius','pannage','chillum','amanda','lam','nicotine','handiwork','dumpily','beadily','sukkoth','bonelike','hylozoic','puss','gibbon','suharto','molasses','checkroom','agora','mobocracy','cosiest','slatier','anarch','redundant','corpora','spinozism','kloesse','xanthous','ozocerite','maremma','sleepers','swit','fare','lunated','meleager','prevision','tumaco','unfetter','emissary','botvinnik','rev','giorgione','exciting','famished','kenova','unhuddle','kubango','prelect','hard','andoroba','nauch','publicity','apodemal','argyle','bismarck','hottest','expansile','bigger','poromeric','heron','jungfrau','oidia','pandavas','razeeing','zymologic','roseless','delicia','agacles','unjuicily','coalesce','revoting','thimphu','anatomy','feminie','pyxidia','parousia','shabbier','tempura','vagal','diatribe','deftly','ava','ginkgo','unexhumed','cocoyam','aydelotte','connexion','bagh','alost','machinist','sloane','china','attingent','pustule','yirr','valdosta','interlace','popish','unknelled','redenied','phallus','epaulet','unechoic','angora','church','teledu','quickly','reground','runty','cheshire','scurrile','sheeney','fathomer','sarasvati','gypsyism','ignition','spewer','tankless','unusurped','vale','rejection','anxiety','lacuna','madonna','wider','profferer','sporty','markevich','burger','ephippia','jail','davey','molise','aft','forth','caldaria','outjet','zionist','halachot','recourse','margareta','danseuse','kamet','redefeat','ivor','sitzkrieg','judaea','dupr','backward','gari','discomfit','calgary','complice','colonised','mass','pretender','unionize','manoeuvre','holloaed','paccha','nereid','cardhouse','unfacile','bouillon','accessory','american','unequal','quidnunc','observe','irishised','hoylake','tarried','decried','merl','urolith','trustable','similarly','melpomene','fraught','mango','dana','palencia','margin','zibeline','elucidate','nouma','cete','larum','unpeopled','kanji','unstrewn','aslant','bing','shovel','firework','rampager','antipodes','phrensied','eulogy','idiotise','adamant','preguess','showmanly','tendril','felicidad','liou','senza','ambulated','siloxane','cunt','scientist','illumed','unsmooth','agonist','pyalla','submiss','celluloid','flighty','apriorism','minuend','choicer','preexact','fushun','contusion','acol','foreskin','hostaging','lynchet','atresia','exalter','adieus','unflowing','cousinry','quittable','atomist','rooflike','gavotte','faunally','steampipe','canoodle','unsponged','boltlike','penance','podiums','commit','finalize','landsmaal','natant','tropical','enigma','ticknor','nastiness','varicose','kopje','umbonal','vignette','warded','rainbird','mewar','bullet','narceine','leangle','curtesy','devastate','furrily','strobic','theomancy','mfd','embolus','perutz','eurhythmy','sayers','shapka','goadlike','timbale','ligating','cutwater','salmon','fretwork','mobutu','descartes','craftiest','idyll','capsid','handsewn','abbotcy','absonant','deface','scroop','rort','pup','incarnate','kirigami','frog','unicycle','burgher','allobaric','bizerta','disjaskit','void','dinkiest','gawkier','duello','boresome','snowcreep','autoharp','begabled','foxberry','lumberer','purer','muticous','auber','topiaries','hereupon','elegantly','ranee','haywire','unbay','sorceries','baker','caucasia','cooing','underfed','biography','nonethnic','ozonizer','bowerlike','cullis','pip','exeter','cloakroom','shembe','mycelium','falderol','saltier','smetana','attrahent','diabolize','vampiric','pretimely','fetial','asterion','topmost','phyton','aseity','autobahn','impinger','draftiest','chapatti','orator','dunedin','beatitude','danbury','greg','celebrate','scrip','pithead','iapigia','carbuncle','manila','holler','marital','bisection','shapable','terrier','gullable','syndromic','overwrite','niceness','athetoid','duka','degummed','floc','wady','dogcart','vatted','deckhead','sapwood','addition','plication','sucrose','stanton','lollardy','befall','teughness','alcalde','galumph','panoptic','oriental','wellesley','mutualism','ductwork','everybody','covin','cosiness','pelican','meagerly','wittily','outshaped','baghlan','kelson','vivace','wagnerite','caboodle','wifelike','foretaste','enuring','aspen','cavatina','durban','dulciana','dissenter','outreckon','richfield','retrorse','kerkyra','diosgenin','engage','pulsating','cheddar','melodist','hide','thiazole','bassano','loppy','dabble','nerve','oncost','kay','usa','hechshers','afire','enfetter','useable','poleax','decameron','subhall','ophore','gentisate','cultigen','ampersand','genetic','unwhite','prologise','brynza','unnipped','jag','keifer','schedular','creosotic','homocercy','trogon','chuprassi','pizzicato','lilyan','enc','heeze','verier','archfiend','nares','sorgho','tuberoid','pickled','peanuts','casemate','frond','ghazi','sloshiest','viand','volta','thespiae','greenberg','brand'];
        var g_activeLetters = {};
        var g_cont = 1;
        var g_score = 0;
        var g_numWordsDestroyed = 0;
        var g_soundEnabled = true;
        var g_isGamePaused = false;
        var g_isGameOver = false;
        var g_level = -1;
        var g_limitImpacts = 3;
        var g_easing = 'ease-out';
        var g_explosionDimensions = {};
        var g_cityExplosionDimensions = {};
        var g_explosionImage;
        var g_cityExplosionImage;
        var g_mysound = [];
        var g_sounds = [
            'gameOver',
            'background',
            'newLevel',
            'destroyWord',
            'noLetter',
            'hit',
            'missile',
            'city-explosion'
        ];
        var g_intervals = {
            throwWords: null,
            checkCollisions: null,
            activeMisile: null,
            newLevel: null,
            explosions: null,
            cityExplosions: null
        };

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

        //var words = ['aaa', 'bbb', 'ccc', 'ddd', 'eee','fff', 'ggg', 'hhh'];
        var g_levels = {

            //testing levels
            '-2': {
                speed: 80,
                fallingLapse: 200,
                words: 40
            },
            '-1': {
                speed: 16,
                fallingLapse: 2400,
                words: 2
            },
            '0': {
                speed: 16,
                fallingLapse: 2400,
                words: 2
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

        //init
        (function init(){
            //adding words to the page
            createSounds(g_sounds);

            playSound('background', 'loop');
            createWords();
            createExplosions();
            getExplosionsBg();
            setWordsInitPosition();
            setRightPositionCities();
            throwWordsInterval();
            checkCollisions();
            setLevel(g_level);

            bindEvents();
        })();



        function bindEvents(){
            $(document).keypress(onKeyPress);

            $(WORD_SEL).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", wordTransitionEnd);
            $(MISSILE_SEL).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", misileTransitionEnd);
        }

        function setRightPositionCities(){
            //they all have the same width
            var citiesWidth = $('#city1').width();

            $.each(cities, function(index, value){
                cities[index].right = cities[index].left + citiesWidth;
            });
        }

        function createWords(){
            var allwords = '';

            //creating the words
            $.each(g_words, function (index, wordText) {
                var word = '';
                var characters = wordText.split('');

                //for each character
                for (var i = 0; i < characters.length; i++) {
                    var letter = characters[i];
                    word = word + '<span>' + letter + '</span>';
                }

                allwords = allwords + '<div class="word" data-word="'+wordText+'" id="'+wordText+'">' + word + '</div>';
            });

            $g_game.append(allwords);
        }

        function createExplosions(){
            var wordsExplosions = '';
            for(var i = 0; i < 7; i++){
                wordsExplosions = wordsExplosions + '<div class="explosion"></div>';
            }
            $g_game.append(wordsExplosions);

            g_explosionDimensions = {
                width: $('.explosion').first().width(),
                height: $('.explosion').first().height()
            };

            var cityExplosions = '';
            for(var i = 0; i < 8; i++){
                cityExplosions = cityExplosions + '<div class="city-explosion"></div>';
            }
            $g_game.append(cityExplosions);

            g_cityExplosionDimensions = {
                width: $('.city-explosion').first().width(),
                height: $('.city-explosion').first().height()
            };
        }

        function getExplosionsBg(){
            //words explosions
            var $explosion = $('.explosion').not('.active').first();
            g_explosionImage = getBackgroundURL($explosion);

            //city explosions
            var $cityExplosion = $('.city-explosion').not('.active').first();
            g_cityExplosionImage =  getBackgroundURL($cityExplosion);
        }

        //from url(mypath); returns mypath
        function getBackgroundURL($element){
            return $element.css('background-image').slice(4, -1).replace(/"/g, "");
        }

        function setWordsInitPosition(){
            var scenario = { width: $g_game.width() };

            function setPositionForWord(){
                var left = getRandom(scenario.width);
                var right = left + $(this).width();
                if (right >= scenario.width){
                    left = left - $(this).width() - 30;
                }
                $(this).css('left', left);
                $(this).attr('data-left', left).attr('data-right', right);

                g_activeLetters[$(this).data('word')] = 0;
            }

            $(WORD_SEL).each(setPositionForWord);
        }

        function spliceOne(arr, index) {
             var len = arr.length;
             if (!len) { return }
             while (index<len) {
                arr[index] = arr[index+1]; index++
             }
             arr.length--;
        }

        function throwWordsInterval(){
            g_intervals.throwWords = setInterval(throwWords, g_levels[g_level].fallingLapse);
        }

        function throwWords(){
            if(g_cont == 1){
                $g_level.style.display = 'none';
            }

            if(g_cont <= g_levels[g_level].words){

                //firing a word
                var random = getRandom(g_words.length);
                var text = g_words[random];
                var word = $(WORD_SEL + '[data-word="'+text+'"]');

                //removing the word from our g_words array
                spliceOne(g_words, random);
                word[0].classList.add('active');
                setSpeed(word, g_level);
                g_cont++;
            }

            if(g_numWordsDestroyed === g_levels[g_level].words){
                g_level++;
                g_cont = 1;
                g_numWordsDestroyed = 0;

                //we need to fire it again with the speed for the new level
                clearInterval(g_intervals.throwWords);

                //lapse between levels
                g_intervals.newLevel = setTimeout(function(){
                    //hidding current level
                    setLevel(g_level);
                    throwWordsInterval();
                }, 1000);
            }
        }

        function setLevel(level){
            var levelInfo = document.querySelector("#gameInfo .gameInfo-level");
            levelInfo.innerHTML = level;
            $g_level.innerHTML = "Level" + level;
            $g_level.style.display = 'block';
            playSound('newLevel');
        }

        function setScore(score){
            g_score = score;
            $g_score.innerHTML = score;
        }

        function onKeyPress(e) {
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
                        g_activeLetters[wordText]++;

                        //remove the word, well done!
                        if(currentLetter.is(':last-child')){
                            launchMissile(word);
                            delete g_activeLetters[wordText];
                        }
                    }else{
                        playSound('noLetter');

                        //removeClass(active);
                        var span = word.querySelectorAll('span.active');

                        if(span){
                            //removing the active letters from other words
                            g_activeLetters[wordText] = 0;

                            for (var i = 0; i < span.length; i++) {
                              span[i].removeAttribute('class');
                            }
                        }
                    }
                }else{
                    playSound('noLetter');
                }
            }
        }

        function wordTransitionEnd(){
            checkImpact(this);
            if(!Object.keys(cities).length){
                gameOver();
            }
            $(this).remove();
            g_numWordsDestroyed++;
        }

        function misileTransitionEnd(){
            $(this).remove();
        }

        /**
        * Checks if the given word impacts any city.
        */
        function checkImpact(word){
            var wordLeft = word.getAttribute('data-left');
            var wordRight = word.getAttribute('data-right');

            var wordText = word.getAttribute('data-word');

            for (var key in cities) {
                if(
                    (wordLeft > cities[key].left && wordLeft < cities[key].right) ||
                    (wordRight > cities[key].left && wordLeft < cities[key].left) ){
                        impactCity(key);
                        playSound('city-explosion');
                        exploteCity(key);
                        delete g_activeLetters[wordText];
                        setScore(g_score - Math.abs(g_level) * 300);
                }
            }
        }

        /**
        * Changes the city status after a city has been impacted by a word.
        */
        function impactCity(key){
            var impacts = ++cities[key].impacts;
            var city = document.getElementById(key);

            if( impacts >= g_limitImpacts){
                //console.log("LIMIT - city: " + key);
                city.style.backgroundColor = 'black';
                city.classList.add('state4');
                delete cities[key];
            }
            else if(impacts == 1){
                //console.log("1 - city: " + key);
                city.style.backgroundColor = 'yellow';
                city.classList.add('state2');
            }
            else if(impacts == 2){
                //console.log("2 - city: " + key);
                city.style.backgroundColor = 'orange';
                city.classList.add('state3');
            }


        }

        /**
        * Launches a missile for the given word
        */
        function launchMissile(word){
            var wordText = word.getAttribute('data-word');
            var missile = $('<span class="missile"></span>');

            var axisX = word.offsetLeft + word.offsetWidth / 2;

            missile[0].setAttribute('data-word', wordText);
            missile[0].style.left = axisX + 'px';

            $g_game.append(missile);
            playSound('missile');

            //syncronously removing the class after the animation has been applied.
            g_intervals.activeMisile = setTimeout(function(){
                missile[0].classList.add('active');
            },10);
        }

        /**
        * Checks the collisions between misiles and words
        */
        function checkCollisions(){
            var missiles = document.querySelectorAll('.missile.active');
            for(var i = 0; i < missiles.length; i++){
                var missile = missiles[i];

                var word = document.getElementById(missile.getAttribute('data-word'));

                //force reflow (for 3d transformations)
                missile.style.visibility = 'visible';
                if( missile.getBoundingClientRect().top <= word.getBoundingClientRect().top ){
                    playSound('destroyWord');
                    exploteWord(word);
                    $(missile).remove();
                    $(word).remove();
                    g_numWordsDestroyed++;
                    setScore( g_score + Math.abs(g_level) * 100 * g_numWordsDestroyed);
                }
            }

            if(!g_isGamePaused && !g_isGameOver){
                requestAnimFrame(checkCollisions);
            }
        }

        function exploteWord(word){
            var $explosion = $('.explosion').not('.active').first();

            var params = {
                top: word.getBoundingClientRect().top - g_explosionDimensions.height/2,
                left: word.offsetLeft + word.offsetWidth / 2 - g_explosionDimensions.width/2,

                //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
                'background-image': 'url(' + g_explosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')'
            };
            $explosion.addClass('active').css(params);

            g_intervals.explosions = setTimeout(removeActive.bind($explosion), 800);
        }

        function exploteCity(key){
            var city = document.getElementById(key);
            var $city = $('.city-explosion').not('.active').first();

            var params = {
                bottom: -20,
                left: city.offsetLeft + city.offsetWidth / 2 - g_cityExplosionDimensions.width/2,

                //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
                'background-image': 'url(' + g_cityExplosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')'
            };

            $city.addClass('active').css(params);

            g_intervals.cityExplosions = setTimeout(removeActive.bind($city), 1800);
        }

        function removeActive(){
            this.removeClass('active');
        }

        function setSpeed(word, level){
            var speed = g_levels[level].speed * 1000;

            //summing or substracting a random number randomly
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var random = getRandom( ((22 * speed)/ 100) ) * plusOrMinus;
            speed = speed + random;

            var transition = 'all ' + speed + 'ms ' + g_easing;

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

        /**
        *
        */
        function isWordInProgress(wordText){
            var word = wordText;

            //getting the max value from the g_activeLetters object
            //http://stackoverflow.com/questions/11142884/fast-way-to-get-the-min-max-values-among-properties-of-object
            var arr = Object.keys(g_activeLetters).map(function (key) {
                return g_activeLetters[key];
            });
            var max = Math.max.apply(null, arr);

            return g_activeLetters[wordText] == max || (g_activeLetters[wordText] + 1 == max);
        }

        /**
        * Game over!
        */
        function gameOver(){
            g_isGameOver = true;
            $(WORD_SEL).remove();
            playSound('gameOver');
            document.getElementById('level').style.display = 'none';
            $('#game').append('<div class="gameOver"><div>Game Over</div></div>');

            //clearing intervals
            for(var property in g_intervals){
                clearInterval(g_intervals[property]);
            };

            setTimeout(function(){
                pauseSounds(g_sounds);
            }, 3700);
        }

         /**
         * Notification sound for every browser.
         */
        function playSound(fileName, options){
            if(g_soundEnabled){
                var sound = g_mysound[fileName];
                sound.currentTime = 0;

                if(options === 'loop'){
                    sound.loop = true;
                    sound.play();
                }else{
                    //in order to play the same sound over itself
                    sound.cloneNode(true).play();
                }
            }
        }

         /**
         * Notification sound for every browser.
         */
        function createSound(fileName){
            if(g_soundEnabled){
                g_mysound.push(fileName);
                var sound;

                if (!isMpeg()) {
                    sound = new Audio('audio/' + fileName + ".ogg");
                }else{
                    sound = new Audio('audio/' + fileName + ".mp3");
                }

                g_mysound[fileName] = sound;
            }
        }

        function createSounds(g_sounds){
            for(var i=0; i<g_sounds.length; i++){
                createSound(g_sounds[i]);
            }
        }

        function pauseSounds(g_sounds){
            for(var i=0; i<g_sounds.length; i++){
                g_mysound[g_sounds[i]].pause();
            }
        }

        //http://stackoverflow.com/questions/17791602/sound-notifications-in-opera
        function isMpeg(){
            var a = document.createElement('audio');
            return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
        }
    }
})(jQuery);

var game = new fallingWords();


