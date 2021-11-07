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

    socket.on('msg', (data) => {
        io.emit('showmsg', data)

        //envia para todos os sockets menos o socket de onde partiu
        // socket.broadcast.emit('showmsg', data)     

        //envia apenas no mesmo socket da aplicação   
        // socket.emit('showmsg', data)
    })
})


app.set('view engine','ejs')


app.get('/', (req, res) => {
    res.render('index')
})

http.listen(3000, () => {
    console.log('aplicação socket.io rodando')
})