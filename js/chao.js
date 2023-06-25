const ground = {
    chao: 'chao',
    animacoes: {
        movendo: 'chao.movendo',
        parado: 'chao.parado'
    }
}

export default class Chao extends Phaser.Physics.Arcade.Sprite{

    constructor(cena) {
    super(cena, 0, 0, 'chao');

    this.sprite = cena.physics.add.sprite(144, 458, 'chao');
    this.sprite.setCollideWorldBounds(true); // impede que o chão deixe de aparecer na tela
    this.sprite.setDepth(10) // não entendi muito bem a função. 

    // TODO
    // Animção

    cena.anims.create({
        key: ground.animacoes.movendo,
        frames: cena.anims.generateFrameNumbers(ground.chao, {
            start: 0,
            end: 2
        }),
        frameRate: 15,
        repeat: -1
    })

    //Essa animação tá quebrando
   cena.anims.create({
        key: ground.animacoes.parado,
        frames: [{
            key: ground.chao,
            frame: 0
        }],
        frameRate: 20
    })
    //*/
}
}