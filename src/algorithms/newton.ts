import Decimal from "decimal.js";

export function newtonInterpolation(
  points: [number, number][],
  x: number,
  precision = 5,
  actualFunction = false,
): { value: string; actual: string; error: string } {
  const n = points.length;
  const xArr = points.map(([x]) => new Decimal(x));
  const yArr = points.map(([, y]) => new Decimal(y));

  const dividedDifferences = [...yArr];
  for (let i = 1; i < n; i++) {
    for (let j = n - 1; j >= i; j--) {
      dividedDifferences[j] = dividedDifferences[j]
        .minus(dividedDifferences[j - 1])
        .div(xArr[j].minus(xArr[j - i]));
    }
  }

  const X = new Decimal(x);
  let result = dividedDifferences[0];
  let product = new Decimal(1);
  for (let i = 1; i < n; i++) {
    product = product.mul(X.minus(xArr[i - 1]));
    result = result.plus(dividedDifferences[i].mul(product));
  }

  const actual = (x: number) => {
    if (x === 0) return 0; // избягваме деление на 0
    const num = new Decimal(-4).mul(new Decimal(x).pow(3));
    const exp = Decimal.exp(num);
    return exp.minus(1).div(new Decimal(2).mul(new Decimal(x).pow(3)));
  };

  const response = {
    value: result.toFixed(precision),
    actual: "0",
    error: "0",
  };

  if (actualFunction) {
    const real = actual(x);
    const err = result.minus(real).abs();
    console.log(`error = ${err.toFixed(precision)}`);
    response.actual = real.toFixed(precision);
    response.error = err.toFixed(precision);
  }

  console.log(`f(${x}) = ${result.toFixed(precision)}`);

  return response;
}
