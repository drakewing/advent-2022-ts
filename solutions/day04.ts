interface Range {
  lower: number;
  upper: number;
}

interface RangePair {
  left: Range;
  right: Range;
}

const splitRanges = (input: string): RangePair => {
  const parts = input.split(",");
  const ranges = parts.map((part) => {
    const bounds = part.split("-");
    return { lower: parseInt(bounds[0], 10), upper: parseInt(bounds[1], 10) };
  });

  return { left: ranges[0], right: ranges[1] };
};

// does a fully contain b?
const isFullyContained = (a: Range, b: Range): boolean =>
  a.lower <= b.lower && a.upper >= b.upper;

const isOverlap = (a: Range, b: Range): boolean =>
  (a.lower <= b.upper && a.lower >= b.upper) ||
  (a.upper >= b.lower && a.upper <= b.upper);

export const d04p1 = (input: string[]): number => {
  const pairs = input.map((str) => splitRanges(str));
  return pairs.filter(
    (pair) =>
      isFullyContained(pair.left, pair.right) ||
      isFullyContained(pair.right, pair.left)
  ).length;
};

export const d04p2 = (input: string[]): number => {
  const pairs = input.map((str) => splitRanges(str));
  return pairs.filter(
    (pair) =>
      isOverlap(pair.left, pair.right) || isOverlap(pair.right, pair.left)
  ).length;
};
