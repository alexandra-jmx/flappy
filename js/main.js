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
                debug: false 
            }
        },
        scene: [ cenaJogo ]
    };
    
    // Criando o jogo
    const jogo = new Phaser.Game(config);
}



