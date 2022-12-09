enum Direction {
  west,
  north,
  east,
  south,
}

// represent the tallest tree *in that direction*. for "west" (x is the tree):
//      N
// <- W x E
//      S
interface MaxHeightByDir {
  [Direction.north]: number;
  [Direction.east]: number;
  [Direction.south]: number;
  [Direction.west]: number;
}

const buildGrid = (input: string[]): number[][] =>
  input.map((line) => line.split("").map((s) => parseInt(s, 10)));

const buildEmptyConstraintGrid = (grid: number[][]): MaxHeightByDir[][] =>
  grid.map((row) =>
    row.map(() => ({
      [Direction.north]: -1,
      [Direction.east]: -1,
      [Direction.south]: -1,
      [Direction.west]: -1,
    }))
  );

const buildConstraintGrid = (nums: number[][]): MaxHeightByDir[][] => {
  const constraints = buildEmptyConstraintGrid(nums);

  // west->east
  for (let i = 0; i < nums.length; ++i) {
    let max = -1;
    for (let j = 0; j < nums[i].length; ++j) {
      constraints[i][j][Direction.west] = max;
      max = Math.max(max, nums[i][j]);
    }
  }

  // east->west
  for (let i = 0; i < nums.length; ++i) {
    let max = -1;
    for (let j = nums[i].length - 1; j >= 0; --j) {
      constraints[i][j][Direction.east] = max;
      max = Math.max(max, nums[i][j]);
    }
  }

  // north->south
  for (let i = 0; i < nums[0].length; ++i) {
    let max = -1;
    for (let j = 0; j < nums.length; ++j) {
      constraints[j][i][Direction.north] = max;
      max = Math.max(max, nums[j][i]);
    }
  }

  // south->north
  for (let i = 0; i < nums[0].length; ++i) {
    let max = -1;
    for (let j = nums.length - 1; j >= 0; --j) {
      constraints[j][i][Direction.south] = max;
      max = Math.max(max, nums[j][i]);
    }
  }

  return constraints;
};

const getMinGrid = (constraints: MaxHeightByDir[][]): number[][] =>
  constraints.map((row) =>
    row.map((cell) =>
      Math.min(
        cell[Direction.north],
        cell[Direction.east],
        cell[Direction.south],
        cell[Direction.west]
      )
    )
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

// From site->edge based on the given direction
const calcScore = (grid: number[][], row: number, col: number): number => {
  const cellHeight = grid[row][col];
  const scores: number[] = [];

  // go west
  let score = 0;
  for (let i = col - 1; i >= 0; --i) {
    score++;
    if (grid[row][i] >= cellHeight) {
      break;
    }
  }
  scores.push(score);

  // go east
  score = 0;
  for (let i = col + 1; i < grid[row].length; ++i) {
    score++;
    if (grid[row][i] >= cellHeight) {
      break;
    }
  }
  scores.push(score);

  // go north
  score = 0;
  for (let i = row - 1; i >= 0; --i) {
    score++;
    if (grid[i][col] >= cellHeight) {
      break;
    }
  }
  scores.push(score);

  // go south
  score = 0;
  for (let i = row + 1; i < grid.length; ++i) {
    score++;
    if (grid[i][col] >= cellHeight) {
      break;
    }
  }
  scores.push(score);

  return scores.reduce((prev, cur) => prev * cur);
};

const buildScoreGrid = (grid: number[][]): number[][] =>
  grid.map((row, i) => row.map((cell, j) => calcScore(grid, i, j)));

export const d08p1 = (input: string[]): number => {
  const nums = buildGrid(input);
  const constraints = buildConstraintGrid(nums);
  const minGrid = getMinGrid(constraints);
  return countTrees(nums, minGrid);
};

export const d08p2 = (input: string[]): number => {
  const nums = buildGrid(input);
  const scores = buildScoreGrid(nums);
  return Math.max(...scores.map((row) => Math.max(...row)));
};
