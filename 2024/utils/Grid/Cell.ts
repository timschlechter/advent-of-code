import { Grid } from './Grid';
import { Direction } from './Direction';

const DirectionOffsets = {
  [Direction.Left]: [0, -1],
  [Direction.Right]: [0, 1],
  [Direction.Top]: [-1, 0],
  [Direction.Bottom]: [1, 0],
  [Direction.TopLeft]: [-1, -1],
  [Direction.TopRight]: [-1, 1],
  [Direction.BottomLeft]: [1, -1],
  [Direction.BottomRight]: [1, 1],
};

export class Cell<T> {
  constructor(
    public readonly row: number,
    public readonly col: number,
    public readonly value: T,
    private readonly grid: Grid<T>,
  ) {}

  neighbor(direction: Direction): Cell<T> | undefined {
    const [rowOffset, colOffset] = DirectionOffsets[direction];
    return this.grid.cell(this.row + rowOffset, this.col + colOffset);
  }

  get left(): Cell<T> | undefined {
    return this.neighbor(Direction.Left);
  }

  get right(): Cell<T> | undefined {
    return this.neighbor(Direction.Right);
  }

  get top(): Cell<T> | undefined {
    return this.neighbor(Direction.Top);
  }

  get bottom(): Cell<T> | undefined {
    return this.neighbor(Direction.Bottom);
  }

  get topLeft(): Cell<T> | undefined {
    return this.top?.left;
  }

  get topRight(): Cell<T> | undefined {
    return this.top?.right;
  }

  get bottomLeft(): Cell<T> | undefined {
    return this.bottom?.left;
  }

  get bottomRight(): Cell<T> | undefined {
    return this.bottom?.right;
  }

  hasValuesInDirection(direction: Direction, values: T[]): boolean {
    if (this.value !== values[0]) {
      return false;
    }

    if (values.length === 1) {
      return true;
    }

    return (
      this.neighbor(direction)?.hasValuesInDirection(
        direction,
        values.slice(1),
      ) ?? false
    );
  }
}
