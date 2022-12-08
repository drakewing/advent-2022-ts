const soln = (input: string, len: number): number => {
  for (let i = len - 1; i < input.length; i++) {
    if (new Set(input.slice(i - len + 1, i + 1)).size === len) {
      return i + 1;
    }
  }
  return -1;
};

export const d06p1 = (input: string): number => soln(input, 4);

export const d06p2 = (input: string): number => soln(input, 14);
