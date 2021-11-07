const mongoose = require('mongoose')
const ArticleModel = require('./article')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/aulamongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
      console.log('servidor on')
  }).catch((err) => {
      console.log(err.response)
  })
}

//definindo e usando o model
const Article = mongoose.model('Article', ArticleModel)

//inserindo os dados do model
const article = new Article({
    title: "Márcio",
    autor: 'lispector, Dilma',
    body: 'teste teste teste teste teste testeteste teste teste testetestetestetestetesteteste'
})

//inserir dados no banco
// article.save().then(() => {s
//     console.log('Artigo salvo')
// }).catch((err) => {
//     console.log("houve um erro ao salvar o arquivo")
// })

//buscar todos os dados no banco
Article.find({}).then((articles) => {
    console.log(articles)
})

//buscar por um identificador
Article.find({'_id':'616b2a68ef6f87c36a16eb12'}).then((articles) => {
    console.log(articles)
})
//busca do primeiro registro
Article.findOne({'_id':'616b2a68ef6f87c36a16eb12'}).then((articles) => {
    console.log(articles)
})

//deletar registros
Article.findByIdAndDelete('616b2a68ef6f87c36a16eb12').then(() => {
    console.log('Registro removido')
})

//update
Article.findByIdAndUpdate('616b2a68ef6f87c36a16eb12'), {title: "Update com MongoDB", author: 'Dorime', body: 'é muito fácil e rápido com mongoDB'}).then(()=> {
    console.log('artigo atualizado')
})