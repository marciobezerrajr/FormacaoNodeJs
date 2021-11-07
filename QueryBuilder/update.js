const database = require('./database')

database.select().table('games').then((data) => {
    console.log(data)
})

// database.where({id: 2}).update({preco: 10}).table('games').then((data) => {
//     console.log(data)
// })