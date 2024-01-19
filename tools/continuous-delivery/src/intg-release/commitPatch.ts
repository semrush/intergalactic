import Git from 'simple-git';
import { log } from '../utils';
import { execSync } from 'child_process';

const git = Git();

export const commitPatch = async (tag?: string) => {
  log('Updating lockfile...');
  execSync('pnpm install --frozen-lockfile false', {
    stdio: 'inherit',
  });
  log('Lockfile updated.');

  log('Committing changes...');
  await git.add('.');
  await git.commit(['[chore] changed versions from beta prereleases to latests'], []);
  log('Lockfile committed.');
  if (tag) {
    await git.tag(['-f', tag]);
  }

  log('Rebasing on git origin...');
  try {
    await git.pull('origin', 'master', { '--rebase': 'true' });
  } catch (err) {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log(await git.status());
    throw err;
  }
  log('Rebased on git origin.');

  log('Pushing to git origin...');
  await git.push('origin', 'master', ['--tags']);
  log('Pushed to git origin.');
};
