const fs = require('fs');


//****************************************************APENAS PARA LER O ARQUIVO E EXIBIR NO CONSOLE
// var content

// fs.readFile('texto.txt', {encoding: 'utf-8'}, (err, data) => {
//     if(err){
//         console.log('erro na leitura')
//     } else {
//         content = data
//         console.log(data)
//     }
// })

//****************************************************PARA EU REESCREVER O ARQUIVO ESCOLHIDO COM O TEXTO DA VARIÁVEL
// var newText = 'Novo texto aqui'

// fs.writeFile('texto.txt', newText, (err) => {
//     if(err){
//         console.log('Erro na escrita')
//     }

// })

//****************************************************PARA ADICIONAR NOVOS TEXTOS SEM APAGAR O QUE JÁ EXISTE
// var append = ' adicionando texto sem apagar'

// fs.appendFile('texto.txt', append, function (err) {
//     err? console.log(err) : console.log('Saved!');
//   });

//****************************************************Função genérica para escrita de um arquivo 
function ModificarTexto(nome, curso, categoria, arquivo) {
    fs.readFile(arquivo, { encoding: 'utf-8' }, (err, dados) => {
        if (err) {
            console.log(err)
        } else {
            var textoJson = JSON.parse(dados)

            textoJson.nome = nome,
                textoJson.curso = curso,
                textoJson.categoria = categoria

            fs.writeFile('texto.json', JSON.stringify(textoJson), (err) => {
                err ? console.log('Houve um erro') : console.log('escrita completa')
            })
        }
    })
}

ModificarTexto('Aline', 'Data', 'BD', 'texto.json')