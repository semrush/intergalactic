import { Package } from './collectPackages';
import Git from 'simple-git';
import { log } from './utils';
const git = Git();

export const commitVersionsPatch = async (packages: Package[]) => {
  log('Committing changes...');
  await git.add('.');
  await git.commit(['[chore] changed versions from beta prereleases to latests'], []);
  log('Lockfile committed.');
  log('Rebasing on git origin...');
  try {
    await git.pull('origin', 'release-lock-testing', { '--rebase': 'true' });
  } catch (err) {
    // rome-ignore lint/nursery/noConsoleLog:
    console.log(await git.status());
    throw err;
  }
  log('Rebased on git origin.');
  log('Pushing to git origin...');
  await git.push('origin', 'release-lock-testing', { '--follow-tags': null });
  log('Pushed to git origin.');
};
