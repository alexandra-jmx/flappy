import assets from './assets.js';
import personagem from './personagem.js';

class cenaJogo extends Phaser.Scene {
    constructor(){
        super('personagem');
    }

    preload() {
        let jogo = this;

// Background e chão
    this.load.image(assets.background, 'images/background-day.png');
    this.load.spritesheet(assets.chao, 'images/ground.png', {
        frameWidth: 336,
        frameHeight: 112
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
		// this.chao.setSize(0, 100, 0, 0).setOffset(0, 10); // Área para colisão. Não sei se precisaria, se somente a altura do personagem em y não seria o suficiente.

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

    // Mensagem inicial
        this.inicial = this.add.image(assets.width, assets.height -40, assets.inicial);
        this.inicial.setDepth(4)
        this.inicial.visible = false;
         //true; ->>> desativei pq tirei a função start do pointerdown, e agora clica e a mensagem não sain ainda hehe

    // Mensagem Game Over + restart
        this.gameOver = this.add.image(assets.width, assets.height - 100, assets.fimJogo.gameOver);
        this.gameOver.setDepth(3);
        this.gameOver.visible = false;

        this.restart = this.add.image(assets.width, assets.height + 50, assets.fimJogo.restart).setInteractive(); // pq vai ser clicável
        this.restart.setDepth(3);
        this.restart.visible = false;

        //Mensagens funcionando :) 

    

    } // Você está aqui -> fim da função create   
    
    update() {

    } // Você está aqui -> fim da função update   

        //this.jogador.setVisible(true);
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 

        //this.ground.chao.sprite.anims.play(ground.animacoes.movendo);
        
        //Para iniciar o jogo
        //this.load.on('progress', (value) => {
        //     console.log(value*100 + ' %');
        // });

        // this.load.on('complete', () => {
        //     this.scene.start('CenaJogo');
        // });

        /*Testar essa aqui também
        this.bg.on('pointerdown', () => {
            this.gameStarted ? this.jump() : this.startGame();
        
        Fazendo assim: 
        this.cenario.background.on('pointerdown', () => {
            this.scene.start('CenaJogo');
        Ficou com a tela preta :( Tentei asssim originalmente


        */
}

export default cenaJogo;