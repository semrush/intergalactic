const jestPreset = require('@semcore/cli/tools/jest-preset-ui/jest-preset');

jestPreset.transform = {
  '^.+\\.(jsx?|tsx?)$': `${__dirname}/src/babel.config.js`,
};

module.exports = jestPreset;
