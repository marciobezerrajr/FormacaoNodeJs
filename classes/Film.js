class Film {
    //atributos
    constructor(title, year, genre, director, actors, duraction ){
        this.title = ''
        this.year = 0
        this.genre = ''
        this.director = '';
        this.actors = []
        this.duraction = 0
    }

    //métodos
    Play(){
        console.log('Reproduzindo  > ')
    }
    Pause(){
        console.log('Pausar ||')
    }
    Foward(){
        console.log('Avançar >>>')
    }
    Close(){
        console.log('Fechar X')
    }
}


var avangers = new Film()

avangers.title = "Vingadores"
avangers.year = 2014
avangers.genre = "ação"

avangers.Play()


var starWars = new Film()

starWars.title = "Star Wars II"
starWars.year = 2000
starWars.genre = "ação"



var harryPotter = new Film()

