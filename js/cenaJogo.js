import assets from './assets.js';
//import personagem from './personagem.js';

class cenaJogo extends Phaser.Scene {
    constructor(){
        super();
    }

    preload() {
        let jogo = this;

// Background e chão
    this.load.image(assets.background, 'images/background-day.png');
    this.load.spritesheet(assets.chao, 'images/ground.png', {
        frameWidth: 336,
        frameHeight: 112
    }); 

// Personagem
   /** TODO
    * - Verificar se tem como comor imagem em svg para melhorar a qualidade
    * - Alterar para o personagem do Vivico
    *  - Alterar os frames
    * */
    this.load.spritesheet(assets.personagem, 'images/vivi-boy.png', {
        frameWidth: 34,
        frameHeight: 24
    }); 


// Tubos
    this.load.image(assets.tubo.inferior, 'images/pipe-red-bottom.png');
    this.load.image(assets.tubo.superior, 'images/pipe-red-top.png');

// PowerUps
    this.load.image(assets.especiais.healthyFood, 'images/healthy-food.png');
    this.load.image(assets.especiais.junkFood, 'images/junk-food.png');
    
// Números do contador
    this.load.image(assets.contador.numero0, 'images/number0.png');
    this.load.image(assets.contador.numero1, 'images/number1.png');
    this.load.image(assets.contador.numero2, 'images/number2.png');
    this.load.image(assets.contador.numero3, 'images/number3.png');
    this.load.image(assets.contador.numero4, 'images/number4.png');
    this.load.image(assets.contador.numero5, 'images/number5.png');
    this.load.image(assets.contador.numero6, 'images/number6.png');
    this.load.image(assets.contador.numero7, 'images/number7.png');
    this.load.image(assets.contador.numero8, 'images/number8.png');
    this.load.image(assets.contador.numero9, 'images/number9.png');

// Mensagem inicial      
/** TODO
 * - Alterar para imagem inicial com novo personagem
 * - Confirmar se tem como colocar em svg para melhorar a qualidade ->> tem como usar uma função de load antes e depois meio que converte em imagem :) */
    this.load.image(assets.inicial, 'images/message-initial.png');

// Fim de Jogo
     this.load.image(assets.fimJogo.gameOver, 'images/gameover.png');
     this.load.image(assets.fimJogo.restart, 'images/restart-button.png');




} // Você está aqui -> fim da função preload   


    create () {
        let jogo = this;

    //Background
        this.fundoDia = this.add.image(assets.width, assets.height, assets.background).setInteractive(); // Serve para deixar o fundo interativo, vai auxiliar na hora de clicar para iniciar o jogo
        
    // Chão + animações
        this.chao = this.physics.add.sprite(assets.width, 468, assets.chao);
		this.chao.setCollideWorldBounds(true);
		this.chao.setDepth(3);
		this.chao.setSize(0, 100, 0, 0).setOffset(0, 5); // Área para colisão. Não sei se precisaria, se somente a altura do personagem em y não seria o suficiente.
        // Acho que vai precisar sim, pq se não fica com espaçamento muito grande do chão :(. Alterei de 10 para 5)

        this.anims.create({ key: assets.animacoes.chao.movendo, 
			frames: this.anims.generateFrameNumbers(assets.chao, {
				start: 0,
				end: 2
			}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({ key: assets.animacoes.chao.parado, 
			frames:[{
				key: assets.chao,
				frame: 0
			}],
			frameRate: 20
		});

    // Personagem
        this.personagem = this.physics.add.sprite(60, 265, assets.personagem);
        this.personagem.body.allowGravity = false;
        this.personagem.body.setCollideWorldBounds(true);
        this.personagem.setDepth(2);
        // Impede que a sprite do jogador saia da tela / 
        this.personagem.upwardsVelocity = 0
    //    this.personagem.angle = -15; // ->> dando erro no console
        // personagem.setBounce(0.2); // // Parâmetro que faz o personagem quicar - Talvez aqui não seja o melhor lugar e talvez nem pr

    // Obstaculos
        this.espacamentos = this.physics.add.group(); // espaço entre os tubos inferiores e superiores
        this.tubos = this.physics.add.group();

    // Mensagem inicial
        this.inicial = this.add.image(assets.width, assets.height -40, assets.inicial);
        this.inicial.setDepth(4)
        this.inicial.visible = true;
         //true; ->>> desativei pq tirei a função start do pointerdown, e agora clica e a mensagem não sain ainda hehe

    // Mensagem Game Over + restart
        this.gameOver = this.add.image(assets.width, assets.height - 100, assets.fimJogo.gameOver);
        this.gameOver.setDepth(3);
        this.gameOver.visible = false;

        this.restart = this.add.image(assets.width, assets.height + 50, assets.fimJogo.restart).setInteractive(); // pq vai ser clicável
        this.restart.setDepth(3);
        this.restart.visible = false;


        //Mensagens funcionando :)
        
        this.physics.add.collider(this.personagem, this.chao, null, this);
        this.physics.add.overlap(this.personagem, this.tubos, null, this);

         this.start();
        

    } // Você está aqui -> fim da função create   
    
    update() {
        this.tubos.children.iterate(function(tubo){
			if (tubo == undefined) return;
			if (tubo.x < -50) tubo.destroy();
			else tubo.setVelocityX(-80);
		});

		this.espacamentos.children.iterate(function(espacamento){
			espacamento.body.setVelocityX(-80);
		});

		this.proximoTubo++;

		if (this.proximoTubo === 200){
			this.criaTubos();
			this.proximoTubo = 0;
		}
    } // Você está aqui -> fim da função update   

// Para zerar os elementos do cenário e iniciar a função salto/voo
    start() {
        this.proximoTubo = 0;

        this.input.on('pointerdown', function () {
            this.salto();
        }, this);
        
        this.inicial.visible = true; // mesmo que deixe na criação como true e aqui como false, na hora que iniciar a função vai seguir visível
        this.gameOver.visible = false;
        this.restart.visible = false;
        //this.fundoDia.visible = true; // meio desnecessário já que só vai ter um fundo. 
        
        this.criaTubos();
    }
    
    salto() {
        if (!this.jogoIniciado) { 
            this.startGame();
        }
        this.personagem.body.setVelocityY(-200)
        this.personagem.setAngle(-15);
        this.personagem.angle = -15;
        this.personagem.body.allowGravity = true; 
        this.upwardsVelocity = 30;
    }

    startGame() {

        this.jogoIniciado = true;
        this.inicial.visible = false;
        this.chao.anims.play(assets.animacoes.chao.movendo, true);
        // // tá funcionando \o/  mas quero só depois que o jogo realmente tiver começado
        this.criaTubos();

    }


    queda() {

    }

    colisao() {

    }

    criaTubos() {
        if (this.jogoIniciado){ //amém


        let tSuperior = Phaser.Math.Between(-120, 120);
        let espacamento = this.add.line(288, tSuperior + 210, 0, 0, 0, 98);
        this.espacamentos.add(espacamento);
        espacamento.body.allowGravity = false;
        espacamento.visible = false;

        let tuboSuperior = this.tubos.create(288, tSuperior, assets.tubo.superior);
        tuboSuperior.body.allowGravity = false;
        let tuboInferior = this.tubos.create(288, tSuperior + 420, assets.tubo.inferior);
        tuboInferior.body.allowGravity = false;        
        }
    }

    gameOver(){

    }

    reiniciar() {

    }

}

export default cenaJogo;