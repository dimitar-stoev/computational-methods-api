#!/usr/bin/env node
import { Command } from "commander";
import { solvePolynomial } from "../algorithms/polynomial";
import { solveDifferential } from "../algorithms/differential";

const program = new Command();

program
  .command("polynomial")
  .description("Solve a polynomial equation with given coefficients")
  .argument("<coeffs>", "Comma-separated coefficients (e.g., 1,2,-3)")
  .action((coeffs: string) => {
    const coefficients: number[] = coeffs.split(",").map(Number);
    const result = solvePolynomial(coefficients);
    console.log("Result:", result);
  });

program
  .command("differential")
  .description("Solve a differential equation with initial condition and step")
  .argument(
    "<params>",
    "Comma-separated parameters (e.g., 1,0.1 for initial value and step)",
  )
  .action((params: string) => {
    const paramArray: number[] = params.split(",").map(Number);
    const result = solveDifferential(paramArray);
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
  process.exit(1);
}
