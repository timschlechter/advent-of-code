type Coordinate = { x: number; y: number };
type Button = { dX: number; dY: number; tokens: number; press: () => void };
type Machine = {
  prize: Coordinate;
  buttons: Record<string, Button>;
  claw: Coordinate;
  tokens: number;
};

const parse = (input: string): Machine[] => {
  const buttonRegex = /Button\s.\:\sX\+(\d+),\sY\+(\d+)/g;
  const prizeRegex = /Prize\:\sX=(\d+),\sY=(\d+)/g;
  return input.split('\n\n').map((machineLines) => {
    const [a, b, p] = machineLines.split('\n');
    const [_a, aX, aY] = [...a.matchAll(buttonRegex)][0].map((v) =>
      parseInt(v),
    );
    const [_b, bX, bY] = [...b.matchAll(buttonRegex)][0].map((v) =>
      parseInt(v),
    );
    const prize = [...p.matchAll(prizeRegex)][0];

    const press = (button: Button, machine: Machine) => {
      machine.claw.x += button.dX;
      machine.claw.y += button.dY;
      machine.tokens += button.tokens;
    };

    const machine = {
      prize: { x: parseInt(prize[1]), y: parseInt(prize[2]) },
      claw: { x: 0, y: 0 },
      tokens: 0,
      buttons: {
        A: {
          dX: aX,
          dY: aY,
          tokens: 3,
          press: function () {
            press(this, machine);
          },
        },
        B: {
          dX: bX,
          dY: bY,
          tokens: 1,
          press: function () {
            press(this, machine);
          },
        },
      } as Record<string, Button>,
    };
    return machine;
  });
};

const calculateCosts = (machine: Machine): number => {
  let minCost = Number.MAX_SAFE_INTEGER;
  const maxAX = Math.floor(machine.prize.x / machine.buttons.A.dX);
  const maxAY = Math.floor(machine.prize.y / machine.buttons.A.dY);
  const maxBX = Math.floor(machine.prize.x / machine.buttons.B.dX);
  const maxBY = Math.floor(machine.prize.y / machine.buttons.B.dY);

  const maxA = Math.min(maxAX, maxAY, 100);
  const maxB = Math.min(maxBX, maxBY, 100);

  const instructions = ('A'.repeat(maxA) + 'B'.repeat(maxB)).split('');
  for (let start = 0; start < instructions.length; start++) {
    machine.claw = { x: 0, y: 0 };
    machine.tokens = 0;
    for (const instruction of instructions.slice(start)) {
      machine.buttons[instruction].press();

      if (
        machine.claw.x === machine.prize.x &&
        machine.claw.y === machine.prize.y
      ) {
        minCost = Math.min(minCost, machine.tokens);
        break;
      }
      if (
        machine.claw.x > machine.prize.x ||
        machine.claw.y > machine.prize.y
      ) {
        break;
      }
    }
  }
  return minCost === Number.MAX_SAFE_INTEGER ? NaN : minCost;
};

export const part1 = (input: string) => {
  return parse(input)
    .map((machine) => calculateCosts(machine))
    .reduce((acc, curr) => acc + (isNaN(curr) ? 0 : curr), 0);
};

export const part2 = (input: string) => {
  return parse(input);
};
