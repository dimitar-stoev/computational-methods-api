import Decimal from "decimal.js";

Decimal.set({ precision: 10 });

export function leastSquaresPolynomial(
  points: [number, number][],
  degree: number,
  precision: number = 4,
) {
  const n = points.length;
  const xArr = points.map(([x]) => new Decimal(x));
  const yArr = points.map(([, y]) => new Decimal(y));

  const X: Decimal[][] = Array(degree + 1)
    .fill(0)
    .map(() => Array(degree + 1).fill(0));
  for (let i = 0; i <= degree; i++) {
    for (let j = 0; j <= degree; j++) {
      X[i][j] = xArr.reduce(
        (sum, xk) => sum.plus(xk.pow(i + j)),
        new Decimal(0),
      );
    }
  }

  const yVec: Decimal[] = Array(degree + 1).fill(0);
  for (let i = 0; i <= degree; i++) {
    yVec[i] = points.reduce(
      (sum, [, yk], k) => sum.plus(yArr[k].mul(xArr[k].pow(i))),
      new Decimal(0),
    );
  }

  const coeffs = solveLinearSystem(X, yVec);

  const terms: string[] = [];
  coeffs.forEach((coef, i) => {
    if (coef.abs().lessThan(0.0001)) return;
    const coefStr = coef.toFixed(precision).replace(/\.?0+$/, "");
    if (i === 0) {
      terms.push(coefStr);
    } else if (i === 1) {
      terms.push(`${coefStr}*x`);
    } else {
      terms.push(`${coefStr}*x^${i}`);
    }
  });

  const polynomial = terms.join(" + ") || "0";

  console.log(`Polynomial of degree ${degree}: `);
  console.log(`Coefficients: [${coeffs.join(", ")}]`);
  console.log(`Polynomial: P_${degree}(x) = ${polynomial}`);

  return {
    degree,
    coefficients: coeffs.map((c) => c.toFixed(precision)),
    polynomial,
  };
}

function solveLinearSystem(matrix: Decimal[][], vector: Decimal[]): Decimal[] {
  const n = matrix.length;
  const augmented: Decimal[][] = matrix.map((row, i) =>
    [...row, vector[i]].map((x) => new Decimal(x)),
  );

  for (let i = 0; i < n; i++) {
    let pivot = augmented[i][i];
    if (pivot.abs().lessThan(0.0001)) throw new Error("Singular matrix");
    for (let j = i + 1; j < n; j++) {
      const factor = augmented[j][i].div(pivot);
      for (let k = i; k <= n; k++) {
        augmented[j][k] = augmented[j][k].minus(factor.mul(augmented[i][k]));
      }
    }
  }

  const result: Decimal[] = Array(n).fill(new Decimal(0));
  for (let i = n - 1; i >= 0; i--) {
    let sum = new Decimal(0);
    for (let j = i + 1; j < n; j++) {
      sum = sum.plus(augmented[i][j].mul(result[j]));
    }
    result[i] = augmented[i][n].minus(sum).div(augmented[i][i]);
  }

  return result;
}
