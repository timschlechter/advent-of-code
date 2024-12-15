import { Cell, Direction, Grid } from '../utils';

const ROBOT = '@';
const BOX = 'O';
const WALL = '#';
const EMPTY = '.';

type Value = '@' | 'O' | '#' | '.';

const moveMap: Record<string, Direction> = {
  '<': Direction.Left,
  '>': Direction.Right,
  '^': Direction.Top,
  v: Direction.Bottom,
};

const parse = (input: string): { map: Grid<Value>; moves: Direction[] } => {
  const [mapLines, movesLines] = input.split('\n\n');
  const map = new Grid<Value>(
    mapLines.split('\n').map((line) => line.split('') as Value[]),
  );
  const moves = movesLines.split('').map((x) => moveMap[x]);

  return { map, moves };
};

export const canMove = (thing: Cell<Value>, direction: Direction): boolean => {
  const next = thing[direction];
  if (next?.value === EMPTY) {
    return true;
  } else if (next?.value === BOX && canMove(next, direction)) {
    return true;
  }
  return false;
};

export const move = (thing: Cell<Value>, direction: Direction) => {
  const next = thing[direction]!;
  if (next.value === BOX) {
    move(next, direction);
  }
  [thing.value, next.value] = [next.value, thing.value];

  return next;
};

export const solve = (input: string) => {
  const { map, moves } = parse(input);

  let robot = map.cells.find((cell) => cell.value === ROBOT)!;
  for (const direction of moves) {
    if (canMove(robot, direction)) {
      robot = move(robot, direction);
    }
  }

  const boxes = map.cells.filter((cell) => cell.value === BOX);
  return boxes
    .map((box) => box.row * 100 + box.col)
    .reduce((acc, x) => acc + x, 0);
};
