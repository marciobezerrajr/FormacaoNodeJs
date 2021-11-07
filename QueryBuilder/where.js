const database = require('./database')

//select where
var query = database.select(['id', 'preco']).where({nome:'CSGO'}).table('games')

//and / or
var query = database.select(['id', 'preco'])
// .where({nome:'CSGO'})
// .where({id: 1}) 
//or = orWhere({id :7})
//whereRaw({'nome: CSGO' OR preco < 50})
.table('games')

//select *
var query = database.where({nome:'CSGO'}).table('games')

console.log(query.toQuery())