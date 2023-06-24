// TODO
// - importar chao.js
let start;

export default class CenaCarregamento extends Phaser.Scene {     
    
    constructor() {
        super({
            key: 'CenaCarregamento'
        });
    }

    preload() {
        
        this.load.image('fundo-dia', 'images/background-day.png');
        // TODO
        // - Alterar para imagem com novo personagem
        this.load.image('start', 'images/message-initial.png');


    }


    create() {
        // Posiciona utilizando a metade das dimensões do jogo
        const larguraJogo = (this.sys.canvas.width/2);
        const alturaJogo = (this.sys.canvas.height/2);
        const fundoDia = this.add.image((larguraJogo), (alturaJogo), 'fundo-dia'); 
        start = this.add.image((larguraJogo), (alturaJogo), 'start');
        // TODO
        // - Mover a visibilidade para o local adequado
        // start.setVisible(false); // -->> Desabilita a visibilidade da mensagem inicial

        
    
    }

    update() {
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 
    }
}