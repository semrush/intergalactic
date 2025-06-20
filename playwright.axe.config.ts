import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { testPlanFilter } from 'allure-playwright/testplan';

const config: PlaywrightTestConfig = {
  testMatch: /\.axe-test.ts(x){0,1}$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  grep: testPlanFilter(),
  reporter: [['list'], ['allure-playwright']],
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], hasTouch: true },
    },
  ],
};

export default config;
