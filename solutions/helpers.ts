import { readFileSync } from "fs";

export class Queue<T> {
  private items: T[];
  private head: number;
  private tail: number;
  private size: number;

  constructor(items?: T[]) {
    this.items = items ? structuredClone(items) : [];
    this.size = this.items.length;
    this.head = 0;
    this.tail = 0; // an immediate enqueue will always need to resize
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  enqueue(item: T) {
    this.resizeIfNecessary();
    this.items[this.tail] = item;
    this.size++;
    this.tail = (this.tail + 1) % this.items.length;
  }

  dequeue(): T {
    if (this.size === 0) {
      throw new Error("Can't dequeue from empty queue.");
    }

    const output = this.items[this.head];

    this.size--;
    this.head = (this.head + 1) % this.items.length;

    this.resizeIfNecessary();
    return output;
  }

  private resizeIfNecessary() {
    if (this.size === this.items.length) {
      this.growCapacity();
    } else if (this.size <= this.items.length / 4) {
      this.shrinkCapacity();
    }
  }

  private growCapacity() {
    this.items = this.copyItems(this.items.length * 2);
    this.head = 0;
    this.tail = this.size;
  }

  private shrinkCapacity() {
    if (this.size <= this.items.length / 2) {
      return;
    }

    this.items = this.copyItems(Math.floor(this.items.length / 2));
    this.head = 0;
    this.tail = this.size;
  }

  // creates a new array of with `size` elements, and copies existing ones into it.
  private copyItems(size: number): T[] {
    const newItems = new Array(size);

    for (let newTail = 0; newTail !== this.size; newTail++) {
      newItems[newTail] = this.items[this.head];
      this.head = (this.head + 1) % this.items.length;
    }

    return newItems;
  }
}

// stole these: https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

// split input file into array of lines
export const prepInput = (path: string): string[] =>
  readFileSync(path).toString("utf-8").split("\n").slice(0, -1);
