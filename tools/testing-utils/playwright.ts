import AxeBuilder from '@axe-core/playwright';
import type { Page } from 'playwright';
import { test as base } from '@playwright/test';
import { voiceOverTest as voiceOverBase } from '@guidepup/playwright';
import { label, feature, story, parentSuite, suite, subSuite, layer } from 'allure-js-commons';
import type { TestInfo } from 'playwright/types/test';
import axe from 'axe-core';
import fs from 'node:fs/promises';
import path from 'node:path';

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

const beforeEachTests = async (use: () => Promise<void>, testInfo: TestInfo) => {
  let testLayer = 'Other tests';

  const testFilePath = testInfo.file.split('/');
  const fileName = testFilePath[testFilePath.length - 1];
  const component = testFilePath[testFilePath.length - 3];
  const testDescription = fileName.split(' › ')[1] ?? '';

  if (testFilePath.includes('browser')) {
    testLayer = 'Browser tests';
  } else if (testFilePath.includes('axe')) {
    testLayer = 'Axe tests';
  } else if (testFilePath.includes('vo')) {
    testLayer = 'Voice over tests';
  } else if (testFilePath.includes('index')) {
    testLayer = 'Unit tests';
  }

  await label('component', component);
  await layer(testLayer);
  await feature(testLayer);
  await parentSuite(component);
  await subSuite(testDescription);
  await story(testInfo.title);
  await suite(testLayer);

  await use();
};

const test = base.extend<{ testHook: void }>({
  testHook: [beforeEachTests, { auto: true }],

  page: async ({ page }, use) => {
    await page.route('https://static.semrush.com/ui-kit/illustration/**/*.svg', async (route) => {
      const illustrationName = route.request().url().split('/').pop()!;

      const svg = await fs.readFile(
        path.resolve(process.cwd(), 'semcore', 'illustration', 'svg', illustrationName),
        'utf-8',
      );

      await route.fulfill({ body: svg, contentType: 'image/svg+xml' });
    });

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
