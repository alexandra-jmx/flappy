//Configuraações jogo
const config = {
    type: Phaser.AUTO,
    width: 288,
    height: 512,
    parent: 'flappy-boy',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true // Lembrar de desativar na versão final :)
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

/** Variáveis */
const cenario = {
    background: 'background',
    width: 144, //metade da largura do jogo
    height: 256 // metade da altura do jogo para auxiliar no posicionamento
};
const elementos = {
    inicial: 'mensagem.inicial',
    obstaculos: {
        tubo: {
            top: 'tubo-vermelho-top',
            bottom: 'tubo-vermelho-bottom' 
        }
    },
    contador: {
        width: 25,
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
        restart: 'restart-button',
    }
}

// Elementos
let fundoDia;
let contador;
let grupoContador;

// Ações
let start;
let inicioJogo;
let finalJogo;
let mensagemInicial;
let mensagemFinal;
let restart;


// Criando o jogo
const jogo = new Phaser.Game(config);


/** Funções
 * Preload
 *  - Carregar imagens:
 *      - Mensagem inicial
 *      - Fundo (background)
 *      - Chão -> Pendente 
 *      - Personagem -> Pendente de ajustes
 *      - Tubo vermelho
 *      - Especiais -> Talves precise de ajustes. Não sei se não seria melhor usar como sprite também
 *      - Mensagem final (end game)
 *      - Botão de restart 
 * Create
 *  - 
 * Update
 */

function preload() {
    // Fundo e chão
    this.load.image(cenario.background, 'images/background-day.png');
    this.load.spritesheet('chao', 'images/ground.png', {
        frameWidth: 336,
        frameHeight: 112
    }); 
       
    // Mensagem inicial
    /** TODO
     * - Alterar para imagem inicial com novo personagem
     * - Confirmar se tem como colocar em svg para melhorar a qualidade
    */
   this.load.image(elementos.inicial, 'images/message-initial.png');
}
   // Personagem
   /** TODO
    * - Verificar se tem como comor imagem em svg para melhorar a qualidade
    * - Alterar para o personagem do Vivico
    * - Alterar os nomes em TODOS os lugares hehe 
    */
   /*
   this.load.spritesheet('jogador', 'images/bird-red-sprite_original.png', {
       frameWidth: 34,
       frameHeight: 24
   });
   
   
    // Chão
    this.load.spritesheet(cenario.background, 'images/ground-sprite.png', {
        frameWidth: 336,
        frameHeight: 112
    })

    // Tubo
    this.load.image(elementos.obstaculos.tubo.vermelho.bottom, 'images/pipe-red-bottom.png');
    this.load.image(elementos.obstaculos.tubo.vermelho.top, 'images/pipe-red-top.png');
    
    
    // PowerUps
    this.load.image(elementos.especiais.healthyFood, 'images/healthy-food.png');
    this.load.image(elementos.especiais.junkFood, 'images/junk-food.png');
    
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
    
    // Fim de Jogo
    this.load.image(elementos.fimJogo.gameOver, 'images/gameover.png');
    this.load.image(elementos.fimJogo.restart, 'images/restart-button.png');

// Você está aqui -> fim da função preload    
}*/


function create() {
    fundoDia = this.add.image(cenario.width, cenario.height, cenario.background).setInteractive(); // Serve para deixar o fundo interativo, vai auxiliar na hora de clicar para iniciar o jogo
    mensagemInicial = this.add.image(cenario.width, cenario.height, elementos.inicial);
    
     

// VOcê está aqui -> fim da função create    
}

function update() {
    
// VOcê está aqui -> fim da função update    
}