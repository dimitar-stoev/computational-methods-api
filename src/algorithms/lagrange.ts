import { Decimal } from "decimal.js";

Decimal.set({ precision: 10 });

export function lagrangeInterpolation(
  points: [number, number][],
  xValue?: number,
  decimalPlaces: number = 4,
  trueFunction: boolean = false,
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

  let interpolatedValue = new Decimal(0);
  if (xValue !== undefined) {
    for (let i = 0; i < points.length; i++) {
      const fxi = new Decimal(points[i][1]);
      const li = new Decimal(lagrangeBasis[i].liValue!);
      interpolatedValue = interpolatedValue.add(fxi.mul(li));
    }
  }

  const value =
    xValue !== undefined ? interpolatedValue.toFixed(decimalPlaces) : undefined;

  const response = {
    polynomial: lagrangeBasis
      .map((basis) => `${basis.fxi} * ${basis.liSymbolic}`)
      .join(" + "),
    value,
  };

  if (trueFunction && xValue !== undefined) {
    const trueValue = new Decimal(trueFunctionFn(xValue)).toFixed(
      decimalPlaces,
    );
    console.log(`Comparing function: ${trueValue}`);

    const error = new Decimal(trueValue).sub(new Decimal(value));
    console.log("Error: ", error.toFixed(4));
    response["trueValue"] = trueValue;
    response["error"] = error.toFixed(decimalPlaces);
  }

  return response;
}

function trueFunctionFn(x: number) {
  return 6 * x * x * Math.atan((x + 1) / (x + 5));
}
