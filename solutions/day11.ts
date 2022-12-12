import { Queue } from "./helpers";

interface Item {
  worry: number;
}

interface WorryOp {
  (worry: number): number;
}

interface WorryTest {
  (worry: number): boolean;
}

interface Monkey {
  inspectionCt: number;
  items: Queue<Item>;
  op: WorryOp;
  test: WorryTest;
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

  return (old: number): number => {
    const l = saved[0] === "old" ? old : parseInt(saved[0], 10);
    const r = saved[2] === "old" ? old : parseInt(saved[2], 10);

    if (saved[1] === "+") {
      return l + r;
    }

    if (saved[1] === "*") {
      return l * r;
    }

    return -1;
  };
};

const parseTest = (parts: string[]): WorryTest => {
  const val = parseInt(parts.at(-1) || "-1", 10);
  return (worry) => worry % val === 0;
};

const buildMonkeys = (input: string[]): Monkey[] => {
  const monkeys: Monkey[] = [];

  for (let i = 0; i < input.length; i += 7) {
    monkeys.push({
      inspectionCt: 0,
      items: new Queue(parseStartingItems(input[i + 1])),
      op: parseOp(input[i + 2].split(" ").slice(5)),
      test: parseTest(input[i + 3].split(" ")),
      trueTarget: parseInt(input[i + 4].split(" ").at(-1) || "-1", 10),
      falseTarget: parseInt(input[i + 5].split(" ").at(-1) || "-1", 10),
    });
  }

  return monkeys;
};

const takeTurn = (monkey: Monkey, monkeys: Monkey[]) => {
  while (!monkey.items.isEmpty()) {
    monkey.inspectionCt++;

    const item = monkey.items.dequeue();
    item.worry = monkey.op(item.worry);
    item.worry = Math.floor(item.worry / 3);

    if (monkey.test(item.worry)) {
      monkeys[monkey.trueTarget].items.enqueue(item);
    } else {
      monkeys[monkey.falseTarget].items.enqueue(item);
    }
  }
};

const processRounds = (monkeys: Monkey[], rounds: number) => {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => takeTurn(monkey, monkeys));
  }
};

export const d11p1 = (input: string[]): number => {
  const monkeys = buildMonkeys(input);
  processRounds(monkeys, 20);

  const inspectionCts = monkeys
    .map((monkey) => monkey.inspectionCt)
    .sort((a, b) => b - a);

  return inspectionCts[0] * inspectionCts[1];
};

export const d11p2 = (input: string[]): number => 0;
