import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day8', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(14);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(261);
  });
  it('part2 example 2', async () => {
    const example = await readExample(__dirname, 2);
    expect(part2(example)).toBe(9);
  });
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(34);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(898);
  });
});
