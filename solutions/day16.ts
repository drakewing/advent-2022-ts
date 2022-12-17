type Node = {
  rate: number;
  tunnels: string[];
};

type Graph = {
  [key: string]: Node;
};

const findMaxPressure = (graph: Graph, minutes: number): number => {
  const worthwhileValves = Object.values(graph).filter(
    (node) => node.rate > 0
  ).length;
  const openValves: Set<string> = new Set();

  const scoreTick = () =>
    Array.from(openValves.values())
      .map((valve) => graph[valve].rate)
      .reduce((acc, rate) => acc + rate, 0);

  const cache: { [key: string]: number } = {};

  const keyfn = (node: string, minLeft: number): string => {
    const valves = Array.from(openValves.values()).sort(
      (a, b) => a.charCodeAt(0) - b.charCodeAt(0)
    );

    return `${node}-${minLeft}-${valves}`;
  };

  const findMaxPressureInner = (start: string, minLeft: number): number => {
    const cacheKey = keyfn(start, minLeft);
    if (cache[cacheKey] !== undefined) {
      return cache[cacheKey];
    }

    const lastMinScore = scoreTick();
    if (minLeft === 1) {
      return lastMinScore;
    }

    if (openValves.size === worthwhileValves) {
      return lastMinScore * minLeft;
    }

    const possibleMaxes: number[] = [];

    // open valve?
    if (!openValves.has(start) && graph[start].rate > 0) {
      openValves.add(start);
      possibleMaxes.push(findMaxPressureInner(start, minLeft - 1));
      openValves.delete(start);
    }

    // dont open valve
    graph[start].tunnels.forEach((node) => {
      possibleMaxes.push(findMaxPressureInner(node, minLeft - 1));
    });

    const maxPressure = lastMinScore + Math.max(...possibleMaxes);
    cache[cacheKey] = maxPressure;
    return maxPressure;
  };

  return findMaxPressureInner("AA", minutes);
};

const parseInput = (input: string[]): Graph => {
  const output: Graph = {};

  input.forEach((line) => {
    const [name, node] = lineToNode(line);
    output[name] = node;
  });

  return output;
};

const lineToNode = (line: string): [string, Node] => {
  const parts = line.split(" ");

  return [
    parts[1],
    {
      rate: parseInt(parts[4].split("=")[1], 10),
      tunnels: parts.slice(9).map((part) => part.split(",")[0]),
    },
  ];
};

export const d16p1 = (input: string[]): number => {
  const graph = parseInput(input);
  return findMaxPressure(graph, 30);
};

export const d16p2 = (input: string[]): number => {
  const test = 0;
  return test;
};
