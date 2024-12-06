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

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
    case Direction.Top:
      return Direction.Bottom;
    case Direction.Bottom:
      return Direction.Top;
    case Direction.TopLeft:
      return Direction.BottomRight;
    case Direction.TopRight:
      return Direction.BottomLeft;
    case Direction.BottomLeft:
      return Direction.TopRight;
    case Direction.BottomRight:
      return Direction.TopLeft;
  }
}