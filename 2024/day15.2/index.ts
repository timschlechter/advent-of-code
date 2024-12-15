import { Cell, Direction, Grid } from '../utils';

const ROBOT = '@';
const BOX_L = '[';
const BOX_R = ']';
const WALL = '#';
const EMPTY = '.';

type Value = '@' | '[' | ']' | '#' | '.';

const moveMap: Record<string, Direction> = {
  '<': Direction.Left,
  '>': Direction.Right,
  '^': Direction.Top,
  v: Direction.Bottom,
};

const parse = (input: string): { map: Grid<Value>; moves: Direction[] } => {
  const [mapLines, movesLines] = input.split('\n\n');
  const map = new Grid<Value>(
    mapLines.split('\n').map(
      (line) =>
        line.split('').flatMap((v) => {
          if (v === 'O') {
            return [BOX_L, BOX_R];
          } else if (v === ROBOT) {
            return [ROBOT, EMPTY];
          }
          return [v, v];
        }) as Value[],
    ),
  );
  const moves = movesLines.split('').map((x) => moveMap[x]);

  return { map, moves };
};

export const canMove = (obj: Cell<Value>, direction: Direction): boolean => {
  if (obj.value === EMPTY || obj.value === WALL) {
    return false;
  }

  const next = obj[direction];
  if (!next || next.value === WALL) {
    return false;
  }

  if (obj.value === ROBOT) {
    return next.value === EMPTY || canMove(next, direction);
  }

  const boxL = obj.value === BOX_L ? obj : obj[Direction.Left]!;
  const boxR = obj.value === BOX_R ? obj : obj[Direction.Right]!;
  const nextL = boxL[direction]!;
  const nextR = boxR[direction]!;

  switch (direction) {
    case Direction.Left:
      return nextL.value === EMPTY || canMove(nextL, direction);

    case Direction.Right:
      return nextR.value === EMPTY || canMove(nextR, direction);

    default:
      return (
        (nextL.value === EMPTY || canMove(nextL, direction)) &&
        (nextR.value === EMPTY || canMove(nextR, direction))
      );
  }
};

export const move = (obj: Cell<Value>, direction: Direction) => {
  const next = obj[direction]!;

  if (next.value === BOX_L || next.value === BOX_R) {
    const boxL = next.value === BOX_L ? next : next[Direction.Left]!;
    const boxR = next.value === BOX_R ? next : next[Direction.Right]!;

    if (direction === Direction.Left) {
      move(boxL, direction);
      move(boxR, direction);
    } else {
      move(boxR, direction);
      move(boxL, direction);
    }
  }

  [obj.value, next.value] = [next.value, obj.value];

  return next;
};

export const solve = (
  input: string,
  count: number = Number.MAX_SAFE_INTEGER,
) => {
  const { map, moves } = parse(input);

  let robot = map.cells.find((cell) => cell.value === ROBOT)!;
  for (let i = 0; i < Math.min(count, moves.length); i++) {
    if (canMove(robot, moves[i])) {
      robot = move(robot, moves[i]);
    }
  }

  const boxes = map.cells.filter((cell) => cell.value === BOX_L);
  return boxes
    .map((box) => box.row * 100 + box.col)
    .reduce((acc, x) => acc + x, 0);
};
