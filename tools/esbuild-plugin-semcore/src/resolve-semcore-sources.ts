import { access as fsAccess, stat as fsStat } from 'fs/promises';
import { exec } from 'node:child_process';
import { resolve as resolvePath } from 'path';

import type { Loader, Plugin } from 'esbuild';

import { loadSemcoreSources } from './load-semcore-sources.ts';

const fsExists = async (path: string) => {
  try {
    await fsAccess(path);
    return true;
  } catch {
    return false;
  }
};
const isFile = async (path: string) => {
  if (!(await fsExists(path))) return false;
  return (await fsStat(path)).isFile();
};

type PackageInfo = {
  name?: string;
  path: string;
  private: boolean;
  version?: string;
};

const workspaces: string[] = [];

const getWorkspaces = async (): Promise<string[]> => {
  if (workspaces.length > 0) {
    return workspaces;
  }

  const data = await new Promise<PackageInfo[]>((resolve) => {
    exec('pnpm ls -r --depth -1 --json', (error, stdout, stderr) => {
      if (error) {
        throw new Error(`Execution error: ${error.message}`);
      }
      if (stderr) {
        throw new Error(`stderr: ${stderr}`);
      }

      const dependencies = JSON.parse(stdout) as PackageInfo[];

      resolve(dependencies);
    });
  });

  data.forEach((item) => {
    if (item.name?.startsWith('@semcore')) {
      workspaces.push(item.name.slice(1));
    }
  });

  return workspaces;
};

const tryToResolveWorkspacePath = async (path: string, rootPath: string) => {
  if (!path.startsWith('@semcore/') && !path.startsWith('intergalactic')) {
    throw new Error(
      `Unable to resolve workspace for non @semcore package (trying to resolve "${path}")`,
    );
  }

  const workspaces = await getWorkspaces();
  const componentName = path.split('/')[1];

  for (const workspace of workspaces) {
    const workspaceDestination = workspace.split('/').pop();
    if (workspaceDestination === componentName) {
      return resolvePath(rootPath, workspace);
    }
  }

  throw new Error(`Unable to find workspace dir while trying to resolve "${path}"`);
};

const tryToResolveFile = async (path: string) => {
  if (await isFile(path)) {
    return path;
  }
};

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
const tryToResolveFileExtention = async (path: string) => {
  for (const extension of extensions) {
    const resolved = await tryToResolveFile(path + extension);
    if (resolved) return resolved;
  }
};

const tryToResolveIndexFile = async (path: string) => {
  return tryToResolveFileExtention(resolvePath(path, 'index'));
};

const rootFiles = ['README.md', 'package.json'];
const generatedComponents = ['icon', 'ui', 'illustration', 'theme'];
const outOfSourceDirs = ['style'];

export const resolveSemcoreSources = async (path: string, rootPath: string) => {
  if (path.startsWith('@semcore/ui/')) {
    path = `@semcore/${path.substring('@semcore/ui/'.length)}`;
  }
  if (path.startsWith('intergalactic/')) {
    path = `@semcore/${path.substring('intergalactic/'.length)}`;
  }
  if (path.includes('/semcore/')) {
    const indexFrom = path.indexOf('/semcore/');
    path = `@semcore/${path.substring(indexFrom + '/semcore/'.length)}`;
  }
  let workspacePath = await tryToResolveWorkspacePath(path, rootPath);
  const componentName = path.split('/')[1];
  const subPath = path.split('/').slice(2).join('/');
  let modifiedSubPath = subPath;

  if (modifiedSubPath.startsWith('src/')) {
    throw new Error('Imports from /src will not work for end users, do not use such imports.');
  }

  if (
    !rootFiles.includes(subPath) &&
    !(generatedComponents.includes(componentName) && subPath) &&
    !outOfSourceDirs.some((dir) => subPath.startsWith(dir))
  ) {
    if (subPath.includes('lib')) {
      modifiedSubPath = subPath.replace('lib/', 'src/');
    } else if (!subPath.startsWith('src/')) {
      modifiedSubPath = `src/${subPath}`;
    }
  } else if (componentName === 'icon' || componentName === 'illustration') {
    modifiedSubPath = `lib/${subPath}`;
  } else if (componentName === 'theme') {
    workspacePath = workspacePath.split('/').map((item) => item === 'semcore' ? 'tools' : item).join('/');
    modifiedSubPath = `lib/${subPath}`;
  }

  for (const absolutePath of [
    resolvePath(workspacePath, modifiedSubPath),
    resolvePath(workspacePath, subPath),
  ]) {
    for (const tryToResolve of [
      tryToResolveFile,
      tryToResolveFileExtention,
      tryToResolveIndexFile,
    ]) {
      const resolved = await tryToResolve(absolutePath);
      if (resolved) return resolved;
    }
  }

  throw new Error(`Unable to resolve file in "${modifiedSubPath}" (trying to resolve "${path}" with "${resolvePath(workspacePath, modifiedSubPath)}" or "${resolvePath(workspacePath, subPath)}").`);
};

const loaders: Record<string, Loader> = {
  js: 'js',
  jsx: 'jsx',
  ts: 'ts',
  tsx: 'tsx',
  mjs: 'js',
  cjs: 'js',
  css: 'css',
  json: 'json',
};

export function semcoreSourceEsbuildPlugin(rootPath: string): Plugin {
  return {
    name: 'semcore-source',
    setup(build) {
      build.onResolve({ filter: /^@semcore\// }, async ({ path }) => {
        if (path.includes('@semcore/theme') || path.endsWith('.md')) return null;

        const resolvedPath = await resolveSemcoreSources(path, rootPath);
        return {
          path: resolvedPath,
        };
      });
      build.onLoad({ filter: /[/|\\]semcore[/|\\]/ }, async ({ path }) => {
        {
          const extension = path.split('.').pop() ?? '';
          if (extension === 'js') {
            const fallbackPath = `${path.split('.').slice(0, -1).join('.')}.mjs`;
            try {
              await fsAccess(fallbackPath);
              path = fallbackPath;
            } catch {}
          }
        }

        const { code } = await loadSemcoreSources(path);
        const extension = path.split('.').pop() ?? 'js';

        return {
          contents: code,
          loader: loaders[extension] ?? 'js',
        };
      });
    },
  };
}
