import axios from 'axios';
import pLimit from 'p-limit';
import semver from 'semver';

type PackageNpmRegistry = {
  dependencies: {
    [name: string]: string;
  };
};

type ResponseNpmRegistry = {
  'dist-tags': { latest: string };
  versions: {
    [version: string]: PackageNpmRegistry;
  };
};

export const fetchFromNpm = async (filter?: string[]) => {
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
          currentVersions[name] = {
            version: lastVersion,
            dependencies: npmResponse.data.versions[lastVersion].dependencies,
          };
        }),
    ),
  );

  return currentVersions;
};
