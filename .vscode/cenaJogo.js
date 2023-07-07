import assets from './assets.js';

//import personagem from './personagem.js';

class cenaJogo extends Phaser.Scene {
    constructor(){
        super();
    }

    preload() {
        let jogo = this;

// Background e chão
    this.load.image(assets.background, 'assets/background-day.png');
    this.load.spritesheet(assets.chao, 'assets/ground.png', {
        frameWidth: 336,
        frameHeight: 112
    }); 

// Personagem
    this.load.spritesheet(assets.personagem, 'assets/vivi-boy.png', {
        frameWidth: 141,
        frameHeight: 126
    }); 


// Tubos
    this.load.image(assets.tubo.inferior, 'assets/pipe-red-bottom.png');
    this.load.image(assets.tubo.superior, 'assets/pipe-red-top.png');

// PowerUps / Especiais
    this.load.spritesheet(assets.especiais.healthyFood, 'assets/healthy-food.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    this.load.spritesheet(assets.especiais.junkFood, 'assets/junk-food.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    
// Contador
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt')

// Mensagem inicial      

    this.load.image(assets.inicial, 'assets/message-initial.png');

// Fim de Jogo
     this.load.image(assets.fimJogo.gameOver, 'assets/gameover.png');
     this.load.image(assets.fimJogo.restart, 'assets/restart-button.png');

// // Sons
//     this.load.audio('caindo', 'assets/audio/die.wav');
//     this.load.audio('contagem', 'assets/audio/point.wav');

} // Você está aqui -> fim da função preload   


    create () {
        let jogo = this;

    //Background
        this.fundoDia = this.add.image(assets.width, assets.height, assets.background).setInteractive(); // Serve para deixar o fundo interativo, vai auxiliar na hora de clicar para iniciar o jogo
        
    // Chão + animações
        this.chao = this.physics.add.sprite(assets.width, 468, assets.chao);
		this.chao.setCollideWorldBounds(true);
		this.chao.setDepth(3);
		this.chao.setSize(0, 100, 0, 0).setOffset(0, 5); // Área para colisão. 
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

    // Obstaculos
        this.espacamentos = this.physics.add.group(); // espaço entre os tubos inferiores e superiores
        this.tubos = this.physics.add.group();

    // Especiais
        this.especiais = this.physics.add.group();

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
        this.restart.on('pointerdown', () => this.reiniciar(this));
        
    // Score/Contador

		this.scoreboard = this.add.image(assets.contador.width, 200, assets.contador.score);
		this.scoreboard.scale = 0.5;
		this.scoreboard.setDepth(30);

		this.scoreTxt = this.add.text(assets.width, 40, '0', { 
					fontFamily: 'font1', 
					fontSize: '38px', 
					fill: '#fff', 
					stroke: '#000',
					strokeThickness: 4,
					strokeLinecap: 'square',
					shadow: {
						offsetX: 2.5,
						offsetY: 3,
						color: '#000',
						blur: 0,
						stroke: true,
						fill: true
					}
		});

		this.scoreTxt.setDepth(30);
		this.scoreTxt.setOrigin(0.5);
		this.scoreTxt.alpha = 0;

		this.scored = this.add.text(assets.width+5, 186, 
			'0', { 
					fontFamily: 'font1', 
					fontSize: '18px', 
					fill: '#fff', 
					stroke: '#000',
					strokeThickness: 3,
				}
			);
		this.scored.setDepth(30);
		this.scored.setOrigin(0.5);

    // // Sons
    //     this.audioCaindo = scene.sound.add('caindo');
    //     this.audioContagem = scene.sound.add('contagem');

        this.preJogo();   

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
    } // Você está aqui -> fim da função update   

// Para zerar os elementos do cenário e iniciar a função salto/voo
    preJogo() {
        //if (!this.jogoIniciado)
        this.proximoTubo = 0;
        this.proximoEspecial = 0;
        this.score = 0;
        this.jogoTerminado = false;

        if (!this.jogoIniciado){ 
            this.personagem = this.physics.add.sprite(60, 270, assets.personagem).setScale(0.3);
            this.personagem.body.allowGravity = false;
            this.personagem.body.setCollideWorldBounds(true);
            this.personagem.setDepth(1);
            this.personagem.upwardsVelocity = 0
            this.poderes = false;
        }
        this.personagem.setAngle(0); 

        this.input.on('pointerdown', function () {
            this.salto();
        }, this);

        
        this.inicial.visible = true; // mesmo que deixe na criação como true e aqui como false, na hora que iniciar a função vai seguir visível
        
        this.gameOver.visible = false;
        this.scoreboard.visible = false;
		this.scored.visible = false;
        this.restart.visible = false; 
        this.tuboAtual = assets.tubo;

        this.physics.add.collider(this.personagem, this.chao, this.colisao, null, this);
        this.physics.add.overlap(this.personagem, this.tubos, this.colisao, null, this);
        this.physics.add.overlap(this.personagem, this.espacamentos, this.up, null, this);
        this.physics.add.overlap(this.personagem, this.espacamentos, this.updateScore, null, this)
        this.physics.add.collider(this.personagem, this.especiais, this.coletaEspeciais, null, this)
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
        this.scoreTxt.alpha = 1;
        this.jogoIniciado = true;
        this.inicial.visible = false;
        this.chao.anims.play(assets.animacoes.chao.movendo, true);
        
        this.criaTubos();
        this.criaEspeciais();
        
        //Outra tentativa do contador. 
        // const contagemInicial = this.grupoContador.create(assets.width, 30, assets.contador.numero0);
        // contagemInicial.setDepth(2);
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
        
        this.personagem.setAngle(90);
        this.personagem.setDepth(1);

		this.chao.anims.stop(assets.animacoes.chao.movendo, false);
		this.gameOver.visible = true;
		this.restart.visible = true;
        this.scoreTxt.setText('');


	}

    criaTubos() {
        if (this.jogoIniciado && !this.jogoTerminado){ //amém


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

    criaEspeciais() {
        if (this.jogoIniciado && !this.jogoTerminado){

        let especialRandom =  Phaser.Math.RND.pick([assets.especiais.healthyFood, assets.especiais.junkFood]);
        
        let especialPosicaoY = Phaser.Math.Between(150, 350);
        let especial = this.especiais.create(410, especialPosicaoY, especialRandom).setScale(1.8);
                this.especial = especial.body.allowGravity = false
        }
    }
    coletaEspeciais(_, especial){
        especial.disableBody(true, true);

        this.poderes = true;
        const duracao = 5000

        if (especial === assets.especiais.junkFood){ 
            this.efeitoPesado();
        } else if (especial === assets.especiais.healthyFood) {
            this.efeitoSaudavel();
        } 
    }

    efeitoSaudavel() {
        const collider = this.physics.add.collider(this.personagem, this.tubos, null, () =>
        {
            this.physics.world.removeCollider(collider);
        });

        setTimeout(function() {}, 5000);
        //this.physics.remove.collider(this.personagem, this.tubos, this.colisao, null, this);
    }

    efeitoPesado() {
        this.personagem.body.mass(500);
        this.personagem.setGravity(1000);
        setTimeout(function() {}, 5000);
    }

    eliminaPoderes(_,duracao){
        clearTimeout(duracao);
        this.poderes = false;

    }

    updateScore(_, espacamento){
        this.score++;
        espacamento.destroy();

        this.scoreTxt.setText(this.score);
    }

    reiniciar(scene) {
        scene.tubos.clear(true, true);
        scene.espacamentos.clear(true, true);
        scene.especiais.clear(true, true);
        scene.personagem.destroy();
        scene.scoreboard.visible = false;
		//this.personagem.destroy();
        // this.grupoContador.clear(true, true)
		// this.personagem.body.reset(60, 265);
        // this.personagem.setAngle(0); 
		scene.gameOver.visible = false;
		scene.restart.visible = false;
        scene.scoreTxt.setText('0');
        scene.preJogo();
	    //this.game.scene.start(this.preJogo())
	}

}
export default cenaJogo;