const fs = require('fs')
//const util = require('util')

class Writer {
    constructor(){
        //this.writer = util.promisify(fs.writeFile)
    }


     Write(filename, data){
        try{
             fs.writeFileSync(filename, data)
            return true

        } catch(err) {
            
            return false
        }
    }

}

module.exports = Writer