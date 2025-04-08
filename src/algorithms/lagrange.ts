import { Decimal } from "decimal.js";

Decimal.set({ precision: 10 });

export function lagrangeInterpolation(
  points: [number, number][],
  xValue?: number,
  decimalPlaces: number = 4,
): { polynomial: string; value?: string } {
  const lagrangeBasis = points.map((point, i) => {
    const xi = new Decimal(point[0]);
    const fxi = new Decimal(point[1]);

    let liTerms: string[] = [];
    let liValue = new Decimal(1);

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const xj = new Decimal(points[j][0]);
        liTerms.push(`(x - ${xj.toFixed(decimalPlaces)})`);
        if (xValue !== undefined) {
          const x = new Decimal(xValue);
          liValue = liValue.mul(x.sub(xj)).div(xi.sub(xj));
        }
      }
    }

    const denominator = points
      .filter((_, j) => j !== i)
      .reduce((acc, [xj]) => acc.mul(xi.sub(xj)), new Decimal(1))
      .toFixed(decimalPlaces);

    return {
      xi: xi.toFixed(decimalPlaces),
      fxi: fxi.toFixed(decimalPlaces),
      liSymbolic: `(${liTerms.join(" * ")}) / (${denominator})`,
      liValue:
        xValue !== undefined ? liValue.toFixed(decimalPlaces) : undefined,
    };
  });

  console.log("Lagrange basis polynomials:");
  console.table(
    lagrangeBasis.map((b) => ({
      xi: b.xi,
      fxi: b.fxi,
      "Li(x)": b.liSymbolic,
      ...(xValue !== undefined ? { "Li(xValue)": b.liValue } : {}),
    })),
  );

  let a = new Decimal(0);
  let b = new Decimal(0);
  let c = new Decimal(0);

  for (let i = 0; i < points.length; i++) {
    const xi = new Decimal(points[i][0]);
    const fxi = new Decimal(points[i][1]);
    let liNum = new Decimal(1);
    let liDen = new Decimal(1);

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const xj = new Decimal(points[j][0]);
        liNum = liNum.mul(new Decimal(-xj));
        liDen = liDen.mul(xi.sub(xj));
      }
    }

    const coeff = fxi.mul(liNum).div(liDen);
    if (i === 0) {
      c = coeff; // константа
    } else if (i === 1) {
      b = coeff.sub(c.mul(new Decimal(points[0][0]))); // x
      a = coeff.sub(b).div(new Decimal(points[1][0])); // x^2
    } else if (i === 2) {
      a = coeff; // x^2
    }
  }

  const polynomial = `${a.toFixed(decimalPlaces)}x^2 + ${b.toFixed(decimalPlaces)}x + ${c.toFixed(decimalPlaces)}`;
  console.log(`Interpolated polynomial P2(x) = ${polynomial}`);

  let value: string | undefined;
  if (xValue !== undefined) {
    const x = new Decimal(xValue);
    value = a.mul(x.pow(2)).add(b.mul(x)).add(c).toFixed(decimalPlaces);
    console.log(`Interpolated value f(${xValue}) = ${value}`);
  }

  return { polynomial, value };
}
