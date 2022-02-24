const basePreset = require('../jest-preset');

const moduleNameMapper = { ...basePreset.moduleNameMapper };
delete moduleNameMapper['^@semcore/(.*)'];

module.exports = {
  ...basePreset,
  moduleNameMapper,
  modulePathIgnorePatterns: ['/semcore/'],
};
