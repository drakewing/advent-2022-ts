// represent the tallest tree *in that direction*. for "west" (x is the tree):
//      N
// <- W x E
//      S
interface maxHeightByDir {
  north: number;
  east: number;
  south: number;
  west: number;
}

const buildGrid = (input: string[]): number[][] => {
  const output: number[][] = [];
  for (const line of input) {
    output.push(line.split("").map((s) => parseInt(s)));
  }
  return output;
};

const buildEmptyConstraintGrid = (grid: number[][]): maxHeightByDir[][] => {
  const output: maxHeightByDir[][] = [];
  for (const row of grid) {
    output.push(
      row.map((cell) => ({ north: -1, east: -1, south: -1, west: -1 }))
    );
  }
  return output;
};

const fillConstraints = (nums: number[][], constraints: maxHeightByDir[][]) => {
  // west->east
  for (let i = 0; i < nums.length; ++i) {
    let max = -1;
    for (let j = 0; j < nums[i].length; ++j) {
      constraints[i][j].west = max;
      max = Math.max(max, nums[i][j]);
    }
  }

  // east->west
  for (let i = 0; i < nums.length; ++i) {
    let max = -1;
    for (let j = nums[i].length - 1; j >= 0; --j) {
      constraints[i][j].east = max;
      max = Math.max(max, nums[i][j]);
    }
  }

  // north->south
  for (let i = 0; i < nums[0].length; ++i) {
    let max = -1;
    for (let j = 0; j < nums.length; ++j) {
      constraints[j][i].north = max;
      max = Math.max(max, nums[j][i]);
    }
  }

  // south->north
  for (let i = 0; i < nums[0].length; ++i) {
    let max = -1;
    for (let j = nums.length - 1; j >= 0; --j) {
      constraints[j][i].south = max;
      max = Math.max(max, nums[j][i]);
    }
  }
};

const getMinGrid = (constraints: maxHeightByDir[][]): number[][] => {
  const output = [];
  for (const row of constraints) {
    output.push(
      row.map((cell) => Math.min(cell.north, cell.east, cell.south, cell.west))
    );
  }
  return output;
};

const countTrees = (grid: number[][], minHeights: number[][]): number => {
  let sum = 0;

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      if (grid[i][j] > minHeights[i][j]) {
        sum++;
      }
    }
  }

  return sum;
};

export const d08p1 = (input: string[]): number => {
  const nums = buildGrid(input);
  const constraints = buildEmptyConstraintGrid(nums);
  fillConstraints(nums, constraints);
  const minGrid = getMinGrid(constraints);
  console.log(nums);
  console.log(minGrid);
  return countTrees(nums, minGrid);
};

export const d08p2 = (input: string[]): number => {
  return 0;
};
