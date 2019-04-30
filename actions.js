/*!
 * Falling Words Game 1.0.2
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
    var g_sounds = {
        'hover': null,
        'gameOver': null,
        'background': null,
        'newLevel': null,
        'destroyWord': null,
        'noLetter': null,
        'hit': null,
        'missile': null,
        'city-explosion': null
    };
    var g_localStorageKey = 'alvaro_fallingwords';
    var g_baseURL= 'https://alvarotrigo.com/fallingwords/';
    var g_baseURL_backend= 'https://alvarotrigo.com/fallingwords/backend/';

    //the amount of pixels that a word moves 
    var g_wordSpace = 651;
    var g_wordVelocity = 0;
    var g_wordY;
    var g_missileSpace = 600; 
    var g_missileVelocity = g_missileSpace / 700;
    var g_missileY;
    var g_gamePositionTop = $('#game')[0].getBoundingClientRect().top;

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
                var sound = g_sounds[fileName];
                if(sound){
                    sound.currentTime = 0;

                    if(options === 'loop'){
                        sound.loop = true;
                        sound.play();
                    }else{
                        //in order to play the same sound over itself
                        var promise = sound.cloneNode(true).play();

                        //we just dont want to show the console error when autoplay is disabled :)
                        if (typeof promise !== undefined) {
                            promise.then(function(){
                                // Autoplay started!
                            }).catch(function(error){
                                //error
                            });
                        }
                    }
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
        var MISSILE_SEL = '.missile';

        self.word = word;
        self.$missile = null;
        self.timeWhenFired = null;

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
            self.timeWhenFired = Date.now();
        };

        /**
        * Missile hitting the word
        */
        self.checkCollision = function(){
            g_wordY =  1 + g_wordVelocity * (Date.now() - self.word.timeWhenFired);
            g_missileY = (531+115) - (0 + g_missileVelocity * (Date.now() - self.timeWhenFired));
            
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
        self.timeWhenFired = null;

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
            self.setSpeed(gameModel.g_level);
            self.timeWhenFired = Date.now();
            gameModel.g_numFiredWords++;
        };

        /**
        * Setting the speed for the word to fire based on the level and
        * adding some random value withtin a thresold. So they won't all have the
        * same speed.
        */
        self.setSpeed = function(level){
            var speed = gameModel.g_levels[level].speed * 1000;
            g_wordVelocity = 651/speed; 

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
                top: self.$word[0].getBoundingClientRect().top - gameModel.g_explosionDimensions.height/2 - g_gamePositionTop,
                left: self.left + self.width / 2 - gameModel.g_explosionDimensions.width/2,
            };

            $explosion[0].classList.add(ACTIVE);
            $explosion.css(params);
            gameModel.g_intervals.explosions = setTimeout(utils.removeActive.bind($explosion[0]), 600);
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

        var EXPLOSION = 'city-explosion';
        var EXPLOSION_SEL = '.' + EXPLOSION;
        var g_limitImpacts = 3;
        var g_cityExplosionImage = 'imgs/city-explosion.png';

        self.index = gameModel.g_cities.length + 1;
        self.$city = null;
        self.left = 0;
        self.right = 0;
        self.width = 0;
        self.impacts = 0;
        self.id = id;
        self.explosions = [];
        self.g_cityExplosionDimensions = {};
        self.activeExplosion = null;

        self.init = function(){
            self.$city = $('#' + id);
            self.left = self.$city.position().left;
            self.width = self.$city.width();
            self.right = self.left + self.width;

            //creating temporal explosion element to get its size
            var cityExplosion = document.createElement('div');
            cityExplosion.className = EXPLOSION;
            document.body.appendChild(cityExplosion);

            self.g_cityExplosionDimensions = {
                width: $(EXPLOSION_SEL).first().width(),
                height: $(EXPLOSION_SEL).first().height()
            };

            document.body.removeChild(cityExplosion);

            self.createExplosion();
            self.bindEvents();
        };

        self.bindEvents = function(){
            for(var i = 0; i < self.explosions.length; i++){
                $(self.explosions[i].item).on("animationend", self.onExplosionEnds);
            }
        };
        
        /**
        * Creating the explosion elements for each city.
        */
        self.createExplosion = function(){
            //city explosions
            for(var i = 0; i < 4; i++){
                var cityExplosion = document.createElement('div');
                var left = self.left + self.width / 2 - self.g_cityExplosionDimensions.width/2;
    
                cityExplosion.className = 'city-explosion';
                cityExplosion.style.left = left + 'px';
                cityExplosion.id = id + '' + (i + 1);

                self.explosions.push({
                    item: cityExplosion,
                    isVisible: false,
                    index: i + 1
                });

                $g_game[0].appendChild(cityExplosion);
            }
        };

        /**
        * Exploding the city.
        */
        self.explode = function(){
            self.activeExplosion = self.explosions.filter(function(explosion){
                return !explosion.isVisible;
            })[0];

            if(self.activeExplosion){
                self.activeExplosion.isVisible = true;

                $activeExplosion = self.activeExplosion.item;
                $activeExplosion.classList.add(ACTIVE);

                self.shake();
            }
        };

        self.onExplosionEnds = function(){
            var el = this;
            var currentExplosion = self.explosions.filter(function(explosion){
                return explosion.isVisible && explosion.item.isEqualNode(el);
            })[0];

            if(currentExplosion){
                currentExplosion.isVisible = false;
                $(currentExplosion.item).removeClass('active');
            }
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
                self.$city[0].classList.add('state4')
                self.$city[0].classList.remove('state3');

                //delete game.g_cities[key];
                gameModel.removeCity(self);
            }
            else if(self.impacts == 1){
                self.$city[0].classList.add('state2');
            }
            else if(self.impacts == 2){
                self.$city[0].classList.add('state3');
                self.$city[0].classList.remove('state2');
            }
        };

        //constructor
        (function(){
            self.init();   
        })();

        return self;
    }

    function fallingWords(){
        var self = this;

        var WORD_SEL = '.word';
        var g_wordsList = ["abrigo","agujeta","calcetines","calzoncillo","camisa","camiseta","corbata","gorra","algodon","blusa","bolsa","cierre","cinturon","falda","guantes","medias","plantas","arbol","arbusto","cactus","abeja","alacran","alce","aguila","anguila","araña","ardilla","ardillita","armadillo","bisonte","lechuza","burro","caballo","cabra","caiman","camaleon","cardenal","cebra","cerdo","cocodrilo","colmillo","conejo","cisne","cucaracha","cuerno","cuervo","elefante","escarabajo","gato","gaviota","gorrion","grillo","gusano","halcon","hipopotamo","hormiga","babero","biberon","carrito","chupador","cuna","baño","bañera","champu","desague","ducha","espejo","cocina","abrelatas","caldero","colador","congelador","cuchara","destapador","escurridor","estufa","fregadero","gabinete","horno","horno","jarra","cuarto","aspiradora","escoba","lavadora","limpiadora","cuarto","cama","mesita","comoda","almohada","cobija","escalera","jarron","lampara","mesita","pared","pintura","repisa","sofa","sillon","herramientas","metrica","destornillador","formon","aeropuerto  ","bolso","equipaje","restaurante","cocinero","menu","gasolinera","grandes","playa","aletas","arena","alga","castillo","bronceadora","gafas","apartamentos","ascensor","banca","basurero","edificio","oficinas","tornado","huracan","inundacion","lluvia","nieve","nublado","hace","sol","tenis","basquetbol","golf","futbol","futbol","voleibol","ping","badminton","beisbol","guitarra","tambores","trompeta","rojo","azul","amarillo","verde","violeta","morado","limon","lima","frijoles","tomate","remolacha","rabano","mantequilla","miel","nuez","mermelada","jalea","jugo","dulce","mayonesa","kechup","mostaza","piña","banana","durazno","albaricoque","pera","uva","pasa","harina","comida","familia","mama","papa","hermano","hermana","abuelos","abuela","abuelo","primos","sobrino","cuñado","cuñada","suegra","cajuela","ventana","rueda","llanta","claxon","volante","chofer","pajarita","pantalones","sombrero","sueter","traje","zapatos","pijama","pantaleta","pantimedia","sandalias","vestido","zapatos","hoja","margarita","tallo","tulipan","violeta","rosa","iguana","jirafa","lagartija","leon","libelula","llama","loro","mantis","mariposa","mono","mosca","mosquito","pajaro","paloma","perro","petirrojo","pez","oso","oveja","rana","rata","raton","raya","renacuajo","rinoceronte","salmon","saltamontes","tiburon","tigre","tortuga","trompa","trucha","vaca","venado","zorro","zancudo","cuna","oso","pañal","esponja","excusado","jabon","jabonera","lavamanos","tina","toalla","lavaplatos","licuadora","mesa","nevera","olla","plato","pimentero","refrigerador","salero","sarten","servilleta","tapa","tenedor","tostador","vaporera","vaso","recogedor","secadora","despertador","sabanas","armario","colgador","techo","muebles","mesa","cama","sillon","silla","escritorio","piano","basurero","llave","martillo","sierra","maleta","mesa","camarera","bolso","oferta","mar","onda","orilla","toalla","traje","sombrilla","oficina","autobus","calor","temperatura","termometro","nebuloso","neblina","ventoso","hace","humedad","nube","jockey","rugby","equitacion","natacion","equipo","piano","letra","anaranjado","rosa","marron","negro","blanco","aperitivo","aguacate","carnederes","desayuno","coliflor","apio","queso","pollo","postre","cena","huevo","pescado","hamburguesa","hotdog","papas","almuerzo","lechuga","leche","puerco","papas","ensalada","sandwich","sopa","azucar","pavo","agua","helado","suegro","novio","hijo","hija","nuera","yerno","amigo","novio","marido","esposa","madre","padre","sobrina","gasolina","cinturon","bulbo","fachada","pasar","pelota","pakistani","pronto","como,","cuanto","archipielago","demorado,","avion","retrasado","telefono","ulcera","floristeria","septimo","escuadra","noche","mayordomo","cebolletas","padrastro","tumbona","asco,","repulsion","mortificacion","oval","bahia","funda","calamar","berro","cantante","remordimiento","tendencia","desmayarse","pamela","despejado","snowboard","cubico","barajar","cartas","bañero","vibora","cascabel","cacerola","bragas","tanto","gimnasia","potro","playo","dentista","estudio","hinchazon","trabajo","cadena","piraguismo","aspero,","rugoso","groenlandes","soledad","tienda","deportes","balon","jersey","berberechos","derecho","laboral","epidemia","grueso","derrota","copa","mundo","para,","objeto","extremidades","tener","pinchazo","pepino","embargo","hojas","despues","cabo","pañuelo","bolsillo","clasificacion","dormitorio","lirio","repugnancia","hasta","embarcar","solar","ochenta","buey","enchufe","pezones,","tetillas","mejillon","caracol","abanico","septuagesimo","actualizado","decimoquinto","cordero","horror","corazones","angustia","manzana","plata","gladiolo","chaque","amor","ajedrez","ira,","colera","choza","compañia","aerea","planta","deseo","saque","puerta","paperas","tension","pasaporte","tarantula","poste","chichon","armario,","ropero","boxeo","grados","quemadura","hipodromo","atraccion","aire","acondicionado","despegar","primogenito","halterofilia","ahijada","desierto","pecho","esteticista","canadiense","toca","mover","picadura","insecto","aprendiz","viento","corral","carreras","coches","cadera,","caderas","impermeable","cocida","perito","mercantil","rascacielos","griego","veterinario","oftalmologo","nieta","metros","cubierto,","encapotado","inseguridad","anticuado","entrada","para","celo","vendedor","judo","transmision","bunker","portico,","porche","motor","torax","sanguijuela","coreano","tirar","boliviano","cuartel","militar","borrador","misil","esmalte","uñas","cazadora","obrero","agricola","torero","berenjena","director","orquesta","polo","norte","hinojo","hipo","coles","bruselas","maestro","chaleco","prismaticos","cubo","salsa","carne","baloncesto","hostal"];
        var g_wordsList = ['patience','teach','exemption','excuse','beach','unlikely','regret','hypothesize','sting','resolution','clear','democratic','album','manufacturer','guard','articulate','freshman','castle','willpower','major','ground','robot','capital','share','beautiful','bible','intention','agency','provision','slave','bucket','cotton','omission','sticky','talented','separate','dictate','determine','occupy','dragon','definite','assertive','sculpture','colorful','steak','stadium','stall','cheese','cooperation','classroom','plain','voyage','laborer','ankle','broccoli','permission','ribbon','slippery','radiation','emphasis','length','middle','grave','reluctance','blonde','revolution','generation','reach','harmful','quarrel','undertake','formula','likely','detail','torture','ethnic','necklace','index','offspring','thick','captivate','virus','dangerous','experiment','drive','scatter','persist','preference','clothes','swarm','abolish','vigorous','jewel','paint','cucumber','environment','crude','lesson','departure','perforate','horizon','greeting','correspond','mathematics','basic','conflict','timber','black','drain','suppress','vegetation','consumer','serve','leaflet','fantasy','prayer','seminar','address','favour','ideal','tired','exercise','application','convulsion','refund','house','defend','facility','exploit','college','straw','build','dairy','depressed','terrify','depression','feminist','liver','tribe','advocate','beneficiary','shift','community','rugby','arrange','petty','elite','patent','singer','debut','animal','transform','magnetic','bloodshed','penny','denial','shareholder','aloof','bathtub','default','grind','functional','assembly','cultural','healthy','carve','economic','admiration','carbon','shortage','dignity','overeat','difficult','copyright','sacred','choose','rescue','pocket','tight','pupil','stitch','domination','haircut','romantic','bubble','district','sunshine','dozen','arena','glacier','passage','contain','dimension','prosper','morsel','protection','reporter','active','science','hover','selection','estimate','mouse','strange','stock','appointment','throat','kidney','protect','distinct','count','safari','complication','offend','perfect','exchange','marathon','fireplace','wheat','frequency','explode','embrace','credit','deputy','consider','copper','coach','crouch','tablet','reactor','strict','visible','result','recession','constraint','concentration','pilot','quest','distort','useful','needle','ensure','bowel','aspect','pedestrian','psychology','siege','speech','solution','surface','monkey','horse','disaster','prosecution','operational','carpet','circle','wisecrack','offender','light','appetite','automatic','deserve','killer','border','thigh','deposit','neighborhood','tract','crowd','awful','fence','confuse','example','executrix','strong','craft','cheek','occupation','breed','report','pneumonia','extension','translate','funny','helmet','indoor','volume','activate','custody','mistreat','credibility','missile','reckless','institution','biography','bring','charm','empirical','consideration','participate','conception','paradox','virgin','shape','understanding','import','offer','objective','thesis','cinema','north','criminal','interference','sheep','ambition','blank','complex','danger','carrot','joint','horror','nervous','bridge','restaurant','frank','horseshoe','railroad','stomach','start','eject','literature','assault','prediction','exile','advantage','blade','interface','knife','short','monster','particle','tooth','total','problem','waterfall','bargain','preoccupation','trunk','publisher','rider','drink','office','superintendent','endorse','reservoir','admission','fastidious','whisper','linen','lifestyle','insert','consultation','punch','scrap','comfort','account','sanctuary','stroll','counter','common','behavior','reverse','insure','noise','combine','agent','platform','welcome','license','lunch','gossip','restless','drown','bracket','imposter','unlike','characteristic','refrigerator','compose','appoint','nonsense','print','toast','donor','front','influence','motorcycle','infrastructure','communication','pumpkin','spoil','acquit','confusion','hilarious','kinship','moment','building','memorial','exclusive','adult','speculate','crosswalk','march','justify','cruelty','asylum','inquiry','attachment','stand','presence','trend','anniversary','favor','clinic','telephone','remedy','evolution','multiply','domestic','discrimination','federation','tiger','seize','agreement','vegetable','allocation','direction','essay','ideology','still','digress','licence','voucher','desire','casualty','disappoint','confession','flourish','concrete','compete','payment','spectrum','source','firefighter','leash','hunter','medicine','estate','fountain','variable','torch','ostracize','frame','Koran','progressive','acceptance','relax','multimedia','coincidence','chord','future','agriculture','representative','absence','guerrilla','customer','civilian','proposal','cluster','dollar','circulate','committee','hypnothize','bounce','equinox','favourite','attack','conservative','uniform','researcher','contract','enthusiasm','hardware','review','minority','glide','money','discovery','investment','giant','grateful','volunteer','refer','instruction','buttocks','piece','dinner','assumption','vision','pepper','pledge','grandmother','judge','ambiguous','coincide','model','glimpse','tumble','assessment','failure','reflect','supplementary','recover','shell','construct','effective','progress','liberty','fossil','confine','hardship','mixture','coerce','syndrome','doubt','encourage','garlic','means','command','official','addition','chapter','cause','password','matter','background','flight','argument','hostile','suffer','trivial','topple','harsh','fashion','reasonable','incredible','similar','chemistry','deteriorate','polish','freighter','liberal','election','intervention','tension','finished','devote','mosquito','advance','training','investigation','education','rough','pigeon','important','contact','chauvinist','bullet','operation','moving','history','promotion','sequence','artificial','expand','squash','lemon','reform','manual','ballet','therapist','recruit','develop','thirsty','promote','delicate','econobox','earthflax','hospitality','global','claim','jelly','corner','economics','resident','enjoy','bother','theme','wonder','recommendation','staff','chain','sacrifice','stunning','midnight','violation','twitch','blast','peace','forget','sound','acceptable','bench','flash','screen','impulse','compensation','speed','patch','astonishing','merit','explosion','innovation','affinity','timetable','invisible','evoke','recycle','constant','dress','conviction','first','shaft','opera','hunting','revise','understand','suggest','close','medal','absent','retreat','ministry','worth','posture','fragment','basin','escape','member','extend','fibre','chocolate','highway','tumour','thought','distortion','lonely','cater','reliance','comedy','cupboard','recommend','dedicate','overall','order','snatch','scream','prize','flexible','agile','decrease','trace','development','factory','alcohol','cover','diplomat','retired','venus','burial','vague','expertise','energy','retiree','photography','feign','excess','misery','amber','option','theory','invasion','sleep','dilute','flavor','marketing','haunt','analysis','trial','snake','filter','steep','consensus','integrity','publish','struggle','weave','lover','disappointment','guess','cancer','marriage','printer','aluminium','association','family','purpose','gravity','muscle','treasurer','inflation','hypothesis','shallow','foster','sister','reception','judgment','implicit','outer','concession','promise','inspire','legislation','grounds','habitat','clarify','remember','steel','preparation','commemorate','dough','constitutional','entitlement','headquarters','bloody','digital','store','narrow','category','football','hobby','conservation','pursuit','abnormal','confront','tolerant','harvest','tournament','smile','specimen','relative','efflux','dribble','spine','positive','version','europe','expect','tiptoe','commitment','undermine','economist','stuff','yearn','heroin','paralyzed','calculation','respectable','exempt','creation','stimulation','rhetoric','shine','answer','affair','popular','title','alarm','gradual','witch','graze','proportion','elbow','large','stain','wound','remain','accessible','overwhelm','character','reality','growth','smooth','sweater','powder','restrict','adjust','press','strategic','collapse','lease','aviation','announcement','position','leadership','discuss','minimum','merchant','stable','genuine','survivor','arrogant','coast','detector','straight','weight','neighbour','heart','loose','collect','height','classify','survey','replacement','invite','cross','observer','fruit','overcharge','content','grand','feedback','conceive','slice','dismissal','unpleasant','critic','bless','route','hammer','abbey','musical','campaign','engine','indulge','conference','calorie','cherry','flour','ordinary','aquarium','organize','float','notion','consolidate','terminal','oppose','pasture','foundation','plagiarize','module','transport','extent','latest','accident','resource','young','particular','rotation','labour','avenue','society','canvas','increase','environmental','asset','break','solid','terrace','person','miracle','disagree','suspect','intensify','discriminate','aisle','cancel','obscure','wedding','velvet','budget','retire','obstacle','spite','place','insist','museum','facade','ceiling','ancestor','wreck','brave','revenge','soldier','proud','broadcast','childish','exaggerate','knock','congress','sheet','plane','overlook','novel','brother','perception','revival','delivery','conscious','acute','appendix','redundancy','bleed','adventure','scandal','lobby','taste','overview','practical','coffin','obligation','integration','greet','rotate','negative','touch','demonstration','instrument','skate','legislature','harbor','fairy','coffee','approve','cabin','contemporary','veteran','crown','computer','chase','register','twist','fault','image','circulation','guideline','medieval','drift','wardrobe','secretion','accumulation','bitter','surgeon','prove','flesh','manufacture','value','cigarette','acquaintance','contempt','closed','field'];
        //var g_wordsList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'c', 'd','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        var g_firedMissiles = [];
        var g_isGamePaused = false;
        var g_isGameOver = false;
        var g_hasGameStarted = false;
        var g_isMp3Supported = isMpeg();

        self.g_cities = [];
        self.g_words = [];
        self.g_firedWords = [];
        self.g_numFiredWords = 1;
        self.g_score = 0;
        self.g_numWordsDestroyed = 0;
        self.g_level = 1;
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
                speed: 18,
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
            },
            '21': {
                speed: 6,
                fallingLapse: 300,
                words: 34
            },
            '22': {
                speed: 5,
                fallingLapse: 300,
                words: 34
            },
            '23': {
                speed: 5,
                fallingLapse: 250,
                words: 34
            }
        };

        //init
        self.init = function(){
            createSounds();

            bindEvents();

            return self;
        };

        function bindEvents(){
            $(document)
                .on('click', '#pause', pauseGame)
                .on('click', '#resume', pauseGame)
                .on('submit', '.gameOver-addToRanking', addScore)
                .on('click', '.startScreen-playButton', startGame)
                .on('click', '.ranking-playButton', playAgain)
                .on('click', '.gameOver-logout', logout)
                .on('click', '.gameOver-viewRanking', viewRanking)
                .on('click', '.game-options-volume', toggleSound)
                .on('click', '.game-options-about, .game-about-back', toggleAbout)
                .on('keyup', '.gameOver-nameInput', isUsernameAvailable)
                .on('mouseenter', '.hover-sound', playOverSound)
                .on('resize', resizeHandler)
                .on('click', '.icon-stop', function(){
                    gameOver();
                    $('.startScreen').show();

                });
        }

        function resizeHandler(){
            g_gamePositionTop = $('#game')[0].getBoundingClientRect().top;
        }

        /**
        * Restarts the game and hides the game over screen
        */
        function playAgain(){
            $('.gameOver').removeClass('active');
            $('.ranking').hide();

            //removing states for cities
            $('.city').attr('class', 'city');

            //removing any left words & missiles from the DOM 
            $('.word, .missile').remove();

            //binding events again
            bindEvents();

            startGame();
        }

        /**
        * Starts the game.
        */
        function startGame(){
            self.g_cities = []
            self.g_words = [];
            self.g_firedWords = [];
            self.g_numFiredWords = 1;
            self.g_score = 0;
            self.g_numWordsDestroyed = 0;
            self.g_level = 1;
            g_firedMissiles = [];

            g_hasGameStarted = true;
            g_isGameOver = false;

            self.g_cities.push(new city('city1'));
            self.g_cities.push(new city('city2'));
            self.g_cities.push(new city('city3'));

            //clearing intervals of the possible previous game
            clearIntervals();

            createMissilesExplosions();

            throwWordsInterval();
            checkCollisions();  

            $('.gameOver').removeClass('active');
            $('.startScreen').hide();

            utils.playSound('background', 'loop');

            setTimeout(function(){
                $('#game').addClass(ACTIVE);
            }, 500);

            setLevel(self.g_level);

            document.addEventListener('keydown', onKeyDown);
        }

        /**
        * Pausing the game.
        */
        function pauseGame(e){
            e.preventDefault();
            g_isGamePaused = true;

            //clearing intervals
            for(var property in self.g_intervals){
                if(self.g_intervals[property]){
                    clearInterval(self.g_intervals[property]);
                }
            }
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
            for(var i = 0; i < 3; i++){
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

            //let's throw some words!
            if(self.g_numFiredWords <= self.g_levels[self.g_level].words){
                //firing a word
                var random = utils.getRandom(self.g_words.length);
                self.g_words[random].fire();
                self.g_firedWords.push(self.g_words[random]);

                //removing the word from on index 0 from our g_words array and g_wordsList array
                self.g_words.splice(random, 1);
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
            $g_level.innerHTML = "Level " + level;
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
            
            //score star animation
            var elm = $('.game-info-score-star')[0];
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
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
        function onKeyDown(e) {
            if(!g_hasGameStarted){
                return;
            }

            var value = e.key;
            var isAnyWordActive = false;

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
        * Clears all intervals.
        */
        function clearIntervals(){
            for(var property in self.g_intervals){
                if(self.g_intervals[property]){
                    clearInterval(self.g_intervals[property]);
                }
            }
        }

        /**
        * Game over!
        */
        self.gameOver = gameOver;
        function gameOver(){
            g_isGameOver = true;
            $(WORD_SEL).remove();
            utils.playSound('gameOver');
            $('#level').hide();
            $g_gameOver.addClass(ACTIVE);
            $g_game.removeClass(ACTIVE);
            $g_gameOver.find('.gameOver-score').text(numberWithCommas(self.g_score));

            document.removeEventListener('keydown', onKeyDown);

            //pausing all sounds after "Game over" has played
            self.g_intervals.pauseSounds = setTimeout(function(){
                pauseSounds();
            }, 3700);

            var sessionData = localStorage.getItem(g_localStorageKey);
            if(sessionData){
                var userData = JSON.parse(sessionData);
                $('.gameOver-nameInput, .gameOver-passwordInput, .gameOver-password-info').hide().removeAttr('required');
                $('.gameOver-nameInput').val(userData.name);
                $('.gameOver-passwordInput').val('nothing');
                $('.gameOver-sessionUser').html("as <span>" + userData.name + '</span><span class="gameOver-logout">| Logout</span>').show();
            }

            $('.modal-addScore').show();
        }

        function logout(){
            $.get(g_baseURL_backend + '?action=logout', function(result){
                localStorage.removeItem(g_localStorageKey);
                $('.gameOver-nameInput, .gameOver-passwordInput, .gameOver-password-info').show();
                $('.gameOver-nameInput, .gameOver-passwordInput').prop('required', true);
                $('.gameOver-nameInput').val('');
                $('.gameOver-passwordInput').val('');
                $('.gameOver-sessionUser').hide();
            });
        }

        /**
        * Saving the score of the game.
        */
        function addScore(e){
            e.preventDefault();
            var $addScoreButton = $('.gameOver-addToRanking-button');
            var name = $('.gameOver-nameInput').val();
            var secretWord = $('.gameOver-passwordInput').val();

            //sending the data already? Bye bye my friend!
            if($addScoreButton.hasClass(ACTIVE) || !name.length || !secretWord.length){
                return;
            }

            //any error? Bye bye my friend!
            if($('.input-error').length){
                return;
            }

            $addScoreButton.addClass(ACTIVE);

            var params = {
                name: name,
                score: self.g_score,
                secret_word: secretWord
            };

            //saving the users info
            localStorage.setItem(g_localStorageKey, JSON.stringify({name: params.name, secret_word: params.secret_word}));

            $.post(g_baseURL_backend + '?action=save', params, function(result){
                if(result.success){
                    if(result.message){
                        $g_gameOver.find('.gameOver-message').text(result.message);

                        showRanking(result);
                    }
                }else{
                    alert("Error adding the score! Contact Alvaro! @imac2");
                }
            });
        }

        /**
        * Checks if the username is available.
        */
        function isUsernameAvailable(){
            clearTimeout(self.g_intervals.isUsernameAvailableId)
            var $input = $(this);
            var inputText = $input.val();

            self.g_intervals.isUsernameAvailableId = setTimeout(function(){
                $.get(g_baseURL_backend + '?action=isUsernameAvailable', {name: inputText}, function(result){
                    if(result.is_available){
                        $input.removeClass('input-error').addClass('input-ok');
                    }
                    else{
                        $input.removeClass('input-ok').addClass('input-error');
                    }
                    $('.gameOver-invalidName').toggle(!result.is_available);
                });
            }, 300);
        }

        /**
        * Shows the ranking.
        */
        function viewRanking(){
            var params = {
                action: 'getUsers',
                name: $('.gameOver-nameInput').val()
            };

            $.get(g_baseURL_backend, params, function(result){
                showRanking(result);
            });
        }

        //to remove
        self.showRanking = showRanking;

        /**
        * Shows the ranking of players.
        */
        function showRanking(data){
            var users = data.users;

            if(data.current_user){
                $('#ranking-position').text(numberWithCommas(data.current_user.rank));
                $('#ranking-numUsers').text(numberWithCommas(users.length));
            }else{
                $('.ranking-info').hide();
            }

            // datatables was already created? We just update its data
            if($.fn.dataTable.isDataTable('#ranking-table')){
                var table = $('#ranking-table').DataTable();

                table.clear();
                table.rows.add(users);
                table.draw();
            }

            //initialising datatables for the first time
            else {
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
                            data: 'score',
                            render: $.fn.dataTable.render.number( '.', ',')
                        },
                        {
                            data: 'name'
                        },
                        {
                            width: '150px',
                            data: 'display_created',
                            orderData: [4]
                        },
                        {
                            data: 'created',
                            visible: false
                        }
                    ],
                });
            }

            $('.ranking').show();
            $('.gameOver').fadeOut(1200, function(){
                $(this).removeClass('active');
                $('.ranking-centered').addClass('active');

                // 'add score' button won't be loading anymore
                $('.gameOver-addToRanking-button').removeClass(ACTIVE);
            });
        }

        function playOverSound(){
            utils.playSound('hover');
        }

        /**
        * Adds the thousands comma in a number
        */
        function numberWithCommas(x){
            if(!x){ return 0;}
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        /**
        * Showing or hidding the `about` screen
        */
        function toggleAbout(){
            $('.game-about').toggleClass('active');
        }

        /**
        * Toggling the sound setting.
        */
        function toggleSound(){
            g_soundEnabled = !g_soundEnabled;

            $(this).find('.icon-volume')
                .toggleClass('icon-volume-high')
                .toggleClass('icon-volume-mute2');

            if(!g_soundEnabled){
                pauseSounds();
            }

            //background loop
            else{
                utils.playSound('background', 'loop');
            }
        }

        /**
        * Notification sound for every browser.
        */
        function createSound(fileName){
            var extension = g_isMp3Supported ? '.mp3' : '.ogg';
            var sound = new Audio(g_baseURL + 'audio/' + fileName + extension);

            g_sounds[fileName] = sound;
        }

        /**
        * Creating all sounds DOM elements for the game.
        */
        function createSounds(){
            for(var key in g_sounds){
                createSound(key);
            }
        }

        /**
        * Pausing all sounds.
        */
        function pauseSounds(){
            for(var key in g_sounds){
                if(g_sounds[key]){
                    g_sounds[key].pause();
                }
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
    };

    gameModel = new fallingWords().init();
})(jQuery);
