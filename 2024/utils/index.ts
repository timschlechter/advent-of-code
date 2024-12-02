import { promises as fs } from 'fs';
import path from 'path';

export const readInput = (folder: string) =>
  fs.readFile(path.resolve(folder, 'input.txt'), 'utf-8');

export const readExample = (folder: string) =>
  fs.readFile(path.resolve(folder, 'example.txt'), 'utf-8');
