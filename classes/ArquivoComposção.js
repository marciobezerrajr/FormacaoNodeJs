class Leitor{
    Ler(caminho){
        return 'conteúdo do arquivo'
    }
}

class Escritor{
    Escrever(arquivo, conteudo){
        console.log('conteúdo escrito')
    }
}

class Criador{
    Criar(nome){
        console.log('arquivo criado')
    }
}

class Destruidor{
    Deletar(nome){
       console.log('arquivo deletado')
    }
}

class manipuladorArquivo{
    constructor(nome){
        this.arquivo = nome;
        this.leitor = new Leitor()
        this.escritor = new Escritor()
        this.criador = new Criador()
        this.destruidor = new Destruidor()
    }
}

class GerenciadorUsuarios{
    constructor(){
        this.criador = new Criador()
        this.escritor = new Escritor()
    }

    SalvarListaUsuarios(lista){
            this.criador.Criar('usuario.txt')
            this.escritor.Escrever('usuario.txt', lista)
    }
}

var manipulador = new manipuladorArquivo('meuarquivo.txt')

manipulador.leitor.Ler()
manipulador.escritor.Escrever()
manipulador.criador.Criar()
manipulador.destruidor.Deletar()



var usuarios = new GerenciadorUsuarios()