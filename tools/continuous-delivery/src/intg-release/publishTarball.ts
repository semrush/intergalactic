import { log } from '../utils';
import { execSync } from 'child_process';

export const publishTarball = async (name: string, dirname: string) => {
  log('Publishing package...');

  const pnpmOptions = process.argv.includes('--dry-run')
    ? '--dry-run --no-git-checks'
    : '--no-git-checks';

  log(`pnpm options "${pnpmOptions}".`);

  log(`Publishing ${name}...`);
  execSync(`pnpm publish ${pnpmOptions}`, {
    cwd: dirname,
    encoding: 'utf-8',
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  log(`Publishing of ${name} is finished.`);
};
