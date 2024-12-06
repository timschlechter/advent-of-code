import { dir } from 'console';
import { Cell } from './Cell';
import { AllDirections, Direction } from './Direction';

export class Grid<T> {
  readonly cells: Cell<T>[];

  constructor(public values: T[][]) {
    this.cells = [];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.cells.push(new Cell(row, col, this));
      }
    }
  }

  get height(): number {
    return this.values.length;
  }

  get width(): number {
    return this.values[0]?.length || 0;
  }

  exists(row: number, col: number): boolean {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  cell(row: number, col: number): Cell<T> | undefined {
    return this.exists(row, col)
      ? this.cells[row * this.width + col]
      : undefined;
  }

  value(row: number, col: number): T | undefined {
    return this.exists(row, col) ? this.values[row][col] : undefined;
  }

  /**
   * Returns all cells/direction combinations that match the given pattern
   */
  findPattern(pattern: T[]): { cell: Cell<T>; direction: Direction }[] {
    return this.cells.flatMap((cell) =>
      AllDirections.filter((direction) =>
        cell.matchesPatternInDirection(pattern, direction),
      ).map((direction) => ({ cell, direction })),
    );
  }

  toString() {
    return this.values.map((row) => row.join('')).join('\n');
  }
}
