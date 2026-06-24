import AxeBuilder from '@axe-core/playwright';
import { nvdaTest as nvdaBase } from '@guidepup/playwright';
import { test as base } from '@playwright/test';
import { feature, label, story, suite } from 'allure-js-commons';
import type axe from 'axe-core';
import type { Page } from 'playwright';
import type { TestInfo } from 'playwright/types/test';

import { mockIllustrationsRequest } from './shared/mockIllustrationsRequest';

type GetAccessibilityViolations = (params: { page: Page }) => Promise<axe.AxeResults['violations']>;

export const getAccessibilityViolations: GetAccessibilityViolations = async ({ page }) => {
  // @ts-ignore
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#root')
    .disableRules(['color-contrast'])
    .analyze();

  return accessibilityScanResults.violations.filter(skipButtonComboboxDiscernibleErrors);
};

export const skipButtonComboboxDiscernibleErrors = (v: axe.Result) => {
  if (v.impact === 'critical' && v.description === 'Ensures buttons have discernible text') {
    const onlyComboboxButtons = v.nodes.every((node) => {
      return node.html.startsWith('<button') && node.html.includes('role="combobox"');
    });

    return !onlyComboboxButtons;
  }

  return true;
};

// eslint-disable-next-line no-empty-pattern
const beforeEachTests = async ({}, use: () => Promise<void>, testInfo: TestInfo) => {
  const filePathParts = testInfo.file.split('/');

  let component = 'unknown-component';

  const semcoreIndex = filePathParts.findLastIndex((part) => part === 'semcore');
  if (semcoreIndex >= 0 && semcoreIndex + 2 < filePathParts.length) {
    const potentialComponent = filePathParts[semcoreIndex + 1];
    const potentialTests = filePathParts[semcoreIndex + 2];
    if (potentialTests === '__tests__') {
      component = potentialComponent;
    }
  }

  feature(component);
  label('Component', component);

  if (testInfo.titlePath.length > 2) {
    story(testInfo.titlePath[1]);
  } else if (testInfo.titlePath.length > 1) {
    story(testInfo.titlePath[0]);
  }

  suite(testInfo.title);

  await use();
};

const test = base.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],

  page: async ({ page }, use) => {
    await mockIllustrationsRequest(page);

    await use(page);
  },
});

const nvdaTest = nvdaBase.extend<{ testHook: void; nvdaPageSetup: void }>({
  testHook: [beforeEachTests, { auto: true }],
  nvdaPageSetup: [
    async ({ page, nvda }, use) => {
      const originalSetContent = page.setContent.bind(page);
      page.setContent = async (html: string, options?: any) => {
        await originalSetContent(html, options);
        await page.waitForSelector('#root:not(:empty)', { timeout: 5000 });
        // await nvda.navigateToWebContent();
      };
      await use();
    },
    { auto: true },
  ],
});

export type { Page };
// eslint-disable-next-line import/export
export * from '@playwright/test';
// eslint-disable-next-line import/export
export { AxeBuilder, test, nvdaTest };
