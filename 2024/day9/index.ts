type File = { id: number; size: number };
type Free = { size: number };
type Disk = (File | Free)[];

const parse = (input: string): Disk =>
  input
    .split('')
    .map((x, i) =>
      i % 2 === 0 ? { id: i / 2, size: parseInt(x) } : { size: parseInt(x) },
    );

const isFile = (value: File | Free) => 'id' in value;

const normalize = (disk: Disk): number[] =>
  disk.flatMap((curr) =>
    isFile(curr) ? Array(curr.size).fill(curr.id) : Array(curr.size).fill(NaN),
  );

export const part1 = (input: string) => {
  const disk = normalize(parse(input));

  let endIdx = disk.length - 1;
  for (let i = 0; i < endIdx; i++) {
    const a = disk[i];
    if (isNaN(a)) {
      for (let j = endIdx; j > 0; j--) {
        const b = disk[j];
        if (!isNaN(b)) {
          [disk[i], disk[j]] = [disk[j], NaN];
          endIdx = j;
          break;
        }
      }
    }
  }

  return disk
    .map((x, i) => (isNaN(x) ? 0 : x * i))
    .reduce((acc, curr) => acc + curr, 0);
};

export const part2 = (input: string) => {
  const disk = parse(input);

  const files = disk.filter(isFile);
  for (const file of files.reverse()) {
    const fileIdx = disk.indexOf(file);
    for (let i = 0; i < fileIdx; i++) {
      const block = disk[i];
      if (!isFile(block) && block.size >= file.size) {
        block.size -= file.size;
        disk[fileIdx] = { size: file.size };
        if (block.size === 0) {
          disk[i] = file;
        } else {
          disk.splice(i, 0, file);
        }

        break;
      }
    }
  }

  return normalize(disk)
    .map((x, i) => (isNaN(x) ? 0 : i * x))
    .reduce((acc, curr) => acc + curr, 0);
};
