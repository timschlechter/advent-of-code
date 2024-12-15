import { Cell, Direction, Grid } from '../utils';

enum Value {
  Robot = '@',
  Box = 'O',
  Wall = '#',
  Empty = '.',
}

const moveMap: Record<string, Direction> = {
  '<': Direction.Left,
  '>': Direction.Right,
  '^': Direction.Top,
  v: Direction.Bottom,
};

const parsePart1 = (
  input: string,
): { map: Grid<Value>; moves: Direction[] } => {
  const [mapLines, movesLines] = input.split('\n\n');
  const map = new Grid<Value>(
    mapLines.split('\n').map((line) => line.split('') as Value[]),
  );
  const moves = movesLines.split('').map((x) => moveMap[x]);

  return { map, moves };
};

export const move = (thing: Cell<Value>, direction: Direction): boolean => {
  //console.log(thing.grid.toString(), thing.toString(), direction);

  const next = thing[direction];
  if (!next) {
    return false;
  }

  if (next.value === Value.Empty) {
    [thing.value, next.value] = [next.value, thing.value];
    return true;
  } else if (next.value === Value.Box) {
    if (move(next, direction)) {
      [thing.value, next.value] = [next.value, thing.value];

      //console.log(thing.grid.toString());
      return true;
    }
  }

  //console.log(thing.grid.toString());
  return false;
};

// export const execute = (input: string, numberOfMoves: number) => {
//   const { map, moves } = parse(input);

//   for (let i = 0; i < moves.length; i++) {
//     const robot = map.cells.find((cell) => cell.value === Thing.Robot)!;
//     move(robot, moves[i]);
//   }

//   const boxes = map.cells.filter((cell) => cell.value === Thing.Box);
//   return boxes.map((box) => (box.row+1*100+box.col+1)).reduce((acc, x) => acc + x, 0);
// };

export const solve = (input: string) => {
  const { map, moves } = parsePart1(input);

  for (let i = 0; i < moves.length; i++) {
    const robot = map.cells.find((cell) => cell.value === Value.Robot)!;
    move(robot, moves[i]);
  }

  const boxes = map.cells.filter((cell) => cell.value === Value.Box);
  return boxes
    .map((box) => box.row * 100 + box.col)
    .reduce((acc, x) => acc + x, 0);
};
