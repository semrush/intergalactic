import { devices, PlaywrightTestConfig } from '@playwright/test';
import { screenReaderConfig } from '@guidepup/playwright';

const config: PlaywrightTestConfig = {
  ...screenReaderConfig,
  reportSlowTests: null,
  workers: 1,
  timeout: 2 * 60 * 1000,
  testMatch: /accordion\.vo-test.ts(x){0,1}$/,
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false, video: 'off' },
    },
  ],
};

export default config;
