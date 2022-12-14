interface Point {
  x: number;
  y: number;
}

enum Space {
  Empty = ".",
  Rock = "#",
  Sand = "o",
}

const findBoundaries = (rocks: Point[][]): Point => {
  const maxEdge: Point = {
    x: -1,
    y: -1,
  };

  rocks.forEach((segments) =>
    segments.forEach((segment) => {
      if (segment.x >= maxEdge.x) {
        maxEdge.x = segment.x + 1;
      }

      if (segment.y > maxEdge.y) {
        maxEdge.y = segment.y + 1;
      }
    })
  );

  return maxEdge;
};

const buildCave = (maxEdges: Point): Space[][] => {
  const output: Space[][] = [];

  for (let y = 0; y <= maxEdges.y; y++) {
    const row: Space[] = [];

    for (let x = 0; x <= maxEdges.x; x++) {
      row.push(Space.Empty);
    }

    output.push(row);
  }

  return output;
};

const fillRocks = (cave: Space[][], rocks: Point[][]) => {
  rocks.forEach((rock) => {
    for (let i = 0; i < rock.length - 1; i++) {
      fillSegment(cave, rock[i], rock[i + 1]);
    }
  });
};

const fillSegment = (cave: Space[][], from: Point, to: Point) => {
  const src = {
    x: from.x < to.x ? from.x : to.x,
    y: from.y < to.y ? from.y : to.y,
  };
  const dest = {
    x: from.x > to.x ? from.x : to.x,
    y: from.y > to.y ? from.y : to.y,
  };

  if (src.x === dest.x) {
    for (let i = src.y; i <= dest.y; i++) {
      cave[i][src.x] = Space.Rock;
    }
  } else {
    for (let i = src.x; i <= dest.x; i++) {
      cave[src.y][i] = Space.Rock;
    }
  }
};

// returns true when new sand comes to a rest
const pourSand = (cave: Space[][]): boolean => {
  const newPoint = findRestPoint(cave, { x: 500, y: 1 });
  if (newPoint.x === -1) {
    return false;
  }

  cave[newPoint.y][newPoint.x] = Space.Sand;
  return true;
};

// returns {x: -1, y: -1} when sand falls off the grid
const findRestPoint = (cave: Space[][], sand: Point): Point => {
  while (true) {
    // bound check
    if (sand.x + 1 >= cave[0].length || sand.y + 1 >= cave.length) {
      return { x: -1, y: -1 };
    }

    // down
    if (cave[sand.y + 1][sand.x] === Space.Empty) {
      sand = { x: sand.x, y: sand.y + 1 };
      continue;
    }

    // left diag
    if (cave[sand.y + 1][sand.x - 1] === Space.Empty) {
      sand = { x: sand.x - 1, y: sand.y + 1 };
      continue;
    }

    // right diag
    if (cave[sand.y + 1][sand.x + 1] === Space.Empty) {
      sand = { x: sand.x + 1, y: sand.y + 1 };
      continue;
    }

    return sand;
  }
};

const sumSand = (cave: Space[][]): number => {
  let sum = 0;

  cave.forEach((row) =>
    row.forEach((cell) => {
      if (cell === Space.Sand) {
        sum++;
      }
    })
  );

  return sum;
};

export const d14p1 = (input: string[]): number => {
  const rockPaths: Point[][] = input.map((line) =>
    line.split(" -> ").map((rawPoint) => {
      const parts = rawPoint.split(",");
      return {
        x: parseInt(parts[0], 10),
        y: parseInt(parts[1], 10),
      };
    })
  );

  const maxEdges = findBoundaries(rockPaths);
  const cave = buildCave(maxEdges);
  fillRocks(cave, rockPaths);

  while (pourSand(cave)) {}
  // cave.map((row) => console.log(JSON.stringify(row.slice(480))));
  return sumSand(cave);
};

export const d14p2 = (input: string[]): number => {
  const test = 0;
  return test;
};
