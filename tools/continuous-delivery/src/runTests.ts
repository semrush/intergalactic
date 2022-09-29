import { execSync } from 'child_process';

export const runTests = async () => {
  // eslint-disable-next-line no-console
  console.log(`Running tests`);

  execSync(`pnpm jest --no-cache`, {
    stdio: 'inherit',
  });
};
