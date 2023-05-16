import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';

const fsEntities = await fs.readdir('.');
const arraysShallowEqual = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((item) => b.includes(item));
const needToBeRemoved = await Promise.all(
  fsEntities.map(async (name) => {
    const path = resolvePath('.', name);
    const stat = await fs.stat(path);
    if (!stat.isDirectory()) return false;
    const subEntities = await fs.readdir(path);
    if (subEntities.length === 0) return true;
    if (arraysShallowEqual(subEntities, ['index.d.ts', 'index.js', 'index.mjs'])) return true;
    if (arraysShallowEqual(subEntities, ['cjs', 'es6', 'types'])) return true;

    return false;
  }),
);

await Promise.all(
  fsEntities
    .filter((_, index) => needToBeRemoved[index])
    .map((name) => fs.rm(name, { recursive: true, force: true })),
);
