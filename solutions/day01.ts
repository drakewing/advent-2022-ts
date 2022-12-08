const replaceIfLarger = (nums: number[], val: number): number[] => {
  const output = nums.concat([val]);
  output.sort((a, b) => b - a);
  return output.slice(0, output.length - 1);
};

const findNLargest = (input: string[], n: number): number[] => {
  let largest: number[] = Array(n).fill(-1);
  let start = 0;

  for (let i = 0; i < input.length; ++i) {
    if (input[i] === "") {
      const nums = input.slice(start, i).map((s) => parseInt(s, 10));
      const calCt = nums.reduce((acc, num) => acc + num);
      largest = replaceIfLarger(largest, calCt);
      start = i + 1;
    }
  }

  return largest;
};

export const d01p1 = (input: string[]): number =>
  findNLargest(input, 1).reduce((acc, cur) => acc + cur);

export const d01p2 = (input: string[]): number =>
  findNLargest(input, 3).reduce((acc, cur) => acc + cur);
