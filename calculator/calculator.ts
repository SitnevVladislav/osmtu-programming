interface Calculator<N,M> {
    addition(vA:N, vB:N ): M;
    difference(vA: N, vB: N): M;
    multiply(vA: N, vB: N): M;
    division(vA: N, vB: N): M;
}

class Real implements Calculator<number, number> {
    addition(vA: number, vB: number): number {
        return vA + vB
    }

    difference(vA: number, vB: number): number {
        return vA - vB
    }

    multiply(vA: number, vB: number): number {
        return vA * vB
    }

    division(vA: number, vB: number): number {
        return vA / vB
    }
}

class Complex implements Calculator<Record<string, number>, Record<string, number>> {
    addition(vA: Record<string, number>, vB: Record<string, number>): Record<string, number> {
        return {first: vA.first + vB.first, second: vA.second + vB.second}
    }

    difference(vA: Record<string, number>, vB: Record<string, number>): Record<string, number> {
        return {first: vA.first - vB.first, second: vA.second - vB.second}
    }

    multiply(vA: Record<string, number>, vB: Record<string, number>): Record<string, number> {
        return {
            first: vA.first * vB.first - vA.second * vB.second,
            second: vA.first * vB.second + vA.second * vB.first
        }
    }

    division(vA: Record<string, number>, vB: Record<string, number>): Record<string, number> {
        let conjugateB = {first: vB.first, second: -vB.second}
        let numerator = this.multiply(vA, conjugateB)
        let denominator = this.multiply(vB, conjugateB).first
        if (denominator == 0.0) {
            throw Error("Division by zero")
        }
        return {first: numerator.first / denominator, second: numerator.second / denominator}
    }
}

class Quadruple {
    public real: number;
    public i: number;
    public j: number;
    public k: number;

    constructor(real: number, i: number, j: number, k: number) {
        this.real = real;
        this.i = i;
        this.j = i;
        this.k = k;
    }
}

class Quaternion implements Calculator<Quadruple, Quadruple> {
    addition(vA: Quadruple, vB: Quadruple): Quadruple {
        let realPart = vA.real + vB.real
        let iPart = vA.i + vB.i
        let jPart = vA.j + vB.j
        let kPart = vA.k + vB.k
        return new Quadruple(realPart, iPart, jPart, kPart)
    }

    difference(vA: Quadruple, vB: Quadruple): Quadruple {
        let realPart = vA.real - vB.real
        let iPart = vA.i - vB.i
        let jPart = vA.j - vB.j
        let kPart = vA.k - vB.k
        return new Quadruple(realPart, iPart, jPart, kPart)
    }

    multiply(vA: Quadruple, vB: Quadruple): Quadruple {
        let realPart =
            vA.real * vB.real - vA.i * vB.i - vA.j * vB.j - vA.k * vB.k
        let iPart =
            vA.real * vB.i + vA.i * vB.real + vA.j * vB.k - vA.k * vB.j
        let jPart =
            vA.real * vB.j - vA.i * vB.k + vA.j * vB.real + vA.k * vB.i
        let kPart =
            vA.real * vB.k + vA.i * vB.j - vA.j * vB.i + vA.k * vB.real
        return new Quadruple(realPart, iPart, jPart, kPart)
    }

    division(vA: Quadruple, vB: Quadruple): Quadruple {
        let denominator =
            vB.real * vB.real + vB.i * vB.i + vB.j * vB.j + vB.k * vB.k
        let realPart =
            (vA.real * vB.real + vA.i * vB.i + vA.j * vB.j + vA.k * vB.k) / denominator
        let iPart =
            (vA.i * vB.real - vA.real * vB.i - vA.j * vB.k + vA.k * vB.j) / denominator
        let jPart =
            (vA.j * vB.real + vA.i * vB.k - vA.real * vB.j - vA.k * vB.i) / denominator
        let kPart =
            (vA.k * vB.real - vA.i * vB.j + vA.j * vB.i - vA.real * vB.k) / denominator
        return new Quadruple(realPart, iPart, jPart, kPart)
    }

}

class Module implements Calculator<number, number> {
    private n: number = 0;

    get(): number {
        return this.n
    }

    set(n: number) {
        this.n = n;
    }

    addition(vA: number, vB: number): number {
        return (vA + vA) % this.n
    }

    difference(vA: number, vB: number): number {
        return (vA - vB + this.n) % this.n
    }

    multiply(vA: number, vB: number): number {
        return ((vA % this.n) * (vB % this.n)) % this.n
    }

    division(vA: number, vB: number): number {
        return ((vA % this.n) * (vB % this.n)) % this.n
    }
}

