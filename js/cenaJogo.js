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
        frameWidth: 141,
        frameHeight: 126
    }); 


// Tubos
    this.load.image(assets.tubo.inferior, 'images/pipe-red-bottom.png');
    this.load.image(assets.tubo.superior, 'images/pipe-red-top.png');

// PowerUps / Especiais
    this.load.image(assets.especiais.healthyFood, 'images/healthy-food.png');
    this.load.image(assets.especiais.junkFood, 'images/junk-food.png');
// PRECISAR DE UM RESIZE NISSO AQUI - OK :)
    
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
        this.personagem = this.physics.add.sprite(60, 270, assets.personagem).setScale(0.3);
        this.personagem.body.allowGravity = false;
        this.personagem.body.setCollideWorldBounds(true);
        this.personagem.setDepth(1);
        // Impede que a sprite do jogador saia da tela / 
        this.personagem.upwardsVelocity = 0
        // personagem.setBounce(0.2); // // Parâmetro que faz o personagem quicar - Talvez aqui não seja o melhor lugar e talvez nem pr

    // Obstaculos
        this.espacamentos = this.physics.add.group(); // espaço entre os tubos inferiores e superiores
        this.tubos = this.physics.add.group();

    // Especiais
        this.especiais = this.physics.add.group();

    //Contador
        this.grupoContador = this.physics.add.staticGroup();
        // this.grupoContador.setImmovable(true); -> deu ruim

    // Mensagem inicial
        this.inicial = this.add.image(assets.width, assets.height -40, assets.inicial).setScale(1.1);
        this.inicial.setDepth(4)
        this.inicial.visible = true;

    // Mensagem Game Over + restart
        this.gameOver = this.add.image(assets.width, assets.height - 100, assets.fimJogo.gameOver);
        this.gameOver.setDepth(3);
        this.gameOver.visible = false;

        this.restart = this.add.image(assets.width, assets.height + 50, assets.fimJogo.restart).setInteractive(); // pq vai ser clicável
        this.restart.setDepth(3);
        this.restart.visible = false;
        // this.restart.on('pointerdown', () => this.restartGame(this));
        // // Não funcionou ainda 
        //this.restart.on('pointerdown', this.gameOver);

        //Mensagens funcionando :)
        
        this.physics.add.collider(this.personagem, this.chao, /*this.especiais,*/ this.colisao, null, this);
        this.physics.add.overlap(this.personagem, this.tubos, /*this.especiais,*/ this.colisao, null, this);
        this.physics.add.overlap(this.personagem, this.espacamentos, this.atualizaContador, null, this);

         this.start();
        

    } // Você está aqui -> fim da função create   
    
    update() {
        if (!this.jogoIniciado) return
        if (this.jogoTerminado) return

        this.queda();

        this.tubos.children.iterate(function(tubo){
			if (tubo == undefined) return;
			if (tubo.x < -50) tubo.destroy();
			else tubo.setVelocityX(-80); // não tão rápido por motivo de criança
		});

		this.espacamentos.children.iterate(function(espacamento){
			espacamento.body.setVelocityX(-80); 
		});

		this.proximoTubo++;

		if (this.proximoTubo === 200){ // espaçadinho para ter espaço para os powerups :)
			this.criaTubos();
			this.proximoTubo = 0;
		}

        this.especiais.children.iterate(function(especial){
			if (especial == undefined) return;
			if (especial.x < -30) especial.destroy();
			else especial.setVelocityX(-80); // não tão rápido por motivo de criança
		});

		this.proximoEspecial++;

		if (this.proximoEspecial === 300){ // espaçadinho para ter espaço para os powerups :)
			this.criaEspeciais();
			this.proximoEspecial = 0;
		}



        //this.atulizaContagem();

    } // Você está aqui -> fim da função update   

// Para zerar os elementos do cenário e iniciar a função salto/voo
    start() {
        this.proximoTubo = 0;
        this.proximoEspecial = 0;

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
        
        if (!this.jogoTerminado) {
            this.personagem.body.setVelocityY(-200)
            this.personagem.setAngle(-15);
            this.personagem.angle = -15;
            this.personagem.body.allowGravity = true; 
            this.upwardsVelocity = 30;
        }
    }

    startGame() {

        this.jogoIniciado = true;
        this.inicial.visible = false;
        this.chao.anims.play(assets.animacoes.chao.movendo, true);
        // // tá funcionando \o/  mas quero só depois que o jogo realmente tiver começado
        this.contagem = 0;
        const contagemInicial = this.grupoContador.create(assets.width, 30, assets.contador.numero0);
        contagemInicial.setDepth(2);
        // criei, mas tá despencaaaaando <o>
        
        this.criaTubos();
        this.criaEspeciais();

    }


    queda() { 
        if (this.personagem.upwardsVelocity > 0) {
            this.personagem.upwardsVelocity--
        } else if (this.personagem.angle < 90){
            this.personagem.angle += 1;
            this.personagem.setAngle(this.personagem.angle);
        }
    }    

    colisao() {

        this.tubos.children.iterate(function(tubo){
			if (tubo == undefined) return;
			tubo.setVelocityX(0);
		});

        this.especiais.children.iterate(function(especial){
			if (especial == undefined) return;
			especial.setVelocityX(0);
		});
        
		this.jogoTerminado = true;
		this.jogoIniciado = false;

		this.chao.anims.stop(assets.animacoes.chao.movendo, false);
		this.gameOver.visible = true;
		this.restart.visible = true;
        this.restart.on('pointerdown', function () {
            this.reiniciar();
        }, this);

        this.personagem.setAngle(90);
        this.personagem.setDepth(1);
	}


    criaTubos() {
        if ((this.jogoIniciado) && (!this.jogoTerminado)){ //amém


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

    // especialAleatorio() {
    //     switch (Phaser.Math.Between(0, 1)) {
    //         case 0:
    //             this.especialRandom = assets.especiais.healthyFood
    //         case 1:
    //             default:
    //             this.especialRandom = assets.especiais.junkFood
    // }
    // }

    criaEspeciais() {
        if ((this.jogoIniciado) && (!this.jogoTerminado)){

        let especialRandom =  Phaser.Math.RND.pick([assets.especiais.healthyFood, assets.especiais.junkFood]);
        
        let especialPosicaoY = Phaser.Math.Between(-10, 200);
        let especial = this.especiais.create(410, especialPosicaoY, especialRandom)
                especial.body.allowGravity = false
                especial.setScale(1.8);
        }

        }
    
    //Dando ruim :()
    atulizaContagem(espacamento) {
        this.contagem = this.contagem++;
        this.espacamento.destroy();

        const contadorString = this.contagem.toString()
        if (contadorString.lenght == 1)
         this.grupoContador.create(assets.width, 30, assets.contador.base + contagem).setDepth(1)
        else {
            let posicaoInicial = assets.width - ((this.contagem.toString().lenght * assets.contador.width) / 2)

            for (let i = 0; i < contadorString.length; i++) {
                this.grupoContador.create(posicaoInicial, 30, assets.contador.base + contadorString[i]).setDepth(1)
                posicaoInicial += assets.contador.width
            }
        }
    }

    reiniciar() {
    
        this.tubos.clear(true, true);
        this.espacamentos.clear(true, true);
        this.especiais.clear(true, true);
		//this.personagem.destroy();
		this.personagem.body.reset(60, 265);
        this.personagem.setAngle(0); 
		this.gameOver.visible = false;
		this.restart.visible = false;
		this.start();
	}


    //reiniciar() {

    //}

}
export default cenaJogo;