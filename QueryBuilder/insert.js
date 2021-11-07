const database = require('./database')

// var dados = [
//     {
//         nome: 'Valorant',
//         preco: 0.99
//     },
//     {
//         nome: 'Warzone',
//         preco: 50.99
//     },
//     {
//         nome: 'Minecraft',
//         preco: 20
//     },
//     {
//         nome: 'GTA V',
//         preco: 40
//     }
// ]

// database.insert(dados).into('games').then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
//console.log(query.toQuery())

//insert associado
database.insert({
    nome_studio: 'RIOT',
    game_id: 2
}).table('studio').then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

//select da tabela
// database.select().table('games').then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })