class Table {
    constructor(array) {
        this.header = array[0] //pega o cabeçalho
        array.shift() // remove o primeiro elemento do array, no caso o cabeçalho já pego acima
        this.rows = array // pega o restante das linhas
        //this.rows.length se fosse declarada aqui, seria feita a contagem apenas na criação da tabela, podendo ficar desatualizada

    }

    get RowCount(){
        return this.rows.length //retorna a qtde de linhas atuais na tabela
    }

    get ColumnCount(){
        return this.header.length
    }
}

module.exports = Table