import { rm } from 'node:fs/promises';

import { glob } from 'glob';

const paths = await glob('./semcore/*/lib');

paths.forEach(async (path) => {
  await rm(path, { recursive: true, force: true });
});
