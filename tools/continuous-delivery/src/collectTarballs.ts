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

  if (prereleasedDependencies.find(([name]) => name === '@semcore/data-table')) {
    const tableNpmResponse = await axios.get<ResponseNpmRegistry>(
      'https://registry.npmjs.org/@semcore/table?tag=beta',
    );
    const lastPrereleaseVersion = Object.entries(tableNpmResponse.data.time)
      .filter(([versionName]) => versionName.includes('-'))
      .sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime())?.[0]?.[0];
    if (lastPrereleaseVersion) {
      prereleasedDependencies.push(['@semcore/table', lastPrereleaseVersion]);
    }
  }

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
