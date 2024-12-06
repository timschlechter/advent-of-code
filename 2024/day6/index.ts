import { Cell, Direction, Grid, StraightDirection } from '../utils';

type Position = {
  isObstacle: boolean;
  isGuard: boolean;
  visitedFrom?: Direction[];
};

const parse = (input: string): Grid<Position> =>
  new Grid(
    input
      .split('\n')
      .map((line) =>
        line
          .split('')
          .map((x) => ({ isObstacle: x === '#', isGuard: x === '^' })),
      ),
  );

const nextDirection: Record<StraightDirection, StraightDirection> = {
  [Direction.Top]: Direction.Right,
  [Direction.Right]: Direction.Bottom,
  [Direction.Bottom]: Direction.Left,
  [Direction.Left]: Direction.Top,
};

const findGuard = (grid: Grid<Position>) =>
  grid.cells.find((cell) => cell.value.isGuard)!;

const walk = (grid: Grid<Position>) => {
  let guard = findGuard(grid);
  let direction = Direction.Top;

  let uniqueVisitedCells = 0;

  while (true) {
    let next = guard[direction];

    if (!next) {
      return uniqueVisitedCells;
    }

    const { value: position } = next;
    
    if (position.isObstacle) {
      direction = nextDirection[direction];
      continue;
    }
    
    if (position.visitedFrom?.includes(direction)) {
      return undefined;
    }

    if (!position.visitedFrom) {
      position.visitedFrom = [];
      uniqueVisitedCells++;
    }
    position.visitedFrom.push(direction);
    guard = next;
  }
};

export const part1 = (input: string) => {
  const grid = parse(input);
  const result = walk(grid);
  return result;
};

export const part2 = (input: string) => {
  const grid = parse(input);
  const guard = findGuard(grid);
  walk(grid);

  const visitedCells = grid.cells
    .filter((cell) => cell.row !== guard.row || cell.col !== guard.col)
    .filter((cell) => cell.value.visitedFrom);

  return visitedCells.filter((cell) => {
    const modifiedGrid = parse(input);
    modifiedGrid.values[cell.row][cell.col].isObstacle = true;
    return !walk(modifiedGrid);
  }).length;
};
