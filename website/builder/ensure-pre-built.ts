import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';

async function preBuildIcon() {
  const referenceIconName = 'Info';
  try {
    await fs.access(
      resolvePath(fileURLToPath(import.meta.url), `../../../semcore/icon/`, referenceIconName),
    );
    return;
  } catch {}
  // eslint-disable-next-line no-console
  console.info(`\n@semcore/icon are not built yet. Building it for the first time only...\n`);
  await execa('npm', ['run', 'build:icons'], {
    cwd: resolvePath(fileURLToPath(import.meta.url), `../../..`),
    stdio: 'inherit',
  });
  // eslint-disable-next-line no-console
  console.info(`\n@semcore/icon building done\n`);
}

async function preBuildIllustration() {
  const referenceIllustrationName = 'MailSent';
  try {
    await fs.access(
      resolvePath(
        fileURLToPath(import.meta.url),
        `../../../semcore/illustration/`,
        referenceIllustrationName,
      ),
    );
    return;
  } catch {}
  // eslint-disable-next-line no-console
  console.info(
    `\n@semcore/illustration are not built yet. Building it for the first time only...\n`,
  );
  await execa('npm', ['run', 'build:illustration'], {
    cwd: resolvePath(fileURLToPath(import.meta.url), `../../..`),
    stdio: 'inherit',
  });
  // eslint-disable-next-line no-console
  console.info(`\n@semcore/illustration building done\n`);
}

await preBuildIcon();
await preBuildIllustration();
