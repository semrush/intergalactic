import Git from 'simple-git';

import { Package } from './packages';

const git = Git();

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
