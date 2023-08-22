import compressing from 'compressing';
import { log } from './utils';
import { resolve as resolvePath } from 'path';

export const unpackTarballs = async (paths: string[]): Promise<string[]> => {
  log('Unpacking tarballs...');
  const distPaths = await Promise.all(
    paths.map(async (path) => {
      const parts = path.split('/');
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] === 'tarballs') {
          parts[i] = 'packages';
          break;
        }
      }
      const distPath = parts.join('/');
      await compressing.tgz.uncompress(path, distPath);
      return resolvePath(distPath, 'package');
    }),
  );
  log('All tarballs are unpacked.');

  return distPaths;
};
