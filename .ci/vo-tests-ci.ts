import fs from 'fs/promises';
import { execSync } from 'child_process';

const oldHash = await fs.readFile('./.ci/.vo-test-hash.txt', 'utf-8');

await import('./vo-tests-hash');

const newHash = await fs.readFile('./.ci/.vo-test-hash.txt', 'utf-8');

if (oldHash === newHash) {
  // rome-ignore lint/nursery/noConsoleLog:
  console.log('vo-test hash is not updated, skipping vo-test');
} else {
  execSync('pnpm vo-test', { stdio: 'inherit' });
}
