import { Cell, Direction, Grid, StraightDirection } from '../utils';

enum Sprite {
  Guard = '^',
  Obstacle = '#',
  Empty = '.',
}

type GridCell = {
  sprite: Sprite;
  visitedFrom: Direction[];
};

const parse = (input: string): Grid<GridCell> =>
  new Grid(
    input
      .split('\n')
      .map((line) =>
        line.split('').map((x) => ({ sprite: x as Sprite, visitedFrom: [] })),
      ),
  );

const nextDirection: Record<StraightDirection, StraightDirection> = {
  [Direction.Top]: Direction.Right,
  [Direction.Right]: Direction.Bottom,
  [Direction.Bottom]: Direction.Left,
  [Direction.Left]: Direction.Top,
};

const findGuard = (grid: Grid<GridCell>) =>
  grid.cells.find((cell) => cell.value.sprite === Sprite.Guard)!;

const walkRoute = (grid: Grid<GridCell>) => {
  let guard = findGuard(grid);
  let direction = Direction.Top;

  let steps = 0;

  while (true) {
    const next: Cell<GridCell> | undefined = guard[direction];

    if (!next) {
      return steps;
    }

    if (next.value.visitedFrom.includes(direction)) {
      return undefined;
    }

    if (next.value.sprite === Sprite.Obstacle) {
      direction = nextDirection[direction];
    } else {
      if (next.value.visitedFrom.length === 0) {
        steps++;
      }
      next.value.visitedFrom.push(direction);
      guard = next;
    }
  }
};

export const part1 = (input: string) => {
  const grid = parse(input);
  const result = walkRoute(grid);
  return result;
};

export const part2 = (input: string) => {
  const grid = parse(input);
  const guard = findGuard(grid);
  walkRoute(grid);

  const visitedCells = grid.cells
    .filter((cell) => cell.row !== guard.row || cell.col !== guard.col)
    .filter((cell) => cell.value.visitedFrom.length > 0);

  return visitedCells.filter((cell) => {
    const modifiedGrid = parse(input);
    modifiedGrid.values[cell.row][cell.col].sprite = Sprite.Obstacle;
    return !walkRoute(modifiedGrid);
  }).length;
};
