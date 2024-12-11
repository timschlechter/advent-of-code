import { readExample, readInput } from '../utils';
import { part1, part2 } from '.';

describe('day12', () => {
  it('part1 example', async () => {
    const example = await readExample(__dirname);
    expect(part1(example)).toBe(140);
  });
  it('part1 example 2', async () => {
    const example = await readExample(__dirname, 2);
    expect(part1(example)).toBe(772);
  });
  it('part1 example 3', async () => {
    const example = await readExample(__dirname, 3);
    expect(part1(example)).toBe(1930);
  });
  it('part1 solution', async () => {
    const input = await readInput(__dirname);
    expect(part1(input)).toBe(1304764);
  });
  it('part2 example', async () => {
    const example = await readExample(__dirname);
    expect(part2(example)).toBe(80);
  });

  it('part2 example 2', async () => {
    const example = await readExample(__dirname, 2);
    expect(part2(example)).toBe(436);
  });
it('part2 example 4', async () => {
  const example = await readExample(__dirname, 4);
  expect(part2(example)).toBe(368);
});
  
  it('part2 solution', async () => {
    const input = await readInput(__dirname);
    expect(part2(input)).toBe(811148);
  });
});
