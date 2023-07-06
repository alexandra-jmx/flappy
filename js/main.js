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
                debug: false // Lembrar de desativar na versão final :)
            }
        },
        scene: [ cenaJogo ]
    };
    
    // Criando o jogo
    const jogo = new Phaser.Game(config);
}



/** FALTA:
 * - Trocar a imagem do personagem
 * - Trocar a mensagem inicial para qualidade maior
 * - função de converter de svg para imagem
 * 
 ** Criar
 * - Função para coleta dos especiais
 * - função de efeito de cada especial por x segundos(?)
 * 
 * Ajustar
 * - Contador 
 * - Atualização do contador
 * - Funcionamento do votão de restart
 * - O personagem segue saltando depois de cair 
 * - a mensagem de game over parou de aparecer D: (ok)
 * - Ajustar a posição onde os especiais são criados (ok)
 * - Ajustar a crianção deg
*/


