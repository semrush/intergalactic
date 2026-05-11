import { readFile, access } from 'fs/promises';
import { dirname as resolveDirname } from 'path';

import type { Loader } from 'esbuild';

const babelTransform = async (contents: string, path: string, isEsm?: true) => {
  // @ts-ignore
  const babelPresetUi = await import('@semcore/babel-preset-ui/.babelrc.js');
  const babelConfig = babelPresetUi.default as (babel: any, opts: any) => any;
  // @ts-ignore
  const babel = await import('@babel/core');

  const code = await new Promise((resolve, reject) =>
    babel.transform(
      contents,
      {
        filename: path,
        cwd: resolveDirname(path),
        ...babelConfig(babel, { isEsm: isEsm }),
      },
      (error: Error | undefined, result: any) => {
        if (error) reject(error);
        else resolve(result?.code);
      },
    ),
  );
  return code as string;
};

const supportedExtensions = ['ts', 'js', 'tsx', 'jsx'];
const prioritizedExtensionFallback: { [key: string]: string } = { js: 'mjs' };

const excludeFilter = /(tools\/playground)|node_modules/;

export const loadSemcoreSources = async (path: string, isEsm?: true) => {
  {
    const extension = path.split('.').pop()! as Loader;
    if (prioritizedExtensionFallback[extension]) {
      const fallbackPath = `${path.split('.').slice(0, -1).join('.')}.${
        prioritizedExtensionFallback[extension]
      }`;
      try {
        await access(fallbackPath);
        path = fallbackPath;
      } catch {
        /* no file in fallback location */
      }
    }
  }

  const sourceContents = await readFile(path, 'utf-8');
  const extension = path.split('.').pop()! as Loader;

  if (excludeFilter?.test(path) || !supportedExtensions.includes(extension)) {
    return {
      code: sourceContents,
    };
  }

  const code = await babelTransform(sourceContents, path, isEsm);

  return {
    code,
  };
};
