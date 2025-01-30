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
  let suit = 'Other tests'; 
  const testFilePath = testInfo.file.split('/'); 
    const fileName = testFilePath[testFilePath.length - 1]; 
    const component = testFilePath[testFilePath.length - 2]; 
    const suite = fileName.split('.')[1]; 
   

    if (suite.includes('browser')) {
      suit = 'Browser tests';
    } else if (suite.includes('axe')) {
      suit = 'Axe tests';
    } else if (suite.includes('vo')) {
      suit = 'Voice over tests';
    } else if (suite.includes('index')) {
      suit = 'Unit tests';
    }

    await allure.label('component', component); // component
    await allure.layer(suit); //  Browser tests, Axe tests и т. д.
    await allure.suite(component); // Suite = component
    await allure.subSuite(testInfo.titlePath.slice(1).join(' > ')); //test name
    await allure.story(testInfo.title); //describe name

  await use();
};

const test = base.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],
});

const voiceOverTest = voiceOverBase.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],
});

export type { Page };
export * from '@playwright/test';
export * from '@guidepup/playwright';
export { AxeBuilder, test, voiceOverTest };
