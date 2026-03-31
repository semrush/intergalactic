import path from 'path';

import { expect, test, describe } from '@semcore/testing-utils/vitest';
import fs from 'fs-extra';

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const semcorePackages = fs
  .readdirSync(path.resolve(__dirname, '../../'))
  .filter((pkg) => !['ui', 'icon', 'illustration', 'theme'].includes(pkg))
  .map((pkg) => `@semcore/${pkg}`);

const dependencyPackages = Object.keys(packageJson.dependencies || {}).filter((pkg) =>
  pkg.startsWith('@semcore/'),
);

describe('Packages Validation', () => {
  test('Dependencies in package.json match packages in @semcore/', () => {
    expect(new Set(dependencyPackages)).toEqual(new Set(semcorePackages));
  });
});
