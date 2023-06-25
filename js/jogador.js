const player = {
    personagem: 'jogador',
    //animacoes: {}
}

export default class Jogador extends Physics.Arcade.Sprite{
    constructor(cena) {
        super(cena, 0, 0, 'jogador');

        this.sprite.cena.physics.add.sprite(60, 265, 'jogador');
        this.sprit.setBounce(0.2); // Parâmetro que faz o personagem quicar
        this.sprite = setCollideWorldBounds(true); // impede que a sprite do jogador saia da tela
        this.sprite.body.allowGravity = false;
        
        // TODO 
        // - criar as animações -->> não sei se vai ser no personagem. 

    
    }
}