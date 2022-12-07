import { expect, test } from "@jest/globals";

import { prepInput } from "./solutions/helpers";
import { d01p1, d01p2 } from "./solutions/day01";
import { d02p1, d02p2 } from "./solutions/day02";
import { d03p1, d03p2 } from "./solutions/day03";
// import { d04p1, d04p2 } from "./solutions/day04";
// import { d05p1, d05p2 } from "./solutions/day05";
import { d06p1, d06p2 } from "./solutions/day06";
import { d07p1, d07p2 } from "./solutions/day07";


test('advent solutions', () => {
  expect(d01p1(prepInput("input/day01.txt"))).toBe(66616);
  expect(d01p2(prepInput("input/day01.txt"))).toBe(199172);
  expect(d02p1(prepInput("input/day02.txt"))).toBe(10624);
  expect(d02p2(prepInput("input/day02.txt"))).toBe(14060);
  expect(d03p1(prepInput("input/day03.txt"))).toBe(7863);
  expect(d03p2(prepInput("input/day03.txt"))).toBe(2488);
  // expect(d04p1(prepInput("input/day04.txt"))).toBe(507);
  // expect(d04p2(prepInput("input/day04.txt"))).toBe(897);
  // expect(d05p1(prepInput("input/day05.txt"))).toBe("SPFMVDTZT");
  // expect(d05p2(prepInput("input/day05.txt"))).toBe("ZFSJBPRFP");
  expect(d06p1(prepInput("input/day06.txt")[0])).toBe(1275);
  expect(d06p2(prepInput("input/day06.txt")[0])).toBe(3605);
  expect(d07p1(prepInput("input/day07.txt"))).toBe(1118405);
  expect(d07p2(prepInput("input/day07.txt"))).toBe(12545514);
});
