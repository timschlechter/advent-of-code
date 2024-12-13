import { Cell, DiagonalDirection, Direction, Directions, Grid } from '../utils';

type Region = {
  cells: Set<Cell<string>>;
  perimeter: number;
  corners: number;
};

type Garden = Grid<string>;

const parse = (input: string): Garden =>
  new Grid(input.split('\n').map((line) => line.split('')));

const calculateCorners = (cell: Cell<string>): number => {
  const plant = cell.value;
  const [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight] =
    Directions.map((direction) => cell[direction]?.value);

  const corners = {
    [Direction.TopLeft]:
      (left !== plant && top !== plant) ||
      (left === plant && top === plant && topLeft !== plant),
    [Direction.BottomLeft]:
      (left !== plant && bottom !== plant) ||
      (left === plant && bottom === plant && bottomLeft !== plant),
    [Direction.TopRight]:
      (right !== plant && top !== plant) ||
      (right === plant && top === plant && topRight !== plant),
    [Direction.BottomRight]:
      (right !== plant && bottom !== plant) ||
      (right === plant && bottom === plant && bottomRight !== plant),
  };

  return Object.values(corners).filter(Boolean).length;
};

const calculateRegion = (cell: Cell<string>, region?: Region): Region => {
  if (region?.cells.has(cell)) {
    return region;
  }

  region ??= { cells: new Set(), perimeter: 0, corners: 0 };
  region.cells.add(cell);

  const neighbors = cell.orthogonalNeighbors.filter(
    (neighbor) => neighbor.value === cell.value,
  );
  region.perimeter += 4 - neighbors.length;
  region.corners += calculateCorners(cell);

  neighbors
    .forEach((neighbor) => calculateRegion(neighbor, region));

  return region;
};

const calculateRegions = (garden: Garden): Region[] => {
  const regions: Region[] = [];
  const visited = new Set<Cell<string>>();

  for (const cell of garden.cells) {
    if (!visited.has(cell)) {
      const region = calculateRegion(cell);
      region.cells.forEach((c) => visited.add(c));
      regions.push(region);
    }
  }
  return regions;
};

export const part1 = (input: string): number => {
  const garden = parse(input);
  const regions = calculateRegions(garden);

  return regions.reduce(
    (acc, curr) => acc + curr.cells.size * curr.perimeter,
    0,
  );
};

export const part2 = (input: string): number => {
  const garden = parse(input);
  const regions = calculateRegions(garden);

  return regions.reduce(
    (acc, curr) => acc + curr.cells.size * curr.corners,
    0,
  );
};
