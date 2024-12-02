import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day1', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(11);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(2031679);
  });
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(31);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(19678534);
  });
});
