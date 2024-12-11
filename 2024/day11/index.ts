const parse = (input: string): number[] =>
  input.split(' ').map((x) => parseInt(x));

const cache: Record<string, number> = {};

const blink = (stone: number, times: number): number => {
  if (times === 0) {
    return 1;
  }

  const key = `${stone}#${times}`;
  if (cache[key]) {
    return cache[key];
  }

  if (stone === 0) {
    cache[key] = blink(1, times - 1);
  } else {
    const str = stone.toString();
    if (str.length % 2 === 0) {
      const half = str.length / 2;
      const firstHalf = parseInt(str.slice(0, half), 10);
      const secondHalf = parseInt(str.slice(half), 10);
      cache[key] = blink(firstHalf, times - 1) + blink(secondHalf, times - 1);
    } else {
      cache[key] = blink(stone * 2024, times - 1);
    }
  }

  return cache[key];
};

export const part1 = (input: string) =>
  parse(input)
    .map((stone) => blink(stone, 25))
    .reduce((a, b) => a + b, 0);

export const part2 = (input: string) =>
  parse(input)
    .map((stone) => blink(stone, 75))
    .reduce((a, b) => a + b, 0);
