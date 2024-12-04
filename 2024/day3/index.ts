export const part1 = (input: string) => [...input.matchAll(/(?:mul\((\d+),(\d+\)))/g)]
  .map(match => parseInt(match[1]) * parseInt(match[2]))
  .reduce((acc, curr) => acc + curr, 0);

export const part2 = (input: string) =>
  input
    .split('do()')
    .map((line) => line.split("don't()")[0])
    .map(part1)
    .reduce((acc, curr) => acc + curr, 0);
