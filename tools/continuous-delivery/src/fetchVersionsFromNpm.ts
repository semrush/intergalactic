import axios from 'axios';

export const fetchVersionsFromNpm = async () => {
  const { data: npmSearchResult } = await axios.get<
    {},
    { data: { total: number; objects: { package: { name: string; version: string } }[] } }
  >(`https://registry.npmjs.org/-/v1/search?text=@semcore/&size=250`);

  if (npmSearchResult.total !== npmSearchResult.objects.length) {
    throw new Error(
      `Gosh, seems like our npm search unable to find all packages at once, need to update search`,
    );
  }

  const currentVersions: { [packageName: string]: string } = {};

  for (const {
    package: { name, version },
  } of npmSearchResult.objects) {
    currentVersions[name] = version;
  }

  return currentVersions;
};
