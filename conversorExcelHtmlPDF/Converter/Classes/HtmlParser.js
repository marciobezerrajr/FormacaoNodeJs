const ejs = require('ejs')

class HtmlParser{
    static async Parse(table) {
        try{
            await ejs.render('table.ejs', {header: table.header, rows: table.rows})
            
        } catch(err) {
            console.log(err)
        } 
        
    }
}

module.exports = HtmlParser
