import { readFileSync } from "fs";

export const sumNumArray = (nums: number[]): number => {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }

  return sum;
}

// assumes all strings are valid. only converts [start, end) if given. no boundary checking.
export const convStrToNum = (input: string[], start?: number, end?: number): number[] => {
  if (start === undefined || end === undefined) {
    start = 0;
    end = input.length;
  }

  const output: number[] = [];
  for (let i = start; i < end; ++i) {
    output.push(Number(input[i]));
  }

  return output;
}

// split input file into array of lines
export const prepInput = (path: string): string[] => {
  return readFileSync(path)
    .toString('utf-8')
    .split("\n")
    .slice(0, -1);
};
