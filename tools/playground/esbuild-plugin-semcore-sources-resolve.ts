import { Plugin } from 'esbuild';
import { resolve as resolvePath } from 'path';
import { readdir, access as fsAccess, stat as fsStat } from 'fs/promises';

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

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];

export const esbuildPluginSemcoreSourcesResolve = (): Plugin => ({
  name: 'esbuild-plugin-semcore-sources-resolve',
  setup(build) {
    build.onResolve({ filter: /^@semcore\// }, async ({ path }) => {
      let subPath = path.split('/').slice(2).join('/');
      const componentName = path.split('/')[1];
      const filesOfSemcoreDir = await readdir('../../semcore');
      const filesOfToolsDir = await readdir('../../tools');
      let componentsDir: string | null = null;
      if (filesOfSemcoreDir.includes(componentName)) {
        componentsDir = 'semcore';
        if (subPath.startsWith('lib/')) {
          subPath = componentName === 'icon' && subPath ? subPath : subPath.replace('lib/', 'src/');
        } else if (!subPath.startsWith('style/') && !(componentName === 'icon' && subPath)) {
          subPath = 'src/' + subPath;
        }
      }
      if (filesOfToolsDir.includes(componentName)) {
        componentsDir = 'tools';
      }
      if (!componentsDir) {
        throw new Error(`Unable to determine ${componentName} location`);
      }

      const relativePath = `../../${componentsDir}/` + componentName + '/' + subPath;
      const absolutePath = resolvePath(relativePath);

      if (await isFile(absolutePath)) {
        return {
          path: absolutePath,
          namespace: 'file',
        };
      }
      for (const extension of extensions) {
        if (await isFile(absolutePath + extension)) {
          return {
            path: absolutePath + extension,
            namespace: 'file',
          };
        }
      }

      const indexFileName = (await readdir(absolutePath)).find(
        (filename) => filename.startsWith('index') && !filename.endsWith('.d.ts'),
      );

      if (!indexFileName) {
        throw new Error(
          `Unable to find index file in "${absolutePath}". esbuild-plugin-semcore-playground currently works only with components that contains index file, maybe you should extends things that plugin able to do`,
        );
      }

      return {
        path: absolutePath + '/' + indexFileName,
        namespace: 'file',
      };
    });
  },
});
