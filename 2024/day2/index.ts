const parse = (input: string): number[][] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));

const isIncreasing = (report: number[]): boolean =>
  report.every((level, i, levels) => i === 0 || levels[i - 1] < level);

const isDecreasing = (report: number[]): boolean =>
  report.every((level, i, levels) => i === 0 || levels[i - 1] > level);

const maxAdjacent = (report: number[]): number =>
  report
    .slice(1)
    .reduce(
      (maxDiff, level, i) => Math.max(maxDiff, Math.abs(level - report[i])),
      0,
    );

const minAdjacent = (report: number[]): number =>
  report
    .slice(1)
    .reduce(
      (minDiff, level, i) => Math.min(minDiff, Math.abs(level - report[i])),
      Number.MAX_VALUE,
    );

const isSafe = (report: number[]): boolean =>
  (isIncreasing(report) || isDecreasing(report)) &&
  maxAdjacent(report) <= 3 &&
  minAdjacent(report) > 0;

const getCombinations = (array: number[]): number[][] =>
  array.map((_: number, index: number) =>
    array.filter((_: number, i: number) => i !== index),
  );

export const part1 = (input: string) => parse(input).filter(isSafe).length;

export const part2 = (input: string) =>
  parse(input).filter(
    (report) => getCombinations(report).filter(isSafe).length > 0,
  ).length;
