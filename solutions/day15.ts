type Point = {
  x: number;
  y: number;
};

type Reading = {
  sensor: Point;
  beacon: Point;
};

type SensorRange = {
  sensor: Point;
  distance: number;
};

const calcManhattanDistance = (a: Point, b: Point): number =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const calcBounds = (readings: Reading[]): [number, number] => {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;

  readings.forEach((pair) => {
    minX = Math.min(minX, pair.beacon.x, pair.sensor.x);
    maxX = Math.max(maxX, pair.beacon.x, pair.sensor.x);
  });

  return [minX, maxX];
};

const arePointsEqual = (a: Point, b: Point): boolean =>
  a.x === b.x && a.y === b.y;

const isPointUninhabited = (point: Point, pairs: Reading[]): boolean =>
  pairs.filter(
    (pair) =>
      arePointsEqual(point, pair.beacon) || arePointsEqual(point, pair.sensor)
  ).length === 0;

const isPointUninhabitable = (
  point: Point,
  distances: SensorRange[]
): boolean => {
  for (let j = 0; j < distances.length; j++) {
    const md = calcManhattanDistance(point, distances[j].sensor);

    if (md <= distances[j].distance) {
      return true;
    }
  }

  return false;
};

const countRuledOutSquares = (
  y: number,
  pairs: Reading[],
  distances: SensorRange[]
): number => {
  const bounds = calcBounds(pairs);
  const edgeBuffer =
    distances.reduce((acc, dist) => Math.max(acc, dist.distance), 0) + 1;
  let ruledOutSquares = 0;

  for (let i = bounds[0] - edgeBuffer; i < bounds[1] + edgeBuffer; i++) {
    const curPoint = { x: i, y };

    if (
      isPointUninhabitable(curPoint, distances) &&
      isPointUninhabited(curPoint, pairs)
    ) {
      ruledOutSquares++;
    }
  }

  return ruledOutSquares;
};

const parseInput = (input: string[]): Reading[] =>
  input
    .map((line) => line.split(" "))
    .map((parts) => ({
      sensor: {
        x: parseInt(parts[2].slice(2, parts[2].length - 1), 10),
        y: parseInt(parts[3].slice(2, parts[3].length - 1), 10),
      },
      beacon: {
        x: parseInt(parts[8].slice(2, parts[8].length - 1), 10),
        y: parseInt(parts[9].slice(2), 10),
      },
    }));

const getBoundarySquares = (sensorRange: SensorRange): Point[] => {
  const boundarySquares: Point[] = [];
  const boundaryDistance = sensorRange.distance + 1;

  for (let ydist = boundaryDistance; ydist >= 0; ydist--) {
    const xdist = boundaryDistance - ydist;

    boundarySquares.push({
      x: sensorRange.sensor.x - xdist,
      y: sensorRange.sensor.y - ydist,
    });

    boundarySquares.push({
      x: sensorRange.sensor.x + xdist,
      y: sensorRange.sensor.y - ydist,
    });

    boundarySquares.push({
      x: sensorRange.sensor.x - xdist,
      y: sensorRange.sensor.y + ydist,
    });

    boundarySquares.push({
      x: sensorRange.sensor.x + xdist,
      y: sensorRange.sensor.y + ydist,
    });
  }

  return boundarySquares;
};

// check sensorRange MD + 1
const checkBoundariesForInhabitableSpace = (
  sensorRange: SensorRange,
  distances: SensorRange[]
): Point | null => {
  const boundarySquares = getBoundarySquares(sensorRange);

  for (let i = 0; i < boundarySquares.length; i++) {
    if (!isPointUninhabitable(boundarySquares[i], distances)) {
      return boundarySquares[i];
    }
  }

  return null;
};

// lower bound is always 0
const isPosWithinBounds = (pos: Point, upperBound: number): boolean =>
  pos.x >= 0 && pos.x <= upperBound && pos.y >= 0 && pos.y <= upperBound;

export const d15p1 = (input: string[]): number => {
  const pairs = parseInput(input);
  const distances = pairs.map((pair) => ({
    sensor: pair.sensor,
    distance: calcManhattanDistance(pair.beacon, pair.sensor),
  }));
  return countRuledOutSquares(2000000, pairs, distances);
};

export const d15p2 = (input: string[], maxCoord: number): number => {
  const pairs = parseInput(input);
  const distances = pairs.map((pair) => ({
    sensor: pair.sensor,
    distance: calcManhattanDistance(pair.beacon, pair.sensor),
  }));

  for (let i = 0; i < distances.length; i++) {
    const hasit = checkBoundariesForInhabitableSpace(distances[i], distances);
    if (hasit !== null && isPosWithinBounds(hasit, maxCoord)) {
      return hasit.x * 4000000 + hasit.y;
    }
  }

  return 0;
};
