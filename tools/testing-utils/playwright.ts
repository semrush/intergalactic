import AxeBuilder from '@axe-core/playwright';
import { voiceOverTest as voiceOverBase } from '@guidepup/playwright';
import { test as base } from '@playwright/test';
import {
  label,
  feature,
  story,
  suite,
  layer,
} from 'allure-js-commons';
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

  const testsIndex = filePathParts.findIndex((part) => part === '__tests__');

  const component = testsIndex > 0 ? filePathParts[testsIndex - 1] : 'unknown-component';

  const fileName = testsIndex !== -1 ? filePathParts[testsIndex + 1] : '';

  const suiteName = fileName.split('.')[1] ?? 'unknown';

  let layerName = 'Other tests';
  if (suiteName.includes('browser')) {
    layerName = 'Browser tests';
  } else if (suiteName.includes('axe')) {
    layerName = 'Axe tests';
  } else if (suiteName.includes('vo')) {
    layerName = 'Voice over tests';
  }

  const storyParts = testInfo.titlePath.length > 1 ? testInfo.titlePath.slice(1) : [testInfo.title];
  const storyName = storyParts.join(' > ');

  label('feature', suiteName);
  label('component', component);
  story(storyName);
  feature(suiteName);
  suite(component);
  layer(layerName);

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
// eslint-disable-next-line import/export
export * from '@playwright/test';
export * from '@guidepup/playwright';
// eslint-disable-next-line import/export
export { AxeBuilder, test, voiceOverTest };
