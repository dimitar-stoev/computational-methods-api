import Decimal from 'decimal.js';

Decimal.set({ precision: 10 });

interface PolynomialResult {
    degree: number;
    coefficients: string[];
    polynomial: string;
}

export function leastSquaresPolynomial(
    points: [number, number][],
    degree: number,
    precision: number = 4
) {
    const n = points.length;
    const xArr = points.map(([x]) => new Decimal(x));
    const yArr = points.map(([, y]) => new Decimal(y));

    // Build X matrix (sums of x_i powers)
    const X: Decimal[][] = Array(degree + 1).fill(0).map(() => Array(degree + 1).fill(0));
    for (let i = 0; i <= degree; i++) {
        for (let j = 0; j <= degree; j++) {
            X[i][j] = xArr.reduce((sum, xk) => sum.plus(xk.pow(i + j)), new Decimal(0));
        }
    }

    // Build y vector (sums involving y_i)
    const yVec: Decimal[] = Array(degree + 1).fill(0);
    for (let i = 0; i <= degree; i++) {
        yVec[i] = points.reduce((sum, [, yk], k) => sum.plus(yArr[k].mul(xArr[k].pow(i))), new Decimal(0));
    }

    // Solve X * A = y using Gaussian elimination
    const coeffs = solveLinearSystem(X, yVec);

    // Format polynomial
    const terms: string[] = [];
    coeffs.forEach((coef, i) => {
        if (coef.abs().lessThan(0.0001)) return;
        const coefStr = coef.toFixed(precision).replace(/\.?0+$/, '');
        if (i === 0) {
            terms.push(coefStr);
        } else if (i === 1) {
            terms.push(`${coefStr}*x`);
        } else {
            terms.push(`${coefStr}*x^${i}`);
        }
    });

    const polynomial = terms.join(' + ') || '0';

    // Output results
    console.log(`Polynomial of degree ${degree}: `);
    console.log(`Coefficients: [${coeffs.join(', ')}]`);
    console.log(`Polynomial: P_${degree}(x) = ${polynomial}`);

    return {
        degree,
        coefficients: coeffs.map(c => c.toFixed(precision)),
        polynomial
    };
}

/**
 * Solves linear system using Gaussian elimination.
 * @param matrix - Coefficient matrix X.
 * @param vector - Right-hand side vector y.
 * @returns Array of coefficients.
 */
function solveLinearSystem(matrix: Decimal[][], vector: Decimal[]): Decimal[] {
    const n = matrix.length;
    const augmented: Decimal[][] = matrix.map((row, i) =>
        [...row, vector[i]].map(x => new Decimal(x))
    );

    // Forward elimination
    for (let i = 0; i < n; i++) {
        let pivot = augmented[i][i];
        if (pivot.abs().lessThan(0.0001)) throw new Error('Singular matrix');
        for (let j = i + 1; j < n; j++) {
            const factor = augmented[j][i].div(pivot);
            for (let k = i; k <= n; k++) {
                augmented[j][k] = augmented[j][k].minus(factor.mul(augmented[i][k]));
            }
        }
    }

    // Back substitution
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

/**
 * Main function to compute polynomials for the given data.
 */
function main(): void {
    const points: [number, number][] = [
        [-2.0, 8.74], [-1.5, -31.72], [-1.0, -1.55], [-0.5, -0.136],
        [0.0, 0.0], [0.5, 0.136], [1.0, 1.55], [1.5, 31.72], [2.0, -8.74]
    ];

    // Compute polynomials for degrees 1 and 3
    const resultM1 = leastSquaresPolynomial(points, 1);
    const resultM3 = leastSquaresPolynomial(points, 3);

}

// Run the program
main();