import {
  Cell,
  Direction,
  Grid,
  rotate270,
  rotate90,
  PriorityQueue,
} from '../utils';

const parse = (input: string): Grid<string> =>
  new Grid(input.split('\n').map((line) => line.split('')));

type Item = {
  cell: Cell<string>;
  direction: Direction;
  score: number;
  visited: Set<string>;
};

const solve = (grid: Grid<string>): { tiles: number; score: number } => {
  const start = grid.cells.find((cell) => cell.value === 'S')!;
  const end = grid.cells.find((cell) => cell.value === 'E')!;

  const queue = new PriorityQueue<Item>();
  const visitedOnBestPaths = new Set<string>();
  const allVisited: Record<string, number> = {};
  let bestScore = Number.MAX_SAFE_INTEGER;

  queue.enqueue(
    {
      cell: start,
      direction: Direction.Right,
      score: 0,
      visited: new Set<string>(),
    },
    0,
  );

  while (!queue.isEmpty()) {
    const { cell, direction, score, visited } = queue.dequeue()!;

    if (score > bestScore) {
      continue;
    }

    const key = `${cell.row},${cell.col},${direction}`;
    if (visited.has(key) || (allVisited[key] && allVisited[key] < score)) {
      continue;
    }

    allVisited[key] = score;
    visited.add(key);

    if (cell === end) {
      visited.forEach((v) => {
        const [row, col] = v.split(',');
        visitedOnBestPaths.add(`${row},${col}`);
      });
      bestScore = score;
      continue;
    }

    const neighbors = [
      { next: cell[direction], direction: direction, score: score + 1 },
      {
        next: cell[rotate90(direction)],
        direction: rotate90(direction),
        score: score + 1001,
      },
      {
        next: cell[rotate270(direction)],
        direction: rotate270(direction),
        score: score + 1001,
      },
    ];

    const validNeighbors = neighbors.filter(
      ({ next }) => next && next.value !== '#',
    );

    const isSplit = validNeighbors.length > 1;

    validNeighbors.forEach(({ next, direction, score }) => {
      queue.enqueue(
        {
          cell: next!,
          direction: direction,
          score,
          visited: isSplit ? new Set(visited) : visited,
        },
        score,
      );
    });
  }

  return { tiles: visitedOnBestPaths.size, score: bestScore };
};

export const part1 = (input: string): number => solve(parse(input)).score;
export const part2 = (input: string): number => solve(parse(input)).tiles;
