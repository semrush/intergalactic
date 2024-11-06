import defaultConfig from './playwright.storybook.config';

const config = {
  ...defaultConfig,
  testMatch: /\.storybook-snapshot-test.ts(x){0,1}$/,
}

export default config;
