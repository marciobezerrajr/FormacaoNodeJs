class Processor {
    static Process(data) {
        var breakLine = data.split('\r\n') // quebra de linha
        data.replace()
        var rows = []

        breakLine.forEach(row => {
            var array = row.split(',')
            array = row.replace(';;' || ';', '') //separo cada linha por virgula
            rows.push(array) // adiciono as linhas ao array
        });

        return rows
    }
}

module.exports = Processor