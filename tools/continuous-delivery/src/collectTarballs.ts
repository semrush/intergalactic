import axios from 'axios';
import { ResponseNpmRegistry } from './fetchFromNpm';
import pLimit from 'p-limit';
import { log } from './utils';

export const collectTarballs = async (unlockedRelease: string): Promise<string[]> => {
  log('Collecting prerelease tarballs...');
  const npmResponse = await axios.get<ResponseNpmRegistry>(
    `https://registry.npmjs.org/@semcore/ui/${unlockedRelease}`,
  );

  const tarballs = [npmResponse.data.dist.tarball];

  const prereleasedDependencies = Object.entries(npmResponse.data.dependencies).filter(
    ([, version]) => version.includes('-'),
  ) as [name: string, version: string][];

  const limit = pLimit(5);
  await Promise.all(
    prereleasedDependencies.map(
      async ([name, version]) =>
        await limit(async () => {
          const npmResponse = await axios.get<ResponseNpmRegistry>(
            `https://registry.npmjs.org/${name}/${version}`,
          );
          tarballs.push(npmResponse.data.dist.tarball);
        }),
    ),
  );

  log(`Collected ${tarballs.length} tarball(s).`);

  return tarballs;
};
