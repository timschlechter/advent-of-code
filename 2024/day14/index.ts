import { Cell } from '../utils';

type Robot = { pX: number; pY: number; vX: number; vY: number };

const parse = (input: string): Robot[] => {
  return input.split('\n').map((line) => {
    const match = line.match(/p=(\d+),(\d+)\sv=(-?\d+),(-?\d+)/);
    const [pX, pY, vX, vY] = match!.slice(1).map((x) => parseInt(x, 10));
    return { pX, pY, vX, vY };
  });
};

const render = (robots: Robot[], w: number, h: number) => {
  let s = '';
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      s += robots.filter((r) => r.pX === j && r.pY === i).length || '.';
    }
    s += '\n';
  }
  return s;
};

export const part1 = (input: string, W: number, H: number) => {
  const robots = parse(input);

  for (let i = 0; i < 100; i++) {
    for (const robot of robots) {
      robot.pX += robot.vX;
      robot.pY += robot.vY;

      if (robot.pX >= W) {
        robot.pX = robot.pX % W;
      } else if (robot.pX < 0) {
        robot.pX = W - (Math.abs(robot.pX) % W);
      }
      if (robot.pY >= H) {
        robot.pY = robot.pY % H;
      } else if (robot.pY < 0) {
        robot.pY = H - (Math.abs(robot.pY) % H);
      }
    }
  }

  const quadrants = [0, 0, 0, 0];
  for (const robot of robots) {
    if (robot.pX < (W - 1) / 2) {
      if (robot.pY < (H - 1) / 2) {
        quadrants[0]++;
      } else if (robot.pY > (H - 1) / 2) {
        quadrants[1]++;
      }
    } else if (robot.pX > (W - 1) / 2) {
      if (robot.pY < (H - 1) / 2) {
        quadrants[2]++;
      } else if (robot.pY > (H - 1) / 2) {
        quadrants[3]++;
      }
    }
  }

  return quadrants.reduce((acc, curr) => acc * curr, 1);
};

export const part2 = (input: string) => {
  return parse(input);
};
