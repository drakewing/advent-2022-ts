import { convStrToNum, sumNumArray } from "./helpers";

export const d01p1 = (input: string[]): number => {
    return sumNumArray(findNLargest(input, 1));
}

export const d01p2 = (input: string[]): number => {
    return sumNumArray(findNLargest(input, 3));
}

const findNLargest = (input: string[], n: number): number[] => {
    let largest: number[] = [];
    for (let i = 0; i < n; ++i) {
        largest.push(-1);
    }

    let start = 0;

    for (let i = 0; i < input.length; ++i) {
        if (input[i] === "") {
            const nums = convStrToNum(input, start, i);
            start = i + 1;

            const calCt = sumNumArray(nums);
            replaceIfLarger(largest, calCt);
        }
    }

    return largest;
}

// assumes nums is sorted in decreasing order. modifies array in-place.
const replaceIfLarger = (nums: number[], val: number) => {
    for (let i = 0; i < nums.length; ++i) {
        if (val > nums[i]) {
            const temp = nums[i];
            nums[i] = val;
            val = temp;
        }
    }
}
