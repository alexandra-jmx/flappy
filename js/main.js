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


// (OK) const jogo => inicia o jogo e é chamada dentro da cena. 

// /** Funções
//  * Preload
//  *  - Carregar imagens:
//  *      - Mensagem inicial OK
//  *      - Fundo (background) OK
//  *      - Chão  OK
//  *      - Personagem -> Pendente de ajustes -> mudança do personagem
//  *      - Tubo vermelho OK
//  *      - Especiais -> Talves precise de ajustes. Não sei se não seria melhor usar como sprite também
//  *      - Mensagem final (end game) OK
//  *      - Botão de restart OK
//  * Create
//  *  - Fundo OK
//  *  - Mensagem inicial OK
//  *  - Chao Ok
//  *  - Personagem (fixo) OK
//  * Update
//  * -
//  * ** Start -> em andamento
//  * ** Game Over
//  * ** Salto -> em andamento
// */


