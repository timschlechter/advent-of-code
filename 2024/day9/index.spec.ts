import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day9', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(1928);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(6307275788409);
  }); 
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(2858);
  });
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(6327174563252);
  });
});
