import Chao from './chao.js';
import Jogador from './jogador.js';

let start;
const cenario = {
    background: 'background',
    start: 'mensagem.inicial',
    width: 144
}

export default class CenaCarregamento extends Phaser.Scene {     
    
    constructor() {
        super({
            key: 'CenaCarregamento'
        });
    }

    preload() {

        /*
        // Pré-carregar os recursos
        this.load.image(cenario.background, 'images/background-day.png'); // Cenário
        // TODO
        // - Alterar para imagem inicial com novo personagem
        this.load.image(cenario.start, 'images/message-initial.png'); // Mensagem inicial

        // Personagem
        this.load.spritesheet('jogador', 'images/bird-red-sprite_original.png', {
            frameWidth: 34,
            frameHeight: 24
        });

        /* Migrado
        // Chão
        this.load.spritesheet('chao', 'images/ground.png', {
            frameWidth: 336,
            frameHeight: 112
        }); */ 
        


    }


    create() {
        // Posiciona utilizando a metade das dimensões do jogo
        const alturaJogo = (this.sys.canvas.height/2)
        
        // Cenário
        this.add.image(cenario.width, (alturaJogo), cenario.background).setInteractive(); // testar com o esse método
        start = this.add.image(cenario.width, (alturaJogo), cenario.start);
        // TODO
        // - Mover a visibilidade para o local adequado
        // start.setVisible(false); // -->> Desabilita a visibilidade da mensagem inicial
    
        // Chão
        this.ground = new Chao(this); // opaaaa, vencedor

        // Jogar (sem sucesso)
        this.player = new Jogador(this);
        
        
        
        


    }

    update() {
        //this.jogador.setVisible(true);
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 

        //this.ground.chao.sprite.anims.play(ground.animacoes.movendo);
        
        //Para iniciar o jogo
        this.load.on('progress', (value) => {
            console.log(value*100 + ' %');
        });

        this.load.on('complete', () => {
            this.scene.start('CenaJogo');
        });

        /*Testar essa aqui também
        this.bg.on('pointerdown', () => {
            this.gameStarted ? this.jump() : this.startGame();
        
        Fazendo assim: 
        this.cenario.background.on('pointerdown', () => {
            this.scene.start('CenaJogo');
        Ficou com a tela preta :( Tentei asssim originalmente


        */
    }
}