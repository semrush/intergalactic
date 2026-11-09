import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { selectOption, locators } from './utils';

test.describe(`@base-trigger @filter-trigger ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/usage_with_select.tsx', 'en');

    await test.step('Check empty Filter trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check Filter trigger with value', async () => {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Accessible name with counter', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/accessible_name.tsx', 'en');

    await test.step('Check empty Filter trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check Filter trigger with value', async () => {
      await locators.trigger(page).nth(1).click();
      await locators.options(page).nth(1).waitFor({ state: 'visible' });
      await locators.options(page).nth(0).click();
      await locators.options(page).nth(1).click();
      await locators.options(page).nth(2).click();
      await locators.trigger(page).nth(1).click();

      await locators.options(page).nth(1).waitFor({ state: 'hidden' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Programmatic focus', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/programmatic_focus.tsx', 'en');

    await test.step('Check empty Filter trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check Filter trigger with value', async () => {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});

test.describe(`@base-trigger @link-trigger ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    await test.step('Check empty Link trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check Link trigger with value', async () => {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});

test.describe(`@base-trigger @button-trigger ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await test.step('Check empty Button trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check Button trigger with value', async () => {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
