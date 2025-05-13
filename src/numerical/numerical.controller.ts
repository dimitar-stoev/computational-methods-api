import {Body, Controller, Post} from "@nestjs/common";
import {NumericalService} from "./numerical.service";
import {EquationRequest, EquationResponse} from "./models/equations";

@Controller("numerical")
export class NumericalController {
    constructor(private readonly numericalService: NumericalService) {
    }

    @Post("bisection")
    bisection(
        @Body()
        body: EquationRequest,
    ): EquationResponse {
        return this.numericalService.bisectionEquation(
            body.equation,
            body.lowerBound,
            body.upperBound,
            body.epsilon,
        );
    }

    @Post("chord")
    chord(
        @Body()
        body: EquationRequest,
    ): EquationResponse {
        return this.numericalService.chordEquation(
            body.equation,
            body.lowerBound,
            body.upperBound,
            body.epsilon,
        );
    }

    @Post("secant")
    secant(
        @Body()
        body: EquationRequest,
    ): EquationResponse {
        return this.numericalService.secantEquation(
            body.equation,
            body.lowerBound,
            body.upperBound,
            body.epsilon,
        );
    }

    @Post("lagrange")
    lagrange(
        @Body()
        body: {
            points: [number, number][];
            xValue: number;
            decimalPlaces: number;
            trueFunction: boolean;
        },
    ) {
        return this.numericalService.lagrangeEquation(
            body.points,
            body.xValue,
            body.decimalPlaces,
            body.trueFunction,
        );
    }

    @Post("newton")
    newton(
        @Body()
        body: {
            points: [number, number][];
            xValue: number;
            decimalPlaces: number;
            actualFunction: boolean;
        },
    ) {
        return this.numericalService.newtonEquation(
            body.points,
            body.xValue,
            body.decimalPlaces,
            body.actualFunction,
        );
    }

    @Post("least-square")
    leastSquare(
        @Body()
        body: {
            points: [number, number][];
            degree: number;
        },
    ) {
        return this.numericalService.leastSquare(body.points, body.degree);
    }

    @Post("quadratic-interpolation")
    quadraticInterpolation(
        @Body()
        body: {
            points: [number, number][];
            xStar: number;
        },
    ) {
        return this.numericalService.quadraticInterpolation(
            body.points,
            body.xStar,
        );
    }

    @Post("trapezoidal-integration")
    trapezoidalIntegration(
        @Body()
        body: {
            equation: string;
            lowerBound: number;
            upperBound: number;
        },
    ) {
        return this.numericalService.trapezoidalIntegration(
            body.equation,
            body.lowerBound,
            body.upperBound,
        );
    }

    @Post("simpson-integration")
    simpsonIntegration(
        @Body()
        body: {
            equation: string;
            lowerBound: number;
            upperBound: number;
            n: number;
        },
    ) {
        return this.numericalService.simpsonIntegration(
            body.equation,
            body.lowerBound,
            body.upperBound,
            body.n,
        );
    }
}
