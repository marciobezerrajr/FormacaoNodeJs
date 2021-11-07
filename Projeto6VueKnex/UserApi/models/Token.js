const knex = require('../database/connection')
const User = require('./User')

class passwordToken {
    async create(email) {
        
        const user = await User.findByEmail(email)
        
        if (user != undefined) {

            try {

                const token = Date.now() //uuid
                token = token + ''

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table('passwordTokens')
                return { status: true, token: token }

            } catch (error) {
                console.log(error)
                return { status: false, err: error }
            }
        } else {
            return { status: false, err: "O e-mail passado não existe no banco de dados" }
        }
    }

    async validate(token){
        try {
            const result = await knex.select().where({token: token}).table('passwordTokens') 

            //existe token?
            if(result.length > 0){
                var tk = result[0]

                //token já foi utilizado?
                if(tk.used){
                    return {status:false}
                } else {
                    return {status: true, token: tk }
                }
            } else {
                return {status:false}
            }
        } catch (error) {
            console.log(error)
            return {status:false}
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordTokens");
    }
}

module.exports = new passwordToken()