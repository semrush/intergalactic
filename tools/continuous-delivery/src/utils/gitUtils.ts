import { execSync } from 'child_process';
import process from 'process';

import Git from 'simple-git';

import type { ReleaseVersion } from './changelog';
import { log, prerelaseSuffix } from '../utils';
import { NpmUtils } from './npmUtils';
import type { PackageJson } from './packages';
import type { SeparatedPackage } from '../types/common.types';

const git = Git();

export const gitUtils = {
  initNewPrerelease: async (version: string, packages: PackageJson[]) => {
    const semcoreUiPatch = packages.find((item) => item.name === '@semcore/ui');
    const isIcon = packages.length === 1 && packages[0].name === '@semcore/icon';
    const isIllustration = packages.length === 1 && packages[0].name === '@semcore/illustration';

    if (semcoreUiPatch || isIcon || isIllustration) {
      const newPrereleaseBranch = `prerelease/${version}`;
      await git.checkout(['-b', newPrereleaseBranch]);

      await NpmUtils.updateLockFile();
      await gitUtils.commitChangesFor(packages);
      const tag = await gitUtils.createPrereleaseTag(`${version}`);
      await gitUtils.push(tag);
    }
  },

  initNewToolsRelease: async (tagName: string, packages: PackageJson[]) => {
    const branch = `release/${tagName}`;
    await git.checkout(['-b', branch]);

    await NpmUtils.updateLockFile();
    await gitUtils.commitChangesFor(packages);

    await git.tag([tagName]);
    await git.push(['origin', branch, tagName]);
  },

  getUpdatedPackages: async () => {
    const diff = await git.diffSummary('HEAD^1');
    const components: string[] = [];

    diff.files.forEach((item) => {
      if (item.file.startsWith('semcore') && item.file.endsWith('package.json')) {
        const path = item.file.split('/');
        components.push(`@${path[0]}/${path[1]}`);
      }
    });

    return components;
  },

  getCurrentTag: async (): Promise<string | null> => {
    const branchSummary = await git.branch();
    const currentBranch = branchSummary.current;
    let match = '';

    if (currentBranch.startsWith('prerelease/v')) {
      match = `--match "v*"`;
    } else if (currentBranch.startsWith('prerelease/icon')) {
      match = `--match "icon*"`;
    } else if (currentBranch.startsWith('prerelease/illustration')) {
      match = `--match "illustrations*"`;
    }

    const tag = execSync(`git describe --tags ${match} --abbrev=0`, {
      encoding: 'utf-8',
    });

    return tag.trim();
  },

  getPrerelease: async (): Promise<string | null> => {
    const latestTag = await gitUtils.getCurrentTag();

    if (!latestTag || !latestTag.includes(prerelaseSuffix)) {
      return null;
    }

    return latestTag.split('-')[1];
  },

  alreadyHasCommit: false,

  commitOrAmend: async (message: string) => {
    if (gitUtils.alreadyHasCommit) {
      await git.commit(message, ['--amend', '--no-edit']);
    } else {
      await git.commit(message, []);
      gitUtils.alreadyHasCommit = true;
    }
  },

  commitChangesFor: async (packages: PackageJson[]) => {
    let commitMessage = '[chore] bumped';
    if (packages.length === 1) {
      commitMessage += ' version of ';
    } else {
      commitMessage += ' versions of ';
    }
    commitMessage += packages.map((pack) => `${pack.name}@${pack.version}`).join(', ');

    const status = await git.status();
    if (status.files.length) {
      log('Committing changes...');
      if (!process.argv.includes('--dry-run')) {
        await git.add('.');
        await gitUtils.commitOrAmend(commitMessage);
      }
      log('Changes committed.');
    }
  },

  createPrereleaseTag: async (version: string) => {
    const tagNamePrefix = `${version}-${prerelaseSuffix}.`;

    const tag = await gitUtils.getTag(tagNamePrefix);
    const prerelease = tag?.split('-')[1] ?? null;

    let tagName = tagNamePrefix + '0';

    if (prerelease !== null) {
      const currentItem = Number(prerelease.split('.')[1]);

      if (!Number.isNaN(currentItem)) {
        tagName = `${tagNamePrefix}${currentItem + 1}`;
      }
    }

    await git.tag(['-f', tagName]);

    return tagName;
  },

  pull: async (branch: string) => {
    log('Rebasing on git origin...');
    try {
      await git.pull('origin', branch, { '--rebase': 'true' });
    } catch (err) {
      console.log(await git.status());
      throw err;
    }
    log('Rebased on git origin.');
  },

  push: async (branch: string) => {
    if (!process.argv.includes('--dry-run')) {
      log('Pushing to git origin...');
      await git.push('origin', branch, { '--follow-tags': null });
      log('Pushed to git origin.');
    }
  },

  getTag: async (startStr: string): Promise<string | null> => {
    try {
      const gitTagsList = `git tag -l "${startStr}*" --sort=-v:refname`;

      const execCommands = [gitTagsList];

      if (!startStr.includes('-prerelease')) {
        execCommands.push('grep -v "\\-prerelease\\."');
      }

      execCommands.push('head -n 1');

      const tag = execSync(
        execCommands.join(' | '),
        {
          encoding: 'utf-8',
        },
      );

      return tag.trim();
    } catch (e) {
      console.warn(e);
      return null;
    }
  },

  getPrevReleaseTag: async (): Promise<ReleaseVersion> => {
    const branchSummary = await git.branch();
    const currentBranch = branchSummary.current;
    const testPlaceholder = 'release/v';
    const errorMessage = `Can't get prev release tag not from release branch. Current branch is: "${currentBranch}".`;
    if (currentBranch.startsWith(testPlaceholder)) {
      const versionNumber = currentBranch.substring(testPlaceholder.length, testPlaceholder.length + 2);
      const lastReleasedTag = await gitUtils.getTag(`v${versionNumber}`);

      if (lastReleasedTag === null) {
        throw new Error(errorMessage);
      }

      return lastReleasedTag.slice(1) as ReleaseVersion;
    } else {
      throw new Error(errorMessage);
    }
  },

  getPrevPackageTag: async (pack: SeparatedPackage): Promise<ReleaseVersion> => {
    const tags = await git.tags([`${pack}*`, '--sort', 'creatordate']);
    const releaseTags = tags.all.filter((tag) => !tag.includes(prerelaseSuffix));
    const currentReleaseTag = releaseTags[releaseTags.length - 1];

    return currentReleaseTag.slice(pack.length) as ReleaseVersion;
  },

  getPrevReleaseToolsTag: async (tool: string): Promise<ReleaseVersion> => {
    const tags = await git.tags([`tools/${tool}*`, '--sort', 'creatordate']);

    const { all: allTags } = tags;

    return allTags.at(-1) as ReleaseVersion;
  },
};
