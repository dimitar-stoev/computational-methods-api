import {Injectable} from "@nestjs/common";
import {bisection} from "../algorithms/bisection";
import {BisectionEquationResponse} from "./models/equations";
import {chord} from "../algorithms/chord";

@Injectable()
export class NumericalService {
    bisectionEquation(
        equation: string,
        lowerBound: number,
        upperBound: number,
        epsilon: number,
    ): BisectionEquationResponse {
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
    ): BisectionEquationResponse {
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
}
