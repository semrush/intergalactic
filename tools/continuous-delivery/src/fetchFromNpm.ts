import axios from 'axios';
import pLimit from 'p-limit';
import semver from 'semver';
import { log } from './utils';

type PackageNpmRegistry = {
  dependencies: {
    [name: string]: string;
  };
};

export type ResponseNpmRegistry = {
  'dist-tags': { latest: string };
  dist: { tarball: string };
  versions: {
    [version: string]: PackageNpmRegistry;
  };
  dependencies: {
    [name: string]: string;
  };
  time: {
    [versionName: string]: string;
  };
};

export const fetchFromNpm = async (filter?: string[]) => {
  log('Fetching info about packages from npm registry...');
  const { data: npmSearchResult } = await axios.get<
    {},
    {
      data: {
        total: number;
        objects: {
          package: {
            name: string;
            /**
             * @deprecated
             * NPM hadrly caches search results so version in search result
             * may be outdated for several horus
             */
            version: string;
          };
        }[];
      };
    }
  >('https://registry.npmjs.org/-/v1/search?text=@semcore/&size=250');

  if (npmSearchResult.total !== npmSearchResult.objects.length) {
    throw new Error(
      'Gosh, seems like our npm search unable to find all packages at once, need to update search',
    );
  }

  const currentVersions: { [packageName: string]: { version: string } & PackageNpmRegistry } = {};
  const objectsToFetch = npmSearchResult.objects.filter(
    (object) => !filter || filter.includes(object.package.name),
  );

  const limit = pLimit(5);
  await Promise.all(
    objectsToFetch.map(
      async ({ package: { name } }) =>
        await limit(async () => {
          const npmResponse = await axios.get<ResponseNpmRegistry>(
            `https://registry.npmjs.org/${name}`,
          );
          const versions = Object.keys(npmResponse.data.versions);
          const sortedVersions = versions
            .filter((version) => !version.includes('-'))
            .sort(semver.compare);
          const lastVersion = sortedVersions[sortedVersions.length - 1];
          if (lastVersion) {
            currentVersions[name] = {
              version: lastVersion,
              dependencies: npmResponse.data.versions[lastVersion].dependencies,
            };
          }
        }),
    ),
  );

  log(`Fetched info about ${Object.keys(currentVersions).length} packages.`);

  currentVersions['@semcore/slack-integration'] = {
    version: '0.0.3',
    dependencies: {
      '@semcore/changelog-handler': '0.0.1',
    },
  };

  return currentVersions;
};
