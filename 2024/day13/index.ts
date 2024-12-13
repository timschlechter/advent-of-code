import { machine } from 'os';

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

// aX: increment X when A pressed
// aY: increment Y when A pressed
// bX: increment X when B pressed
// bY: increment Y when B pressed
// A: number of times A pressed
// B: number of times B pressed
// pX: X of price
// pY: B of price
export const solve = (
  aX: number,
  aY: number,
  bX: number,
  bY: number,
  pX: number,
  pY: number,
): { A: number; B: number } => {
  // aX*A + bX*B = pX
  // aY*A + bY*B = pY

  // Cancel out A part to calculate B

  // (aX* aY)*A + (bX* aY)*B      = pX* aY
  // (aY*-aX)*A + (bY*-aX)*B      = pY*-aX
  // ---------------------------------------------  +
  //      0     + bX*aY + bY*-aX  = pX*aY + pY*-aX
  const B = (pX * aY + pY * -aX) / (bX * aY + bY * -aX);

  // Plug in B to calculate A
  const A = (pX - bX * B) / aX;

  return { A, B };
};

const calculateCosts = (machine: Machine): number => {
  const [
    aX, // increment X when A pressed
    aY, // increment Y when A pressed
    bX, // increment X when B pressed
    bY, // increment Y when B pressed
    pX, // X of price
    pY, // Y of price
  ] = [
    machine.buttons.A.dX,
    machine.buttons.A.dY,
    machine.buttons.B.dX,
    machine.buttons.B.dY,
    machine.prize.x,
    machine.prize.y,
  ];

  // A: number of times A pressed
  // B: number of times B pressed

  // aX*A + bX*B = pX
  // aY*A + bY*B = pY

  // Cancel out A part to calculate B

  // (aX* aY)*A + (bX* aY)*B      = pX* aY
  // (aY*-aX)*A + (bY*-aX)*B      = pY*-aX
  // ---------------------------------------------  +
  //      0     + bX*aY + bY*-aX  = pX*aY + pY*-aX
  const B = (pX * aY + pY * -aX) / (bX * aY + bY * -aX);

  // Plug in B to calculate A
  const A = (pX - bX * B) / aX;

  return Number.isInteger(A) && Number.isInteger(B)
    ? A * machine.buttons.A.tokens + B * machine.buttons.B.tokens
    : NaN;
};

export const part1 = (input: string) => {
  return parse(input)
    .map((machine) => calculateCosts(machine))
    .reduce((acc, curr) => acc + (isNaN(curr) ? 0 : curr), 0);
};

export const part2 = (input: string) => {
  return parse(input)
    .map((machine) => ({
      ...machine,
      prize: {
        x: machine.prize.x + 10000000000000,
        y: machine.prize.y + 10000000000000,
      },
    }))
    .map((machine) => calculateCosts(machine))
    .reduce((acc, curr) => acc + (isNaN(curr) ? 0 : curr), 0);
};
