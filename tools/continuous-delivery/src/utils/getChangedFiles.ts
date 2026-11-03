import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs-extra';
import Git from 'simple-git';

import type { PackageJson } from './packages';
import { Package } from './packages';

const git = Git();
const dirname = resolvePath(fileURLToPath(import.meta.url), '..');

const excludePackageNames = new Set([
  '__tests__',
  'tests',
  'advanced',
  'docs',
]);

export async function getChangedFiles(command = 'HEAD^1'): Promise<Set<string>> {
  const packages = new Package();
  await packages.collectPackages();
  const dependencyMap = new Map<string, Set<string>>();

  packages.list.forEach((pack) => {
    if (pack.name !== '@semcore/ui' && pack.dependencies) {
      const deps = Object.keys(pack.dependencies);

      deps.forEach((dep) => {
        if (!dependencyMap.has(dep)) {
          dependencyMap.set(dep, new Set());
        }

        dependencyMap.get(dep)?.add(pack.name);
      });
    }
  });

  const diff = await git.diffSummary(command);
  const components = new Set<string>();

  diff.files.forEach((item) => {
    if (item.file.startsWith('semcore') && !item.file.startsWith('semcore/ui')) {
      const path = item.file.split('/');
      const packageName = path[1].startsWith('{') ? path[2] : path[1];

      if (!excludePackageNames.has(packageName)) {
        components.add(`@semcore/${packageName}`);
      }

      const dependentPackages = dependencyMap.get(`@semcore/${packageName}`) ?? new Set();
      const stack = [...dependentPackages];

      while (stack.length > 0) {
        const current = stack.pop();
        if (current && !components.has(current)) {
          components.add(current);
          const currentDependantPackages = dependencyMap.get(current) ?? new Set();
          stack.push(...[...currentDependantPackages]);
        }
      }
    }
    if (item.file.startsWith('stories/components')) {
      const path = item.file.split('/');
      const packageName = path[2].startsWith('{') ? path[3] : path[2];

      if (!excludePackageNames.has(packageName)) {
        components.add(`@semcore/${packageName}`);
      }
    }
  });

  return components;
}

export async function getChangedTools(command = 'HEAD^1'): Promise<Set<string>> {
  const toolsPath = resolvePath(dirname, '..', '..', '..');
  const diff = await git.diffSummary(command);
  const tools = new Set<string>();

  console.log(dirname);

  for (const item of diff.files) {
    if (!item.file.startsWith('tools/')) continue;

    const path = item.file.split('/');
    const toolName = path[1].startsWith('{') ? path[2] : path[1];
    const toolPath = resolvePath(toolsPath, toolName);
    const packageFilePath = resolvePath(toolPath, 'package.json');

    if (!toolName || !(await fs.pathExists(packageFilePath))) continue;

    const vitestConfigs = ['vitest.config.mts', 'vitest.config.ts', 'vitest.config.js', 'vitest.config.mjs'];
    const configExists = await Promise.all(
      vitestConfigs.map((config) => fs.pathExists(resolvePath(toolPath, config))),
    );

    if (!configExists.some(Boolean)) continue;

    const packageFile: PackageJson = await fs.readJson(packageFilePath);

    tools.add(packageFile.name);
  }

  return tools;
}
