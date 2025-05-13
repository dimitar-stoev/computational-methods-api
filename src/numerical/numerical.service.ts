import {Injectable} from "@nestjs/common";
import {bisection} from "../algorithms/bisection";
import {EquationResponse} from "./models/equations";
import {chord} from "../algorithms/chord";
import {lagrangeInterpolation} from "../algorithms/lagrange";
import {newtonInterpolation} from "../algorithms/newton";
import {leastSquaresPolynomial} from "../algorithms/least-square";
import {quadraticInterpolation} from "../algorithms/quadratic-interpolation";
import {trapezoidalIntegration} from "../algorithms/trapezoidal-Integration";
import {simpsonsRule} from "../algorithms/simpson-rule";

@Injectable()
export class NumericalService {
    bisectionEquation(
        equation: string,
        lowerBound: number,
        upperBound: number,
        epsilon: number,
    ): EquationResponse {
        const response = bisection(equation, lowerBound, upperBound, epsilon);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    chordEquation(
        equation: string,
        lowerBound: number,
        upperBound: number,
        epsilon: number,
    ): EquationResponse {
        const response = chord(equation, lowerBound, upperBound, epsilon);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    secantEquation(
        equation: string,
        lowerBound: number,
        upperBound: number,
        epsilon: number,
    ): EquationResponse {
        const response = bisection(equation, lowerBound, upperBound, epsilon);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    lagrangeEquation(
        points: [number, number][],
        xValue: number,
        digits: number = 4,
        trueFunction: boolean = false,
    ) {
        const response = lagrangeInterpolation(
            points,
            xValue,
            digits,
            trueFunction,
        );
        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    newtonEquation(
        points: [number, number][],
        xValue: number,
        digits: number = 4,
        actualFunction: boolean = false,
    ) {
        const response = newtonInterpolation(
            points,
            xValue,
            digits,
            actualFunction,
        );
        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    leastSquare(points: [number, number][], degree: number) {
        const response = leastSquaresPolynomial(points, degree);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    quadraticInterpolation(points: [number, number][], xStar: number) {
        const response = quadraticInterpolation(points, xStar, 4);
        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    trapezoidalIntegration(
        equation: string,
        lowerBound: number,
        upperBound: number,
    ) {
        const response = trapezoidalIntegration(equation, lowerBound, upperBound);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }

    simpsonIntegration(
        equation: string,
        lowerBound: number,
        upperBound: number,
        n: number,
    ) {
        const response = simpsonsRule(equation, lowerBound, upperBound, n);

        if (response === null) {
            return {
                result: "No solution found",
                table: [],
            };
        }

        if (typeof response === "string") {
            return {
                result: response,
                table: [],
            };
        }

        return response;
    }
}
