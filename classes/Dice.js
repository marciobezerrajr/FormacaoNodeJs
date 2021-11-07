

class Dice {

    constructor(sides){
        this.sides = sides
    }

    Roll(){
        for(var i =0; i<20; i++) {
        console.log('Dado de ' + this.sides + " --------------- ")
        var random = Math.random()
        console.log('número random gerado: '+ random)
        var mult = (random * this.sides)
        console.log('após multiplicar os lados pelo número random: '+mult)        
        var sum = (mult+ 1)
        console.log('após somar com 1: '+sum)
        var teste = Math.floor(sum)
        console.log(teste)
        console.log('menor valor inteiro possível: '+teste)
        console.log("#####################################################################")
        


        }
    }
}

// var dice6 = new Dice(6)
// dice6.Roll()

// var dice6 = new Dice(10)
// dice6.Roll()

// var dice6 = new Dice(16)
// dice6.Roll()

var dice6 = new Dice(50)
dice6.Roll()
