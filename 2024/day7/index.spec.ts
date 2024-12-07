import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day7', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(3749);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(6392012777720);
  });
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(11387);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(61561126043536);
  });
});
