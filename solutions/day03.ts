interface Ruck {
  compartmentA: string[];
  compartmentB: string[];
}

const findCommonItems = (compartments: string[][]): Set<string> =>
  compartments
    .map((c) => new Set(c))
    .reduce(
      (common, cur) => new Set([...common].filter((item) => cur.has(item)))
    );

const buildRucks = (input: string[]): Ruck[] => {
  const buildRuck = (line: string): Ruck => {
    const mid = line.length / 2;
    return {
      compartmentA: line.substring(0, mid).split(""),
      compartmentB: line.substring(mid).split(""),
    };
  };

  return input.map((line) => buildRuck(line));
};

// assumes 1 char
const itemToPriority = (item: string): number => {
  const val = item.charCodeAt(0);
  if (val >= 97 && val <= 122) {
    return val - 96;
  }

  return val - 64 + 26;
};

export const d03p1 = (input: string[]): number =>
  buildRucks(input).reduce((acc, ruck) => {
    const item = Array.from(
      findCommonItems([ruck.compartmentA, ruck.compartmentB])
    )[0];
    return acc + itemToPriority(item);
  }, 0);

export const d03p2 = (input: string[]): number => {
  let sum = 0;
  for (let i = 0; i < input.length; i += 3) {
    const item = Array.from(
      findCommonItems([
        input[i].split(""),
        input[i + 1].split(""),
        input[i + 2].split(""),
      ])
    )[0];
    sum += itemToPriority(item);
  }

  return sum;
};
