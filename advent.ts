import { prepInput } from "./solutions/helpers";
import { d01p1, d01p2 } from "./solutions/day01";
import { d02p1, d02p2 } from "./solutions/day02";
import { d03p1, d03p2 } from "./solutions/day03";
import { d04p1, d04p2 } from "./solutions/day04";
// import { d05p1, d05p2 } from "./solutions/day05";
import { d06p1, d06p2 } from "./solutions/day06";
import { d07p1, d07p2 } from "./solutions/day07";
import { d08p1, d08p2 } from "./solutions/day08";
import { d11p1, d11p2 } from "./solutions/day11";

console.log(`day 01, part 1: ${d01p1(prepInput("input/day01.txt"))}`);
console.log(`day 01, part 2: ${d01p2(prepInput("input/day01.txt"))}`);
console.log(`day 02, part 1: ${d02p1(prepInput("input/day02.txt"))}`);
console.log(`day 02, part 2: ${d02p2(prepInput("input/day02.txt"))}`);
console.log(`day 03, part 1: ${d03p1(prepInput("input/day03.txt"))}`);
console.log(`day 03, part 2: ${d03p2(prepInput("input/day03.txt"))}`);
console.log(`day 04, part 1: ${d04p1(prepInput("input/day04.txt"))}`);
console.log(`day 04, part 2: ${d04p2(prepInput("input/day04.txt"))}`);
// console.log(`day 05, part 1: ${d05p1(prepInput("input/day05.txt"))}`);
// console.log(`day 05, part 2: ${d05p2(prepInput("input/day05.txt"))}`);
console.log(`day 06, part 1: ${d06p1(prepInput("input/day06.txt")[0])}`);
console.log(`day 06, part 2: ${d06p2(prepInput("input/day06.txt")[0])}`);
console.log(`day 07, part 1: ${d07p1(prepInput("input/day07.txt"))}`);
console.log(`day 07, part 2: ${d07p2(prepInput("input/day07.txt"))}`);
console.log(`day 08, part 1: ${d08p1(prepInput("input/day08.txt"))}`);
console.log(`day 08, part 2: ${d08p2(prepInput("input/day08.txt"))}`);
console.log(`day 11, part 1: ${d11p1(prepInput("input/day11.txt"))}`);
console.log(`day 11, part 2: ${d11p2(prepInput("input/day11.txt"))}`);
