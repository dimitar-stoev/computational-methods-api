import Decimal from "decimal.js";
import { evaluate, parse } from "mathjs";

Decimal.set({ precision: 10 });

export function trapezoidalIntegration(
  f: string,
  a: number,
  b: number,
  tolerance: string = "1e-6",
  precision: number = 6,
) {
  const tol = new Decimal(tolerance);
  let n = 2;
  let prevIntegral = new Decimal(0);

  const node = parse(f);
  const fReplaced = (x: number) =>
    evaluate(node.toString(), { x: x }) as number;

  const fDecimal = (x: Decimal) => new Decimal(fReplaced(x.toNumber()));

  while (true) {
    const h = new Decimal(b - a).div(n);
    let sum = fDecimal(new Decimal(a)).plus(fDecimal(new Decimal(b)));
    for (let i = 1; i < n; i++) {
      const x = new Decimal(a).plus(h.mul(i));
      sum = sum.plus(fDecimal(x).mul(2));
    }
    const integral = h.mul(sum).div(2);

    const diff = integral.minus(prevIntegral).abs();
    if (diff.lessThan(tol) && n > 2) {
      console.log(`Integral from ${a} to ${b}:`);
      console.log(`Tolerance: ${tolerance}`);
      console.log(`Approximated value: ${integral.toFixed(precision)}`);

      return {
        value: integral.toFixed(precision),
        lowerBound: a,
        upperBound: b,
        tolerance,
      };
    }

    prevIntegral = integral;
    n *= 2;
  }
}
