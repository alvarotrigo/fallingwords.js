/*!
 * Falling Words Game 1.0.0
 * https://github.com/alvarotrigo/fallingwords.js
 * @license MIT licensed
 *
 * Copyright (C) 2017 alvarotrigo.com - A project by Alvaro Trigo
 */
(function($) {
    var ACTIVE = 'active';
    var ACTIVE_SEL = '.' + ACTIVE;
    var $g_game = $('#game');
    var $g_level = $('#level')[0];
    var $g_score = $('.gameInfo-score-value')[0];
    var $g_gameOver = $('.gameOver');

    var g_soundEnabled = true;
    var g_mysound = [];

    //polify
    var requestAnimFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    var common = {
        /**
         * Returnsn a random number between two values.
         */
        getRandom: function(limit) {
            return Math.floor(Math.random() * limit);
        },

        /**
         * Notification sound for every browser.
         */
        playSound: function(fileName, options){
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
        },

        removeActive: function(){
            $(this).removeClass(ACTIVE);
        }
    };

    function missile(word){
        var self = this;

        self.word = word;
        self.$missile

        self.bindEvents = function(){
            $(MISSILE_SEL).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", misileTransitionEnd);
        };

        function misileTransitionEnd(){
            $(this).remove();
            game.removeMissile(self);
        }

        /**
        * Launches a missile for the given word
        * Constructor
        */
        (function(){
            var wordText = self.word.wordText;
            self.$missile = $('<span class="missile"></span>');

            var axisX = self.word.left + self.word.width / 2;

            self.$missile[0].style.left = axisX + 'px';

            $g_game.append(self.$missile);
            common.playSound('missile');

            game.g_intervals.activeMisile = setTimeout(function(){
                self.$missile[0].classList.add(ACTIVE);
            }, 10);
        })();
    }

    function word($word){
        var self = this;
        var g_easing = 'ease-out';
        var g_explosionImage = 'imgs/explosion.gif';

        self.$word = $word;
        self.wordText = $word.data('word');
        self.activeLetters = 0;
        self.left = null;
        self.right = null;
        self.width = self.$word.width();

        self.setPosition = function(){
            var scenario = { width: $g_game.width() };

            var left = common.getRandom(scenario.width);
            var right = left + $word.width();
            if (right >= scenario.width){
                left = left - $word.width() - 30;
            }
            $word.css('left', left);

            self.left = left;
            self.right = right;
        };

        self.fire = function(){
            self.$word[0].classList.add(ACTIVE);
            self.setSpeed(game.g_level);
            game.g_numFiredWords++;
        };

        self.setSpeed = function(level){
            var speed = game.g_levels[level].speed * 1000;

            //summing or substracting a random number randomly
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var random = common.getRandom( ((22 * speed)/ 100) ) * plusOrMinus;
            speed = speed + random;

            var transition = 'all ' + speed + 'ms ' + g_easing;

            //adding the animation
            self.$word.css({
                '-webkit-transition': transition,
                    'transition': transition
            });
        };

        self.exploteWord = function(){
            var $explosion = $('.explosion').not(ACTIVE_SEL).first();
            var params = {
                top: self.$word[0].getBoundingClientRect().top - game.g_explosionDimensions.height/2,
                left: self.left + self.width / 2 - game.g_explosionDimensions.width/2,

                //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
                'background-image': 'url(' + g_explosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')'
            };
            $explosion.addClass(ACTIVE).css(params);
            game.g_intervals.explosions = setTimeout(common.removeActive.bind($explosion), 1100);
        };

        self.getCurrentLetter = function(){
           return self.wordText.charAt(self.activeLetters);
        };

        self.isCompleted = function(){
            return self.activeLetters === self.wordText.length;
        };

        //constructor
        (function(){
            self.setPosition();
        })();

        return self;
    }

    function city(id){
        var self = this;

        self.$city = null;
        self.left = 0;
        self.right = 0;
        self.width = 0;
        self.impacts = 0;
        self.id = id;

        var g_limitImpacts = 3;
        var g_cityExplosionDimensions = {};
        var g_cityExplosionImage = 'imgs/city-explosion.gif';

        //constructor
        (function(){
            self.$city = $('#' + id);
            self.left = self.$city.position().left;
            self.width = self.$city.width();
            self.right = self.left + self.width;

            g_cityExplosionDimensions = {
                width: $('.city-explosion').first().width(),
                height: $('.city-explosion').first().height()
            };
        })();

        self.explote = function(){
            var $cityExplosion = $('.city-explosion').not(ACTIVE_SEL).first();
            var params = {
                bottom: -20,
                left: self.left + self.width / 2 - g_cityExplosionDimensions.width/2,

                //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
                'background-image': 'url(' + g_cityExplosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')'
            };

            $cityExplosion.addClass(ACTIVE).css(params);

            setTimeout(common.removeActive.bind($cityExplosion), 1330);

            self.shake();
        };

        self.shake = function(){
            $g_game.addClass('shake-constant shake-hard');

            //no need to clean this timeout, when the game ends we want it to be cleared
            setTimeout(function(){
                $g_game.removeClass('shake-constant shake-hard');
            }, 400);
        };

         /**
        * Changes the city status after a city has been impacted by a word.
        */
        self.impact = function(){
            self.impacts++;

            if( self.impacts >= g_limitImpacts){
                //console.log("LIMIT - city: " + key);
                self.$city[0].style.backgroundColor = 'black';
                self.$city[0].classList.add('state4');
                //delete game.g_cities[key];
                game.removeCity(self);
            }
            else if(self.impacts == 1){
                //console.log("1 - city: " + key);
                self.$city[0].style.backgroundColor = 'yellow';
                self.$city[0].classList.add('state2');
            }
            else if(self.impacts == 2){
                //console.log("2 - city: " + key);
                self.$city[0].style.backgroundColor = 'orange';
                self.$city[0].classList.add('state3');
            }
        };

        return self;
    }

    window.fallingWords = function(){
        var self = this;

        //selectors
        var WORD_SEL = '.word';
        var MISSILE_SEL = '.missile';



        var g_cities = [];

        //words should fit the "id" format
        var g_wordsList = ['church','charge'];
        var g_wordsList = ['abrigo','agujeta','calcetines','calzoncillo','camisa','camiseta','corbata','gorra','algodon','blusa','bolsa','cierre','cinturon','falda','guantes','medias','plantas','arbol','arbusto','cactus','abeja','alacran','alce','aguila','anguila','araña','ardilla','ardillita','armadillo','bisonte','lechuza','burro','caballo','cabra','caiman','camaleon','cardenal','cebra','cerdo','cocodrilo','colmillo','conejo','cisne','cucaracha','cuerno','cuervo','elefante','escarabajo','gato','gaviota','gorrion','grillo','gusano','halcon','hipopotamo','hormiga','babero','biberon','carrito','chupador','cuna','baño','bañera','champu','desague','ducha','espejo','cocina','abrelatas','caldero','colador','congelador','cuchara','destapador','escurridor','estufa','fregadero','gabinete','horno','horno','jarra','cuarto','aspiradora','escoba','lavadora','limpiadora','cuarto','cama','mesita','comoda','almohada','cobija','escalera','jarron','lampara','mesita','pared','pintura','repisa','sofa','sillon','herramientas','metrica','destornillador','formon','aeropuerto','bolso','equipaje','restaurante','cocinero','menu','gasolinera','grandes','playa','aletas','arena','alga','castillo','bronceadora','gafas','apartamentos','ascensor','banca','basurero','edificio','oficinas','tornado','huracan','inundacion','lluvia','nieve','nublado','hace','sol','tenis','basquetbol','golf','futbol','futbol','voleibol','ping','badminton','beisbol','guitarra','tambores','trompeta','rojo','azul','amarillo','verde','violeta','morado','limon','lima','frijoles','tomate','remolacha','rabano','mantequilla','miel','nuez','mermelada','jalea','jugo','dulce','mayonesa','kechup','mostaza','piña','banana','durazno','albaricoque','pera','uva','pasa','harina','comida','familia','mama','papa','hermano','hermana','abuelos','abuela','abuelo','primos','sobrino','cuñado','cuñada','suegra','cajuela','ventana','rueda','llanta','claxon','volante','chofer','pajarita','pantalones','sombrero','sueter','traje','zapatos','pijama','pantaleta','pantimedia','sandalias','vestido','zapatos','hoja','margarita','tallo','tulipan','violeta','rosa','iguana','jirafa','lagartija','leon','libelula','llama','loro','mantis','mariposa','mono','mosca','mosquito','pajaro','paloma','perro','petirrojo','pez','oso','oveja','rana','rata','raton','raya','renacuajo','rinoceronte','salmon','saltamontes','tiburon','tigre','tortuga','trompa','trucha','vaca','venado','zorro','zancudo','cuna','oso','pañal','esponja','excusado','jabon','jabonera','lavamanos','tina','toalla','lavaplatos','licuadora','mesa','nevera','olla','plato','pimentero','refrigerador','salero','sarten','servilleta','tapa','tenedor','tostador','vaporera','vaso','recogedor','secadora','despertador','sabanas','armario','colgador','techo','muebles','mesa','cama','sillon','silla','escritorio','piano','basurero','llave','martillo','sierra','maleta','mesa','camarera','bolso','oferta','mar','onda','orilla','toalla','traje','sombrilla','oficina','autobus','calor','temperatura','termometro','nebuloso','neblina','ventoso','hace','humedad','nube','jockey','rugby','equitacion','natacion','equipo','piano','letra','anaranjado','rosa','marron','negro','blanco','aperitivo','aguacate','carnederes','desayuno','coliflor','apio','queso','pollo','postre','cena','huevo','pescado','hamburguesa','hotdog','papas','almuerzo','lechuga','leche','puerco','papas','ensalada','sandwich','sopa','azucar','pavo','agua','helado','suegro','novio','hijo','hija','nuera','yerno','amigo','novio','marido','esposa','madre','padre','sobrina','gasolina','cinturon'];
        //var g_wordsList = ['unbrave','unbruised','journeyer','ives','ursa','contented','ionian','maize','geordie','tanbark','gruelling','saadi','snowbound','glegness','eternise','augmentor','kinfolks','consist','point','pouter','precisian','sundew','tomium','sparrow','delative','polyxenus','unawake','undue','darius','pannage','chillum','amanda','lam','nicotine','handiwork','dumpily','beadily','sukkoth','bonelike','hylozoic','puss','gibbon','suharto','molasses','checkroom','agora','mobocracy','cosiest','slatier','anarch','redundant','corpora','spinozism','kloesse','xanthous','ozocerite','maremma','sleepers','swit','fare','lunated','meleager','prevision','tumaco','unfetter','emissary','botvinnik','rev','giorgione','exciting','famished','kenova','unhuddle','kubango','prelect','hard','andoroba','nauch','publicity','apodemal','argyle','bismarck','hottest','expansile','bigger','poromeric','heron','jungfrau','oidia','pandavas','razeeing','zymologic','roseless','delicia','agacles','unjuicily','coalesce','revoting','thimphu','anatomy','feminie','pyxidia','parousia','shabbier','tempura','vagal','diatribe','deftly','ava','ginkgo','unexhumed','cocoyam','aydelotte','connexion','bagh','alost','machinist','sloane','china','attingent','pustule','yirr','valdosta','interlace','popish','unknelled','redenied','phallus','epaulet','unechoic','angora','church','teledu','quickly','reground','runty','cheshire','scurrile','sheeney','fathomer','sarasvati','gypsyism','ignition','spewer','tankless','unusurped','vale','rejection','anxiety','lacuna','madonna','wider','profferer','sporty','markevich','burger','ephippia','jail','davey','molise','aft','forth','caldaria','outjet','zionist','halachot','recourse','margareta','danseuse','kamet','redefeat','ivor','sitzkrieg','judaea','dupr','backward','gari','discomfit','calgary','complice','colonised','mass','pretender','unionize','manoeuvre','holloaed','paccha','nereid','cardhouse','unfacile','bouillon','accessory','american','unequal','quidnunc','observe','irishised','hoylake','tarried','decried','merl','urolith','trustable','similarly','melpomene','fraught','mango','dana','palencia','margin','zibeline','elucidate','nouma','cete','larum','unpeopled','kanji','unstrewn','aslant','bing','shovel','firework','rampager','antipodes','phrensied','eulogy','idiotise','adamant','preguess','showmanly','tendril','felicidad','liou','senza','ambulated','siloxane','cunt','scientist','illumed','unsmooth','agonist','pyalla','submiss','celluloid','flighty','apriorism','minuend','choicer','preexact','fushun','contusion','acol','foreskin','hostaging','lynchet','atresia','exalter','adieus','unflowing','cousinry','quittable','atomist','rooflike','gavotte','faunally','steampipe','canoodle','unsponged','boltlike','penance','podiums','commit','finalize','landsmaal','natant','tropical','enigma','ticknor','nastiness','varicose','kopje','umbonal','vignette','warded','rainbird','mewar','bullet','narceine','leangle','curtesy','devastate','furrily','strobic','theomancy','mfd','embolus','perutz','eurhythmy','sayers','shapka','goadlike','timbale','ligating','cutwater','salmon','fretwork','mobutu','descartes','craftiest','idyll','capsid','handsewn','abbotcy','absonant','deface','scroop','rort','pup','incarnate','kirigami','frog','unicycle','burgher','allobaric','bizerta','disjaskit','void','dinkiest','gawkier','duello','boresome','snowcreep','autoharp','begabled','foxberry','lumberer','purer','muticous','auber','topiaries','hereupon','elegantly','ranee','haywire','unbay','sorceries','baker','caucasia','cooing','underfed','biography','nonethnic','ozonizer','bowerlike','cullis','pip','exeter','cloakroom','shembe','mycelium','falderol','saltier','smetana','attrahent','diabolize','vampiric','pretimely','fetial','asterion','topmost','phyton','aseity','autobahn','impinger','draftiest','chapatti','orator','dunedin','beatitude','danbury','greg','celebrate','scrip','pithead','iapigia','carbuncle','manila','holler','marital','bisection','shapable','terrier','gullable','syndromic','overwrite','niceness','athetoid','duka','degummed','floc','wady','dogcart','vatted','deckhead','sapwood','addition','plication','sucrose','stanton','lollardy','befall','teughness','alcalde','galumph','panoptic','oriental','wellesley','mutualism','ductwork','everybody','covin','cosiness','pelican','meagerly','wittily','outshaped','baghlan','kelson','vivace','wagnerite','caboodle','wifelike','foretaste','enuring','aspen','cavatina','durban','dulciana','dissenter','outreckon','richfield','retrorse','kerkyra','diosgenin','engage','pulsating','cheddar','melodist','hide','thiazole','bassano','loppy','dabble','nerve','oncost','kay','usa','hechshers','afire','enfetter','useable','poleax','decameron','subhall','ophore','gentisate','cultigen','ampersand','genetic','unwhite','prologise','brynza','unnipped','jag','keifer','schedular','creosotic','homocercy','trogon','chuprassi','pizzicato','lilyan','enc','heeze','verier','archfiend','nares','sorgho','tuberoid','pickled','peanuts','casemate','frond','ghazi','sloshiest','viand','volta','thespiae','greenberg','brand'];
        var g_words = [];
        self.g_firedWords = [];
        self.g_numFiredWords = 1;
        var g_missiles = [];
        var g_score = 0;
        var g_numWordsDestroyed = 0;
        var g_isGamePaused = false;
        var g_isGameOver = false;
        var g_level = 7;
        var g_username;
        self.g_level = g_level;

        self.g_explosionDimensions = {};
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
        self.g_intervals = {
            throwWords: null,
            checkCollisions: null,
            activeMisile: null,
            newLevel: null,
            explosions: null,
            playHitSound: null
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
        self.init = function(){
            //adding words to the page
            createSounds(g_sounds);

            common.playSound('background', 'loop');
            createWords();
            createExplosions();
            throwWordsInterval();
            checkCollisions();
            setLevel(g_level);

            g_cities.push(new city('city1'));
            g_cities.push(new city('city2'));
            g_cities.push(new city('city3'));

            bindEvents();

            return self;
        };

        function bindEvents(){
            $(document)
                .keypress(onKeyPress)
                .on('click', '#pause', pauseGame)
                .on('click', '#resume', pauseGame)
                .on('submit', '.addToRanking', addScore);

            $(WORD_SEL).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", wordTransitionEnd);

        }

        function pauseGame(e){
            e.preventDefault();
            g_isGamePaused = true;

            //clearing intervals
            for(var property in self.g_intervals){
                clearInterval(self.g_intervals[property]);
            };
        }

        function resumeGame(){
            e.preventDefault();
            g_isGamePaused = false;
        }

        function createWords(){
            var allwords = '';

            //creating the words
            $.each(g_wordsList, function (index, wordText) {
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

            //now that words are appended...
            $(WORD_SEL).each(function () {
                g_words.push( new word($(this)) );
            });
        }

        /**
        * Creating the explosion elements in the DOM
        */
        function createExplosions(){
            var wordsExplosions = '';
            for(var i = 0; i < 7; i++){
                wordsExplosions = wordsExplosions + '<div class="explosion"></div>';
            }
            $g_game.append(wordsExplosions);

            self.g_explosionDimensions = {
                width: $('.explosion').first().width(),
                height: $('.explosion').first().height()
            };

            var cityExplosions = '';
            for(var i = 0; i < 8; i++){
                cityExplosions = cityExplosions + '<div class="city-explosion"></div>';
            }
            $g_game.append(cityExplosions);
        }

        function throwWordsInterval(){
            self.g_intervals.throwWords = setInterval(throwWords, g_levels[g_level].fallingLapse);
        }

        function throwWords(){
            //hidding the level text
            if(self.g_numFiredWords == 1){
                $g_level.style.display = 'none';
            }

            //let's throw words!
            if(self.g_numFiredWords <= g_levels[g_level].words){
                //firing a word
                var random = common.getRandom(g_words.length);
                g_words[random].fire();
                console.log("meto: ");
                console.log(g_words[random]);
                self.g_firedWords.push(g_words[random]);

                //removing the word from our g_words array
                g_words.splice(random, 1);
            }

            //reached the end of the level?
            if(g_numWordsDestroyed === g_levels[g_level].words){
                g_level++;
                self.g_numFiredWords = 1;
                g_numWordsDestroyed = 0;

                //we need to fire it again with the speed for the new level
                clearInterval(self.g_intervals.throwWords);

                //lapse between levels
                self.g_intervals.newLevel = setTimeout(function(){
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
            common.playSound('newLevel');
        }

        function setScore(score){
            g_score = score;
            $g_score.innerHTML = score;
        }

        /**
        *
        */
        function onKeyPress(e) {
            var value = String.fromCharCode(e.which);
            var isAnyWordActive = false;

            console.error("for key " + value);

            //for each non active letter of each active word
            for(var a = 0; a < self.g_firedWords.length; a++){
                var word = self.g_firedWords[a];
                var currentLetter = word.getCurrentLetter();
                console.log(currentLetter);
                /*
                console.error("ENTRO WORD....");
                console.warn(word);
                console.log("currentLetter", currentLetter.text());
                console.log(currentLetter.closest('.word').text());
                console.log("currentLetter.is(':first-child')", currentLetter.is(':first-child'));
                console.log("currentLetter.prev().hasClass('active')", currentLetter.prev().hasClass('active'));
                console.log(currentLetter.siblings());
                console.log("isWordInProgress(word)", isWordInProgress(word));
                */

                if (isWordInProgress(word) && currentLetter === value) {
                    isAnyWordActive = true;

                    var playHitSound = function(){
                        console.warn("hit");
                        common.playSound('hit');
                    };

                    //to fire it only once when multiple the letter gets active in multiple words
                    //at the same time
                    clearTimeout(self.g_intervals.playHitSound);
                    self.g_intervals.playHitSound = setTimeout(playHitSound, 10);

                    word.$word[0].getElementsByTagName('span')[word.activeLetters].classList.add(ACTIVE);
                    word.activeLetters++;

                    //remove the word, well done!
                    if(word.isCompleted()){
                        g_missiles.push(new missile(word));
                        self.g_firedWords.splice(self.g_firedWords.indexOf(word), 1);
                        word.activeLetters = null;
                    }
                }

                else{
                    //has any active letter?
                    if(word.activeLetters){
                        var span = word.$word[0].querySelectorAll('span'+ACTIVE_SEL);

                        //removing the active letters from other words
                        word.activeLetters = 0;

                        for (var i = 0; i < span.length; i++) {
                          span[i].removeAttribute('class');
                        }
                    }
                }
            }
            if(!isAnyWordActive){
                common.playSound('noLetter');
            }
        }

        function getSingleWordByText(words, text){
            return words.filter(function(word){
                return word.wordText == text;
            })[0];
        }

        function wordTransitionEnd(){
            if(g_isGamePaused){
                return;
            }

            console.log("1");
            console.log(self.g_firedWords);
            var word = getSingleWordByText(self.g_firedWords, this.getAttribute('data-word'));
            console.log("2");
            console.log(self.g_firedWords);
            checkImpact(word);
            if(!Object.keys(g_cities).length){
                gameOver();
            }
            $(this).remove();
            g_numWordsDestroyed++;

            console.log("3");
            console.log(self.g_firedWords);

            var wordIndex = self.g_firedWords.indexOf(word);
            console.warn(wordIndex);
            //if(wordIndex > -1){
            self.g_firedWords.splice(wordIndex, 1);
            //}

            console.log("4");
            console.log(self.g_firedWords);
        }

        /**
        * Checks if the given word impacts any city.
        */
        function checkImpact(word){
            if(g_isGamePaused){
                return;
            }

            var wordLeft = word.left;
            var wordRight = word.right;

            g_cities.forEach(function(city){
                 if(
                    (wordLeft > city.left && wordLeft < city.right) ||
                    (wordRight > city.left && wordLeft < city.left) ){
                        city.impact();
                        city.explote();
                        common.playSound('city-explosion');
                        word.activeLetters = null;
                        setScore(g_score - Math.abs(g_level) * 300);
                }
            });
        }



        /**
        * Checks the collisions between misiles and words
        */
        function checkCollisions(){
            for(var i = 0; i < g_missiles.length; i++){
                var missile = g_missiles[i];
                var word = missile.word;

                //force reflow (for 3d transformations)
                missile.$missile[0].style.visibility = 'visible';
                console.log(missile.$missile[0].getBoundingClientRect().top + ' vs ' + word.$word[0].getBoundingClientRect().top );
                if( missile.$missile[0].getBoundingClientRect().top <= word.$word[0].getBoundingClientRect().top ){
                    common.playSound('destroyWord');

                    self.removeMissile(missile);
                    missile.$missile.remove();

                    word.exploteWord();
                    word.$word.remove();
                    g_numWordsDestroyed++;

                    setScore( g_score + Math.abs(g_level) * 100 * g_numWordsDestroyed);
                }
            }

            if(!g_isGamePaused && !g_isGameOver){
                requestAnimFrame(checkCollisions);
            }
        }

        function removeMissile(missile){
            //removing the missile from the array
            g_missiles.splice(g_missiles.indexOf(missile), 1);
        }

        /**
        *
        */
        function isWordInProgress(word){
            console.log("5");
            console.log(self.g_firedWords);
            var max = self.g_firedWords.reduce(function(prev, current) {
                if(!prev.activeLetters){
                    return current;
                }
                return (prev.activeLetters > current.activeLetters) ? prev : current;
            }).activeLetters;
            console.log("6");
            console.log(self.g_firedWords);
            return (word.activeLetters == max || word.activeLetters + 1 == max);
        }

        /**
        * Game over!
        */
        function gameOver(){
            g_isGameOver = true;
            $(WORD_SEL).remove();
            common.playSound('gameOver');
            document.getElementById('level').style.display = 'none';
            $g_gameOver.addClass(ACTIVE);
            $g_gameOver.find('.gameOver-score').text(g_score);

            //unbinding events
            $(document)
                .off('keypress')
                .off('click', '#pause')
                .off('click', '#resume')

            $(WORD_SEL).off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");

            //clearing intervals
            for(var property in self.g_intervals){
                clearInterval(self.g_intervals[property]);
            };

            setTimeout(function(){
                pauseSounds(g_sounds);
            }, 3700);

            $('.modal-addScore').show();
        }

        function addScore(e){
            e.preventDefault();

            $('.addToRanking-button').addClass(ACTIVE);
            g_username = $g_gameOver.find('#name').val();

            //$.post('https://alvarotrigo.com/pruebas/game-ranking/?action=addUser', {name: g_username , score: g_score}, function(result){
                //var data = JSON.parse(result);
                var data = {"success":true,"users":[{"id":"1","name":"Alvaro","score":"2000","created":"2017-11-25 19:25:10"},{"id":"2","name":"Alvaro","score":"2000","created":"2017-11-25 19:25:52"},{"id":"3","name":"Alvaro","score":"2000","created":"2017-11-25 19:25:55"},{"id":"16","name":"aafdasfafa","score":"0","created":"2017-11-26 22:13:14"},{"id":"17","name":"aaaaa","score":"0","created":"2017-11-26 22:14:33"},{"id":"18","name":"fdasfsaaa","score":"0","created":"2017-11-26 22:15:07"},{"id":"19","name":"dfasfasaaaa","score":"0","created":"2017-11-26 22:16:04"},{"id":"20","name":"fdasfaf","score":"0","created":"2017-11-26 22:17:25"},{"id":"21","name":"fdsafadfaaa","score":"0","created":"2017-11-26 22:18:42"},{"id":"22","name":"fadsfa","score":"0","created":"2017-11-26 22:19:55"},{"id":"23","name":"fasdfaaa","score":"0","created":"2017-11-26 22:20:54"},{"id":"24","name":"fdasaaaafdf","score":"0","created":"2017-11-26 22:22:52"},{"id":"15","name":"aaaaa","score":"0","created":"2017-11-26 22:11:53"},{"id":"14","name":"fasdfa","score":"0","created":"2017-11-26 22:08:34"},{"id":"13","name":"fadsfaf","score":"0","created":"2017-11-26 22:07:29"},{"id":"4","name":"testfadsf","score":"0","created":"2017-11-26 19:51:57"},{"id":"5","name":"fdasfsafa","score":"0","created":"2017-11-26 20:01:47"},{"id":"8","name":"fadsfasfa","score":"0","created":"2017-11-26 22:01:21"},{"id":"9","name":"fdsafaf","score":"0","created":"2017-11-26 22:03:21"},{"id":"10","name":"fadsfsafa","score":"0","created":"2017-11-26 22:04:11"},{"id":"11","name":"fadsfsafa","score":"0","created":"2017-11-26 22:04:59"},{"id":"12","name":"fadsfsafa","score":"0","created":"2017-11-26 22:05:28"},{"id":"25","name":"afdawwww","score":"0","created":"2017-11-26 22:23:33"},{"id":"7","name":"fsdafsa","score":"-13200","created":"2017-11-26 22:01:13"},{"id":"6","name":"fsdafsa","score":"-13200","created":"2017-11-26 21:59:09"}]};
                data.users.map(function(user, index){
                    user.rank = index + 1;
                });

                $('.addToRanking-button').removeClass(ACTIVE);

                if(!data.success){
                    alert("Error adding the score! Contact Alvaro! @imac2")
                }

                //all ok?
                else{
                    showRanking(data.users);
                }
            //});
        }

        function numberWithCommas(x){
            if(!x){ return 0;}
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function showRanking(users){
            $('.gameOver').fadeOut(1200, function(){
                $('.ranking-centered').addClass('active');
            });

            var currentUser = users.filter(function(user){
                return user.name == g_username;
            });

            $('#ranking-position').text(numberWithCommas(currentUser.rank));
            $('#ranking-numUsers').text(numberWithCommas(users.length));

            $('#ranking-table').DataTable({
                //removes default sorting
                order: [2, 'desc'],

                data: users,
                pageLength: 10,
                columns: [
                    {
                        data: 'rank'
                    },
                    {
                        data: 'name'
                    },
                    { data: 'score' },

                    {
                        data: 'created'
                    }
                ],
            });
        }
        self.showRanking = showRanking;

        /**
        * Notification sound for every browser.
        */
        function createSound(fileName){
            if(g_soundEnabled){
                g_mysound.push(fileName);
                var sound;

                var extension = !isMpeg() ? '.ogg' : '.mp3';
                sound = new Audio('audio/' + fileName + extension);

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

        self.removeCity = function(city){
            g_cities.splice(g_cities.indexOf(city), 1);
        };

        self.removeWord = function(random){
            g_words.spice(random, 1);
        };

        self.g_cities = g_cities;
        self.g_levels = g_levels;
        self.g_level = g_level;
        self.g_words = g_words;
        self.removeMissile = removeMissile;
    }

    window.game = new fallingWords().init();
})(jQuery);




