class WikiArticle {
    private author: string;
    private header: string;
    public content: string;

    constructor(author: string, header: string,content: string) {
        this.author = author;
        this.header = header;
        this.content = content;
    }

    clone() {
        return new WikiArticle(this.author, this.header, this.content);
    }
}

const prototype = new WikiArticle('tester', 'Important article', 'bla bla bla');

const v1 = prototype.clone();
v1.content = 'bla-bla';
const v2 = prototype.clone();
v2.content = 'bla-bla tt bla';

console.log(prototype);
console.log(v1);
console.log(v2);



