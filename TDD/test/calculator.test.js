let app = require('../app')

describe("Basic operations", () => {

    test("must be receive two number and add them", () => {
        let result = app.sum(5, 5)

        expect(result).toEqual(10)
    })

    test("must be receive two numbers and multiply them", () => {
        let result = app.mult(5, 5)

        expect(result).toEqual(25)
    })
})