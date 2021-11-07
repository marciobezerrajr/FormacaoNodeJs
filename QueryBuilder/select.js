const database = require('./database')

//database.select().table('games').then((data)=> {
database.select(['id', 'preco']).table('games').then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

//queries dentro de queries
database.insert({ nome: 'Diablo 3', preco: '120' }).into('games').then((data) => {
    database.select(['id', 'preco']).table('games').then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
}).catch((err) => {
    console.log(err)
})
/// asc ou desc
database.select().table('games').orderBy('preco', 'desc').then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})


//inner join                              //tabela    //tabela.id      //outra tabela.id
database.select().table('games').innerJoin('studio', 'studio.game_id', 'games.id').then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

//traz tudo da tabela games // e o nome do estudio
database.select(['games.*', 'nome_studio as nome_estudio']).table('games').innerJoin('studio', 'studio.game_id', 'games.id').then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

database.select(['games.*', 'nome_studio as nome_estudio']).table('games').innerJoin('studio', 'studio.game_id', 'games.id').then((data) => {
    var estudioGames = data
    var game = {
        id: 0,
        nome: "",
        estudios: []
    }
    game.id = data[0].id
    game.nome = data[0].nome

    data.forEach((studio) => {
        game.estudios.push({ nome: studio.nome_estudio })
    })
    console.log(game)

}).catch((err) => {
    console.log(err)
})

database.select([
        'studio.nome as nome_estudio',
        'games.nome as nome_do_jogo'
    ]).table('loja')
    .innerJoin('games', 'game.id', 'loja.game_id')
    .innerJoin('studio', 'id_studio', 'loja.studio_id')
    //.where('games.id', 2)
    .then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })