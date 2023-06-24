// TODO
// - importar chao.js
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
        
        this.load.image(cenario.background, 'images/background-day.png'); // Carrega imagem do cenário
        // TODO
        // - Alterar para imagem com novo personagem
        this.load.image(cenario.start, 'images/message-initial.png'); 


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

        
    
    }

    update() {
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 
    }
}