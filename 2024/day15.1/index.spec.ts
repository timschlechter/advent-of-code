import { solve } from '.';
import { readExample, readInput } from '../utils';

describe('day15.1', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(solve(example)).toBe(10092);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(solve(input)).toBe(1515788);
  });
});
