let app = require('../src/app')
let supertest = require('supertest')

let request = supertest(app)

test('the application must be respond on port 3131', () => {
    return request.get('/').then(res => {
        let status = res.statusCode
        expect(status).toEqual(200)

    }).catch((err) => {
        fail(err)
    })
})

