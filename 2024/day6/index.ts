import { Direction, opposite, Grid, rotate90 } from '../utils';

type Value = { obstacle: boolean; visited: Set<Direction> };
type Guard = { row: number; col: number; direction: Direction };
type ParsedInput = { grid: Grid<Value>; guard: Guard };

const parse = (input: string): ParsedInput => {
  const lines = input.split('\n').map((line) => line.split(''));

  const values = lines.map((line) =>
    line.map((c) => ({ obstacle: c === '#', visited: new Set<Direction>() })),
  );

  const grid = new Grid<Value>(values);

  const guard = lines
    .map((line, idx) => ({
      row: idx,
      col: line.indexOf('^'),
      direction: Direction.Top,
    }))
    .find((item) => item.col >= 0)!;

  return { grid, guard };
};

const walk = ({ grid, guard }: ParsedInput) => {
  let { direction } = guard;
  let curr = grid.cell(guard.row, guard.col)!;
  let next = curr[direction];
  let loop = false;
  let count = 0;

  while (next && !loop) {
    if (next.value.obstacle) {
      direction = rotate90(direction);
    } else if (next.value.visited.has(direction)) {
      loop = true;
    } else {
      if (!next.value.visited.size) {
        count++;
      }
      next.value.visited.add(direction);
      curr = next;
    }

    next = curr[direction];
  }

  return loop ? -1 : count;
};

export const part1 = (input: string) => walk(parse(input));

export const part2 = (input: string) => {
  // Walk the grid to find the route the guard took
  const { grid, guard } = parse(input);
  walk({ grid, guard });

  // Only need to test placing obstacles on visited cells
  const candidates = grid.cells
    .filter((cell) => cell.row !== guard.row || cell.col !== guard.col)
    .filter((cell) => cell.value.visited.size)
    .map((cell) => {
      const [direction] = cell.value.visited;
      return { cell, direction };
    });

  let count = 0;
  for (const { cell, direction } of candidates) {
    // Add new obstacle
    cell.value.obstacle = true;

    // Optimize by moving the guard directly into the possible loop
    const { row, col } = cell[opposite(direction)]!;
    guard.row = row;
    guard.col = col;
    guard.direction = direction;

    if (walk({ grid, guard }) < 0) {
      count++;
    }

    // reset
    cell.value.obstacle = false;

    grid.cells
      .filter((cell) => cell.value.visited.size)
      .forEach((cell) => cell.value.visited.clear());
  }

  return count;
};
