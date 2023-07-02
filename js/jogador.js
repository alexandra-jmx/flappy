/*const player = {
    personagem: 'jogador',
    //animacoes: {}
}*/

export default class Jogador extends Phaser.Physics.Arcade.Sprite{
    constructor(cena) {
        super(cena, 0, 0, 'jogador');
        //this.cena = cena;
        this.sprite = cena.physics.add.sprite(60, 303, 'jogador'); // 265
        this.sprite.setBounce(0.2); // Parâmetro que faz o personagem quicar
        this.sprite.setCollideWorldBounds(true); // impede que a sprite do jogador saia da tela
        this.sprite.body.allowGravity = false;

    // TODO 
    // - criar as animações -->> não sei se vai ser no personagem. 
    // Funções para a movimentação
    /*
    this.sprite.setVelocityY(-400)
    this.sprite.angle = -15
    framesMoveUp = 5*/
    
    }
}