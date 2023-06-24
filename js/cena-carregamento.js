import Jogador from './jogador.js';
import chao from './chao.js';

let start;
const cenario = {
    background: 'background',
    start: 'mensagem-inicial',
    width: 144
}

export default class CenaCarregamento extends Phaser.Scene {     
    
    constructor() {
        super({
            key: 'CenaCarregamento'
        });
    }

    preload() {

        // Pré-carregar os recursos
        this.load.image(cenario.background, 'images/background-day.png'); // Cenário
        // TODO
        // - Alterar para imagem inicial com novo personagem
        this.load.image(cenario.start, 'images/message-initial.png'); // Mensagem inicial
        this.load.spritesheet('jogador', 'images/bird-red-sprite.png', {
            frameWidth: 34,
            frameHeight: 24
        });
        this.load.spritesheet('chao', 'images/ground.png', {
            frameWidth: 336,
            frameHeight: 112
        });


    }


    create() {
        // Posiciona utilizando a metade das dimensões do jogo
        //const larguraJogo = (this.sys.canvas.width/2); 
        const alturaJogo = (this.sys.canvas.height/2)
        
        //
        this.add.image(cenario.width, (alturaJogo), 'background'); 
        start = this.add.image(cenario.width, (alturaJogo), 'mensagem-inicial');
        // TODO
        // - Mover a visibilidade para o local adequado
        // start.setVisible(false); // -->> Desabilita a visibilidade da mensagem inicial

        // Para testar se aparece
        this.jogador = new Jogador(this);
    
    }

    update() {
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 

        
    }
}