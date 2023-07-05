import cenaJogo from './cenaJogo.js';

//Configuraações jogo
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: 288,
        height: 512,
        parent: 'flappy-boy',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 600
                },
                debug: true // Lembrar de desativar na versão final :)
            }
        },
        scene: [ cenaJogo ]
    };
    
    // Criando o jogo
    const jogo = new Phaser.Game(config);
}



// // Elementos
// //nem sei mais o que tô usando ou não :( )
// (OK) let fundoDia; 
// let chao;
// let personagem;
// let mensagemInicial;
// let mensagemFinal;
// let contador;
// let grupoContador;
// let tubos;
// let tuboAtual;
// let grupoTubos;
// let grupoEspacamento;
// let espacamento;
// let powerups;
// let timer;

// (OK) const jogo => inicia o jogo e é chamada dentro da cena. 

// // Ações
// let jogoIniciado;
// let jogoTerminado;
// let restart;




// /** Funções
//  * Preload
//  *  - Carregar imagens:
//  *      - Mensagem inicial
//  *      - Fundo (background) OK
//  *      - Chão  OK
//  *      - Personagem -> Pendente de ajustes -> mudança do personagem
//  *      - Tubo vermelho OK
//  *      - Especiais -> Talves precise de ajustes. Não sei se não seria melhor usar como sprite também
//  *      - Mensagem final (end game)
//  *      - Botão de restart 
//  * Create
//  *  - Fundo OK
//  *  - Mensagem inicial
//  *  - Chao Ok
//  *  - Personagem (fixo)
//  * Update
//  * -
//  * ** Start
//  * ** Game Over
//  */

// function preload() {
    
       
//     // Mensagem inicial
//     /** TODO
//      * - Alterar para imagem inicial com novo personagem
//      * - Confirmar se tem como colocar em svg para melhorar a qualidade
//     */
//    this.load.image(elementos.inicial, 'images/message-initial.png');

//    // Personagem
//    /** TODO
//     * - Verificar se tem como comor imagem em svg para melhorar a qualidade
//     * - Alterar para o personagem do Vivico
//     * - Alterar os nomes em TODOS os lugares hehe 
//     *  - Alterar os frames
//     * */
//     this.load.spritesheet(elementos.personagem, 'images/vivi-boy.png', {
//         frameWidth: 34,
//         frameHeight: 24
//     }); 
    
    
//     // Tubo
//     // this.load.image(elementos.obstaculos.tubo.inferior, 'images/pipe-red-bottom.png');
//     // this.load.image(elementos.obstaculos.tubo.superior, 'images/pipe-red-top.png');
//     // Tentar de repente com um tuvbo só e flipar
//     this.load.image(elementos.obstaculos.tubo, 'images/pipe-red-top.png');
    
//     /*
//     // PowerUps
//     this.load.image(elementos.especiais.healthyFood, 'images/healthy-food.png');
//     this.load.image(elementos.especiais.junkFood, 'images/junk-food.png');
    
//     // Número do contador
//     this.load.image(elementos.contador.numero0, 'images/number0.png');
//     this.load.image(elementos.contador.numero1, 'images/number1.png');
//     this.load.image(elementos.contador.numero2, 'images/number2.png');
//     this.load.image(elementos.contador.numero3, 'images/number3.png');
//     this.load.image(elementos.contador.numero4, 'images/number4.png');
//     this.load.image(elementos.contador.numero5, 'images/number5.png');
//     this.load.image(elementos.contador.numero6, 'images/number6.png');
//     this.load.image(elementos.contador.numero7, 'images/number7.png');
//     this.load.image(elementos.contador.numero8, 'images/number8.png');
//     this.load.image(elementos.contador.numero9, 'images/number9.png');
    
//     // Fim de Jogo
//     this.load.image(elementos.fimJogo.gameOver, 'images/gameover.png');
//     this.load.image(elementos.fimJogo.restart, 'images/restart-button.png');
    
// }*/
// }     


// function create() {
//    (ok)  fundoDia = this.add.image(cenario.width, cenario.height, cenario.background).setInteractive(); // Serve para deixar o fundo interativo, vai auxiliar na hora de clicar para iniciar o jogo
//     fundoDia.on('pointerdown', () => {
//         salto();
//    })
//     fundoDia.setDepth(0);
//     mensagemInicial = this.add.image(cenario.width, cenario.height - 40, elementos.inicial);
//     mensagemInicial.setDepth(4)
//     mensagemInicial.visible = false;
//     //true; ->>> desativei pq tirei a função start do pointerdown, e agora clica e a mensagem não sain ainda hehe 

//     chao = this.physics.add.sprite(cenario.width, 458, cenario.chao);
//     chao.setCollideWorldBounds(true); // impede que o chão deixe de aparecer na tela
//     chao.setDepth(3) // Determina a profundidade dos elementos

//     // // Animação do chão dando erro
//     // chao.anims.create({
//     //     key: animacoes.chao.movendo,
//     //     frames: chao.anims.generateFrameNumbers(cenario.chao, {
//     //         start: 0,
//     //         end: 2
//     //     }),
//     //     frameRate: 15,
//     //     repeat: -1
//     // })
//     // chao.anims.create({
//     //     key: animacoes.chao.parado,
//     //     frames: [{
//     //         key: cenario.chao,
//     //         frame: 0
//     //     }],
//     //     frameRate: 20
//     // })
    
//     personagem = this.physics.add.sprite(60, 265, elementos.personagem);
//     personagem.setCollideWorldBounds(true); // Impede que a sprite do jogador saia da tela
//     personagem.setBounce(0.2); // // Parâmetro que faz o personagem quicar - Talvez aqui não seja o melhor lugar e talvez nem pr
//     personagem.setDepth(2);
//     personagem.upwardsVelocity = 0; // Acho que não precisa
//     personagem.body.allowGravity = false;

//     //Mantém esse
//     grupoTubos = this.physics.add.group();
 

//     this.physics.add.collider(chao, personagem, tubos, null, this);
//     //this.physics.add.overlap(personagem, tubos, powerups);
//     this.physics.add.overlap(personagem, null, this);


// // Você está aqui -> fim da função create    
// }

// function update() {
    
//     if (personagem.y < 0 || personagem.y > 490) { // de repente ajustar o y >
//         gameOver();
//     }

// // VOcê está aqui -> fim da função update    
// }

// //
// //*

// function salto() {
//     if (!jogoTerminado){
//         personagem.body.setVelocityY(-300);
//         //personagem.setAngle(-15);
//         //personagem.upwardsVelocity = 30; // Acho que não precisa, veremos.
//         //personagem.angle = -15 //->>Aqui é da movimentação. Só faz sentido se alterar conforme a altura do y

        
//         // No referência ele coloca uma variavel com o número de frames e em outro momento, conforme o ângulo reduz a velocidade 
//     } 
// }
// /* Não tá funcionando 100% ainda. Olhar com calma.
// function queda() {
//     if (personagem.upwardsVelocity > 0){
//         personagem.upwardsVelocity--;
//     } else {
//         if (personagem.angle < 90){
//             personagem.angle += 3;
//             personagem.setAngle(personagem.angle);
//         } 
//     }
//     personagem.body.allowGravity = true;

// } */

// function criaObstaculo(x, y) {
//                 if(jogoIniciado && !jogoTerminado) return

//                 const posicaoTuboSuperior = Phaser.Math.Between(-120, 120)

//                 espacamento = scene.add.line(288, posicaoTuboSuperior + 210, 0, 0, 0, 98)
//                 grupoEspacamento.add(espacamento)
//                 espacamento.body.allowGravity = false
//                 espacamento.visible = false

//                 const tuboSuperior = grupoTubos.create(288, posicaoTuboSuperior, tuboAtual.superior)
//                 tuboSuperior.body.allowGravity = false

//                 const tuboInferior = grupoTubos.create(288, posicaoTuboSuperior + 420, tuboAtual.inferior)
//                 tuboInferior.body.allowGravity = false

//                 // Nova tentativa
//                 tubos = game.add.sprite(x, y, elementos.obstaculos.tubo);
//                 timer = game.time.events.loop(1500, this.adicionaLinhaObstaculos, this);

//                 grupoTubos.add(tubos); 
//                 game.physics.arcade.enable(tubos);

//                 // Movimentação 
//                 tubos.body.velocity.x = -200;

//                 // Destroi o tuvo quando ele sai da tela
//                 tubos.checkWorldBounds = true;
//                 tubos.outOfBoundsKill = true; 
//             }; 

//             function adicionaLinhaObstaculos() {
//                 espacamento = Math.floor(Math.random() * 5) + 1;

//                 // adiciona tubos com espaçamento (acho que não vai dar bom)
//                 for (var i = 0; i < 8; i++) {
//                     if (i !=espacamento && i != espacamento + 1){
//                         this.criaObstaculo()
//                     }
//                 }
 
 
 
//  }



// function start(){

//     jogoIniciado = true;
//     mensagemInicial.visible = false; 
//     chao.anims.play(animacoes.chao.movendo);
//     personagem.body.allowGravity = true;

//     //salto(); // não dá pra manter aqui hehe
//     //queda(); não funcionou
//     //criarObstaculos();


//     //this.physics.world.enable([personagem]);
// }
    
//     // Aqui posso criar a animação do chão
    

//     //const contagem = grupoContador.create(cenario.width, 30, elementos.contador.numero0)
//     // No referência aqui ele seta a profundidade como 20, mas ainda não entendi bem o funcionamento.
// //}

// /*
// function gameOver(){
//     if(!jogoTerminado) {
//         jogoTerminado = true;
//         mensagemFinal.visible = true;
//         //Aqui que deveria criar o botão de restart? 

//         // Parar de animar o chão
//         // Parar de animar o personagem

    
//     }
// }
// */
