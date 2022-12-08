interface range {
  lower: number;
  upper: number;
}

interface rangePair {
  left: range;
  right: range;
}

const splitRanges = (input: string): rangePair => {
  const parts = input.split(",");
  const ranges: range[] = [];

  for (const part of parts) {
    const bounds = part.split("-");
    ranges.push({ lower: parseInt(bounds[0]), upper: parseInt(bounds[1]) });
  }

  return { left: ranges[0], right: ranges[1] }
};

// does a fully contain b?
const isFullyContained = (a: range, b: range): boolean => {
  return a.lower <= b.lower && a.upper >= b.upper;
};

const isOverlap = (a: range, b: range): boolean => {
  return ((a.lower <= b.upper && a.lower >= b.upper) || (a.upper >= b.lower && a.upper <= b.upper));
};

export const d04p1 = (input: string[]): number => {
  const pairs = input.map(str => splitRanges(str));
  let count = 0;

  for (const pair of pairs) {
    if (isFullyContained(pair.left, pair.right) || isFullyContained(pair.right, pair.left)) {
      count++;
    }
  }

  return count;
};

export const d04p2 = (input: string[]): number => {
  const pairs = input.map(str => splitRanges(str));
  let count = 0;

  for (const pair of pairs) {
    if (isOverlap(pair.left, pair.right) || isOverlap(pair.right, pair.left)) {
      count++;
    }
  }

  return count;
}

