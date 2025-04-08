import { Decimal } from "decimal.js";
import { evaluate } from "mathjs";

Decimal.set({ precision: 10 });

export function secant(equation, a, b, epsiolon) {
  const f = (x) => {
    const xDec = new Decimal(x);
    const result = evaluate(equation, { x: xDec.toNumber() });
    return new Decimal(result);
  };

  let x0 = new Decimal(a);
  let x1 = new Decimal(b);
  const epsilon = new Decimal(epsiolon);

  if (f(x0).mul(f(x1)).greaterThan(0)) {
    throw new Error("The function must have different signs at the endpoints.");
  }

  const iterations = [];
  while (true) {
    const fX0 = f(x0);
    const fX1 = f(x1);
    const xNext = x1.minus(fX1.mul(x1.minus(x0)).div(fX1.minus(fX0)));

    iterations.push({
      x0: x0.toString(),
      p: x1.toString(),
      xNext: xNext.toString(),
      fX0: fX0.toString(),
      fX1: fX1.toString(),
    });

    if (x1.minus(xNext).abs().lessThan(epsilon)) {
      break;
    }

    x0 = x1;
    x1 = xNext;
  }

  console.table(iterations);
  return x1.toString();
}
