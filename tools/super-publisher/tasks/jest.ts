import execa from 'execa';
import { createTask } from '../task';

export const jestTask = createTask('Testing', async (opt) => {
  if (!opt.test) {
    opt.skip();
    return opt;
  }

  const { root } = opt;
  opt.progress('processing...');
  await execa('npm', ['run', 'test', '--', '--no-cache'], {
    cwd: root ? root : process.cwd(),
    stdio: 'inherit',
  });

  return opt;
});
