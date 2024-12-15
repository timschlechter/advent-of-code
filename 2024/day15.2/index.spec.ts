import { solve } from '.';
import { readExample, readInput } from '../utils';

describe('day15.2', () => {
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(solve(example)).toBe(9021);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(solve(input)).toBe(1516544);
  });
});
