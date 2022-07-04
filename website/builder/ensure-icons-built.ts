import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';

const referenceIconName = 'Info';
try {
  await fs.access(
    resolvePath(fileURLToPath(import.meta.url), `../../../semcore/icon/`, referenceIconName),
  );
  process.exit(0);
} catch {}
// eslint-disable-next-line no-console
console.info(`\n@semcore/icon are not built yet. Building it for the first time only...\n`);
await execa('npm', ['run', 'build:icons'], {
  cwd: resolvePath(fileURLToPath(import.meta.url), `../../..`),
  stdio: 'inherit',
});
// eslint-disable-next-line no-console
console.info(`\n@semcore/icon building done\n`);
