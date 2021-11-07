const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const Token = require('./Token')

class User {

    async findAll() {
        try {
            const result = await knex.select(["id", "email", "role", "name"]).table("users")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findByID(id) {
        try {
            const result = await knex.select(["id", "email", "role", "name"]).where({ id: id }).table("users")

            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }

        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async new(email, password, name) {

        try {
            password = password.toString()
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ email, password: hash, name, role: 0 }).table("users");
        } catch (err) {
            console.log(err);
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("users").where({ email: email })

            if (result.length > 0) {
                return true
            } else {
                return false
            }

        } catch (error) {

        }
    }
    async update(id, name, email, role) {

        const user = await this.findByID(id)

        if (user != undefined) {

            var editUser = {}

            if (email != undefined) {
                if (email != user.email) {
                    const result = await this.findEmail(email)
                    if (result == false) {
                        editUser.email = email
                    } else {
                        return { status: false, err: "O Email já  está cadastrado" }
                    }
                }
            }

            if (name != undefined) {
                editUser.name = name
            }

            if (role != undefined) {
                editUser.role = role
            }

            try {
                await knex.update(editUser).where({ id: id }).table('users')
                return { status: true }
            } catch (error) {
                return { status: false, err: error }
            }
        } else {
            return { status: false, err: "O usuário não existe" }
        }
    }

    async delete(id) {
        const user = await this.findByID(id)

        if (user != undefined) {
            try {
                await knex.delete().where({ id: id }).table('users')
                return { status: true }
            } catch (error) {
                return { status: false, err: err }
            }
        } else {
            return { status: false, err: "O usuário não existe, impossivel realizar a ação" }
        }
    }


    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "email", "password", "role", "name"]).where({ email: email }).table("users")

            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }

        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async changePassword(newPassword, id, token) {
        
        const hash = await bcrypt.hash(newPassword +'', 10);
        await knex.update({ password: hash }).where({ id: id }).table('users')
        await Token.setUsed(token)
    }
}

module.exports = new User()