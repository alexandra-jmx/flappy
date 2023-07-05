//Configuraações jogo
const config = {
    type: Phaser.AUTO,
    width: 288,
    height: 512,
    parent: 'flappy-boy',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true // Lembrar de desativar na versão final :)
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

/** Variáveis */
const cenario = {
    background: 'background',
    chao: 'ground',
    width: 144, //metade da largura do jogo
    height: 256 // metade da altura do jogo para auxiliar no posicionamento
};
const elementos = {
    inicial: 'mensagem.inicial',
    personagem: 'vivi-boy',
    obstaculos: {
        tubo: {
            top: 'tubo-vermelho-top',
            bottom: 'tubo-vermelho-bottom' 
        }
    },
    contador: {
        width: 25,
        base: 'number',
        numero0: 'no0',
        numero1: 'no1',
        numero2: 'no2',
        numero3: 'no3',
        numero4: 'no4',
        numero5: 'no5',
        numero6: 'no6',
        numero7: 'no7',
        numero8: 'no8',
        numero9: 'no9',
    },
    especiais: {
        junkFood: 'junk-food',
        healthyFood: 'healthy-food'
    },
    fimJogo: {
        gameOver: 'game-over',
        restart: 'restart-button',
    }
}
const animacoes = {
    chao: {
        movendo: 'chao-movendo',
        parado: 'chao-parado'
    }
    //personagem: {}
}

// Elementos
// Depois dá pra juntar todas elas numa linha pra não ocupar espaço aqui
let fundoDia;
let chao;
let personagem;
let mensagemInicial;
let mensagemFinal;
let contador;
let grupoContador;
let tubos;
let espacamento;
let powerups;
let clique;
let framesMovimento;

// Ações
let jogoIniciado;
let jogoTerminado;
let restart;


// Criando o jogo
const jogo = new Phaser.Game(config);


/** Funções
 * Preload
 *  - Carregar imagens:
 *      - Mensagem inicial
 *      - Fundo (background)
 *      - Chão -> Pendente  (por enquanto sem animação)
 *      - Personagem -> Pendente de ajustes -> mudança do personagem
 *      - Tubo vermelho
 *      - Especiais -> Talves precise de ajustes. Não sei se não seria melhor usar como sprite também
 *      - Mensagem final (end game)
 *      - Botão de restart 
 * Create
 *  - Fundo
 *  - Mensagem inicial
 *  - Chao (animação pendente)
 *  - Personagem (fixo)
 * Update
 * -
 * ** Start
 * ** Game Over
 */

function preload() {
    // Fundo e chão
    this.load.image(cenario.background, 'images/background-day.png');
    this.load.spritesheet(cenario.chao, 'images/ground.png', {
        frameWidth: 336,
        frameHeight: 112
    }); 
       
    // Mensagem inicial
    /** TODO
     * - Alterar para imagem inicial com novo personagem
     * - Confirmar se tem como colocar em svg para melhorar a qualidade
    */
   this.load.image(elementos.inicial, 'images/message-initial.png');

   // Personagem
   /** TODO
    * - Verificar se tem como comor imagem em svg para melhorar a qualidade
    * - Alterar para o personagem do Vivico
    * - Alterar os nomes em TODOS os lugares hehe 
    *  - Alterar os frames
    * */
    this.load.spritesheet(elementos.personagem, 'images/vivi-boy.png', {
        frameWidth: 34,
        frameHeight: 24
    }); 
    
    
    // Tubo
    this.load.image(elementos.obstaculos.tubo.bottom, 'images/pipe-red-bottom.png');
    this.load.image(elementos.obstaculos.tubo.top, 'images/pipe-red-top.png');
    
    /*
    // PowerUps
    this.load.image(elementos.especiais.healthyFood, 'images/healthy-food.png');
    this.load.image(elementos.especiais.junkFood, 'images/junk-food.png');
    
    // Número do contador
    this.load.image(elementos.contador.numero0, 'images/number0.png');
    this.load.image(elementos.contador.numero1, 'images/number1.png');
    this.load.image(elementos.contador.numero2, 'images/number2.png');
    this.load.image(elementos.contador.numero3, 'images/number3.png');
    this.load.image(elementos.contador.numero4, 'images/number4.png');
    this.load.image(elementos.contador.numero5, 'images/number5.png');
    this.load.image(elementos.contador.numero6, 'images/number6.png');
    this.load.image(elementos.contador.numero7, 'images/number7.png');
    this.load.image(elementos.contador.numero8, 'images/number8.png');
    this.load.image(elementos.contador.numero9, 'images/number9.png');
    
    // Fim de Jogo
    this.load.image(elementos.fimJogo.gameOver, 'images/gameover.png');
    this.load.image(elementos.fimJogo.restart, 'images/restart-button.png');
    
}*/
}     


function create() {
    fundoDia = this.add.image(cenario.width, cenario.height, cenario.background).setInteractive(); // Serve para deixar o fundo interativo, vai auxiliar na hora de clicar para iniciar o jogo
    fundoDia.on('pointerdown', function(){
        if(!jogoIniciado)
            start();
   })
    fundoDia.setDepth(0);
    //Depois de colocar esse pointerdown sumiu a mensagem inicial e o chaõ <o>
    mensagemInicial = this.add.image(cenario.width, cenario.height - 40, elementos.inicial);
    // Acho que setar uma profundidade aqui também
    mensagemInicial.setDepth(4)
    mensagemInicial.visible = true;

    chao = this.physics.add.sprite(cenario.width, 458, cenario.chao);
    chao.setCollideWorldBounds(true); // impede que o chão deixe de aparecer na tela
    chao.setDepth(3) // Determina a profundidade dos elementos

    /* Animação do chão dando erro
    chao.anims.create({
        key: animacoes.chao.movendo,
        frames: chao.anims.generateFrameNumbers(cenario.chao, {
            start: 0,
            end: 2
        }),
        frameRate: 15,
        repeat: -1
    })
    chao.anims.create({
        key: animacoes.chao.parado,
        frames: [{
            key: cenario.chao,
            frame: 0
        }],
        frameRate: 20
    })*/
     
    //clique = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP) // Não funciona ainda 
    
    personagem = this.physics.add.sprite(60, 265, elementos.personagem);
    personagem.setCollideWorldBounds(true); // Impede que a sprite do jogador saia da tela
    personagem.setBounce(1.4); // // Parâmetro que faz o personagem quicar - Talvez aqui não seja o melhor lugar
    personagem.setDepth(2);
    personagem.upwardsVelocity = 0;
    personagem.body.allowGravity = false; // Deixa fixo, por hora

    tubos = this.physics.add.group();
    tubos.setDepth(1);
    //this.physics.add.overlap(tubos, personagem, gameOver, null, this);
    /*
    tubos = this.physics.add.group();

    this.input.on('pointerdown', salto, this);

    this.time.addEvent({
        delay: 2000,
        callback: criarObstaculos,
        callbackScope: this,
        loop: true
    });*/

    /*
    this.time.addEvent({
        delay: 5000,
        callback: createPowerup,
        callbackScope: this,
        loop: true
    });*/


    this.physics.add.collider(chao, personagem, tubos, null, this); // Aeeee, parou de cair atrás do chão
    //this.physics.add.overlap(personagem, tubos, powerups);
    this.physics.add.overlap(personagem, null, this);


// Você está aqui -> fim da função create    
}

function update() {
    
    if (personagem.y > 580) {
        gameOver();
    }
    /*
    if (powerupActive) {
        powerup.angle += 1;
    }*/


    //fundoDia.tilePositionX += 0.25;
    //chao.tilePositionX += 2.5;         
    // Não deu nada :( )
    
    //if (jogoIniciado)
    //return  

    //if (clique) this.salto();

    /* Aqui é do referencia e tá dnado erro em encontrar o JustDown :(( ))
    if (framesMovimento > 0)
        framesMovimento--
    else if (Phaser.Input.Keyboard.JustDown(clique))
    salto()
    else {
    personagem.setVelocityY(120)

    if (personagem.angle < 90)
        personagem.angle += 1
}*/

// VOcê está aqui -> fim da função update    
}

//
//*

function salto() {
    if (!jogoTerminado){
        personagem.setVelocityY(-400);
        personagem.setAngle(-15);
        personagem.upwardsVelocity = 30; // Acho que não precisa, veremos.
        //personagem.setVelocityX(50);
        //personagem.angle = -15 //->>Aqui é da movimentação. Só faz sentido se alterar conforme a altura do y

        
        // No referência ele coloca uma variavel com o número de frames e em outro momento, conforme o ângulo reduz a velocidade 
    } 
}
/* Não tá funcionando 100% ainda. Olhar com calma.
function queda() {
    if (personagem.upwardsVelocity > 0){
        personagem.upwardsVelocity--;
    } else {
        if (personagem.angle < 90){
            personagem.angle += 3;
            personagem.setAngle(personagem.angle);
        } 
    }
    personagem.body.allowGravity = true;

} */

function criarObstaculos() {
    if(jogoIniciado && !jogoTerminado)


    espacamento = 200; 
    let randomPosicaoSuperior = Phaser.Math.Between(50, 300);

    let calculoPosicaoInferior = (cenario.height * 2) - chao.height - randomPosicaoSuperior - espacamento; 
    let tuboInferior = tubos.add.tileSprite(400, 462, 52, calculoPosicaoInferior, elementos.obstaculos.tubo.bottom).setOrigin(0.5, 1);
    this.physics.add.existing(tuboInferior, false);
    tubos.add(tuboInferior);
    tuboInferior.body.setImmovable();
    tuboInferior.body.setAllowGravity(false);


    let tuboSuperior = tubos.add.tileSprite(400, randomPosicaoSuperior, 52, 320, elementos.obstaculos.tubo.top).setOrigin(0.5, 1);
    tubos.physics.add.existing(tuboSuperior, false);
    tubos.add(tuboSuperior);
    tuboSuperior.body.setImmovable();
    tuboSuperior.body.setAllowGravity(false);
    
    /*
    let zoneScore = this.add.zone(400 + tuboInferior.width/2, 0).setSize(1, this.game.config.height - this.base.height);
    this.zonesScore.add(zoneScore);
    zoneScore.setDepth(0);
    this.physics.world.enable(zoneScore);
    zoneScore.body.setAllowGravity(false);
    zoneScore.body.moves = false;  */

}


function start(){

    jogoIniciado = true;
    mensagemInicial.visible = false; 
    chao.anims.play(animacoes.chao.movendo);
    personagem.body.allowGravity = true;

    salto();
    //queda(); não funcionou
    criarObstaculos();


    //this.physics.world.enable([personagem]);
}
    
    // Aqui posso criar a animação do chão
    

    //const contagem = grupoContador.create(cenario.width, 30, elementos.contador.numero0)
    // No referência aqui ele seta a profundidade como 20, mas ainda não entendi bem o funcionamento.
//}

/*
function gameOver(){
    if(!jogoTerminado) {
        jogoTerminado = true;
        mensagemFinal.visible = true;
        //Aqui que deveria criar o botão de restart? 

        // Parar de animar o chão
        // Parar de animar o personagem
    }
}
*/
