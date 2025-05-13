import Decimal from "decimal.js";

Decimal.set({ precision: 10 });

export function quadraticInterpolation(
  points: [number, number][],
  xStar: number,
  precision: number = 4,
) {
  const sortedPoints = points
    .map((point) => ({ point, distance: Math.abs(point[0] - xStar) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((item) => item.point)
    .sort((a, b) => a[0] - b[0]);

  const n = sortedPoints.length; // Should be 3 for quadratic
  const xArr = sortedPoints.map(([x]) => new Decimal(x));
  const yArr = sortedPoints.map(([, y]) => new Decimal(y));

  const dividedDifferences = [...yArr];
  for (let i = 1; i < n; i++) {
    for (let j = n - 1; j >= i; j--) {
      dividedDifferences[j] = dividedDifferences[j]
        .minus(dividedDifferences[j - 1])
        .div(xArr[j].minus(xArr[j - i]));
    }
  }

  // Evaluate polynomial at xStar
  const X = new Decimal(xStar);
  let result = dividedDifferences[0];
  let product = new Decimal(1);
  for (let i = 1; i < n; i++) {
    product = product.mul(X.minus(xArr[i - 1]));
    result = result.plus(dividedDifferences[i].mul(product));
  }

  console.log(`Interpolated value at x = ${xStar}:`);
  console.log(`Selected points: ${JSON.stringify(sortedPoints)}`);
  console.log(`f(${xStar}) = ${result.toFixed(precision)}`);

  return {
    value: result.toFixed(precision),
    xStar,
    selectedPoints: sortedPoints,
  };
}
