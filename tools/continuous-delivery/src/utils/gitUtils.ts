import Git from 'simple-git';
import { log, prerelaseSuffix } from '../utils';
import { VersionPatch } from '../makeVersionPatches';

const git = Git();

export class GitUtils {
  public static async commitNewPrerelease(versionPatches: VersionPatch[]) {
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

  public static async createPrereleaseTag(patch: VersionPatch) {
    const prerelease = await GitUtils.getPrerelease();

    let tag = `${patch.to}-${prerelaseSuffix}.0`;

    if (prerelease !== null) {
      const currentItem = Number(prerelease.split('.')[1]);

      if (!Number.isNaN(currentItem)) {
        tag = `${patch.to}-${prerelaseSuffix}.${currentItem + 1}`;
      }
    }

    await git.tag(['-f', tag]);

    return tag;
  }

  public static async push(branch: string, tag?: string) {
    if (!process.argv.includes('--dry-run')) {
      log('Rebasing on git origin...');
      try {
        await git.pull('origin', branch, { '--rebase': 'true' });
      } catch (err) {
        // biome-ignore lint/suspicious/noConsoleLog:
        console.log(await git.status());
        throw err;
      }
      log('Rebased on git origin.');
      log('Pushing to git origin...');
      await git.push('origin', tag);
      await git.push('origin', branch, { '--follow-tags': null });
      log('Pushed to git origin.');
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
}
