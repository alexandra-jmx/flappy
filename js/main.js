import CenaCarregamento from './cena-carregamento.js';
import CenaJogo from './cena-jogo.js';

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
            debug: true
        }
    },
    scene: [
        CenaCarregamento,
        CenaJogo
    ]
};

const jogo = new Phaser.Game(config);