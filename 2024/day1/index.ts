const parse = (input: string): [number[], number[]] => {
  const lines = input.split('\n');

  const left: number[] = [];
  const right: number[] = [];

  lines
    .map((line) => line.split('   '))
    .forEach(([a, b]) => {
      left.push(parseInt(a));
      right.push(parseInt(b));
    });

  return [left, right];
};

export const part1 = (input: string) => {
  const [left, right] = parse(input);

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return left.reduce(
    (sum, value, index) => sum + Math.abs(value - right[index]),
    0,
  );
};

export const part2 = (input: string) => {
  const [left, right] = parse(input);

  const rightOccurrences = right.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return left.reduce(
    (result, value) => result + value * (rightOccurrences[value] || 0),
    0,
  );
};
