enum ComparisonResult {
  RightOrder = -1,
  WrongOrder = 1,
  Inconclusive = 0,
}

interface NestedArray<T> extends Array<T | NestedArray<T>> {}
type NumOrNestedArray = number | NestedArray<number>;
type WrapResult = {
  LItem: NestedArray<number>;
  RItem: NestedArray<number>;
};

const parseLine = (line: string): NestedArray<number> =>
  parseLineInner(line.substring(1, line.length - 1));

const parseLineInner = (line: string): NestedArray<number> => {
  const output: NestedArray<number> = [];

  let i = 0;
  while (i < line.length) {
    if (line[i] === "[") {
      // recursive case
      let j = i + 1;
      let openCt = 0; // handle nested brackets

      while (line[j] !== "]" || openCt !== 0) {
        if (line[j] === "[") openCt++;
        if (line[j] === "]") openCt--;
        j++;
      }

      output.push(parseLineInner(line.substring(i + 1, j)));
      i = j + 1;
    } else {
      // it's a number
      const start = i;
      while (i < line.length && line[i] !== ",") {
        i++;
      }
      output.push(parseInt(line.substring(start, i), 10));
    }

    if (line[i] === ",") i++;
  }

  return output;
};

const wrapInt = (
  left: NumOrNestedArray,
  right: NumOrNestedArray
): WrapResult => {
  if (!Array.isArray(left)) {
    left = [left];
  }

  if (!Array.isArray(right)) {
    right = [right];
  }

  return { LItem: left, RItem: right };
};

const comparePackets = (left: number, right: number): ComparisonResult => {
  if (left < right) return ComparisonResult.RightOrder;
  if (left > right) return ComparisonResult.WrongOrder;
  return ComparisonResult.Inconclusive;
};

const compareSignals = (
  left: NestedArray<number>,
  right: NestedArray<number>
): ComparisonResult => {
  if (right.length === 0 && left.length === 0)
    return ComparisonResult.Inconclusive;
  if (right.length === 0) return ComparisonResult.WrongOrder;
  if (left.length === 0) return ComparisonResult.RightOrder;

  let result: ComparisonResult;
  if (typeof left[0] === "number" && typeof right[0] === "number") {
    result = comparePackets(left[0], right[0]);
  } else {
    const { LItem, RItem } = wrapInt(left[0], right[0]);
    result = compareSignals(LItem, RItem);
  }

  if (result !== ComparisonResult.Inconclusive) {
    return result;
  }

  return compareSignals(left.slice(1), right.slice(1));
};

export const d13p1 = (input: string[]): number => {
  const signals = input
    .filter((line) => line !== "")
    .map((line) => parseLine(line));

  const inOrder: number[] = [];

  for (let i = 0; i < signals.length; i += 2) {
    const result = compareSignals(signals[i], signals[i + 1]);
    if (result === ComparisonResult.RightOrder) {
      inOrder.push(Math.floor(i / 2) + 1);
    }
  }

  return inOrder.reduce((acc, val) => acc + val, 0);
};

export const d13p2 = (input: string[]): number => {
  const signals: Array<NestedArray<number>> = input
    .filter((line) => line !== "")
    .map((line) => parseLine(line))
    .concat([[[2]], [[6]]])
    .sort((a, b) => compareSignals(a, b));

  const l =
    signals.findIndex(
      (val) => compareSignals(val, [[2]]) === ComparisonResult.Inconclusive
    ) + 1;
  const r =
    signals.findIndex(
      (val) => compareSignals(val, [[6]]) === ComparisonResult.Inconclusive
    ) + 1;

  return l * r;
};
