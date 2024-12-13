type Machine = {
  aX: number; // increment X when A pressed
  aY: number; // increment Y when A pressed
  bX: number; // increment X when B pressed
  bY: number; // increment Y when B pressed
  pX: number; // X of price
  pY: number; // Y of price
};

const parse = (input: string): Machine[] => {
  return input.split('\n\n').map((machineLines) => {
    const matches = machineLines.matchAll(/X[+=](\d+),\sY[+=]?(\d+)/g);
    const [aX, aY, bX, bY, pX, pY] = [...matches]
      .flatMap((match) => [match[1], match[2]])
      .map((x) => parseInt(x));

    return { aX, aY, bX, bY, pX, pY };
  });
};

const calculateCosts = ({ aX, aY, bX, bY, pX, pY }: Machine): number => {
  // A: number of times A pressed
  // B: number of times B pressed

  // aX*A + bX*B = pX
  // aY*A + bY*B = pY

  // Cancel out A part to calculate B

  // (aX* aY)*A + (bX* aY)*B      = pX* aY
  // (aY*-aX)*A + (bY*-aX)*B      = pY*-aX
  // --------------------------------------------- +
  //      0     + bX*aY + bY*-aX  = pX*aY + pY*-aX
  const B = (pX * aY + pY * -aX) / (bX * aY + bY * -aX);

  // Plug B in one of the original equations to calculate A
  const A = (pX - bX * B) / aX;

  return Number.isInteger(A) && Number.isInteger(B) ? A * 3 + B : 0;
};

export const part1 = (input: string) => {
  return parse(input)
    .map((machine) => calculateCosts(machine))
    .reduce((acc, curr) => acc + curr, 0);
};

export const part2 = (input: string) => {
  return parse(input)
    .map((machine) => ({
      ...machine,
      pX: machine.pX + 10_000_000_000_000,
      pY: machine.pY + 10_000_000_000_000,
    }))
    .map((machine) => calculateCosts(machine))
    .reduce((acc, curr) => acc + curr, 0);
};
