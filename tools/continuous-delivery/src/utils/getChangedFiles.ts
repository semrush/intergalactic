import Git from 'simple-git';
import { collectPackages } from '../collectPackages';

const git = Git();

export async function getChangedFiles(command = 'HEAD^1'): Promise<Set<string>> {
  const dependencyGraph = new Map<string, Set<string>>();
  const packages = await collectPackages({});

  packages.forEach((pack) => {
    if (pack.name !== '@semcore/ui') {
      const deps = Object.keys(pack.dependencies);
      deps.forEach((dep) => {
        if (!dependencyGraph.has(dep)) {
          dependencyGraph.set(dep, new Set());
        }

        dependencyGraph.get(dep)?.add(pack.name);
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

      const dependentPackages = dependencyGraph.get(`@semcore/${packageName}`) ?? new Set();
      for (const dep of dependentPackages) {
        components.add(dep);
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
