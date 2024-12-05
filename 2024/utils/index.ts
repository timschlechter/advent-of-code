import { promises as fs } from 'fs';
import path from 'path';

export * from './grid';

export const readInput = (folder: string) =>
  fs.readFile(path.resolve(folder, 'input.txt'), 'utf-8');

export const readExample = (folder: string, number?: number) =>
  fs.readFile(path.resolve(folder, `example${number ?? ''}.txt`), 'utf-8');

export const arraysAreEqual = <T>(arr1: T[], arr2: T[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};
