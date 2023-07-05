export default class Personagem extends Phaser.GameObjects.Sprite{
    constructor(cena, x, y) {
        super(cena, x, y);
        this.personagem = 
        this.sprite = cena.physics.add.sprite(60, 303, 'jogador'); // 265

        this.sprite.setCollideWorldBounds(true); // impede que a sprite do jogador saia da tela
        this.sprite.body.allowGravity = false;

    // TODO 
    // - criar as animações -->> não sei se vai ser no personagem. 
    // Funções para a movimentação
    
    // this.sprite.setVelocityY(-400)
    // this.sprite.angle = -15

//     personagem = this.physics.add.sprite(60, 265, elementos.personagem);
//     personagem.setCollideWorldBounds(true); // Impede que a sprite do jogador saia da tela
//     personagem.setBounce(0.2); // // Parâmetro que faz o personagem quicar - Talvez aqui não seja o melhor lugar e talvez nem pr
//     personagem.setDepth(2);
//     personagem.upwardsVelocity = 0; // Acho que não precisa
//     personagem.body.allowGravity = false;
 
    
    }
}