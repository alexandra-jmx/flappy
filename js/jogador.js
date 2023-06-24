export default class Jogador {
    constructor(cena) {
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(60, 265, 'personagem');
        this.sprite = setCollideWorldBounds(true);
        this.sprite.body.allowGravity = false;
        
        // TODO 
        // - criar as animações -->> não sei se vai ser no personagem. 

    
    }
}