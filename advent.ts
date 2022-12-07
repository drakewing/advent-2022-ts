import { prepInput } from "./solutions/helpers";
import { d01p1, d01p2 } from "./solutions/day01";
import { d06p1, d06p2 } from "./solutions/day06";


console.log(`day 01, part 1: ${d01p1(prepInput("input/day01.txt"))}`);
console.log(`day 01, part 2: ${d01p2(prepInput("input/day01.txt"))}`);
console.log(`day 06, part 1: ${d06p1(prepInput("input/day06.txt")[0])}`);
console.log(`day 06, part 2: ${d06p2(prepInput("input/day06.txt")[0])}`);
