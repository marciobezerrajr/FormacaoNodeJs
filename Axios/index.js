const express = require("express");
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var db = require('./database/games') //base de games
const db2 = require("./database/users"); //base de usuários

//criando uma chave para segurança do jwt
const jwtPass = 'bdnwk.ewwdçc123'

function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ') //divide o token em um array
        const token = bearer[1]

        jwt.verify(token, jwtPass, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: 'Token inválido' })
            }
            req.token = token
            req.loggedUser = { id: data.id, email: data.email }
            console.log(data)
            next()
        })
    } else {
        res.status(401)
        res.json({ err: ' Token inválido' })
    }
}

//pega todos os games
app.get("/games", auth, (req, res) => {

    var HATEOS = [
        [
            {
                href: 'http://localhost:3001/games',
                method: 'POST',
                rel: 'create_game'
            },
            {
                href: 'http://localhost:3001/games',
                method: 'GET',
                rel: 'list_game'
            },
            {
                href: 'http://localhost:3001/games/:id',
                method: 'DELETE',
                rel: 'delete_game'
            },
            {
                href: 'http://localhost:3001/auth',
                method: 'POST',
                rel: 'login'
            }
        ]
    ]

    res.statusCode = 200;
    //undeline indica que estou passando infos secundárias, não relevantes a solicitação da rota
    res.json({games: db.games, _links: HATEOS});
});

//pega um game específico
app.get("/games/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {

        var HATEOS = [
            [
                {
                    href: 'http://localhost:3001/games',
                    method: 'POST',
                    rel: 'create_game'
                },
                {
                    href: 'http://localhost:3001/games/'+id,
                    method: 'PUT',
                    rel: 'update_game'
                },
                {
                    href: 'http://localhost:3001/games/'+id,
                    method: 'GET',
                    rel: 'get_game'
                },
                {
                    href: 'http://localhost:3001/games/'+id,
                    method: 'DELETE',
                    rel: 'delete_game'
                },
                {
                    href: 'http://localhost:3001/games/',
                    method: 'GET',
                    rel: 'list_all_games'
                },
            ]
        ]

        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json({game, _links: HATEOS});
        } else {
            res.sendStatus(404);
        }
    }
});

//cadastra um novo jogo
app.post("/games", auth, (req, res) => {
    var { title, price, year } = req.body;
    db.games.push({
        id: 2323,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

//deleta um game específico
app.delete("/games/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = db.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            db.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});


//atualiza um game específico
app.put("/games/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);

        if (game != undefined) {
            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
});

//rota de autenticação
app.post('/auth', (req, res) => {
    const { email, password } = req.body

    if (email != undefined) {
        var user = db2.users.find(u => u.email == email)

        if (user != undefined) {

            if (user.password == password) {

                jwt.sign({ id: user.id, email: user.email }, jwtPass, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" });
                    } else {
                        res.status(200);
                        res.json({ token: token });
                    }
                })
            } else {
                res.status(401);
                res.json({ err: "Credenciais inválidas!" });
            }
        } else {
            res.status(404);
            res.json({ err: "O E-mail enviado não existe na base de dados!" });
        }

    } else {
        res.status(400);
        res.send({ err: "O E-mail enviado é inválido" });
    }
});

app.listen(3001, () => {
    console.log("API RODANDO!");
});