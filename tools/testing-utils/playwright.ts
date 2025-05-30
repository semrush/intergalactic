import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';
import { test as base } from '@playwright/test';
import { voiceOverTest as voiceOverBase } from '@guidepup/playwright';
import { allure } from 'allure-playwright';
import type { TestInfo } from 'playwright/types/test';
import axe from 'axe-core';
import { mockIllustrationsRequest } from './shared/mockIllustrationsRequest';

type GetAccessibilityViolations = (params: { page: Page }) => Promise<axe.AxeResults['violations']>;

export const getAccessibilityViolations: GetAccessibilityViolations = async ({ page }) => {
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

// biome-ignore lint/correctness/noEmptyPattern:
const beforeEachTests = async ({}, use: () => Promise<void>, testInfo: TestInfo) => {
  let layer = 'Other tests';
  const testFilePath = testInfo.file.split('/');
  const fileName = testFilePath[testFilePath.length - 1];
  const component = testFilePath[testFilePath.length - 3];
  const suite = fileName.split('.')[1];

  if (suite.includes('browser')) {
    layer = 'Browser tests';
  } else if (suite.includes('axe')) {
    layer = 'Axe tests';
  } else if (suite.includes('vo')) {
    layer = 'Voice over tests';
  }

  await allure.label('framework', 'Playwright');
  await allure.label('component', component);
  await allure.layer(layer);
  await allure.subSuite(suite);
  await allure.parentSuite(layer);
  await allure.story(testInfo.title);
  await use();
};

const test = base.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],

  page: async ({ page }, use) => {
    await mockIllustrationsRequest(page);

    await use(page);
  },
});

const voiceOverTest = voiceOverBase.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],
});

export type { Page };
export * from '@playwright/test';
export * from '@guidepup/playwright';
export { AxeBuilder, test, voiceOverTest };
