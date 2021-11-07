let app = require('../src/app')
let supertest = require("supertest")


// let request = supertest('www.google.com')
let request = supertest(app)

test("the application should be respond on port 3131", () => {

    //sempre que utilizar promisses preciso colocar um return
    return request.get('/').then(res => expect(res.statusCode).toEqual(200))
})

/*test("the application should be respond on port 3131", async () => {
    try {
        let res = await request.get('/')
        expect(res.statusCode).toEqual(200)
    } catch (err) {

    }
})*/

test("should be return a color red",() => {
    return request.get("/color/marcio").then(res => expect(res.body.color).toEqual("red"))
})