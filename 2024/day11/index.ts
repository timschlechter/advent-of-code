type Stone = number;
type Iterations = number;
type NumberOfStones = number;

const parse = (input: string): number[] =>
  input.split(' ').map((x) => parseInt(x));

const cache: Record<Stone, Record<Iterations, NumberOfStones>> = {};

const processStones = (
  stone: Stone,
  iterations: Iterations,
): NumberOfStones => {
  if (iterations === 0) {
    return 1;
  }

  if (cache[stone]?.[iterations]) {
    return cache[stone]?.[iterations];
  }

  if (!cache[stone]) {
    cache[stone] = {};
  }

  if (stone === 0) {
    cache[stone][iterations] = processStones(1, iterations - 1);
  } else {
    const str = stone.toString();
    const digits = str.length;
    if (digits % 2 === 0) {
      const stones = [
        str.substring(0, digits / 2),
        str.substring(digits / 2),
      ].map((x) => parseInt(x));
      cache[stone][iterations] = stones
        .map((x) => processStones(x, iterations - 1))
        .reduce((a, b) => a + b, 0);
    } else {
      cache[stone][iterations] = processStones(stone * 2024, iterations - 1);
    }
  }

  return cache[stone][iterations];
};

export const part1 = (input: string) => {
  const stones = parse(input);

  return stones
    .map((stone) => processStones(stone, 25))
    .reduce((a, b) => a + b, 0);
};

export const part2 = (input: string) => {
  const stones = parse(input);

  return stones
    .map((stone) => processStones(stone, 75))
    .reduce((a, b) => a + b, 0);
};
