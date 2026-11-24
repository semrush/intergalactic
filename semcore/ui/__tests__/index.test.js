import path from 'path';

import { expect, test, describe } from '@semcore/testing-utils/vitest';
import fs from 'fs-extra';

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const semcoreDir = path.resolve(__dirname, '../../');
const excludedPackages = ['ui', 'icon', 'illustration', 'flags'];

const semcorePackages = fs
  .readdirSync(semcoreDir, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !excludedPackages.includes(entry.name) &&
      fs.existsSync(path.join(semcoreDir, entry.name, 'package.json')),
  )
  .map((entry) => `@semcore/${entry.name}`);

const dependencyPackages = Object.keys(packageJson.dependencies || {}).filter((pkg) =>
  pkg.startsWith('@semcore/'),
);

describe('Packages Validation', () => {
  test('Dependencies in package.json match packages in @semcore/', () => {
    expect(new Set(dependencyPackages)).toEqual(new Set(semcorePackages));
  });
});
