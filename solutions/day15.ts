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

const isPointInhabited = (point: Point, pairs: Reading[]): boolean =>
  pairs.filter(
    (pair) =>
      arePointsEqual(point, pair.beacon) || arePointsEqual(point, pair.sensor)
  ).length >= 1;

const countUninhabitableSquares = (
  y: number,
  pairs: Reading[],
  distances: SensorRange[]
): number => {
  const bounds = calcBounds(pairs);
  let uninhabitableSquares = 0;
  const edgeBuffer =
    distances.reduce((acc, dist) => Math.max(acc, dist.distance), 0) + 1;

  for (let i = bounds[0] - edgeBuffer; i < bounds[1] + edgeBuffer; i++) {
    for (let j = 0; j < distances.length; j++) {
      const curPoint = { x: i, y };
      const md = calcManhattanDistance(curPoint, distances[j].sensor);

      if (md <= distances[j].distance && !isPointInhabited(curPoint, pairs)) {
        uninhabitableSquares++;
        break;
      }
    }
  }

  return uninhabitableSquares;
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

export const d15p1 = (input: string[]): number => {
  const pairs = parseInput(input);
  const distances = pairs.map((pair) => ({
    sensor: pair.sensor,
    distance: calcManhattanDistance(pair.beacon, pair.sensor),
  }));
  return countUninhabitableSquares(2000000, pairs, distances);
};

export const d15p2 = (input: string[]): number => {
  const test = 0;
  return test;
};
