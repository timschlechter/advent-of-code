import { Cell, Grid, OrthogonalDirections } from '../utils';

const parse = (input: string): Grid<number> =>
  new Grid(
    input.split('\n').map((line) => line.split('').map((x) => parseInt(x))),
  );

const walkToTop = (pos: Cell<number>): Cell<number>[] => {
  return pos.value === 9
    ? [pos]
    : OrthogonalDirections.map((direction) => pos[direction]).flatMap((next) =>
        next?.value !== pos.value + 1 ? [] : walkToTop(next),
      );
};

export const part1 = (input: string) => {
  const grid = parse(input);
  const trailHeads = grid.cells.filter((cell) => cell.value === 0);
  return trailHeads
    .map(walkToTop)
    .map((tops) => [...new Set(tops)])
    .reduce((acc, x) => acc + x.length, 0);
};

export const part2 = (input: string) => {
  const grid = parse(input);
  const trailHeads = grid.cells.filter((cell) => cell.value === 0);
  return trailHeads.map(walkToTop).reduce((acc, x) => acc + x.length, 0);
};
