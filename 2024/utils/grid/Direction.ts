export enum Direction {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
}

export type StraightDirection = Direction.Left | Direction.Right | Direction.Top | Direction.Bottom;

export const AllDirections = Object.values(Direction);
