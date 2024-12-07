import { Cell, Grid } from '../utils';

type Value = { antenna: string | undefined; isAntiNode: boolean };

const parse = (input: string): Grid<Value> =>
  new Grid(
    input.split('\n').map((line) =>
      line.split('').map((x) => ({
        antenna: x !== '.' ? x : undefined,
        isAntiNode: false,
      })),
    ),
  );

const solve = (
  grid: Grid<Value>,
  markAntiNodes = (
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number,
  ): void => {},
) => {
  const antennaCells = grid.cells.filter((cell) => cell.value.antenna);

  const groups = antennaCells.reduce<Record<string, Cell<Value>[]>>(
    (acc, cell) => {
      const antenna = cell.value.antenna!;
      acc[antenna] = (acc[antenna] ?? []).concat(cell);
      return acc;
    },
    {},
  );

  Object.values(groups).forEach((cells) => {
    cells.forEach((a, i) => {
      for (let j = i + 1; j < cells.length; j++) {
        const b = cells[j];
        const dX = a.col - b.col;
        const dY = a.row - b.row;

        markAntiNodes(a.row, a.col, dY, dX);
        markAntiNodes(b.row, b.col, -dY, -dX);
      }
    });
  });

  return grid.cells.filter((cell) => cell.value.isAntiNode).length;
};

export const part1 = (input: string) => {
  const grid = parse(input);

  return solve(grid, (startRow, startCol, deltaRow, deltaCol) => {
    const antiNode = grid.cell(startRow + deltaRow, startCol + deltaCol)?.value;
    if (antiNode) {
      antiNode.isAntiNode = true;
    }
  });
};

export const part2 = (input: string) => {
  const grid = parse(input);

  return solve(grid, (startRow, startCol, deltaRow, deltaCol) => {
    let currentNode = grid.cell(startRow, startCol);
    while (currentNode) {
      currentNode.value.isAntiNode = true;
      currentNode = grid.cell(
        currentNode.row + deltaRow,
        currentNode.col + deltaCol,
      );
    }
  });
};
