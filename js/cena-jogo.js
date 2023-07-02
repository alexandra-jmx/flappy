// TODO
// - importar o chão e o jogador
// - Obstáculos (? -> Pipes, comida saudável, 'junk food' )

const elementos = {
    obstaculos: {
        tubo: {
            //Por enquanto usar apenas o vermelho
            vermelho: { 
                top: 'tubo-vermelho-top',
                bottom: 'tubo-vermelho-bottom' 
            }
        }
    },
    contador: {
        width: 25, // por enquanto seguindo o jogo referência
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
        restart: 'restar-button',
    }
}

// Elementos
let contador;
let grupoContador;

// Ações
let inicioJogo;
let finalJogo;
let mensagemFinal;
let restart;

export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaJogo'
        });
    }
   

    preload() {
        /*
        // Obstaculos
       this.load.image(elementos.obstaculos.tubo.vermelho.bottom, 'pipe-red-bottom.png');
       this.load.image(elementos.obstaculos.tubo.vermelho.top, 'pipe-red-top.png');
       
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

        // Elementos especiais
        /* Ainda não criei as imagens
        this.load.image(elementos.especiais.junkFood, 'images/junk-food');
        this.load.image(elementos.especiais.healthyFood, 'images/healthy-food');
        */


    }

    create() {
    // TODO
    // - Obstáculos
    // - Score
        grupoContador = this.physics.add.staticGroup()

    }

    update() {

    }
}