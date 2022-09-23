const { resolve: resolvePath } = require('path');

module.exports = {
  testMatch: ['**/(semcore|tools)/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: [resolvePath(`${__dirname}/src/setupTests.js`), 'jest-canvas-mock'],
  transform: {
    '^.+\\.(jsx?|tsx?)$': resolvePath(`${__dirname}/src/babel.config.js`),
  },
  transformIgnorePatterns: ['node_modules/.pnpm/(?!@semcore+|@popperjs+|d3-|internmap)'],
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
    '^disable-jest-mapper:(.*)': '$1',
    '^react$': resolvePath(__dirname, '../../node_modules/react/umd/react.production.min.js'),
    '^react-dom$': resolvePath(
      __dirname,
      '../../node_modules/react-dom/umd/react-dom.production.min.js',
    ),
  },
  modulePathIgnorePatterns: ['/generator-component/'],
  testEnvironment: 'jsdom',
};
