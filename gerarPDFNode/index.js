const pdf = require('html-pdf')
const ejs = require('ejs')
const express = require('express')
const app = express()

const nome = "Márcio A. Bezerra Jr"
const curso = 'Formação NodeJs'

const html = `<h1>Meu primeiro pdf</h1>

<p styles>Já da pra gerar um currículo utilizando o html</p>
<hr>

<h6>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
</h6>

<hr>

<img src="https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives-768x492.png">

<h4>${nome}</h4>
<h4>${curso}</h4>
`

pdf.create(html, {}).toFile("./pdf/meupdf.pdf", (err, res) => {
    if (err) {
        console.log('Houve um erro ao gerar seu pdf :(')
    } else {
        console.log(res)
    }
})

ejs.renderFile('./meupdf.ejs', { nome, curso }, (err, contentHTML) => {
    if (err) {
        console.log(err)
    } else {
        pdf.create(contentHTML, {}).toFile("./pdf/PDF_EJS.pdf", (err, res) => {
            if (err) {
                console.log('Houve um erro ao gerar seu pdf :(')
            } else {
                console.log(res)
            }
        })
    }
})

