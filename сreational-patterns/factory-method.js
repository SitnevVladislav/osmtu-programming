/**
 *  Фабричный метод стоит использовать,
 *  когда есть необходимость создания множества однотипных объетов 
*/
class Bmw {
    constructor(model, price,maxSpeed) {
        this.model = model;
        this.price = price;
        this.maxSpeed = maxSpeed;
    }
}

class BmwFactory {
    create(type) {
        switch(type) {
            case 'X5': return new Bmw(type, 100000, 300); break;
            case 'X6': return new Bmw(type, 20000,350); break;
        }
    }
}

const factory = new BmwFactory();

const x5 = factory.create('X5');
const x6 = factory.create('X6');

console.log(x5);
console.log(x6);
