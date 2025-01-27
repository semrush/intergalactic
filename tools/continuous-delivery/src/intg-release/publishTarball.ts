import { log } from '../utils';
import { execSync } from 'node:child_process';

export const publishTarball = async (name: string, dirname: string, prerelease?: boolean) => {
  log('Publishing package...');

  let pnpmOptions = process.argv.includes('--dry-run')
    ? '--dry-run --no-git-checks'
    : '--no-git-checks';

  if (prerelease) {
    pnpmOptions += ' --tag beta';
  }

  log(`pnpm options "${pnpmOptions}".`);

  log(`Publishing ${name}...`);
  execSync(`pnpm publish ${pnpmOptions}`, {
    cwd: dirname,
    encoding: 'utf-8',
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  log(`Publishing of ${name} is finished.`);
};
