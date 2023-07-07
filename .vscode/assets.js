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
        // numero0: 'no0',
        // numero1: 'no1',
        // numero2: 'no2',
        // numero3: 'no3',
        // numero4: 'no4',
        // numero5: 'no5',
        // numero6: 'no6',
        // numero7: 'no7',
        // numero8: 'no8',
        // numero9: 'no9',
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