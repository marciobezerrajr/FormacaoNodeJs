const express = require('express')
const app = express()

const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser('fishcatpass'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000} //1h
    //{secure: true}
}))

app.use(flash())

app.get('/', (req, res) => {
 
    var emailError = req.flash('emailError')
    var pontosError = req.flash('pontosError')
    var nomeError = req.flash('nomeError')
    var email = req.flash('email')

    emailError = (emailError == undefined || emailError.length == 0)? undefined : emailError
    pontosError = (pontosError == undefined || pontosError.length == 0)? undefined : pontosError
    nomeError = (nomeError == undefined || nomeError.length == 0)? undefined : nomeError
    
    email = (email == undefined || email.length == 0)? undefined : email
    nome = (nome == undefined || nome.length == 0)? undefined : nome
    pontos = (pontos == undefined || pontos.length == 0)? undefined : pontos

    //passo os dados para a view renderizar via EJS
    res.render('index', {emailError, pontosError, nomeError, email, nome, pontosError})
})

app.post('/form', (req, res) => {
    const {nome, email, pontos} = req.body

    var emailError
    var pontosError
    var nomeError

    if(email == undefined || email ==""){
        emailError = "O email não pode ser vazio"
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "A quantidade de pontos não pode ser menor que 20"
    }

    if(nome == undefined || nome ==""){
        nomeError = 'O nome não pode ser vazio ou menor que 3 caracteres'
    } else if (nome.length < 3){
        nomeError = 'O nome não pode ser menor que 3 caracteres'
    }
    //exibem os erros de acordo com o erro
    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash('emailError', emailError)
        req.flash('nomeError', nomeError)
        req.flash('pontosError', pontosError)

        //resgatam os valores dos inputs nos casos de erro para não precisar redigitar
        req.flash('email', email)
        req.flash('nome', nome)
        req.flash('pontos', pontos)

        res.redirect('/')
    } else {
        res.send('Tudo ok')
    }







})


app.listen(3001, ()=> {
    console.log('server on')
})