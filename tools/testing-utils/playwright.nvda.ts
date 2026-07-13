import { nvdaTest as nvdaBase } from '@guidepup/playwright';

import { beforeEachTests } from './playwright';

const nvdaTest = nvdaBase.extend<{ testHook: void; nvdaPageSetup: void }>({
  testHook: [beforeEachTests, { auto: true }],
  nvdaPageSetup: [
    async ({ page }, use) => {
      const originalSetContent = page.setContent.bind(page);
      page.setContent = async (html: string, options?: any) => {
        await originalSetContent(html, options);
        await page.waitForSelector('#root:not(:empty)', { timeout: 5000 });
      };
      await use();
    },
    { auto: true },
  ],
});

export { nvdaTest };
