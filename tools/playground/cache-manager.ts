import {
  readdir,
  access as fsAccess,
  readFile,
  writeFile,
  rm as removeFile,
  mkdir as createDir,
} from 'fs/promises';
import { relative as resolveRelativePath, resolve as resolvePath } from 'path';
import { createHash } from 'crypto';

const verbose = false;

const hashString = (str: string) => createHash('md5').update(str).digest('hex');

const fsExists = async (path: string) => {
  try {
    await fsAccess(path);
    return true;
  } catch {
    return false;
  }
};

const ensureDir = async (path: string) => {
  const parts = path.split('/');
  for (let i = 1; i <= parts.length; i++) {
    const subPath = resolvePath(parts.slice(0, i).join('/'));
    if (!(await fsExists(subPath))) {
      await createDir(subPath);
    }
  }
};

const hashFiles = async (paths: string[]) => {
  const existence = await Promise.all(paths.map((path) => fsExists(path)));
  const contents = await Promise.all(
    paths.filter((_, index) => existence[index]).map((path) => readFile(path, 'utf-8')),
  );
  return hashString(contents.join('\n===\n'));
};

export const makeCacheManager = (id: string, cwd = '.', cacheTtl = 1000 * 60 * 60 * 24 * 30) => {
  const cacheDir = resolvePath(cwd, `./.cache/${id.replace(/\W+/, '_')}`);

  return {
    hashString,
    init: async () => {
      await ensureDir(cacheDir);
      const cachedFiles = await readdir(cacheDir);
      const cachedFilesMap = Object.fromEntries(cachedFiles.map((filename) => [filename, true]));
      const unknownFiles = cachedFiles.filter((filename) => {
        if (filename.endsWith('_last_use')) return false;

        for (const postfix of ['_contents', '_hash_sum', '_imp_deps']) {
          const relatedLastUseFile =
            filename.substring(0, filename.length - '_contents'.length) + '_last_use';
          if (filename.endsWith(postfix) && cachedFilesMap[relatedLastUseFile]) {
            return false;
          }
        }

        return true;
      });
      const lastUseFiles = cachedFiles.filter((fileName) => fileName.endsWith('_last_use'));
      const longUnusedLastUseFiles: string[] = (
        await Promise.all(
          lastUseFiles.map((fileName) => readFile(resolvePath(cacheDir, fileName), 'utf-8')),
        )
      )
        .map((textDate, index) => ({
          filename: lastUseFiles[index],
          lastUse: parseInt(textDate, 10),
        }))
        .filter(({ lastUse }) => Number.isNaN(lastUse) || Date.now() - lastUse > cacheTtl)
        .map(({ filename }) => filename);

      const longUnusedFiles: string[] = [];
      for (const postfix of ['_contents', '_hash_sum', '_imp_deps']) {
        longUnusedFiles.push(
          ...longUnusedLastUseFiles.map(
            (fileName) => fileName.substring(0, fileName.length - '_last_use'.length) + postfix,
          ),
        );
      }

      if (verbose) {
        // eslint-disable-next-line no-console
        console.info(
          `Removing ${longUnusedFiles.length} long unused files and ${unknownFiles.length} unknown files from cache dir (${cacheDir})`,
        );
      }

      await Promise.all(
        [...longUnusedFiles, ...unknownFiles].map(async (fileName) => {
          if (fileName === '.' || fileName === '..') return;
          const filePath = resolvePath(cacheDir, fileName);
          if (await fsExists(filePath)) await removeFile(filePath);
        }),
      );
    },
    reset: async () => {
      if (verbose) {
        // eslint-disable-next-line no-console
        console.info(`Resetting cache dir (${cacheDir})`);
      }
      await removeFile(cacheDir, { recursive: true, force: true });
      await ensureDir(cacheDir);
    },
    hasInCache: async (filePath: string) => {
      const timeLabel = `Reading from cache of ${filePath}`;
      if (verbose) {
        // eslint-disable-next-line no-console
        console.time(timeLabel);
      }
      const relativePath = resolveRelativePath(cwd, filePath);
      const cacheFileName = relativePath.split('/').join('_');
      const cachedContentsFilePath = resolvePath(cacheDir, cacheFileName + '_contents');
      const cachedHashSumFilePath = resolvePath(cacheDir, cacheFileName + '_hash_sum');
      const cachedLastUseFilePath = resolvePath(cacheDir, cacheFileName + '_last_use');
      const impDepsUseFilePath = resolvePath(cacheDir, cacheFileName + '_imp_deps');

      if (!(await fsExists(cachedLastUseFilePath))) {
        return null;
      }
      const lastUseString = await readFile(cachedLastUseFilePath, 'utf-8');
      const lastUse = parseInt(lastUseString, 10);
      if (Number.isNaN(lastUse) || Date.now() - lastUse > cacheTtl) {
        return null;
      }
      if (
        (
          await Promise.all([
            await fsExists(cachedContentsFilePath),
            await fsExists(cachedHashSumFilePath),
            await fsExists(impDepsUseFilePath),
          ])
        ).some((exists) => !exists)
      ) {
        return null;
      }

      const impDepsList = (await readFile(impDepsUseFilePath, 'utf-8')).split(',').filter(Boolean);
      const hashSum = await hashFiles([filePath, ...impDepsList]);

      const cachedHashSum = await readFile(cachedHashSumFilePath, 'utf-8');

      if (hashSum !== cachedHashSum) {
        return null;
      }

      if (verbose) {
        // eslint-disable-next-line no-console
        console.timeEnd(timeLabel);
        // eslint-disable-next-line no-console
        console.info(`Using ${filePath} from cache`);
      }

      await writeFile(cachedLastUseFilePath, Date.now().toString());
      return await readFile(cachedContentsFilePath, 'utf-8');
    },
    addToCache: async (filePath: string, content: string, implicitDependencies: string[] = []) => {
      const relativePath = resolveRelativePath(cwd, filePath);
      const cacheFileName = relativePath.split('/').join('_');
      const cachedContentsFilePath = resolvePath(cacheDir, cacheFileName + '_contents');
      const cachedHashSumFilePath = resolvePath(cacheDir, cacheFileName + '_hash_sum');
      const cachedLastUseFilePath = resolvePath(cacheDir, cacheFileName + '_last_use');
      const impDepsFilePath = resolvePath(cacheDir, cacheFileName + '_imp_deps');

      const hashSum = await hashFiles([filePath, ...implicitDependencies]);

      if (verbose) {
        // eslint-disable-next-line no-console
        console.info(`Added ${filePath} to cache`);
      }

      await Promise.all([
        await writeFile(cachedContentsFilePath, content),
        await writeFile(cachedHashSumFilePath, hashSum),
        await writeFile(cachedLastUseFilePath, Date.now().toString()),
        await writeFile(impDepsFilePath, implicitDependencies.join(',')),
      ]);
    },
  };
};
