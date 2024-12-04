import { Grid } from '../utils/grid';

const parse = (input: string): Grid<string> =>
  new Grid(input.split('\n').map((line) => line.split('')));

export const part1 = (input: string) => {
  const grid = parse(input);
  return grid.findPattern(['X', 'M', 'A', 'S']).length;
};

export const part2 = (input: string) => {
  const grid = parse(input);
  const patterns = ['MSMS', 'SMSM', 'MMSS', 'SSMM'];
  
  return grid.cells
    .filter((cell) => cell.value === 'A')
    .flatMap((cell) =>
      patterns.filter(
        (pattern) =>
          cell.topLeft?.value === pattern[0] &&
          cell.topRight?.value === pattern[1] &&
          cell.bottomLeft?.value === pattern[2] &&
          cell.bottomRight?.value === pattern[3],
      ),
    ).length;
};
