import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day16', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toEqual(7036);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(98520);
  });
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(45);
  });
  it('part2 example 2', async () => {
    const example = await readExample(__dirname, 2);
    expect(part2(example)).toBe(64);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(609);
  });
});
