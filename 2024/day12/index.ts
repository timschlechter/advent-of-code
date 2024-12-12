import { Cell, Directions, Grid, BasicDirections } from '../utils';

type Region = {
  cells: Cell<Plot>[];
  perimeter: number;
  corners: number;
};

type Plot = {
  plant: string;
  region?: Region;
};

type Garden = Grid<Plot>;

const parseGarden = (input: string): Garden =>
  new Grid(
    input.split('\n').map((line) =>
      line.split('').map((plant) => ({
        plant,
        region: undefined,
      })),
    ),
  );

const calculateCorners = (cell: Cell<Plot>, plant: string): number => {
  const [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight] =
    Directions.map((direction) => cell[direction]?.value);

  return [
    // Top left
    left?.plant !== plant && top?.plant !== plant,
    left?.plant === plant && top?.plant === plant && topLeft?.plant !== plant,

    // Bottom left
    left?.plant !== plant && bottom?.plant !== plant,
    left?.plant === plant &&
      bottom?.plant === plant &&
      bottomLeft?.plant !== plant,

    // Top right
    right?.plant !== plant && top?.plant !== plant,
    right?.plant === plant && top?.plant === plant && topRight?.plant !== plant,

    // Bottom right
    right?.plant !== plant && bottom?.plant !== plant,
    right?.plant === plant &&
      bottom?.plant === plant &&
      bottomRight?.plant !== plant,
  ].filter(Boolean).length;
};

const discoverRegion = (cell: Cell<Plot>, region?: Region): Region => {
  if (cell.value.region) {
    return cell.value.region;
  }

  if (!region) {
    region = { cells: [], perimeter: 0, corners: 0 };
  }

  cell.value.region = region;
  region.cells.push(cell);

  const { plant } = cell.value;
  region.corners += calculateCorners(cell, plant);

  const neighbors = BasicDirections.map((direction) => cell[direction])
    .filter((next) => !!next)
    .filter((neighbor) => neighbor && neighbor.value.plant === plant);

  region.perimeter += 4 - neighbors.length;

  neighbors
    .filter((neighbor) => !neighbor.value.region)
    .forEach((neighbor) => discoverRegion(neighbor, region));

  return region;
};

const calculateRegions = (garden: Garden): Region[] => {
  const uniqueRegions = new Set(garden.cells.map((cell) => discoverRegion(cell)));
  return [...uniqueRegions];
};

export const part1 = (input: string): number => {
  const garden = parseGarden(input);
  const regions = calculateRegions(garden);

  return regions.reduce(
    (total, region) => total + region.cells.length * region.perimeter,
    0,
  );
};

export const part2 = (input: string): number => {
  const garden = parseGarden(input);
  const regions = calculateRegions(garden);

  return regions.reduce(
    (total, region) => total + region.cells.length * region.corners,
    0,
  );
};
