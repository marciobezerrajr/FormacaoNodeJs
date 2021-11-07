class Animal{
    constructor(name, age, price){
        this.name = name
        this.age = age
        this.price = price
    }

    Quantity(){
        return 10
    }

    OtherMethod(){
        console.log('método qualquer da classe mãe')
    }

}


class Hamster extends Animal{
    
    OtherMethod(){
        //pego o método da classe mãe para executar 
        super.OtherMethod()
        console.log('posso adicionar outras funcionalidades antes ou depois do código')
    }

}

const hamster = new Hamster()
console.log('--------------------------------------------')
hamster.OtherMethod()
console.log('--------------------------------------------')



class Dog extends Animal{   
    //adicionando nova classe, mantem as classes já herdadas
    Latir(){
        console.log('Au Au Au')
    }
    //sobreposição da classe pai
    Quantity(){
        return 20
    }
}

const dog = new Dog('Vira-Lata', 2, 100)
console.log(dog.Quantity())
dog.Latir()

class Pato extends Animal{   
    //fazendo a sobrecarga no método construtor
    constructor(name, age, price, kg, color){
        super(name, age, price)
        this.color = color
        this.kg = kg
    }

    Color(){
        console.log(this.color)
    }
        
}

const pato = new Pato('patolino', 3, 25.00, '1kg', 'blue')
pato.Color();

