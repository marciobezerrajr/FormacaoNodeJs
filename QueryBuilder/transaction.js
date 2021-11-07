const database = require('./database')

async function transacao() {
    try {
        await database.transaction(async trans => {
            await database.insert({ nome_studio: 'Activision' }).table('studio')
            await database.insert({ nome_studio: 'Rockestar' }).table('studio')
            await database.insert({ nome_studio: 'Valve' }).table('studio')
            await database.insert({ nome_studio: 'Konami' }).table('studio')
        })
    } catch (error) {
        console.log(error)
    }
}

transacao()