import { expect, test } from "@jest/globals";

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
import { d12p1, d12p2 } from "./solutions/day12";
import { d13p1, d13p2 } from "./solutions/day13";
import { d14p1, d14p2 } from "./solutions/day14";
import { d16p1, d16p2 } from "./solutions/day16";

test("d01p1", () => expect(d01p1(prepInput("input/day01.txt"))).toBe(66616));
test("d01p2", () => expect(d01p2(prepInput("input/day01.txt"))).toBe(199172));
test("d02p1", () => expect(d02p1(prepInput("input/day02.txt"))).toBe(10624));
test("d02p2", () => expect(d02p2(prepInput("input/day02.txt"))).toBe(14060));
test("d03p1", () => expect(d03p1(prepInput("input/day03.txt"))).toBe(7863));
test("d03p2", () => expect(d03p2(prepInput("input/day03.txt"))).toBe(2488));
test("d04p1", () => expect(d04p1(prepInput("input/day04.txt"))).toBe(507));
test("d04p2", () => expect(d04p2(prepInput("input/day04.txt"))).toBe(897));
// test("d05p1", () =>
//   expect(d05p1(prepInput("input/day05.txt"))).toBe("SPFMVDTZT"));
// test("d05p2", () =>
//   expect(d05p2(prepInput("input/day05.txt"))).toBe("ZFSJBPRFP"));
test("d06p1", () => expect(d06p1(prepInput("input/day06.txt")[0])).toBe(1275));
test("d06p2", () => expect(d06p2(prepInput("input/day06.txt")[0])).toBe(3605));
test("d07p1", () => expect(d07p1(prepInput("input/day07.txt"))).toBe(1118405));
test("d07p2", () => expect(d07p2(prepInput("input/day07.txt"))).toBe(12545514));
test("d08p1", () => expect(d08p1(prepInput("input/day08.txt"))).toBe(1835));
test("d08p2", () => expect(d08p2(prepInput("input/day08.txt"))).toBe(263670));
test("d11p1", () => expect(d11p1(prepInput("input/day11.txt"))).toBe(78678));
test("d11p2", () =>
  expect(d11p2(prepInput("input/day11.txt"))).toBe(15333249714));
test("d12p1", () => expect(d12p1(prepInput("input/day12.txt"))).toBe(408));
test("d12p2", () => expect(d12p2(prepInput("input/day12.txt"))).toBe(399));
test("d13p1", () => expect(d13p1(prepInput("input/day13.txt"))).toBe(5393));
test("d13p2", () => expect(d13p2(prepInput("input/day13.txt"))).toBe(26712));
test("d14p1", () => expect(d14p1(prepInput("input/day14.txt"))).toBe(1016));
test("d14p2", () => expect(d14p2(prepInput("input/day14.txt"))).toBe(25402));
test("d16p1", () => expect(d16p1(prepInput("input/day16.txt"))).toBe(1737));
// test("d16p2", () => expect(d16p2(prepInput("input/day16.txt"))).toBe());
