import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';
import { test as base } from '@playwright/test';
import { voiceOverTest as voiceOverBase } from '@guidepup/playwright';
import { allure } from 'allure-playwright';
import type { TestInfo } from 'playwright/types/test';
import axe from 'axe-core';

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
  let suit = 'unknown';
  //let describeName = '';
  const testFilePath = testInfo.titlePath[0] ?? '';

  if (testFilePath.includes('browser')) {
    suit = 'Browser tests';
  } else if (testFilePath.includes('axe')) {
    suit = 'Axe tests';
  } else if (testFilePath.includes('vo')) {
    suit = 'Voice over tests';
  } else if (testFilePath.includes('shapshot')) {
    suit = 'Snapshot tests';
  } else if (testFilePath.includes('index')) {
    suit = 'Unit tests';
  }

  await allure.label('component', testInfo.titlePath[1]);
  await allure.layer(suit);
  await allure.story(testInfo.title); // надо будет заменить на story title

  await allure.parentSuite(testInfo.titlePath[1]);
 // await allure.suite(describeName ||suit);
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
