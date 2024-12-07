const parse = (input: string): number[][] => {
  return input
    .split('\n')
    .map((line) => line.split(' ').map((x) => parseInt(x)));
};

export const part1 = (input: string) => {
  return parse(input);
};

export const part2 = (input: string) => {
  return parse(input);
};
