const express = require('express')
const { path } = require('express/lib/application')
const multer = require('multer')


const app = express()

app.set('view engine', 'ejs')


const storage = multer.diskStorage({

    fileFilter: function (req, file, cb) {
        console.log(path.extension)
        if (path.extension(file.originalname) !== '.pdf') { // extensões que você quer aceitar
            return cb(null, false)
        }
        cb(null, true)
    },
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },

})

const upload = multer({ storage })

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Arquivo recebido')
})

app.listen(3031, () => {
    console.log('Server on')
})