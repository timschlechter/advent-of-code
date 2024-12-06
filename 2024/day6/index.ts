import {
  Direction,
  getOppositeDirection,
  Grid,
  rotate90,
  StraightDirection
} from '../utils';

type Position = {
  isObstacle: boolean;
  isGuard: boolean;
  visitedFrom?: StraightDirection[];
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

const findGuard = (grid: Grid<Position>) =>
  grid.cells.find((cell) => cell.value.isGuard)!;

const walk = (
  grid: Grid<Position>,
  guardDirection: StraightDirection = Direction.Top,
) => {
  let guard = findGuard(grid);
  let direction = guardDirection;

  let uniqueVisitedCells = 0;

  while (true) {
    let next = guard[direction];

    if (!next) {
      return uniqueVisitedCells;
    }

    const { value: position } = next;

    if (position.isObstacle) {
      direction = rotate90(direction);
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
  return walk(grid);
};

export const part2 = (input: string) => {
  // Walk the grid to find the route the guard took
  const walkedGrid = parse(input);
  const guard = findGuard(walkedGrid);
  walk(walkedGrid);

  // Only need to test placing obstacles on visited cells
  const visitedCells = walkedGrid.cells
    .filter((cell) => cell.row !== guard.row || cell.col !== guard.col)
    .filter((cell) => cell.value.visitedFrom);

  return visitedCells.filter(({ row, col, value }) => {
    const grid = parse(input);

    const obstacle = grid.cell(row, col)!;
    obstacle.value.isObstacle = true;

    // Optimize by moving the guard directly into the possible loop
    const visitedFrom = value.visitedFrom![0];
    const opposite = getOppositeDirection(visitedFrom);
    grid.cell(guard.row, guard.col)!.value.isGuard = false;
    obstacle[opposite]!.value.isGuard = true;

    return !walk(grid, visitedFrom);
  }).length;
};
