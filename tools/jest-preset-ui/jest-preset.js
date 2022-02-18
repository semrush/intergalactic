module.exports = {
  // testMatch: ['**/(release|semcore|tools)/**/?(*.)+(spec|test).[jt]s?(x)'],
  testMatch: ['**/(release|semcore)/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: [`${__dirname}/src/setupTests.js`],
  transform: {
    '^.+\\.(jsx?|tsx?)$': `${__dirname}/src/babel.config.js`,
  },
  transformIgnorePatterns: ['node_modules/(?!@semcore/|@popperjs/|d3-|internmap)'],
  // collectCoverageFrom: ['**/semcore/*/src/**.*'],
  coveragePathIgnorePatterns: ['/style/', 'src/index.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  // collectCoverageFrom: ['**/semcore/*/src/**.*'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^@semcore/utils/lib/(.*)': '@semcore/utils/src/$1',
    '^@semcore/(.*)/lib/(.*)': '@semcore/$1/lib/$2',
    '^@semcore/icon/(.*)/(.*)': '@semcore/icon/$1/$2',
    '^@semcore/(.*)': '@semcore/$1/src',
  },
  modulePathIgnorePatterns: ['/generator-component/'],
};
