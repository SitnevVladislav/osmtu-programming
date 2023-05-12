/**
 *  Фабричный метод стоит использовать,
 *  когда есть необходимость создания множества однотипных объетов 
*/
function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}
const figureNames: string[] = ['Blue Ricky','Orange Ricky','Cleveland Z','Rhode Island Z','Smashboy','Hero','Teewee']

class Figure {
    public shape: string;

    constructor(shape: string) {
        this.shape = shape;
    }

    print() {
        console.log('#'+this.shape + ' created');
    }
}

class TetrisFactory {
    create(type: string) {
        switch(type) {
            case 'Blue Ricky': return new Figure(type); break;
            case 'Orange Ricky': return new Figure(type); break;
            case 'Cleveland Z': return new Figure(type); break;
            case 'Rhode Island Z': return new Figure(type); break;
            case 'Smashboy': return new Figure(type); break;
            case 'Hero': return new Figure(type); break;
            case 'Teewee': return new Figure(type); break;
        }
    }
}

const factory = new TetrisFactory();

// создать фигуру с интервалом 2 секунды
let timerId = setInterval(() =>{
    const index = getRandomInt(figureNames.length)
    const figure = factory.create(figureNames[index]);
    figure!.print()
}, 2000);
// остановить вывод через 10 секунд
setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 11000);
