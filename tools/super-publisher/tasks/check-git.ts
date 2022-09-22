import Git from 'simple-git';
import { createTask } from '../task';

const git = Git();

export const checkGitTask = createTask('GIT check', async (opt) => {
  if (!opt.checkGit) {
    opt.skip();
    return opt;
  }

  opt.progress('processing...');

  const status = await git.status();
  const fetch = await git.fetch(['--dry-run']);

  if (fetch.remote) {
    // eslint-disable-next-line no-console
    console.log(fetch);
    throw new Error(
      'Your local VCS branch head is behind the remote one. Run `git pull` to be up to date.',
    );
  }

  if (status.current !== 'master' && !status.current.startsWith('release/')) {
    throw new Error('To publish components, switch to `master` or `release/*` branch.');
  }

  if (status.files.length) {
    opt.warn('Your local repo contains changes that will be automatically committed now.');
  }
  return opt;
});
