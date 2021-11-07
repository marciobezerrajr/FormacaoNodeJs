const fs = require('fs')
//const util = require('util')

// class Reader {
//     constructor() {
//         this.reader = util.promisify(fs.readFile)
//     }

//     async Reader(path) {
//         try {
//             return await this.reader(path, 'utf-8')
//         } catch (err) {
//             return undefined
//         }
//     }
// }

class Reader {

    async Reader(path) {
        try {
            const data = await fs.readFileSync(path, 'utf-8', 'r')
            return data
        } catch (err) {
            return undefined
        }
    }
}

module.exports = Reader