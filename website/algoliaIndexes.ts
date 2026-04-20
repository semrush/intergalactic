export const algoliaIndexes = (prefix: string) => {
  return {
    mainSearchIndexName: `${prefix}_intergalactic-docs`,
    iconsSearchIndexName: `${prefix}_intergalactic-docs-icons`,
    illustrationsSearchIndexName: `${prefix}_intergalactic-docs-illustrations`,
  };
};
