const express =require('express')
const app = express()

const porta = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))



app.get('/', (req, res ) => {
    var nome="Marcio"
    var lang="Node"
    //res.render procura direto na pasta views
    res.render('index', {
        nome,
        lang
    })
})
//para parametros opcionais ex: ":nome?/:lista?"
app.get('/:nome/:lang', (req, res ) => {
    var nome= req.params.nome
    var lang=req.params.lang
    var msg = false

var produtos =[
    {nome: 'bolacha', preco: 2.00},
    {nome: 'salgadinho', preco: 3.49},
    {nome: 'chiclete', preco: 0.25},
    {nome: 'lápis', preco: 1.00}
]



    //res.render procura direto na pasta views
    res.render('index', {
        nome,
        lang,
        msg,
        produtos
    })
})

// querys são totalmente opcionais e não são definidas aqui na rota, porem estarão na url por exemplo:"?canal=youtube" e "?canal=youtube&aula=aula9"
// app.get('/:nome/:lang', (req, res ) => {
//     var nome= req.query['nome']
//     var lang= req.query['lang']
//     //res.render procura direto na pasta views
//     res.render('index', {
//         nome,
//         lang
//     })
// })


app.listen(porta, () => {
    console.log(`server on em localhost:${porta}`)   
})