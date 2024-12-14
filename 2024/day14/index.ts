type Robot = { x: number; y: number; dX: number; dY: number };

const parse = (input: string): Robot[] =>
  input.split('\n').map((line) => {
    const match = line.match(/p=(\d+),(\d+)\sv=(-?\d+),(-?\d+)/);
    const [x, y, dX, dY] = match!.slice(1).map((x) => parseInt(x, 10));
    return { x, y, dX, dY };
  });

const render = (robots: Robot[], w: number, h: number) => {
  let s = '';
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      s += robots.filter((r) => r.x === j && r.y === i).length || '.';
    }
    s += '\n';
  }
  return s;
};

export const part1 = (input: string, width: number, height: number) => {
  const robots = parse(input);

  for (let i = 0; i < 100; i++) {
    for (const robot of robots) {
      robot.x = (robot.x + (robot.dX % width) + width) % width;
      robot.y = (robot.y + (robot.dY % height) + height) % height;
    }
  }

  const quadrants = [0, 0, 0, 0];
  const midX = (width - 1) / 2;
  const midY = (height - 1) / 2;
  for (const robot of robots) {
    if (robot.x < midX) {
      if (robot.y < midY) {
        quadrants[0]++;
      } else if (robot.y > midY) {
        quadrants[1]++;
      }
    } else if (robot.x > midX) {
      if (robot.y < midY) {
        quadrants[2]++;
      } else if (robot.y > midY) {
        quadrants[3]++;
      }
    }
  }

  return quadrants.reduce((acc, curr) => acc * curr, 1);
};

export const part2 = (input: string) => {
  const robots = parse(input);

  const width = 101;
  const height = 103;

  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    // Hope to see a xmas tree when all robots are on a unique position
    const allOnUniquePos = !robots.find((a) =>
      robots.find((b) => b != a && b.x === a.x && b.y === a.y),
    );
    if (allOnUniquePos) {
      console.log(i, render(robots, width, height));
      return i;
    }

    for (const robot of robots) {
      robot.x = (robot.x + (robot.dX % width) + width) % width;
      robot.y = (robot.y + (robot.dY % height) + height) % height;
    }
  }
};
