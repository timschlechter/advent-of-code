import { arraysAreEqual } from '../utils';

const parse = (input: string) => {
  const parts = input.split('\n\n');

  const rules: Record<number, number[]> = parts[0]
    .split('\n')
    .map((line) => line.split('|'))
    .map((item) => item.map((x) => parseInt(x)))
    .reduce<Record<number, number[]>>((acc, curr) => {
      acc[curr[0]] = acc[curr[0]] || [];
      acc[curr[0]].push(curr[1]);
      return acc;
    }, {});

  const updates: number[][] = parts[1]
    .split('\n')
    .map((line) => line.split(','))
    .map((item) => item.map((x) => parseInt(x)));

  return updates.map((pages) => {
    const sorted = [...pages].sort((a, b) => (rules[a]?.includes(b) ? -1 : 1));
    return {
      pages,
      sorted,
      middlePage: pages[Math.floor(pages.length / 2)],
      sortedMiddlePage: sorted[Math.floor(sorted.length / 2)],
      isInCorrectOrder: arraysAreEqual(pages, sorted),
    };
  });
};

export const part1 = (input: string) =>
  parse(input)
    .filter((update) => update.isInCorrectOrder)
    .reduce((acc, curr) => acc + curr.middlePage, 0);

export const part2 = (input: string) =>
  parse(input)
    .filter((update) => !update.isInCorrectOrder)
    .reduce((acc, curr) => acc + curr.sortedMiddlePage, 0);
