import Decimal from 'decimal.js';
import { parse, evaluate } from 'mathjs';

Decimal.set({ precision: 10 });

export function simpsonsRule(
    equation: string,
    lowerBound: number,
    upperBound: number,
    n: number,
    precision: number = 6
) {
    if (n % 2 !== 0) throw new Error('n must be even for Simpson\'s rule');

    const node = parse(equation);
    const f = (x: number) => evaluate(node.toString(), { x: x }) as number;

    const fDecimal = (x: Decimal) => new Decimal(f(x.toNumber()));

    const h = new Decimal(upperBound - lowerBound).div(n);
    let sum = fDecimal(new Decimal(lowerBound)).plus(fDecimal(new Decimal(upperBound)));
    for (let i = 1; i < n; i++) {
        const x = new Decimal(lowerBound).plus(h.mul(i));
        const weight = i % 2 === 0 ? 2 : 4;
        sum = sum.plus(fDecimal(x).mul(weight));
    }
    const integral = h.mul(sum).div(3);

    const fourthDerivative = (x: number) => {
        const xVal = new Decimal(x);
        const x2 = xVal.pow(2);
        const x4 = x2.pow(2);
        const denom = new Decimal(1).plus(x2).pow(5);
        const numer = new Decimal(24).mul(new Decimal(5).mul(x4).minus(new Decimal(10).mul(x2)).plus(1));
        return numer.div(denom).toNumber();
    };

    const step = 0.01;
    let maxFourthDerivative = new Decimal(0);
    for (let x = lowerBound; x <= upperBound; x += step) {
        const derivValue = new Decimal(Math.abs(fourthDerivative(x)));
        if (derivValue.greaterThan(maxFourthDerivative)) {
            maxFourthDerivative = derivValue;
        }
    }

    const derivAtB = new Decimal(Math.abs(fourthDerivative(upperBound)));
    if (derivAtB.greaterThan(maxFourthDerivative)) {
        maxFourthDerivative = derivAtB;
    }

    const errorFactor = new Decimal(upperBound - lowerBound).div(180);
    const h4 = h.pow(4);
    const errorEstimate = errorFactor.mul(h4).mul(maxFourthDerivative);

    console.log(`Integral from ${lowerBound} to ${upperBound} with n = ${n}:`);
    console.log(`Approximated value: ${integral.toFixed(precision)}`);
    console.log(`Error estimate: ${errorEstimate.toFixed(precision)}`);

    return {
        value: integral.toFixed(precision),
        errorEstimate: errorEstimate.toFixed(precision),
        lowerBound,
        upperBound,
        n
    };
}
