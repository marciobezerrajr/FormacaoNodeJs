let app = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

let mainUser = { name: "Márcio", email: "marcio@email.com", password: '123456' }

beforeAll(() => {        //antes de todos os testes
    return request.post('/user')
        .send(mainUser)
        .then(res => { })
        .catch(err => { console.log(err) })
})

afterAll(() => {         //depois d etodos os testes
    request.delete(`/user/${mainUser.email}`)
        .then(() => { })
        .catch(err => { console.log(err) })
})

beforeEach(() => {        // antes de cada teste

})

afterEach(() => {        // depois de cada teste

})


describe("User register", () => {
    test("Should be register a user", () => {

        let time = Date.now()
        let email = `${time}@gmail.com`
        let user = { name: `Marcio${time}`, email, password: '123456' }

        return request.post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)

            }).catch((err) => {
                fail(err)
            })
    })

    test("should block a empty registers", () => {

        let user = { name: "", email: "", password: "" }

        return request.post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(400)

            }).catch((err) => {
                fail(err)
            })
    })

    test("Should block new registers where the email is already exists", () => {
        let time = Date.now()
        let email = `${time}@gmail.com`
        let user = { name: `Marcio${time}`, email, password: '123456' }

        return request.post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)

                //tentando cadastrar com dados repetidos
                return request.post('/user')
                    .send(user)
                    .then(res => {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body.error).toEqual('E-mail já cadastrado')
                    })
            }).catch((err) => {
                fail(err)
            })
    })
})

describe("Authentication tests", () => {
    test("Will return a token when logged succefull", () => {
        return request.post('/auth')
        .send({email: mainUser.email, password: mainUser.password})
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined()
        })
        .catch(err => {
            fail(err)
        })
    })

    test("must prevent an unregistered user from logging in", () => {
        return request.post('/auth')
        .send({email: 'emailfdnijfn@email.com', password: 'semfjsdsdf'})
        .then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.email).toEqual('E-mail não cadastrado')
        })
        .catch(err => {
            fail(err)
        })
    })

    test("must prevent login with a incorrect password", () => {
        return request.post('/auth')
        .send({email: mainUser.email, password: 'semfjsdsdf'})
        .then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.password).toEqual('E-mail ou Senha incorreta')
        })
        .catch(err => {
            fail(err)
        })
    })
})