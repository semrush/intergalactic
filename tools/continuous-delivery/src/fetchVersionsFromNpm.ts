import axios from 'axios';
import pLimit from 'p-limit';

export const fetchVersionsFromNpm = async () => {
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
  >(`https://registry.npmjs.org/-/v1/search?text=@semcore/&size=250`);

  if (npmSearchResult.total !== npmSearchResult.objects.length) {
    throw new Error(
      `Gosh, seems like our npm search unable to find all packages at once, need to update search`,
    );
  }

  const currentVersions: { [packageName: string]: string } = {};

  const limit = pLimit(5);
  await Promise.all(
    npmSearchResult.objects.map(
      async ({ package: { name } }) =>
        await limit(async () => {
          const npmResponse = await axios.get<{ 'dist-tags': { latest: string } }>(
            `https://registry.npmjs.org/${name}`,
          );
          currentVersions[name] = npmResponse.data['dist-tags'].latest;
        }),
    ),
  );

  return currentVersions;
};
