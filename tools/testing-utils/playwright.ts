import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';
import { test as base } from '@playwright/test';
import { voiceOverTest as voiceOverBase } from '@guidepup/playwright';
import { allure } from 'allure-playwright';
import type { TestInfo } from 'playwright/types/test';
import {al} from 'vitest/dist/reporters-5f784f42';

type GetAccessibilityViolations = (params: { page: Page }) => Promise<any[]>;

export const getAccessibilityViolations: GetAccessibilityViolations = async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#root')
    .disableRules(['color-contrast'])
    .analyze();

  return accessibilityScanResults.violations;
};

// biome-ignore lint/correctness/noEmptyPattern:
const beforeEachTests = async ({}, use: () => Promise<void>, testInfo: TestInfo) => {
  let suit = 'unknown';
  const testFilePath = testInfo.titlePath[0] ?? '';

  if (testFilePath.includes('browser')) {
    suit = 'Browser';
  } else if (testFilePath.includes('axe')) {
    suit = 'Axe';
  } else if (testFilePath.includes('vo')) {
    suit = 'Voice over';
  }

  await allure.label('component', testInfo.titlePath[1]);
  await allure.feature(suit);
  await allure.story(testInfo.title);

  await allure.parentSuite(testInfo.titlePath[1]);
  await allure.suite(suit);
  await allure.subSuite(testInfo.title);

  await use();
};

const test = base.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],
});

const voiceOverTest = voiceOverBase.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],
});

export * from '@playwright/test';
export * from '@guidepup/playwright';
export { AxeBuilder, test, voiceOverTest };
