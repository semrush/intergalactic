import { currentBuildVersion, LATEST } from './versionEnv';

const prefix = currentBuildVersion === LATEST ? 'latest' : currentBuildVersion;
export const algoliaIndexes = {
  mainSearchIndexName: `${prefix}_intergalactic-docs`,
  iconsSearchIndexName: `${prefix}_intergalactic-docs-icons`,
  illustrationsSearchIndexName: `${prefix}_intergalactic-docs-illustrations`,
};
