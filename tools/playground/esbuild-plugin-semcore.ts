import { Loader, Plugin } from 'esbuild';
import babel from '@babel/core';
import {
  readdir,
  access as fsAccess,
  readFile,
  writeFile,
  rm as removeFile,
  mkdir as createDir,
} from 'fs/promises';
import {
  relative as resolveRelativePath,
  resolve as resolvePath,
  dirname as resolveDirname,
} from 'path';

const babelTransform = async (contents: string, path: string) => {
  // eslint-disable-next-line import/extensions
  const { default: babelConfig } = await import('@semcore/babel-preset-ui/.babelrc.js');

  const code = await new Promise((resolve, reject) =>
    babel.transform(
      contents,
      { filename: path, cwd: resolveDirname(path), ...babelConfig() },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.code!);
      },
    ),
  );
  return code as string;
};

const stringHash = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash.toString(32).padEnd(32, '0');
  for (let i = 0; i < str.length; i++) {
    if (hash * 1.2 > Number.MAX_SAFE_INTEGER) {
      hash /= 2;
    }
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString(32).padEnd(32, '0');
};

const fsExists = async (path: string) => {
  try {
    await fsAccess(path);
    return true;
  } catch {
    return false;
  }
};

const ensureDur = async (path: string) => {
  const parts = path.split('/');
  for (let i = 1; i <= parts.length; i++) {
    const subPath = resolvePath(parts.slice(0, i).join('/'));
    if (!(await fsExists(subPath))) {
      await createDir(subPath);
    }
  }
};

const clearOldCache = async (dirPath: string) => {
  const cachedFiles = await readdir(dirPath);
  const cachedFilesMap = Object.fromEntries(cachedFiles.map((filename) => [filename, true]));
  const unknownFiles = cachedFiles.filter((filename) => {
    if (filename.endsWith('_lastuse')) return false;
    if (
      filename.endsWith('_contents') &&
      cachedFilesMap[filename.substring(0, filename.length - '_contents'.length) + '_lastuse']
    )
      return false;
    if (
      filename.endsWith('_hashsum') &&
      cachedFilesMap[filename.substring(0, filename.length - '_hashsum'.length) + '_lastuse']
    )
      return false;

    return true;
  });
  const lastUseFiles = cachedFiles.filter((fileName) => fileName.endsWith('_lastuse'));
  const longUnusedLastUseFiles: string[] = (
    await Promise.all(
      lastUseFiles.map((fileName) => readFile(resolvePath(dirPath, fileName), 'utf-8')),
    )
  )
    .map((textDate, index) => ({
      filename: lastUseFiles[index],
      lastUse: parseInt(textDate, 10),
    }))
    .filter(({ lastUse }) => isNaN(lastUse) || Date.now() - lastUse > cacheTTL)
    .map(({ filename }) => filename);
  const longUnusedLastContentsFiles = longUnusedLastUseFiles.map(
    (fileName) => fileName.substring(0, fileName.length - '_lastuse'.length) + '_contents',
  );
  const longUnusedLastHashSumFiles = longUnusedLastUseFiles.map(
    (fileName) => fileName.substring(0, fileName.length - '_lastuse'.length) + '_hashsum',
  );
  const longUnusedFiles = [
    ...longUnusedLastUseFiles,
    ...longUnusedLastContentsFiles,
    ...longUnusedLastHashSumFiles,
  ];

  await Promise.all(
    [...longUnusedFiles, ...unknownFiles].map(async (fileName) => {
      if (fileName === '.' || fileName === '..') return;
      const filePath = resolvePath(dirPath, fileName);
      if (await fsExists(filePath)) await removeFile(filePath);
    }),
  );
};

const cacheDirName = '.cache/esbuild-plugin-semcore';
const cacheTTL = 1000 * 60 * 60 * 24 * 30;
const supportedExtensions = ['ts', 'js', 'tsx', 'jsx', 'css'];
const loaderOfExtension: { [key: string]: Loader } = { md: 'text' };

await ensureDur(cacheDirName);
await clearOldCache(cacheDirName);

export const esbuildPluginSemcore = (filter: RegExp, excludeFilter?: RegExp): Plugin => ({
  name: 'esbuild-plugin-semcore',
  setup(build) {
    build.onLoad({ filter }, async ({ path, namespace }) => {
      const sourceContents = await readFile(path, 'utf-8');
      const extension = path.split('.').pop()! as Loader;
      const loader = loaderOfExtension[extension] || extension;

      if (namespace === 'rawFile') {
        return {
          contents: sourceContents,
          loader: 'text',
        };
      }

      if ((excludeFilter && excludeFilter.test(path)) || !supportedExtensions.includes(extension)) {
        return {
          contents: sourceContents,
          loader,
        };
      }

      const hashSum = stringHash(sourceContents);

      const relativePath = resolveRelativePath('.', path);
      const cacheFileName = relativePath.split('/').join('_');
      const cachedContentsFilePath = resolvePath(cacheDirName, cacheFileName + '_contents');
      const cachedHashSumFilePath = resolvePath(cacheDirName, cacheFileName + '_hashsum');
      const cachedLastUseFilePath = resolvePath(cacheDirName, cacheFileName + '_lastuse');

      if ((await fsExists(cachedContentsFilePath)) && (await fsExists(cachedHashSumFilePath))) {
        const cachedHashSum = await readFile(cachedHashSumFilePath, 'utf-8');
        if (cachedHashSum === hashSum) {
          await writeFile(cachedLastUseFilePath, Date.now().toString());
          return {
            contents: await readFile(cachedContentsFilePath),
            loader: extension,
          };
        }
      }

      const contents = await babelTransform(sourceContents, path);

      await Promise.all([
        await writeFile(cachedContentsFilePath, contents),
        await writeFile(cachedHashSumFilePath, hashSum),
        await writeFile(cachedLastUseFilePath, Date.now().toString()),
      ]);

      return {
        contents,
        loader,
      };
    });
  },
});
