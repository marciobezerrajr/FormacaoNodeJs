const jwt = require('jsonwebtoken')
const secret = "ghfdhdgfk,g2hgf124h53df1gsdf4"

module.exports = function (req, res, next) {

    const authToken = req.headers['authorization']

    if (authToken != undefined) {

        const bearer = authToken.split(' ')
        const token = bearer[1]

        try {
            const decoded = jwt.verify(token, secret)

            if (decoded.role == 1) {
                next()
            } else {
                res.status(406)
                res.send("Você não tem permissão")
                return
            }
        } catch (err) {
            res.status(406)
            res.send("Você não está autenticado")
            return
        }
    } else {
        res.status(406)
        res.send("Você não está autenticado")
        return
    }
}