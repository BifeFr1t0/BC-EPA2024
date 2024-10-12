const player = document.querySelector('.personagem')
const obst1 = document.querySelector('.obstaculo-1')
const obst2 = document.querySelector('.obstaculo-2')
const obst3 = document.querySelector('.obstaculo-3')
const obst4 = document.querySelector('.obstaculo-4')
const final = document.querySelector('.final')
const pular = document.querySelector('.pular')
const agachar = document.querySelector('.agachar')
const score = document.querySelector('#nums')
const inicio = document.querySelector('.background-inicio')
const boolJump = document.querySelector('.booleanaPulo')
const backMorte = document.querySelector('.background-morte')
const backVitoria = document.querySelector('.background-vitoria')
const points = document.querySelectorAll('.pontos')
const pnts = document.querySelector('.container-pnts')
const fraseDerrota = document.querySelector('.fraseDerrota')
const fraseVitoria = document.querySelector('.fraseVitoria')
const cenario = document.querySelector('.cenario')
const chao = document.querySelector('.chao')
const body = document.querySelector('body')
const divScore = document.querySelector('.score')
const h3 = document.querySelectorAll('h3')
const h2 = document.querySelector('h2')
const main = document.querySelector('#h2')
var jumpSound = new Audio('assets/sounds/jumping-sound.mp3');
jumpSound.volume = 0.4
var soundtrack = new Audio('assets/sounds/start-music.mp3')


var play =false
var blockGame = false
var win = false
var init = false
var delay = 0
var delaysneak= 0 
var pontos = 0;

let position_background = 0;
let position_floor= 0;

var velocity = 2;


soundtrack.play()
soundtrack.volume = 0.5


function moveBackground() {
    position_background -= 2; // Ajuste o valor para controlar a velocidade do movimento
    document.querySelector('.cenario').style.backgroundPosition = `${position_background}px 0`;
    requestAnimationFrame(moveBackground);
}
function moveFloor() {
    position_floor -= 10; // Ajuste o valor para controlar a velocidade do movimento
    document.querySelector('.chao').style.backgroundPosition = `${position_floor}px 0`;
    requestAnimationFrame(moveFloor);
}

moveBackground();
moveFloor();



document.addEventListener('keydown', () => {
    let tecla = event.keyCode


// Tecla Espaço Inicia!
    if(tecla ==32 && play ==false && blockGame ==false){
        blockGame = true;
        inicio.style.backgroundImage = 'url("assets/sprites/tutorial.gif")'
        setTimeout(() => {
            iniciarJogo()
        }, 8000);
    }


// Função de pular
    if (tecla == 87 || tecla == 38) {
        if (init == true && sneak==false) {

            // Definição de atributos
            player.style.height = '128px'
            jump = true

            // Correção de bug
            if (y <= -120 || delay == 1) {
                return;
            }
            // Pulo
            y -= 200
            jumpSound.play();
            player.style.backgroundImage = 'url(assets/sprites/skeleton-jump.gif)'
            player.style.transform = `translateY(${ y }px)`

            // Delay
            delay = 1

            // Volta ao normal
            setTimeout(() => {
                y += 200
                player.style.backgroundImage = 'url(assets/sprites/skeleton-walk.gif)'
                player.style.transform = `translateY(${ y }px)`
                jump = false
            }, 350);

            // Delay voltando
            setTimeout(() => {
                delay = 0
            }, 600);
        }
    }

    // Função de Agachar
    if (tecla == 83 || tecla == 40) {
        if (init == true && jump ==false) {
            //  Verificar delay
            if(delaysneak == 1){
                return;
            }
            // Delay
            delaysneak = 1

            //Agachar
            sneak = true
            player.style.transition = 'none'
            player.style.height = "80px"
            player.style.width = "80px"
            player.style.backgroundImage = 'url(assets/sprites/skeleton-sneak.gif)'
            
            setTimeout(() => {
                player.style.width = '64px'
                player.style.height = '128px'
                player.style.transition = 'all 0.4s'
                player.style.backgroundImage = 'url(assets/sprites/skeleton-walk.gif)'
                sneak= false
                
            },500);

            // Retorna delay
            setTimeout(() => {
                delaysneak = 0
            }, 650);
        }
    }
});




var jump = false;
var sneak = false;
var morte = false;
var y= 0

// Criação de inimigos
var aleatoria = Math.floor(Math.random() * 4)
var enemy = [obst1, obst2, obst3, obst4]






function callEnemy(obstaculo) {
    let x = 0
    obstaculo.style.transform = "translateX(0)"
    obstaculo.style.display = "flex"

    var inimigo = setInterval(() => {
            setTimeout(() => {
                if(obstaculo == obst4){
                    obst4.style.transform = `translateX(${x}vw)`
                    x -= velocity
                    if(x > -70 && x <= -67){
                        if(sneak == false){
                            obstaculo.style.display = "none"
                            morteJogador();
                        }
                    }
                    
                }
                else{
                    x -= velocity
                obstaculo.style.transform = `translateX(${x}vw)`


                if (x > -70 && x <= -67) {
                    if (jump == false) {
                        obstaculo.style.display = "none"
                        setTimeout(() => {
                            morteJogador();   
                        }, 100);
                    }
                }
                }
                
                if (x < -70 || aleatoria==2 && x<-68) {

                    clearInterval(inimigo)
                    obstaculo.style.display = "none"
                }
            }, 30);
        },
        60);


}

function summonEnemy() {
    setInterval(() => {
        setTimeout(() => {
            aleatoria = Math.floor(Math.random() * 4)
            callEnemy(enemy[aleatoria])

        }, 3000);
    }, 3000);
}



function iniciarJogo() {
    soundtrack.pause()
    soundtrack= new Audio('assets/sounds/day-music.mp3')
    soundtrack.play();
    play= true
    init = true
    inicio.style.display = "none"
    pontuacaoJogador()
    callEnemy(enemy[aleatoria])
    summonEnemy()
}

function morteJogador() {
    if(win!=true){
        init = false
        backMorte.style.display = "flex"
        enemy = []

        setTimeout(() => {
            location.reload()
        }, 5000);
    }
    
}

function pontuacaoJogador() {
    
    var highScore=setInterval(() => {
        pontos++
        if (pontos < 10) {
            score.innerHTML = "0000" + pontos
        }
        if (pontos < 100 && pontos >= 10) {
            score.innerHTML = "000" + pontos
        }
        if (pontos < 1000 && pontos >= 100) {
            score.innerHTML = "00" + pontos
        }
        if (pontos >= 1000) {
            score.innerHTML = "0" + pontos
            
        }
        if(init==false){
            clearInterval(highScore);
            points[0].innerHTML="PONTUACAO: " + pontos
            points[1].innerHTML="PONTUACAO: " + pontos
        }
        vencerJogo()
    }, 70);
    
}
var dia = true
function mudarNoite(){
    setInterval(() => {
        if(pontos >= 650 && dia == true){
            soundtrack.pause()
            soundtrack= new Audio('assets/sounds/night-music.mp3')
            soundtrack.play();
            dia = false
            velocity= 4
            body.style.backgroundImage="url(assets/sprites/test2.jpeg)";
            cenario.style.backgroundImage="url(assets/sprites/night-background.jpg)";
            chao.style.backgroundImage="url(assets/sprites/night-floor.png)";
            obst1.style.backgroundImage="url(./assets/sprites/night-sprites/night-rock.gif)"
            obst2.style.backgroundImage="url(./assets/sprites/night-sprites/night-log.gif)"
            obst3.style.backgroundImage="url(./assets/sprites/night-sprites/night-shaw.gif)"
            obst4.style.backgroundImage="url(./assets/sprites/night-sprites/night-fly.gif)"
            divScore.style.backgroundColor="rgb(28, 27, 109)";
            pnts.style.backgroundColor="rgb(42, 40, 143)";
            h3[0].style.color="azure";
            h3[1].style.color="azure";
            h2.style.color="azure";
            main.style.color="azure";
            score.style.color="azure";
            
            moveFloor()
        }
    }), 3000;
}
mudarNoite()

function vencerJogo(){
    if(pontos >= 1250){
        soundtrack.pause()
        final.setAttribute("autoplay", "autoplay")
        enemy = []
        win = true
        init = false
        player.style.display = "none"
        backVitoria.style.display = "flex"
        
        setTimeout(() => {
            location.reload()
        }, 26000);
    }
}



