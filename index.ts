import { readFileSync } from "fs";

import { d06p1, d06p2 } from "./day06"

// split input file into array of lines
const prepInput = (path: string): string[] => {
    return readFileSync(path)
        .toString('utf-8')
        .split("\n")
        .slice(0, -1);
};

console.log(`day 06, part 1: ${d06p1(prepInput("input/day06.txt")[0])}`);
console.log(`day 06, part 2: ${d06p2(prepInput("input/day06.txt")[0])}`);
