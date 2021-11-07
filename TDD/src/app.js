let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.json({ success: true })
})

app.get('/color/:name', (req, res) => {
    let name = req.params.name

    if (name == "marcio") {
        res.send({ color: 'red'})
    }
})



module.exports = app