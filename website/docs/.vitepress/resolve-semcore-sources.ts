import { resolve as resolvePath } from 'path';
import { access as fsAccess, stat as fsStat, readdir } from 'fs/promises';

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

const tryToResolveWorkspacePath = async (path: string, rootPath: string) => {
  if (!path.startsWith('@semcore/') && !path.startsWith('intergalactic')) {
    throw new Error(
      `Unable to resolve workspace for non @semcore package (trying to resolve "${path}")`,
    );
  }
  const [semcoreDirItems, toolsDirItems] = await Promise.all([
    readdir(resolvePath(rootPath, 'semcore')),
    readdir(resolvePath(rootPath, 'tools')),
  ]);
  const workspaces: string[] = [];
  for (const item of semcoreDirItems) workspaces.push(`semcore/${item}`);
  for (const item of toolsDirItems) workspaces.push(`tools/${item}`);
  {
    const destinationDirs = workspaces.map((workspacePath) => workspacePath.split('/').pop());
    if (destinationDirs.length !== [...new Set(destinationDirs)].length) {
      const ambiguousWorkspaces = destinationDirs
        .filter((workspaceName, index) => destinationDirs.indexOf(workspaceName) !== index)
        .join(', ');
      throw new Error(
        `Unable to resolve ambiguous workspaces (destination dir ${ambiguousWorkspaces} occured in multiple paths)`,
      );
    }
  }

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
const generatedComponents = ['icon', 'ui', 'illustration'];
const outOfSourceDirs = ['style'];

const rootPath = resolvePath(__dirname, '../../..');

export const resolveSemcoreSources = async (path: string) => {
  if (path.startsWith('@semcore/ui/')) path = `@semcore/${path.substring('@semcore/ui/'.length)}`;
  if (path.startsWith('intergalactic/'))
    path = `@semcore/${path.substring('intergalactic/'.length)}`;
  const workspacePath = await tryToResolveWorkspacePath(path, rootPath);
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

  throw new Error(`Unable to resolve file in "${modifiedSubPath}" (trying to resolve "${path}").`);
};
