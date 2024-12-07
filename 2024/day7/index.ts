enum Operator {
  Add = 0,
  Multiply = 1,
  Concat = 2,
}

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

const calculate = (a: number, b: number, op: Operator): number => {
  if (op === Operator.Add) return a + b;
  if (op === Operator.Multiply) return a * b;
  return a * (b < 10 ? 10 : b < 100 ? 100 : 1000) + b;
};

const canSolve = (eq: Equation, operators: Operator[]): boolean => {
  const {
    target,
    start,
    values: [head, ...tail],
  } = eq;

  if (start > target) return false;
  if (!head) return start === target;

  return operators.some((op) => {
    const eq = {
      target,
      start: calculate(start, head, op),
      values: tail,
    };
    return canSolve(eq, operators);
  });
};

export const part1 = (input: string) =>
  parse(input)
    .filter((eq) => canSolve(eq, [Operator.Add, Operator.Multiply]))
    .reduce((acc, curr) => acc + curr.target, 0);

export const part2 = (input: string) =>
  parse(input)
    .filter(
      (eq) =>
        canSolve(eq, [Operator.Add, Operator.Multiply]) ||
        canSolve(eq, [Operator.Add, Operator.Multiply, Operator.Concat]),
    )
    .reduce((acc, curr) => acc + curr.target, 0);
