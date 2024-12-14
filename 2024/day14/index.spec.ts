import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day8', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example, 11, 7)).toBe(12);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input, 101, 103)).toBe(0);
  });
  // it('part2 example', async () => {
  //   const example = await readExample(__dirname);
  //   expect(part2(example)).toBe(0);
  // });
  // it('part2 solution', async () => {
  //   const input = await readInput(__dirname);
  //   expect(part2(input)).toBe(0);
  // });
});
