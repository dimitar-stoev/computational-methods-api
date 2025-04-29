import { Body, Controller, Post } from "@nestjs/common";
import { NumericalService } from "./numerical.service";
import {
  BisectionEquationRequest,
  BisectionEquationResponse,
} from "./models/equations";

@Controller("numerical")
export class NumericalController {
  constructor(private readonly numericalService: NumericalService) {}

  @Post("bisection")
  bisection(
    @Body()
    body: BisectionEquationRequest,
  ): BisectionEquationResponse {
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
        body: BisectionEquationRequest,
    ): BisectionEquationResponse {
        return this.numericalService.chordEquation(
        body.equation,
        body.lowerBound,
        body.upperBound,
        body.epsilon,
        );
    }
}
