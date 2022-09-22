import { devices, PlaywrightTestConfig } from '@playwright/test';
import { voConfig } from '@guidepup/playwright';

const config: PlaywrightTestConfig = {
  ...voConfig,
  reportSlowTests: null,
  workers: 1,
  timeout: 2 * 60 * 1000,
  testMatch: /\.vo-test.ts(x){0,1}$/,
  retries: process.env['CI_RUN'] ? 2 : undefined,
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false, video: 'off' },
    },
  ],
};

export default config;
