type Equation = {
  target: number;
  start: number;
  values: number[];
};

const parse = (input: string): Equation[] =>
  input
    .split('\n')
    .map((line) => line.split(' ').map((x) => parseInt(x)))
    .map((line) => {
      const [target, start, ...values] = line;
      return { target, start, values };
    });

const calculate = (a: number, b: number, op: string): number => {
  if (op === '+') return a + b;
  if (op === '*') return a * b;
  if (op === '||') return parseInt(`${a}${b}`, 10);

  throw new Error(`Unsupported operator: ${op}`);
};

const canSolve = (eq: Equation, operators: string[]): boolean => {
  const { target, start, values } = eq;

  if (start > target) return false;
  if (values.length === 0) return start === target;

  return operators.some((op) =>
    canSolve(
      {
        target,
        start: calculate(start, values[0], op),
        values: values.slice(1),
      },
      operators,
    ),
  );
};

export const part1 = (input: string) =>
  parse(input)
    .filter((eq) => canSolve(eq, ['+', '*']))
    .reduce((acc, curr) => acc + curr.target, 0);

export const part2 = (input: string) =>
  parse(input)
    .filter((eq) => canSolve(eq, ['+', '*', '||']))
    .reduce((acc, curr) => acc + curr.target, 0);
