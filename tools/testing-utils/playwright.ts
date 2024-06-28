import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';
import { test } from '@playwright/test';
import { voiceOverTest } from '@guidepup/playwright';
import { allure } from 'allure-playwright';
import type { TestInfo } from 'playwright/types/test';

type GetAccessibilityViolations = (params: { page: Page }) => Promise<any[]>;

export const getAccessibilityViolations: GetAccessibilityViolations = async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#root')
    .disableRules(['color-contrast'])
    .analyze();

  return accessibilityScanResults.violations;
};

// biome-ignore lint/correctness/noEmptyPattern:
const beforeEachTests = async ({}, testInfo: TestInfo) => {
  let suit = 'unknown';
  const testFilePath = testInfo.titlePath[0] ?? '';

  if (testFilePath.includes('browser')) {
    suit = 'Browser';
  } else if (testFilePath.includes('axe')) {
    suit = 'Axe';
  } else if (testFilePath.includes('vo')) {
    suit = 'Voice over';
  }

  await allure.parentSuite(testInfo.titlePath[1]);
  await allure.suite(suit);
  await allure.subSuite(testInfo.title);
};

test.beforeEach(beforeEachTests);
voiceOverTest.beforeEach(beforeEachTests);

export * from '@playwright/test';
export * from '@guidepup/playwright';
export { AxeBuilder };
