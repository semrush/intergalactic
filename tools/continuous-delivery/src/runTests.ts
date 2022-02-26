import { execSync } from 'child_process';

export const runTests = async () => {
  // eslint-disable-next-line no-console
  console.log(`Running tests`);

  execSync(`yarn jest --no-cache`, {
    stdio: 'inherit',
  });
};
