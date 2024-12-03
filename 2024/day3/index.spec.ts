import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day2', () => {
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(161289189);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(83595109);
  });
});
