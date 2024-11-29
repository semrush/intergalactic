import { log } from '../utils';
import { execSync } from 'child_process';

export class NpmUtils {
  public static async publish(packages: string[], prerelease?: boolean) {
    log('Running publisher...');
    if (packages.length === 0) {
      log('No versions patches found, stopping.');
      return;
    }

    let pnpmOptions = process.argv.includes('--dry-run')
      ? '--dry-run --no-git-checks'
      : '--no-git-checks';

    const hasSemcoreUi = packages.some((pack) => pack === '@semcore/ui');
    const nonSemcoreUiPatches = packages.filter((pack) => pack !== '@semcore/ui');
    const pnpmFilter = nonSemcoreUiPatches.map((pack) => `--filter ${pack}`).join(' ');

    if (prerelease) {
      pnpmOptions += ' --tag beta';
    }

    log(`pnpm filter "${pnpmFilter}".`);
    log(`pnpm options "${pnpmOptions}".`);

    // if (nonSemcoreUiPatches.length !== 0) {
    //   if (!prerelease && !process.argv.includes('--dry-run')) {
    //     await NpmUtils.uploadStatic(pnpmFilter);
    //   }
    //
    //   await this.publishComponents(pnpmFilter, pnpmOptions);
    // }
    if (hasSemcoreUi) {
      await this.publishSemcoreUi(pnpmOptions);
    }
  }

  public static async updateLockFile() {
    log('Updating lockfile...');
    execSync('pnpm install --frozen-lockfile false', {
      stdio: 'inherit',
    });
    log('Lockfile updated.');
  }

  public static async uploadStatic(pnpmFilter: string) {
    log('Uploading static files...');
    execSync(`pnpm ${pnpmFilter} run upload-static`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('Static upload done.');
  }

  private static async publishComponents(pnpmFilter: string, pnpmOptions: string) {
    log('Publishing to registry...');
    execSync(`pnpm ${pnpmFilter} publish ${pnpmOptions}`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('Published.');
  }

  private static async publishSemcoreUi(pnpmOptions: string) {
    log('Building reexports...');
    execSync('pnpm --filter @semcore/ui run build', {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('Building reexports done.');
    log('Publishing @semcore/ui...');
    execSync(`pnpm --filter @semcore/ui publish ${pnpmOptions}`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('@semcore/ui published.');
  }
}
