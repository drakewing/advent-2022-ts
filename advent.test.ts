import { expect, test } from "@jest/globals";

import { prepInput } from "./solutions/helpers";
import { d01p1, d01p2 } from "./solutions/day01";
import { d06p1, d06p2 } from "./solutions/day06";


test('advent solutions', () => {
  expect(d01p1(prepInput("input/day01.txt"))).toBe(66616);
  expect(d01p2(prepInput("input/day01.txt"))).toBe(199172);
  expect(d06p1(prepInput("input/day06.txt")[0])).toBe(1275);
  expect(d06p2(prepInput("input/day06.txt")[0])).toBe(3605);
});
