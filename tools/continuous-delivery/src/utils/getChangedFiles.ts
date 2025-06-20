import Git from 'simple-git';

import type { Package } from '../collectPackages';
import { collectPackages } from '../collectPackages';

const git = Git();

export async function getChangedFiles(command = 'HEAD^1'): Promise<Set<string>> {
  const dependencyMap = new Map<string, Set<string>>();
  const packages = await collectPackages({});

  packages.forEach((pack) => {
    if (pack.name !== '@semcore/ui') {
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
      const packageName = path[1];

      components.add(`@semcore/${packageName}`);

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
      const packageName = path[2];

      components.add(`@semcore/${packageName}`);
    }
  });

  return components;
}
