const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose')
const Appointment = require('./services/appointmentService')

const app = express()

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/sysagenda', { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('create')
})

app.post('/register', async (req, res) => {
    const status = await Appointment.Create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    )

    if (status) {
        res.redirect('/')
    } else {
        res.send('Ocorreu uma falha')
    }
})

app.get('/getcalendar', async (req, res) => {
    var appointments = await Appointment.GetAll(false)
    res.json(appointments)
})

app.get('/event/:id', async (req, res) => {
    const appo = await Appointment.GetById(req.params.id)
    res.render('event', { appo: appo })

})

app.post('/finished', async (req, res) => {
    const id = req.body.id
    const result = await Appointment.Finished(id)

    if (result) {
        res.redirect('/')
    } else {
        res.send('Houve um erro ao finalizar a consulta')
    }
})

app.get('/list', async (req, res) => {
    const appos = await Appointment.GetAll(true)
    res.render('list', { appos })
})

app.get('/searchresult', async (req, res) => {

    const appos = await Appointment.Search(req.query.search)
    res.render('list', { appos })
    res.json()
})

setInterval(async () =>{
    await Appointment.SendNotification()
}, 30000)

//hedihog807@ecofreon.com


app.listen(3000, () => {
    console.log('on')
})