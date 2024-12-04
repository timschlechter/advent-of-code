import { readExample, readInput, readExample2 } from '../utils';
import { part1, part2 } from '.';

describe('day2', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(161);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(161289189);
  });
  it('part2 example', async () => {
    const example = await readExample2(__dirname);
    expect(part2(example)).toBe(48);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(83595109);
  });
});
