const ground = {
    chao: 'chao',
    animacoes: {
        movendo: 'chao-movendo',
        parado: 'chao-parado'
    }
}

export default class Chao extends Phaser.Physics.Arcade.Sprite{

    constructor(cena) {
    super(cena, 0, 0, 'chao');

    this.sprite = cena.physics.add.sprite(144, 458, 'chao');
    this.sprite.setCollideWorldBounds(true); // impede que o chão deixe de aparecer na tela
    this.sprite.setDepth(10) // não entendi muito bem a função. 
    }

    // TODO
    // Animção
    /*CreateAnims()
    this.anims.create({
        key: 'chao-movendo'
        frames: this.anims.generateFrameNumbers('chao', {
            start: 0,
            end: 2
        }),
        frameRate: 15,
        repeat: -1
    })

    this.anims.create({
        key: 'chao-parado',
        frames: [{
            key: assets.scene.ground,
            frame: 0
        }],
        frameRate: 20
    })*/
    
}