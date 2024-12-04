import { Grid } from '../utils/xrid';

const parse = (input: string): Grid<string> =>
  new Grid(input.split('\n').map((line) => line.split('')));

export const part1 = (input: string) => {
  const grid = parse(input);

  return grid.findPattern(['X', 'M', 'A', 'S']).length;
};

export const part2 = (input: string) => {
  const grid = parse(input);

  return grid.cells
    .filter((cell) => cell.value === 'A')
    .flatMap(
      (cell) =>
        ['MSMS', 'SMSM', 'MMSS', 'SSMM'].filter(
          (pattern) =>
            cell.topLeft?.value === pattern[0] &&
            cell.topRight?.value === pattern[1] &&
            cell.bottomLeft?.value === pattern[2] &&
            cell.bottomRight?.value === pattern[3],
        ),
    )
    .length;
};
