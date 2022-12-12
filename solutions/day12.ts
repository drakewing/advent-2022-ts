type Square = {
  elevation: string;
  fewestSteps: number;
  visited: boolean;
  name: string; // "S" & "E" will also have elevations
};
type Heightmap = Square[][];
type Point = {
  x: number;
  y: number;
};

const parseInput = (input: string[]): Heightmap =>
  input.map((row) =>
    row.split("").map((sq) => {
      let elevation = sq;
      let name = sq;

      if (sq === "S") {
        elevation = "a";
        name = "S";
      }

      if (sq === "E") {
        elevation = "z";
        name = "E";
      }

      return {
        elevation,
        name,
        fewestSteps: Number.MAX_VALUE,
        visited: false,
      };
    })
  );

const findMatch = (grid: Heightmap, name: string): Point => {
  const output: Point = { x: -1, y: -1 };

  grid.forEach((row, y) =>
    row.forEach((sq, x) => {
      if (sq.name === name) {
        output.x = x;
        output.y = y;
      }
    })
  );

  return output;
};

const findElevations = (grid: Heightmap, elevation: string): Point[] => {
  const output: Point[] = [];

  grid.forEach((row, y) =>
    row.forEach((sq, x) => {
      if (sq.elevation === elevation) {
        output.push({ x, y });
      }
    })
  );

  return output;
};

const getCandidateMoves = (grid: Heightmap, point: Point): Point[] => {
  const choices = [
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
    { x: point.x, y: point.y - 1 },
    { x: point.x, y: point.y + 1 },
  ];

  // choice must be within bounds *AND* be unvisted
  return choices.filter(
    (choice) =>
      choice.y >= 0 &&
      choice.y < grid.length &&
      choice.x >= 0 &&
      choice.x < grid[0].length &&
      !grid[choice.y][choice.x].visited &&
      canMove(grid, point, choice)
  );
};

const canMove = (grid: Heightmap, from: Point, to: Point): boolean => {
  const fromEle = grid[from.y][from.x].elevation.charCodeAt(0);
  const toEle = grid[to.y][to.x].elevation.charCodeAt(0);
  return fromEle + 1 >= toEle;
};

const exhaustPaths = (
  grid: Heightmap,
  start: Point,
  curPathDistance: number,
  minSoFar?: number
) => {
  // should we even consider this square?
  if (grid[start.y][start.x].fewestSteps <= curPathDistance) return;
  if (grid[start.y][start.x].visited) return;
  if (curPathDistance >= (minSoFar || Number.MAX_VALUE)) return;

  grid[start.y][start.x].fewestSteps = curPathDistance;

  // are we done here?
  if (grid[start.y][start.x].name === "E") return;

  // move along
  grid[start.y][start.x].visited = true;
  const candidates = getCandidateMoves(grid, start);
  for (
    let candidate = candidates.pop();
    candidate;
    candidate = candidates.pop()
  ) {
    exhaustPaths(grid, candidate, curPathDistance + 1);
  }

  grid[start.y][start.x].visited = false;
};

export const d12p1 = (input: string[]): number => {
  const heightMap = parseInput(input);
  const start = findMatch(heightMap, "S");
  exhaustPaths(heightMap, start, 0);

  const end = findMatch(heightMap, "E");
  return heightMap[end.y][end.x].fewestSteps;
};

export const d12p2 = (input: string[]): number => {
  const heightMap = parseInput(input);
  const possibleStarts = findElevations(heightMap, "a");
  const end = findMatch(heightMap, "E");

  let minSoFar = Number.MAX_VALUE;
  possibleStarts.forEach((start) => {
    exhaustPaths(heightMap, start, 0, minSoFar);
    minSoFar = heightMap[end.y][end.x].fewestSteps;
  });

  return minSoFar;
};
