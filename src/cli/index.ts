#!/usr/bin/env node
import {Command} from "commander";
import {bisection} from "../algorithms/bisection";

const program = new Command();

program
    .command('bisection')
    .description('Find root of an equation in [a, b] using bisection method')
    .argument('<equation>', 'Mathematical equation (e.g., "x^3 - 3*x^2 + 6*x - 1")')
    .argument('<interval>', 'Comma-separated a, b, epsilon (e.g., 0,1,0.0001)')
    .action((equation, interval) => {
        const [a, b, epsilon] = interval.split(',').map(Number);
        try {
            const result = bisection(equation, a, b, epsilon);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program.parse(process.argv);

if (process.argv.length < 3) {
    program.outputHelp();
    process.exit(1);
}
