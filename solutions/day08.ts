// represent the tallest tree *in that direction*. for "west" (x is the tree):
//      N
// <- W x E
//      S
interface MaxHeightByDir {
  north: number;
  east: number;
  south: number;
  west: number;
}

const buildGrid = (input: string[]): number[][] =>
  input.map((line) => line.split("").map((s) => parseInt(s, 10)));

const buildEmptyConstraintGrid = (grid: number[][]): MaxHeightByDir[][] =>
  grid.map((row) =>
    row.map(() => ({
      north: -1,
      east: -1,
      south: -1,
      west: -1,
    }))
  );

const buildConstraintGrid = (nums: number[][]): MaxHeightByDir[][] => {
  const constraints = buildEmptyConstraintGrid(nums);

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

  return constraints;
};

const getMinGrid = (constraints: MaxHeightByDir[][]): number[][] =>
  constraints.map((row) =>
    row.map((cell) => Math.min(cell.north, cell.east, cell.south, cell.west))
  );

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
  const constraints = buildConstraintGrid(nums);
  const minGrid = getMinGrid(constraints);
  return countTrees(nums, minGrid);
};

export const d08p2 = (input: string[]): number => 0;
