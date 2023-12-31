const assets = {
    width: 144, //metade da largura do jogo
    height: 256, // metade da altura do jogo para auxiliar no posicionamento
    background: 'background',
    chao: 'ground',
    personagem: 'vivi-boy',
    tubo: {
        superior: 'tubo-vermelho-top',
        inferior: 'tubo-vermelho-bottom' 
    },
    especiais: {
        junkFood: 'junk-food',
        healthyFood: 'healthy-food'
    },
    contador: {
        width: 25,
        base: 'number',
        score: 'score',

    },
    inicial: 'mensagem.inicial',
    fimJogo: {
        gameOver: 'game-over',
        restart: 'restart-button',
    },
    animacoes: {
        chao: {
            movendo: 'chao-movendo',
            parado: 'chao-parado'
        }
    }
    //, personagem: {}
}

export default assets;