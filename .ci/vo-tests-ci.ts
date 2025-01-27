import fs from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { generateVoTestsHash } from './vo-tests-hash';

const oldHash = await fs.readFile('./.ci/.vo-test-hash.txt', 'utf-8');
const newHash = await generateVoTestsHash();

if (oldHash === newHash) {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('vo-test hash is not updated, skipping vo-test');
} else {
  execSync('pnpm vo-test', { stdio: 'inherit' });
}

await fs.writeFile('./.ci/.vo-test-hash.txt', newHash);
