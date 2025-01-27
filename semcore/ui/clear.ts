import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const toRemove = [
  ...glob.sync('!(*.*|__tests__|node_modules)', { onlyDirectories: true }),
  'pnpm-lock.yaml',
];
try {
  await Promise.all(toRemove.map((filePath) => fs.remove(path.resolve(dirname, filePath))));
} catch (e) {}
