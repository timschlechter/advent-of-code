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

export type OrthogonalDirection =
  | Direction.Left
  | Direction.Right
  | Direction.Top
  | Direction.Bottom;

export const Directions = Object.values(Direction);
export const OrthogonalDirections = [
  Direction.Left,
  Direction.Right,
  Direction.Top,
  Direction.Bottom,
];

export const opposite = (direction: Direction): Direction => {
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
};

export enum Degrees {
  Ninety,
  OneEighty,
  TwoSeventy,
}

export const rotate90 = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.Left:
      return Direction.Top;
    case Direction.Right:
      return Direction.Bottom;
    case Direction.Top:
      return Direction.Right;
    case Direction.Bottom:
      return Direction.Left;
    case Direction.TopLeft:
      return Direction.TopRight;
    case Direction.TopRight:
      return Direction.BottomRight;
    case Direction.BottomRight:
      return Direction.BottomLeft;
    case Direction.BottomLeft:
      return Direction.TopLeft;
  }
};
