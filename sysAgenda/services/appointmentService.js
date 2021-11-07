const appointment = require('../models/Appointment')
const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')
const nodemailer = require('nodemailer')

const appo = mongoose.model('Appointment', appointment)

class Appointment {
    async Create(name, email, cpf, description, date, time) {
        const newAppo = new appo({
            name,
            email,
            cpf,
            description,
            date,
            time,
            finished: false,
            notified: false
        })
        try {
            await newAppo.save()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async GetAll(showFinished) {
        if (showFinished) {
            return await appo.find()
        } else {
            //processa os dados para aparecer no calendar
            var appos = await appo.find({ 'finished': false })
            var appointments = []

            appos.forEach((appointment) => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            });
            return appointments
        }
    }

    async GetById(id) {
        try {
            const event = await appo.findOne({ '_id': id })
            return event

        } catch (err) {
            console.log(err)
        }
    }
    async Finished(id) {
        try {
            await appo.findByIdAndUpdate(id, { finished: true })
            return true

        } catch (err) {
            console.log(err)
            return false
        }
    }

    async Search(query) {
        try {
            const appos = await appo.find().or([{ email: query }, { cpf: query }])
            return appos
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async SendNotification(id) {
        const appos = await this.GetAll(false)

        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a3d7a2015a8fca",
                pass: "74c80bc9df988e"
            }
        });

        appos.forEach(async app => {
            var date = app.start.getTime()
            var hour = 1000 * 60 * 60
            var gap = date - Date.now()

            if (gap <= hour) {

                if (!app.notified) {

                    await appo.findByIdAndUpdate(app.id, {notified: true})

                    transporter.sendMail({
                        from: "Marcio<tester@email.com>",
                        to: app.email,
                        subject: 'Consulta em 1h',
                        text: 'Sua consulta ocorrerá em 1h, esteja pronto'
                    }).then(() => {

                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
        })
    }
}

module.exports = new Appointment()