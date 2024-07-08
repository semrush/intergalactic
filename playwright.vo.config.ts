import { devices, PlaywrightTestConfig } from '@playwright/test';
import { screenReaderConfig } from '@guidepup/playwright';
import { testPlanFilter } from "allure-playwright/testplan";

const config: PlaywrightTestConfig = {
  ...screenReaderConfig,
  reportSlowTests: null,
  workers: 1,
  timeout: 2 * 60 * 1000,
  testMatch: /\.vo-test.ts(x){0,1}$/,
  retries: process.env.CI ? 2 : 0,
  grep: testPlanFilter(),
  reporter: [["list"], ["allure-playwright"]],
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false, video: 'off' },
    },
  ],
};

export default config;
