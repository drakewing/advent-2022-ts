import { lcm, Queue } from "./helpers";

interface Item {
  worry: number;
}

interface WorryOp {
  (worry: number): number;
}

// Worry reduction operation
interface WorryUpdate {
  (worry: number): number;
}

interface Monkey {
  inspectionCt: number;
  items: Queue<Item>;
  op: WorryOp;
  testVal: number;
  trueTarget: number;
  falseTarget: number;
}

const parseStartingItems = (line: string): Item[] =>
  line
    .substring(18)
    .split(", ")
    .map((s) => ({
      worry: parseInt(s, 10),
    }));

const parseOp = (parts: string[]): WorryOp => {
  const saved = structuredClone(parts);
  const lBI = saved[0] === "old" ? undefined : parseInt(saved[0], 10);
  const rBI = saved[2] === "old" ? undefined : parseInt(saved[2], 10);

  return (old: number): number => {
    const l = lBI || old;
    const r = rBI || old;

    if (saved[1] === "+") {
      return l + r;
    }

    if (saved[1] === "*") {
      return l * r;
    }

    return -1;
  };
};

const buildMonkeys = (input: string[]): Monkey[] => {
  const monkeys: Monkey[] = [];

  for (let i = 0; i < input.length; i += 7) {
    monkeys.push({
      inspectionCt: 0,
      items: new Queue(parseStartingItems(input[i + 1])),
      op: parseOp(input[i + 2].split(" ").slice(5)),
      testVal: parseInt(input[i + 3].split(" ").at(-1) || "-1", 10),
      trueTarget: parseInt(input[i + 4].split(" ").at(-1) || "-1", 10),
      falseTarget: parseInt(input[i + 5].split(" ").at(-1) || "-1", 10),
    });
  }

  return monkeys;
};

const takeTurn = (
  monkey: Monkey,
  monkeys: Monkey[],
  reduceWorry: WorryUpdate
) => {
  while (!monkey.items.isEmpty()) {
    monkey.inspectionCt++;

    const item = monkey.items.dequeue();
    item.worry = monkey.op(item.worry);
    item.worry = reduceWorry(item.worry);

    if (item.worry % monkey.testVal === 0) {
      monkeys[monkey.trueTarget].items.enqueue(item);
    } else {
      monkeys[monkey.falseTarget].items.enqueue(item);
    }
  }
};

const processRounds = (
  monkeys: Monkey[],
  rounds: number,
  reduceWorry: WorryUpdate
) => {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => takeTurn(monkey, monkeys, reduceWorry));
  }
};

export const d11p1 = (input: string[]): number => {
  const monkeys = buildMonkeys(input);
  processRounds(monkeys, 20, (worry) => Math.floor(worry / 3));

  const inspectionCts = monkeys
    .map((monkey) => monkey.inspectionCt)
    .sort((a, b) => b - a);

  return inspectionCts[0] * inspectionCts[1];
};

export const d11p2 = (input: string[]): number => {
  const monkeys = buildMonkeys(input);
  const monkeyLCM = monkeys.map((monkey) => monkey.testVal).reduce(lcm);
  processRounds(monkeys, 10000, (worry) =>
    worry >= monkeyLCM ? worry % monkeyLCM : worry
  );

  const inspectionCts = monkeys
    .map((monkey) => monkey.inspectionCt)
    .sort((a, b) => b - a);

  return inspectionCts[0] * inspectionCts[1];
};
