import { Decimal } from "decimal.js";
import { evaluate } from "mathjs";

Decimal.set({ precision: 10 });

export function bisection(equation: string, a, b, epsilon) {
  const f = (x) => {
    const xDec = new Decimal(x);
    const result = evaluate(equation, { x: xDec.toNumber() });

    return new Decimal(result);
  };

  const aDec = new Decimal(a);
  const bDec = new Decimal(b);
  const epsilonDec = new Decimal(epsilon);

  let left = aDec;
  let right = bDec;

  if (f(left).mul(f(right)).greaterThan(0)) {
    throw new Error("The function must have different signs at the endpoints.");
  }

  const iterations = [];
  while (right.minus(left).greaterThan(epsilonDec)) {
    const mid = left.plus(right).div(2);
    const fMid = f(mid);

    iterations.push({
      left: left.toString(),
      right: right.toString(),
      p: mid.toString(),
      fp: fMid.toString(),
    });

    if (fMid.isZero()) {
      return mid.toString();
    } else if (f(left).mul(fMid).lessThan(0)) {
      right = mid;
    } else {
      left = mid;
    }
  }

  console.table(iterations);
  return left.plus(right).div(2).toString();
}
