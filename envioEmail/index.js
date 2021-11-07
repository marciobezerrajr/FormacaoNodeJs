require('dotenv').config()
const nodemailer = require('nodemailer')

async function main() {

let account = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        
        //'smtp.gmail.com'
        
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
            // user: process.env.FROM,
            // pass: process.env.PASS
        }
    })

    transporter.sendMail({
        from: 'Marcio <marcioalvesbj@gmail.com>',
        to: process.env.TO,
        subject: "Teste Nodemailer",
        text: 'Envio de e-mail com node e nodemailer',
        html: '<h1>OLA NODEMAILER</h1> meu github'
    }).then((message) => {
        console.log(message)
    }).catch((err) => {
        console.log(err)
    })
}

main().catch(console.error)