interface ruck {
  compartmentA: string[];
  compartmentB: string[];
}

const findCommonItem = (r: ruck): string => {
  const set = new Set(r.compartmentA);

  for (const item of r.compartmentB) {
    if (set.has(item)) {
      return item;
    }
  }

  return "";
}

const buildRucks = (input: string[]): ruck[] => {
  const buildRuck = (input: string): ruck => {
    const mid = input.length / 2;
    return {
      compartmentA: input.substring(0, mid).split(""),
      compartmentB: input.substring(mid).split(""),
    }
  }

  const rucks: ruck[] = [];
  for (const line of input) {
    rucks.push(buildRuck(line));
  }

  return rucks;
}

// assumes 1 char
const itemToPriority = (item: string): number => {
  const val = item.charCodeAt(0);
  if (val >= 97 && val <= 122) {
    return val - 96;
  }

  return val - 64 + 26;
}

export const d03p1 = (input: string[]): number => {
  const rucks = buildRucks(input);

  let sum = 0;
  for (const r of rucks) {
    const item = findCommonItem(r);
    sum += itemToPriority(item);
  }

  return sum;
}

export const d03p2 = (input: string[]): number => {
  return 0;
}
