import { arraysAreEqual } from "../utils";

const parse = (input: string) => {
  const parts = input.split('\n\n');

  const rules = parts[0]
    .split('\n')
    .map((line) => line.split('|'))
    .map((item) => item.map((x) => parseInt(x)))
    .reduce<Record<number, number[]>>((acc, curr) => {
      acc[curr[0]] = acc[curr[0]] || [];
      acc[curr[0]].push(curr[1]);
      return acc;
    }, {}) as any;

  const updates = parts[1]
    .split('\n')
    .map((line) => line.split(','))
    .map((item) => item.map((x) => parseInt(x)));

  return {
    rules,
    updates,
    sort: (update: number[]) =>
      [...update].sort((a, b) => (rules[a]?.includes(b) ? -1 : 1)),
  };
};

export const part1 = (input: string) => {
  const { updates, sort } = parse(input);

  const items = updates
    .map((update) => ({
      middle: update[Math.floor(update.length / 2)],
      update,
    }))
    .filter((item) => arraysAreEqual(item.update, sort(item.update)));

  return items.reduce((acc, curr) => acc + curr.middle, 0);
};

export const part2 = (input: string) => {
  const { updates, sort } = parse(input);

  const items = updates
    .map((update) => ({
      update,
      sorted: sort(update)
    }))
    .filter((item) => !arraysAreEqual(item.update, sort(item.update)))
    .map((item) => ({
      middle: item.sorted[Math.floor(item.sorted.length / 2)],
      update: item.update,
    }));

  return items.reduce((acc, curr) => acc + curr.middle, 0);
};
