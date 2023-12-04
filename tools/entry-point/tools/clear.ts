import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

fs.remove(path.resolve(dirname, 'libs'));
