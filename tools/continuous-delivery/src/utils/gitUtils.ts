import Git from 'simple-git';
import { log, prerelaseSuffix } from '../utils';
import { VersionPatch } from '../makeVersionPatches';
import { NpmUtils } from './npmUtils';

const git = Git();

export class GitUtils {
  public static async initNewPrerelease(versionPatches: VersionPatch[]) {
    const semcoreUiPatch = versionPatches.find((item) => item.package.name === '@semcore/ui');

    if (semcoreUiPatch) {
      const newPrereleaseBranch = `prerelease/v${semcoreUiPatch.to}`;
      await git.checkout(['-b', newPrereleaseBranch]);

      await NpmUtils.updateLockFile();
      await GitUtils.commitNewPrerelease(versionPatches);
      const tag = await GitUtils.createPrereleaseTag(semcoreUiPatch);
      await GitUtils.push(tag);
    }
  }

  public static async getUpdatedPackages() {
    const diff = await git.diffSummary('HEAD^1');
    const components: string[] = [];

    diff.files.forEach((item) => {
      if (item.file.startsWith('semcore') && item.file.endsWith('package.json')) {
        const path = item.file.split('/');
        components.push(`@${path[0]}/${path[1]}`);
      }
    });

    return components;
  }

  public static async getPrerelease(): Promise<string | null> {
    const tags = await git.tags();
    const latestTag = tags.latest;

    if (!latestTag || !latestTag.includes(prerelaseSuffix)) {
      return null;
    }

    return latestTag.split('-')[1];
  }

  private static alreadyHasCommit = false;

  private static async commitOrAmend(message: string) {
    if (GitUtils.alreadyHasCommit) {
      await git.commit(message, ['--amend', '--no-edit']);
    } else {
      await git.commit(message, []);
      GitUtils.alreadyHasCommit = true;
    }
  }

  private static async commitNewPrerelease(versionPatches: VersionPatch[]) {
    let commitMessage = '[chore] bumped';
    if (versionPatches.length === 1) {
      commitMessage += ' version of ';
    } else {
      commitMessage += ' versions of ';
    }
    commitMessage += versionPatches.map((patch) => `${patch.package.name}@${patch.to}`).join(', ');

    const status = await git.status();
    if (status.files.length) {
      log('Committing changes...');
      if (!process.argv.includes('--dry-run')) {
        await git.add('.');
        await GitUtils.commitOrAmend(commitMessage);
      }
      log('Changes committed.');
    }
  }

  private static async createPrereleaseTag(patch: VersionPatch) {
    const prerelease = await GitUtils.getPrerelease();

    let tag = `v${patch.to}-${prerelaseSuffix}.0`;

    if (prerelease !== null) {
      const currentItem = Number(prerelease.split('.')[1]);

      if (!Number.isNaN(currentItem)) {
        tag = `v${patch.to}-${prerelaseSuffix}.${currentItem + 1}`;
      }
    }

    await git.tag(['-f', tag]);

    return tag;
  }

  private static async pull(branch: string) {
    log('Rebasing on git origin...');
    try {
      await git.pull('origin', branch, { '--rebase': 'true' });
    } catch (err) {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log(await git.status());
      throw err;
    }
    log('Rebased on git origin.');
  }

  private static async push(branch: string) {
    if (!process.argv.includes('--dry-run')) {
      log('Pushing to git origin...');
      await git.push('origin', branch, { '--follow-tags': null });
      log('Pushed to git origin.');
    }
  }
}
