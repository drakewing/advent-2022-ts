import { readFileSync } from "fs";

// split input file into array of lines
export const prepInput = (path: string): string[] =>
  readFileSync(path).toString("utf-8").split("\n").slice(0, -1);
