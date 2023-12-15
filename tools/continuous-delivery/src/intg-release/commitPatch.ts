import Git from 'simple-git';
import { log } from '../utils';

const git = Git();

export const commitPatch = async (tag?: string) => {
  log('Rebasing on git origin...');
  try {
    await git.pull('origin', 'master', { '--rebase': 'true' });
  } catch (err) {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log(await git.status());
    throw err;
  }
  log('Rebased on git origin.');
  await git.add('.');
  await git.commit(['[chore] changed versions from beta prereleases to latests']);
  if (tag) {
    await git.tag(['-f', tag]);
  }
  log('Pushing to git origin...');
  await git.push('origin', 'master');
  log('Pushed to git origin.');
};
