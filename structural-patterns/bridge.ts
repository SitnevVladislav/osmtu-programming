interface ISet {
    add(...values: string[]): void;
    remove(index: number): void;
    findIndex(value: string): number | undefined;
    print(): void
}
interface ICollection {
    add(...values: string[]): void;
    remove(index: number): void;
    findIndex(value: string): number | undefined;
    print(): void;
}

class ArrayCollection implements ICollection {
    private data: Array<string>;
    constructor() {
        this.data = new Array();
    }

    add(...value: string[]) {
        this.data.push(...value);
    }
    remove(index: number) {
        this.data.splice(index,1);
    };
    findIndex(value: string) {
        return this.data.indexOf(value);
    };

    print(): void {
        console.log(this.data);
    }
}

class MapCollection implements ICollection {
    private data: Map<number, string>;
    private count: number;

    constructor() {
        this.data = new Map();
        this.count = 0;
    }

    add(...value: string[]) {
        value.forEach(e => {
            this.data.set(this.count, e);
            this.count++;
        })
    }
    remove(index: number) {
        this.data.delete(index);
    };
    findIndex(searchValue: string) {
        for (let [key, value] of this.data.entries()) {
            if (value === searchValue) return key;
        }
    };
    print(): void {
        console.log(this.data);
        
    }
}

class ItemSet implements ISet{

    private collection: ICollection;

    constructor(data: string[]) {
        if (data.length <= 3) {
            this.collection = new ArrayCollection();
            this.add(...data);
        } else {
            this.collection = new MapCollection();
            this.add(...data);
        }
    }
    
    add(...values: string[]) {
        this.collection.add(...values);
    }

    remove(index: number) {
        this.collection.remove(index);
    }

    findIndex(value: string) {
        return this.collection.findIndex(value);
    }

    print(): void {
        this.collection.print()    
    }
}

const itemSet1 = new ItemSet(['1','2','3']);
itemSet1.add('7');
itemSet1.print();
itemSet1.remove(2);
itemSet1.print();

const itemSet2 = new ItemSet(['1','2','3', '4', '5', '6']);
itemSet2.print();
itemSet2.add('99');
itemSet2.remove(2);
itemSet2.print();