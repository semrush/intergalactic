import { test, expect } from 'vitest';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as process from 'node:process';
import glob from 'fast-glob';

async function extractImports(filePath: string) {
  const content = await fs.readFile(filePath, 'utf8');
  const importMatches = content.matchAll(/import .* from ['"]([^'";]+)['"]/g);
  return Array.from(importMatches, (match) => match[1]);
}

export function runDependencyCheckTests(component: string) {
  test(`All @semcore dependencies are imported in: "${component}"`, async () => {
    const pathToComponent = path.join(process.cwd(), 'semcore', component);
    const packageRawData = await fs.readFile(path.join(pathToComponent, 'package.json'), 'utf8');
    const packageData = JSON.parse(packageRawData);
    const definedDependencies = new Set([
      ...Object.keys(packageData.dependencies ?? {}),
      ...Object.keys(packageData.peerDependencies ?? {}),
    ]);
    const srcFiles = await glob(`${pathToComponent}/src/**/*.+(js|jsx|ts|tsx)`);
    const allImports = new Set<string>();

    await Promise.all(
      srcFiles.map(async (filePath) => {
        const extractedImports = await extractImports(filePath);

        extractedImports.forEach((imp) => {
          // @semcore/core - peer from peer base-components. We don't need to check it.
          if (imp.startsWith('@semcore/') && !imp.startsWith('@semcore/core')) {
            const [scope, packageName] = imp.split('/');
            allImports.add(`${scope}/${packageName}`);
          }
        });
      }),
    );

    allImports.forEach((importedDep) => {
      const isDepImported = definedDependencies.has(importedDep);
      expect(`${importedDep}: ${isDepImported}`).toBe(`${importedDep}: ${true}`);
    });
  });
}
