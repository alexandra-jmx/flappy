//import Jogador from './jogador.js';
import Chao from './chao.js';

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

       /* // Personagem
        this.load.spritesheet('jogador', 'images/bird-red-sprite', {
            frameWidth: 34,
            frameHeight: 24
        });*/

        // Chão
        this.load.spritesheet('chao', 'images/ground.png', {
            frameWidth: 336,
            frameHeight: 112
        }); 
        //this.load.image('chao', 'images/ground.png'); // assim carrega certinho


    }


    create() {
            // Posiciona utilizando a metade das dimensões do jogo
        //const larguraJogo = (this.sys.canvas.width/2); -> Não precisa mais 
        const alturaJogo = (this.sys.canvas.height/2)
        
        // Cenário
        this.add.image(cenario.width, (alturaJogo), 'background').setInteractive(); // testar com o esse método
        start = this.add.image(cenario.width, (alturaJogo), 'mensagem-inicial');
        // TODO
        // - Mover a visibilidade para o local adequado
        // start.setVisible(false); // -->> Desabilita a visibilidade da mensagem inicial

        // Para testar se aparece
        //this.player.personagem = new Jogador(this);
    
        // Teste para chão
        //Nada deu certo por aqui, Jeová
        //ground.chao = this.add.image(cenario.width, 458, 'chao');
        this.ground.chao = new Chao(this); // opaaaa, vencedor
        //ground.chao = this.physics.add.sprite(cenario.width, 458, 'chao'); // assim o chão fica caindo :~~ 
        //this.ground = new Ground(game, world);
        //add.existing(this.ground);
        
        
        
        


    }

    update() {
        //this.jogador.setVisible(true);
        // TODO
        // - Lógica para início da cena de Jogo
        // - Desativar a visibilidade da mensagem inicial 

        
    }
}