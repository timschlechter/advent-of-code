import { Grid } from './Grid';
import { Direction } from './Direction';

export class Cell<T> {
  constructor(
    public row: number,
    public col: number,
    public readonly grid: Grid<T>,
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

  get orthogonalNeighbors(): Cell<T>[] {
    return [this.top, this.right, this.bottom, this.left].filter(
      (cell) => cell !== undefined,
    ) as Cell<T>[];
  }

  get neighbors(): Cell<T>[] {
    return [
      this.top,
      this.topRight,
      this.right,
      this.bottomRight,
      this.bottom,
      this.bottomLeft,
      this.left,
      this.topLeft,
    ].filter((cell) => cell !== undefined) as Cell<T>[];
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

  get value(): T {
    return this.grid.value(this.row, this.col) as T;
  }

  set value(value: T) {
    this.grid.values[this.row][this.col] = value;
  }

  matchesPatternInDirection(values: T[], direction: Direction): boolean {
    if (this.grid.value(this.row, this.col) !== values[0]) {
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
  toString(render?: (value: T) => any): string {
    return render ? render(this.value) : `${this.value}: (${this.row},${this.col})`;
  }
  swapValueWith(other: Cell<T>): void {
    [this.value, other.value] = [other.value, this.value];
  }
}
