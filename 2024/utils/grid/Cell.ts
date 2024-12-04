import { Grid } from './Grid';
import { Direction } from './Direction';

export class Cell<T> {
  constructor(
    public readonly row: number,
    public readonly col: number,
    public readonly value: T,
    private readonly grid: Grid<T>,
  ) {}

  get left(): Cell<T> | undefined {
    return this.grid.cell(this.row, this.col - 1);
  }

  get right(): Cell<T> | undefined {
    return this.grid.cell(this.row, this.col + 1);
  }

  get top(): Cell<T> | undefined {
    return this.grid.cell(this.row - 1, this.col);
  }

  get bottom(): Cell<T> | undefined {
    return this.grid.cell(this.row + 1, this.col);
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

  matchesPatternInDirection(values: T[], direction: Direction): boolean {
    if (this.value !== values[0]) {
      return false;
    }

    if (values.length === 1) {
      return true;
    }

    return (
      this[direction]?.matchesPatternInDirection(values.slice(1), direction) ??
      false
    );
  }
}
