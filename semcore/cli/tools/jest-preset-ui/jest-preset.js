module.exports = {
  setupFilesAfterEnv: [`${__dirname}/src/setupTests.js`],
  transform: {
    '^.+\\.(jsx?|tsx?)$': `${__dirname}/src/babel.config.js`,
  },
  transformIgnorePatterns: ['node_modules/(?!@semcore/|@popperjs/|d3-|internmap)'],
  coveragePathIgnorePatterns: ['/style/', 'src/index.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^@semcore/utils/lib/(.*)': '@semcore/utils/src/$1',
    '^@semcore/(.*)/lib/(.*)': '@semcore/$1/lib/$2',
    '^@semcore/icon/(.*)/(.*)': '@semcore/icon/$1/$2',
    '^@semcore/(.*)': '@semcore/$1/src',
    '^disable-jest-mapper:(.*)': '$1',
  },
  modulePathIgnorePatterns: ['/tools/'],
};
