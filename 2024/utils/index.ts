import { promises as fs } from 'fs';
import path from 'path';

export * from './Grid';

export const readInput = (folder: string) =>
  fs.readFile(path.resolve(folder, 'input.txt'), 'utf-8');

export const readExample = (folder: string, number?: number) =>
  fs.readFile(path.resolve(folder, `example${number??''}.txt`), 'utf-8');

