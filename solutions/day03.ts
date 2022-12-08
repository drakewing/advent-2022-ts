interface ruck {
  compartmentA: string[];
  compartmentB: string[];
}

// assume len(compartments) > 1, with only 1 common item.
const findCommonItem = (compartments: string[][]): string => {
  const sets = compartments
    .slice(0, compartments.length - 1)
    .map((c) => new Set(c));

  const last = compartments[compartments.length - 1];
  for (const item of last) {
    let failed = false;
    for (const set of sets) {
      if (!set.has(item)) {
        failed = true;
      }
    }

    if (!failed) {
      return item;
    }
  }

  return "";
};

const buildRucks = (input: string[]): ruck[] => {
  const buildRuck = (input: string): ruck => {
    const mid = input.length / 2;
    return {
      compartmentA: input.substring(0, mid).split(""),
      compartmentB: input.substring(mid).split(""),
    };
  };

  const rucks: ruck[] = [];
  for (const line of input) {
    rucks.push(buildRuck(line));
  }

  return rucks;
};

// assumes 1 char
const itemToPriority = (item: string): number => {
  const val = item.charCodeAt(0);
  if (val >= 97 && val <= 122) {
    return val - 96;
  }

  return val - 64 + 26;
};

export const d03p1 = (input: string[]): number => {
  const rucks = buildRucks(input);

  let sum = 0;
  for (const r of rucks) {
    const item = findCommonItem([r.compartmentA, r.compartmentB]);
    sum += itemToPriority(item);
  }

  return sum;
};

export const d03p2 = (input: string[]): number => {
  let sum = 0;
  for (let i = 0; i < input.length; i = i + 3) {
    const item = findCommonItem([
      input[i].split(""),
      input[i + 1].split(""),
      input[i + 2].split(""),
    ]);
    sum += itemToPriority(item);
  }

  return sum;
};
