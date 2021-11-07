const express = require("express");
const { Socket } = require("./node_modules/socket.io/dist");
const app = express()
//socket.io precisa trabalhar com o serve nativo do node
const http = require("http").createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('x desconectou ' + socket.id)
    })

    socket.on("bemvindo", (data) => {
        console.log('Evento abaixo')
        console.log(data)
    })

    socket.on("palavra", (data) => {
        console.log('Texto digitado')
        console.log(data)

        socket.emit('resultado', data + " - teste envio do backend")
    })
})


app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index')
})

http.listen(3000, () => {
    console.log('aplicação socket.io rodando')
})