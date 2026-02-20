import { screenReaderConfig } from '@guidepup/playwright';
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { testPlanFilter } from 'allure-playwright/testplan';

const config: PlaywrightTestConfig = {
  ...screenReaderConfig,
  reportSlowTests: null,
  workers: 1,
  timeout: 2 * 60 * 1000,
  testMatch: /\.nvda-test.ts(x){0,1}$/,
  retries: process.env.CI ? 2 : 0,
  grep: testPlanFilter(),
  reporter: [['list'], ['allure-playwright']],
  projects: [
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: false,
        video: 'off',
      },
    },
  ],
};

export default config;
