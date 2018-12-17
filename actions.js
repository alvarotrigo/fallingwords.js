/*!
 * Falling Words Game 1.0.1
 * https://github.com/alvarotrigo/fallingwords.js
 * @license MIT licensed
 *
 * Copyright (C) 2018 alvarotrigo.com - A project by Alvaro Trigo
 * alvarotrigo.com
 */
(function($) {
    var gameModel = null; 

    var ACTIVE = 'active';
    var ACTIVE_SEL = '.' + ACTIVE;  

    var $g_game = $('#game');
    var $g_level = $('#level')[0];
    var $g_score = $('.game-info-score-value')[0];
    var $g_gameOver = $('.gameOver');
    var g_soundEnabled = true;
    var g_mysound = [];

    //polify
    var requestAnimFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    var utils = {

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

        /**
        * Removes active class from the given element.
        */
        removeActive: function(){
            $(this).removeClass(ACTIVE);
        }
    };

    /**
    * Missile object
    */
    function missile(word){
        var self = this;

        self.word = word;
        self.$missile = null;

        self.init = function(){
            var missile = document.createElement('span');
            missile.className = 'missile';

            var axisX = self.word.left + self.word.width / 2;
            missile.style.left = axisX + 'px';

            $g_game[0].appendChild(missile);
            self.$missile = $(missile);
        };

        self.bindEvents = function(){
            $(MISSILE_SEL).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", misileTransitionEnd);
        };

        /**
        * Launches the missile 
        */
        self.fire = function(){
            utils.playSound('missile');
            self.$missile[0].classList.add(ACTIVE);
        }

        self.checkCollision = function(){
            if( self.$missile[0].getBoundingClientRect().top <= self.word.$word[0].getBoundingClientRect().top ){
                utils.playSound('destroyWord');

                self.$missile.remove();
                gameModel.removeMissile(self);

                self.word.explode();
                self.word.$word.remove();

                gameModel.g_numWordsDestroyed++;
                gameModel.setScore( gameModel.g_score + 10 * gameModel.g_numWordsDestroyed);
            }
        };

        /**
        * Missile transition ends
        */
        function misileTransitionEnd(){
            self.$missile.remove();
            gameModel.removeMissile(self);
        }

        /**
        * Launches a missile for the given word
        * Constructor
        */
        (function(){
            self.init();
        })();
    }

    /**
    * Word object. 
    */
    function word(wordText){
        var self = this;
        var g_easing = 'ease-out';
        var g_explosionImage = 'imgs/explosion.gif';

        self.$word = null;
        self.wordText = null;
        self.activeLetters = 0;
        self.left = null;
        self.right = null;
        self.width = null;
        self.missile = null;

        self.init = function(){
            self.wordText = wordText;
            self.$word = $( self.create() );
            self.width = self.$word.width();

            self.setPosition();
            self.bindEvents();

            self.missile = new missile(self);
        };

        /**
        * Setting the position for the word and caching those values in the object
        * for future use.
        */
        self.setPosition = function(){
            var scenario = { width: $g_game.width() };

            var left = utils.getRandom(scenario.width);
            var right = left + self.$word.width();
            if (right >= scenario.width - 20){
                left = left - self.$word.width() - 30;
            }

            self.$word.css('left', left);
            self.left = left;
            self.right = right;
        };

        /**
        * Firing the word
        */
        self.fire = function(){
            self.$word[0].classList.add(ACTIVE);
            self.setSpeed(game.g_level);
            game.g_numFiredWords++;
        };

        /**
        * Setting the speed for the word to fire based on the level and
        * adding some random value withtin a thresold. So they won't all have the
        * same speed.
        */
        self.setSpeed = function(level){
            var speed = game.g_levels[level].speed * 1000;

            //summing or substracting a random number randomly
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var random = utils.getRandom( ((22 * speed)/ 100) ) * plusOrMinus;
            speed = speed + random;

            var transition = 'all ' + speed + 'ms ' + g_easing;

            //adding the animation
            self.$word.css({
                '-webkit-transition': transition,
                    'transition': transition
            });
        };

        /**
        * Exploding the word when reached by a misile.
        */
        self.explode = function(){
            var $explosion = $('.explosion').not(ACTIVE_SEL).first();
            var params = {
                top: self.$word[0].getBoundingClientRect().top - game.g_explosionDimensions.height/2,
                left: self.left + self.width / 2 - game.g_explosionDimensions.width/2,

                //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
                'background-image': 'url(' + g_explosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')'
            };
            $explosion[0].classList.add(ACTIVE);
            $explosion.css(params);
            game.g_intervals.explosions = setTimeout(utils.removeActive.bind($explosion), 1100);
        };

        /**
        * Getting the current active letter.
        */
        self.getCurrentLetter = function(){
           return self.wordText.charAt(self.activeLetters);
        };

        /**
        * Defines wether the whole word has been filled correctly or not.
        */
        self.isCompleted = function(){
            return self.activeLetters === self.wordText.length;
        };

        /**
        * Removes all of the active letters from the word.
        */
        self.removeActiveLetters = function(){
            //has any active letter?
            if(self.activeLetters){
                var span = self.$word[0].querySelectorAll('span.active');

                //removing the active letters from other words
                self.activeLetters = 0;

                for (var i = 0; i < span.length; i++) {
                  span[i].removeAttribute('class');
                }
            }
        };

        /**
        * Creates the word in the DOM.
        */
        self.create = function(){
            var characters = self.wordText.split('');
            var letter;
            var wordLetters = '';
            var a;

            //for each character
            for (a = 0; a < characters.length; a++) {
                letter = characters[a];
                wordLetters = wordLetters + '<span>' + letter + '</span>';
            }

            var $word = document.createElement('div');
            $word.className = 'word';
            $word.setAttribute('data-word', self.wordText);
            $word.id = self.wordText;
            $word.innerHTML = wordLetters;

            $g_game[0].appendChild($word);
            return $word;
        };

        /**
        * When the word hits a floor.
        */
        self.wordTransitionEnd = function(){
            if(gameModel.g_isGamePaused){
                return;
            }

            self.checkImpact();
            if(!Object.keys(gameModel.g_cities).length){
                gameModel.gameOver();
            }
            $(this).remove();
            gameModel.g_numWordsDestroyed++;

            var wordIndex = gameModel.g_firedWords.indexOf(self);
            gameModel.g_firedWords.splice(wordIndex, 1);
        };

        /**
        * Checks if the given word impacts any city.
        */
        self.checkImpact = function(){
            if(gameModel.g_isGamePaused){
                return;
            }

            var wordLeft = self.left;
            var wordRight = self.right;
            var city;
            var i;

            for(i = 0; i < gameModel.g_cities.length; i++){
                city = gameModel.g_cities[i];
                if(
                    (wordLeft > city.left && wordLeft < city.right) ||
                    (wordRight > city.left && wordLeft < city.left) ){
                        city.impact();
                        city.explode();
                        utils.playSound('city-explosion');
                        self.activeLetters = null;
                        gameModel.setScore(gameModel.g_score - gameModel.g_level * 2 - 10);
                }
            }
        };

        /**
        * Binding events for the word.
        */
        self.bindEvents = function(){
            $(self.$word).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", self.wordTransitionEnd);
        };

        //constructor
        (function(){
            self.init();
        })();

        return self;
    }

    /**
    * City object.
    */
    function city(id){
        var self = this;

        var g_limitImpacts = 3;
        var g_cityExplosionImage = 'imgs/city-explosion.gif';

        self.$city = null;
        self.left = 0;
        self.right = 0;
        self.width = 0;
        self.impacts = 0;
        self.id = id;
        self.explosions = [];
        self.g_cityExplosionDimensions = {};

        self.init = function(){
            self.$city = $('#' + id);
            self.left = self.$city.position().left;
            self.width = self.$city.width();
            self.right = self.left + self.width;

            var cityExplosion = document.createElement('div');
            cityExplosion.className = 'city-explosion';
            document.body.appendChild(cityExplosion);

            self.g_cityExplosionDimensions = {
                width: $('.city-explosion').first().width(),
                height: $('.city-explosion').first().height()
            };

            document.body.removeChild(cityExplosion);

            self.createExplosion();
        };
        
        /**
        * Explodes the city.
        */
        self.createExplosion = function(){
            //city explosions
            for(var i = 0; i < 3; i++){
                var cityExplosion = document.createElement('div');
                var left = self.left + self.width / 2 - self.g_cityExplosionDimensions.width/2;
    
                cityExplosion.className = 'city-explosion';
                cityExplosion.style.left = left + 'px';

                self.explosions.push({
                    item: cityExplosion,
                    isVisible: false
                });

                $g_game[0].appendChild(cityExplosion);
            }
        };

        /**
        * Exploding the city.
        */
        self.explode = function(){
            var $cityExplosion = self.explosions.reduce(function(explosion){
                if(!explosion.isVisible){
                    return explosion;
                }
            }).item;

            $cityExplosion.classList.add(ACTIVE);

            //forcing the GIF to animate again, we need to add ?x=[RAMDOM STRING]
            $cityExplosion.style.backgroundImage = 'url(' + g_cityExplosionImage.replace(/\?.*$/,"")+"?x="+Math.random() + ')';

            setTimeout(utils.removeActive.bind($cityExplosion), 1330);

            self.shake();
        };

        /**
        * Shaking the whole screen when a city gets hit by a missile.
        * Yeap, sorry about that player! It will make it more difficult to concentrate!
        */
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
                self.$city[0].style.backgroundColor = 'black';
                self.$city[0].classList.add('state4');
                //delete game.g_cities[key];
                game.removeCity(self);
            }
            else if(self.impacts == 1){
                self.$city[0].style.backgroundColor = 'yellow';
                self.$city[0].classList.add('state2');
            }
            else if(self.impacts == 2){
                self.$city[0].style.backgroundColor = 'orange';
                self.$city[0].classList.add('state3');
            }
        };

        //constructor
        (function(){
            self.init();   
        })();

        return self;
    }

    window.fallingWords = function(){
        var self = this;

        var WORD_SEL = '.word';
        var MISSILE_SEL = '.missile';

        var g_wordsList = ['church','charge'];
        var g_wordsList = ['abrigo','agujeta','calcetines','calzoncillo','camisa','camiseta','corbata','gorra','algodon','blusa','bolsa','cierre','cinturon','falda','guantes','medias','plantas','arbol','arbusto','cactus','abeja','alacran','alce','aguila','anguila','araña','ardilla','ardillita','armadillo','bisonte','lechuza','burro','caballo','cabra','caiman','camaleon','cardenal','cebra','cerdo','cocodrilo','colmillo','conejo','cisne','cucaracha','cuerno','cuervo','elefante','escarabajo','gato','gaviota','gorrion','grillo','gusano','halcon','hipopotamo','hormiga','babero','biberon','carrito','chupador','cuna','baño','bañera','champu','desague','ducha','espejo','cocina','abrelatas','caldero','colador','congelador','cuchara','destapador','escurridor','estufa','fregadero','gabinete','horno','horno','jarra','cuarto','aspiradora','escoba','lavadora','limpiadora','cuarto','cama','mesita','comoda','almohada','cobija','escalera','jarron','lampara','mesita','pared','pintura','repisa','sofa','sillon','herramientas','metrica','destornillador','formon','aeropuerto  ','bolso','equipaje','restaurante','cocinero','menu','gasolinera','grandes','playa','aletas','arena','alga','castillo','bronceadora','gafas','apartamentos','ascensor','banca','basurero','edificio','oficinas','tornado','huracan','inundacion','lluvia','nieve','nublado','hace','sol','tenis','basquetbol','golf','futbol','futbol','voleibol','ping','badminton','beisbol','guitarra','tambores','trompeta','rojo','azul','amarillo','verde','violeta','morado','limon','lima','frijoles','tomate','remolacha','rabano','mantequilla','miel','nuez','mermelada','jalea','jugo','dulce','mayonesa','kechup','mostaza','piña','banana','durazno','albaricoque','pera','uva','pasa','harina','comida','familia','mama','papa','hermano','hermana','abuelos','abuela','abuelo','primos','sobrino','cuñado','cuñada','suegra','cajuela','ventana','rueda','llanta','claxon','volante','chofer','pajarita','pantalones','sombrero','sueter','traje','zapatos','pijama','pantaleta','pantimedia','sandalias','vestido','zapatos','hoja','margarita','tallo','tulipan','violeta','rosa','iguana','jirafa','lagartija','leon','libelula','llama','loro','mantis','mariposa','mono','mosca','mosquito','pajaro','paloma','perro','petirrojo','pez','oso','oveja','rana','rata','raton','raya','renacuajo','rinoceronte','salmon','saltamontes','tiburon','tigre','tortuga','trompa','trucha','vaca','venado','zorro','zancudo','cuna','oso','pañal','esponja','excusado','jabon','jabonera','lavamanos','tina','toalla','lavaplatos','licuadora','mesa','nevera','olla','plato','pimentero','refrigerador','salero','sarten','servilleta','tapa','tenedor','tostador','vaporera','vaso','recogedor','secadora','despertador','sabanas','armario','colgador','techo','muebles','mesa','cama','sillon','silla','escritorio','piano','basurero','llave','martillo','sierra','maleta','mesa','camarera','bolso','oferta','mar','onda','orilla','toalla','traje','sombrilla','oficina','autobus','calor','temperatura','termometro','nebuloso','neblina','ventoso','hace','humedad','nube','jockey','rugby','equitacion','natacion','equipo','piano','letra','anaranjado','rosa','marron','negro','blanco','aperitivo','aguacate','carnederes','desayuno','coliflor','apio','queso','pollo','postre','cena','huevo','pescado','hamburguesa','hotdog','papas','almuerzo','lechuga','leche','puerco','papas','ensalada','sandwich','sopa','azucar','pavo','agua','helado','suegro','novio','hijo','hija','nuera','yerno','amigo','novio','marido','esposa','madre','padre','sobrina','gasolina','cinturon'];
        //var g_wordsList = ['unbrave','unbruised','journeyer','ives','ursa','contented','ionian','maize','geordie','tanbark','gruelling','saadi','snowbound','glegness','eternise','augmentor','kinfolks','consist','point','pouter','precisian','sundew','tomium','sparrow','delative','polyxenus','unawake','undue','darius','pannage','chillum','amanda','lam','nicotine','handiwork','dumpily','beadily','sukkoth','bonelike','hylozoic','puss','gibbon','suharto','molasses','checkroom','agora','mobocracy','cosiest','slatier','anarch','redundant','corpora','spinozism','kloesse','xanthous','ozocerite','maremma','sleepers','swit','fare','lunated','meleager','prevision','tumaco','unfetter','emissary','botvinnik','rev','giorgione','exciting','famished','kenova','unhuddle','kubango','prelect','hard','andoroba','nauch','publicity','apodemal','argyle','bismarck','hottest','expansile','bigger','poromeric','heron','jungfrau','oidia','pandavas','razeeing','zymologic','roseless','delicia','agacles','unjuicily','coalesce','revoting','thimphu','anatomy','feminie','pyxidia','parousia','shabbier','tempura','vagal','diatribe','deftly','ava','ginkgo','unexhumed','cocoyam','aydelotte','connexion','bagh','alost','machinist','sloane','china','attingent','pustule','yirr','valdosta','interlace','popish','unknelled','redenied','phallus','epaulet','unechoic','angora','church','teledu','quickly','reground','runty','cheshire','scurrile','sheeney','fathomer','sarasvati','gypsyism','ignition','spewer','tankless','unusurped','vale','rejection','anxiety','lacuna','madonna','wider','profferer','sporty','markevich','burger','ephippia','jail','davey','molise','aft','forth','caldaria','outjet','zionist','halachot','recourse','margareta','danseuse','kamet','redefeat','ivor','sitzkrieg','judaea','dupr','backward','gari','discomfit','calgary','complice','colonised','mass','pretender','unionize','manoeuvre','holloaed','paccha','nereid','cardhouse','unfacile','bouillon','accessory','american','unequal','quidnunc','observe','irishised','hoylake','tarried','decried','merl','urolith','trustable','similarly','melpomene','fraught','mango','dana','palencia','margin','zibeline','elucidate','nouma','cete','larum','unpeopled','kanji','unstrewn','aslant','bing','shovel','firework','rampager','antipodes','phrensied','eulogy','idiotise','adamant','preguess','showmanly','tendril','felicidad','liou','senza','ambulated','siloxane','cunt','scientist','illumed','unsmooth','agonist','pyalla','submiss','celluloid','flighty','apriorism','minuend','choicer','preexact','fushun','contusion','acol','foreskin','hostaging','lynchet','atresia','exalter','adieus','unflowing','cousinry','quittable','atomist','rooflike','gavotte','faunally','steampipe','canoodle','unsponged','boltlike','penance','podiums','commit','finalize','landsmaal','natant','tropical','enigma','ticknor','nastiness','varicose','kopje','umbonal','vignette','warded','rainbird','mewar','bullet','narceine','leangle','curtesy','devastate','furrily','strobic','theomancy','mfd','embolus','perutz','eurhythmy','sayers','shapka','goadlike','timbale','ligating','cutwater','salmon','fretwork','mobutu','descartes','craftiest','idyll','capsid','handsewn','abbotcy','absonant','deface','scroop','rort','pup','incarnate','kirigami','frog','unicycle','burgher','allobaric','bizerta','disjaskit','void','dinkiest','gawkier','duello','boresome','snowcreep','autoharp','begabled','foxberry','lumberer','purer','muticous','auber','topiaries','hereupon','elegantly','ranee','haywire','unbay','sorceries','baker','caucasia','cooing','underfed','biography','nonethnic','ozonizer','bowerlike','cullis','pip','exeter','cloakroom','shembe','mycelium','falderol','saltier','smetana','attrahent','diabolize','vampiric','pretimely','fetial','asterion','topmost','phyton','aseity','autobahn','impinger','draftiest','chapatti','orator','dunedin','beatitude','danbury','greg','celebrate','scrip','pithead','iapigia','carbuncle','manila','holler','marital','bisection','shapable','terrier','gullable','syndromic','overwrite','niceness','athetoid','duka','degummed','floc','wady','dogcart','vatted','deckhead','sapwood','addition','plication','sucrose','stanton','lollardy','befall','teughness','alcalde','galumph','panoptic','oriental','wellesley','mutualism','ductwork','everybody','covin','cosiness','pelican','meagerly','wittily','outshaped','baghlan','kelson','vivace','wagnerite','caboodle','wifelike','foretaste','enuring','aspen','cavatina','durban','dulciana','dissenter','outreckon','richfield','retrorse','kerkyra','diosgenin','engage','pulsating','cheddar','melodist','hide','thiazole','bassano','loppy','dabble','nerve','oncost','kay','usa','hechshers','afire','enfetter','useable','poleax','decameron','subhall','ophore','gentisate','cultigen','ampersand','genetic','unwhite','prologise','brynza','unnipped','jag','keifer','schedular','creosotic','homocercy','trogon','chuprassi','pizzicato','lilyan','enc','heeze','verier','archfiend','nares','sorgho','tuberoid','pickled','peanuts','casemate','frond','ghazi','sloshiest','viand','volta','thespiae','greenberg','brand'];
        
        //var g_wordsList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'c', 'd','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        window.words = g_wordsList;

        var g_firedMissiles = [];
        var g_isGamePaused = false;
        var g_isGameOver = false;
        var g_username;
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

        self.g_cities = [];
        self.g_words = [];
        self.g_firedWords = [];
        self.g_numFiredWords = 1;
        self.g_score = 0;
        self.g_numWordsDestroyed = 0;
        self.g_level = 17;
        self.g_explosionDimensions = {};
        self.g_intervals = {
            throwWords: null,
            checkCollisions: null,
            activeMisile: null,
            newLevel: null,
            explosions: null,
            playHitSound: null
        };

        //var words = ['aaa', 'bbb', 'ccc', 'ddd', 'eee','fff', 'ggg', 'hhh'];
        self.g_levels = {

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
            self.g_cities.push(new city('city1'));
            self.g_cities.push(new city('city2'));
            self.g_cities.push(new city('city3'));

            createMissilesExplosions();

            bindEvents();

            return self;
        };

        function bindEvents(){
            $(document)
                .on('click', '#pause', pauseGame)
                .on('click', '#resume', pauseGame)
                .on('submit', '.gameOver-addToRanking', addScore)
                .on('click', '.startScreen-playButton', startGame);

            document.addEventListener('keydown', onKeyDown);
        }

        /**
        * Starts the game.
        */
        function startGame(){
            $('.startScreen').hide();

            //adding words to the page
            createSounds(g_sounds);
            
            throwWordsInterval();
            checkCollisions();

            utils.playSound('background', 'loop');

            setTimeout(function(){
                $('#game').addClass(ACTIVE);
            }, 500);

            setLevel(self.g_level);
        }

        /**
        * Pausing the game.
        */
        function pauseGame(e){
            e.preventDefault();
            g_isGamePaused = true;

            //clearing intervals
            for(var property in self.g_intervals){
                clearInterval(self.g_intervals[property]);
            };
        }

        /**
        * Resuming the game.
        */
        function resumeGame(e){
            if(e){
                e.preventDefault();
            }
            g_isGamePaused = false;
        }

        /**
        * Creating all the words objects and adding all those words in the DOM.
        */
        function createWords(){
            for(var i = 0; i < self.g_levels[self.g_level].words; i++){
                var wordIndex = utils.getRandom(self.g_words.length);
                var wordText = g_wordsList[wordIndex];
                
                self.g_words.push(new word(wordText));

                //removing the word from our words array
                g_wordsList.splice(wordIndex, 1);
            }
        }

        /**
        * Creating the a few missile explosion elements in the DOM to be used later on during the game.
        */
        function createMissilesExplosions(){
            var wordsExplosions = '';
            for(var i = 0; i < 7; i++){
                wordsExplosions = wordsExplosions + '<div class="explosion"></div>';
            }
            $g_game.append(wordsExplosions);

            self.g_explosionDimensions = {
                width: $('.explosion').first().width(),
                height: $('.explosion').first().height()
            };            
        }

        /**
        * Creates an interval for the throwing of words.
        */
        function throwWordsInterval(){
            self.g_intervals.throwWords = setInterval(throwWords, self.g_levels[self.g_level].fallingLapse);
        }

        /**
        * Time to throw some words!
        */
        function throwWords(){
            //hidding the level text
            if(self.g_numFiredWords == 1){
                $g_level.style.display = 'none';
            }

            //let's throw words!
            if(self.g_numFiredWords <= self.g_levels[self.g_level].words){
                //firing a word
                self.g_words[0].fire();
                self.g_firedWords.push(self.g_words[0]);

                //removing the word from on index 0 from our g_words array and g_wordsList array
                self.g_words.splice(0, 1);
            }

            //reached the end of the level?
            if(self.g_numWordsDestroyed === self.g_levels[self.g_level].words){
                self.g_level++;
                self.g_numFiredWords = 1;
                self.g_numWordsDestroyed = 0;

                //we need to fire it again with the speed for the new level
                clearInterval(self.g_intervals.throwWords);

                //lapse between levels
                self.g_intervals.newLevel = setTimeout(function(){
                    setLevel(self.g_level);
                    throwWordsInterval();
                }, 1000);
            }
        }

        /**
        * Showing the level information on the screen. Shown when
        * swithing to another level.
        */
        function setLevel(level){
            var levelInfo = document.querySelector(".game-info .game-info-level");
            levelInfo.innerHTML = level;
            $g_level.innerHTML = "Level" + level;
            $g_level.style.display = 'block';
            utils.playSound('newLevel');

            //removing unused missiles (we don't like rubish in our DOM)
            $('.missile').remove();

            //adding the words for the level
            createWords();
        }

        /**
        * Showing the current score on the screen.
        */
        self.setScore = function(score){
            $g_score.innerHTML = numberWithCommas(score);
            animateScore(self.g_score, score, 500);
            self.g_score = score;
        };

        /**
        * Animates the score while chaning to another value.
        */
        function animateScore(start, end, duration) {
            var range = end - start;
            var current = start;
            var increment = end > start? 1 : -1;
            var stepTime = Math.abs(Math.floor(duration / range));
            var timer = setInterval(function() {
                current += increment;
                $g_score.innerHTML = numberWithCommas(current);
                if (current == end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }

        /**
        * When pressing a key.
        */
        var pepe = 1;
        function onKeyDown(e) {
            var value = e.key;
            var isAnyWordActive = false;

            //utils.playSound('missile');
            //document.querySelectorAll('.missile')[pepe].classList.add(ACTIVE);
            //pepe++;

            //for each non active letter of each active word
            for(var a = 0; a < self.g_firedWords.length; a++){
                var word = self.g_firedWords[a];
                var currentLetter = word.getCurrentLetter();
              
                if (isWordInProgress(word) && currentLetter === value) {
                    isAnyWordActive = true;

                    var playHitSound = function(){
                        utils.playSound('hit');
                    };

                    //to fire it only once when multiple the letter gets active in multiple words
                    //at the same time
                    clearTimeout(self.g_intervals.playHitSound);
                    self.g_intervals.playHitSound = setTimeout(playHitSound, 10);

                    word.$word[0].getElementsByTagName('span')[word.activeLetters].classList.add(ACTIVE);
                    word.activeLetters++;

                    //remove the word, well done!
                    if(word.isCompleted()){
                        g_firedMissiles.push(word.missile);
                        word.missile.fire();
                        self.g_firedWords.splice(self.g_firedWords.indexOf(word), 1);
                        word.activeLetters = null;

                        //removing active letters from other words
                        for(var b = 0; b < self.g_firedWords.length; b++){
                            self.g_firedWords[b].removeActiveLetters();
                        }
                    }
                }

                //commited a mistake when typing?
                else{
                    word.removeActiveLetters();
                }
            }
            if(!isAnyWordActive){
                utils.playSound('noLetter');
            }
        }

        /**
        * Checks the collisions between misiles and words
        */
        function checkCollisions(){
            var missile;
            var word;
            var i;

            for(i = 0; i < g_firedMissiles.length; i++){
                missile = g_firedMissiles[i];
                missile.checkCollision();
            }

            if(!g_isGamePaused && !g_isGameOver){
                requestAnimFrame(checkCollisions);
            }
        }

        /**
        * Removing the missile from our list of missiles.
        */
        self.removeMissile = function(missile){
            //removing the missile from the array
            g_firedMissiles.splice(g_firedMissiles.indexOf(missile), 1);
        };

        /**
        * Determines whether a word is in progress of being completely filled or not.
        */
        function isWordInProgress(word){

            //getting the number of active letters in the word with most active letters
            var max = self.g_firedWords.reduce(function(prev, current) {
                if(!prev.activeLetters){
                    return current;
                }
                return (prev.activeLetters > current.activeLetters) ? prev : current;
            }).activeLetters;

            return (word.activeLetters == max || word.activeLetters + 1 == max);
        }

        /**
        * Game over!
        */
        self.gameOver = gameOver;
        function gameOver(){
            g_isGameOver = true;
            $(WORD_SEL).remove();
            utils.playSound('gameOver');
            document.getElementById('level').style.display = 'none';
            $g_gameOver.addClass(ACTIVE);
            $g_gameOver.find('.gameOver-score').text(numberWithCommas(self.g_score));

            //unbinding events
            $(document)
                .off('click', '#pause')
                .off('click', '#resume');

            document.removeEventListener('keydown', onKeyDown);

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

        self.test = function(){

            var result = {
                message: "Your score has been added to the ranking!",
                success: true,
                users: [
                    {id: "5", name: "alvaro", score: "1000", created: "2018-12-07 16:54:58"},
                    {id: "6", name: "alvaro", score: "1000", created: "2018-12-07 16:56:54"},
                    {id: "7", name: "alvaro", score: "1000", created: "2018-12-10 13:27:04"},
                    {id: "8", name: "alvaro", score: "1000", created: "2018-12-10 13:28:14"},
                    {id: "9", name: "pepito", score: "1000", created: "2018-12-10 13:33:41"},
                    {id: "10", name: "juanito", score: "1000", created: "2018-12-10 13:58:11"},
                    {id: "11", name: "fadsfaf", score: "0", created: "2018-12-07 16:24:52"},
                    {id: "12", name: "fdasfa", score: "0", created: "2018-12-07 16:45:19"},
                    {id: "13", name: "alvaro", score: "0", created: "2018-12-07 16:45:39"},
                    {id: "14", name: "alvaro", score: "1000", created: "2018-12-07 16:56:54"},
                    {id: "15", name: "alvaro", score: "1000", created: "2018-12-10 13:27:04"},
                    {id: "16", name: "alvaro", score: "1000", created: "2018-12-10 13:28:14"},
                    {id: "17", name: "pepito", score: "1000", created: "2018-12-10 13:33:41"},
                    {id: "18", name: "juanito", score: "1000", created: "2018-12-10 13:58:11"},
                    {id: "19", name: "fadsfaf", score: "0", created: "2018-12-07 16:24:52"},
                    {id: "20", name: "fdasfa", score: "0", created: "2018-12-07 16:45:19"},
                    {id: "21", name: "alvaro", score: "0", created: "2018-12-07 16:45:39"}
                ]
            };

            if(result['success']){
                if(result['message']){
                    $g_gameOver.find('.gameOver-message').html(result['message']);

                    //adding the ranking column
                    result.users.map(function(user, index){
                        user.rank = index + 1;
                    });

                    $('.gameOver-addToRanking-button').removeClass(ACTIVE);

                    showRanking(result.users);
                }
            }else{
                alert("Error adding the score! Contact Alvaro! @imac2")
            }
        };

        /**
        * Saving the score of the game.
        */
        function addScore(e){
            e.preventDefault();
            var $addScoreButton = $('.gameOver-addToRanking-button');

            //sending the data already? Bye bye my friend!
            if($addScoreButton.hasClass(ACTIVE)){
                return;
            }

            g_username = $g_gameOver.find('#name').val();
            $addScoreButton.addClass(ACTIVE);

            var params = {
                name: g_username,
                score: self.g_score,
                surname: $g_gameOver.find('#surname').val()
            };

            $.post('http://localhost/extensions/experiments/game-ranking/?action=save', params, function(result){

                var result = {
                    message: "Your score has been added to the ranking!",
                    success: true,
                    users: [
                        {id: "5", name: "alvaro", score: "1000", created: "2018-12-07 16:54:58"},
                        {id: "6", name: "alvaro", score: "1000", created: "2018-12-07 16:56:54"},
                        {id: "7", name: "alvaro", score: "1000", created: "2018-12-10 13:27:04"},
                        {id: "8", name: "alvaro", score: "1000", created: "2018-12-10 13:28:14"},
                        {id: "9", name: "pepito", score: "1000", created: "2018-12-10 13:33:41"},
                        {id: "10", name: "juanito", score: "1000", created: "2018-12-10 13:58:11"},
                        {id: "11", name: "fadsfaf", score: "0", created: "2018-12-07 16:24:52"},
                        {id: "12", name: "fdasfa", score: "0", created: "2018-12-07 16:45:19"},
                        {id: "13", name: "alvaro", score: "0", created: "2018-12-07 16:45:39"},
                        {id: "14", name: "alvaro", score: "1000", created: "2018-12-07 16:56:54"},
                        {id: "15", name: "alvaro", score: "1000", created: "2018-12-10 13:27:04"},
                        {id: "16", name: "alvaro", score: "1000", created: "2018-12-10 13:28:14"},
                        {id: "17", name: "pepito", score: "1000", created: "2018-12-10 13:33:41"},
                        {id: "18", name: "juanito", score: "1000", created: "2018-12-10 13:58:11"},
                        {id: "19", name: "fadsfaf", score: "0", created: "2018-12-07 16:24:52"},
                        {id: "20", name: "fdasfa", score: "0", created: "2018-12-07 16:45:19"},
                        {id: "21", name: "alvaro", score: "0", created: "2018-12-07 16:45:39"}
                    ]
                };

                if(result['success']){
                    if(result['message']){
                        $g_gameOver.find('.gameOver-message').html(result['message']);

                        //adding the ranking column
                        result.users.map(function(user, index){
                            user.rank = index + 1;
                        });

                        $addScoreButton.removeClass(ACTIVE);

                        showRanking(result.users);
                    }
                }else{
                    alert("Error adding the score! Contact Alvaro! @imac2")
                }
            })
        }

        //to remove
        self.showRanking = showRanking;

        /**
        * Shows the ranking of players.
        */
        function showRanking(users){
            $('.ranking').show();
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
                order: [0, 'asc'],
                bLengthChange: false, //thought this line could hide the LengthMenu
                bInfo: false,
                language: {
                    "search": "Search for your name"
                },
                data: users,
                pageLength: 10,
                columns: [
                    {
                        width: '60px',
                        data: 'rank'
                    },
                    { 
                        width: '70px',
                        data: 'score' 
                    },
                    {
                        data: 'name'
                    },
                    {
                        width: '150px',
                        data: 'created'
                    }
                ],
            });
        }

        /**
        * Adds the thousands comma in a number
        */
        function numberWithCommas(x){
            if(!x){ return 0;}
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

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

        /**
        * Creating all sounds DOM elements for the game.
        */
        function createSounds(g_sounds){
            for(var i=0; i<g_sounds.length; i++){
                createSound(g_sounds[i]);
            }
        }

        /**
        * Pausing all sounds.
        */
        function pauseSounds(g_sounds){
            for(var i=0; i<g_sounds.length; i++){
                g_mysound[g_sounds[i]].pause();
            }
        }

        /**
        * Determines whether the browser supports Mpeg audio or not.
        * http://stackoverflow.com/questions/17791602/sound-notifications-in-opera
        */ 
        function isMpeg(){
            var a = document.createElement('audio');
            return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
        }

        /**
        * Removing a city from our array of cities.
        */
        self.removeCity = function(city){
            self.g_cities.splice(self.g_cities.indexOf(city), 1);
        };

        /**
        * Removing a word from our array of words.
        */
        self.removeWord = function(random){
            self.g_words.spice(random, 1);
        };
    }

    gameModel = new fallingWords().init();
    window.game = gameModel;
})(jQuery);
