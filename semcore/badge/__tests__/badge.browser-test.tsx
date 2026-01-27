import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    { bg: undefined, color: undefined },
    { bg: 'cyan', color: undefined },
    { bg: undefined, color: 'text-primary' },
    { bg: 'mist', color: 'gray20' },
    { bg: 'red', color: 'text-primary-invert' },
    { bg: 'orange', color: 'green' },
    { bg: 'green', color: 'white' },
    { bg: 'white', color: 'text-primary' },
  ];

  variables.forEach((item) => {
    test(`Verify bg=${item.bg} and color=${item.color}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/badge/tests/examples/badge-bg-colors.tsx', 'en', item);
      await expect(page.locator('[data-ui-name="Badge"]')).toHaveScreenshot();
    });
  });

  const variableswithBox = [
    { bg: undefined, color: undefined, w: 100, h: 20 },
    { bg: undefined, color: 'text-primary', h: 30 },
    { bg: 'green', color: 'white', w: 200 },
  ];

  variableswithBox.forEach((item) => {
    test(`Verify bg=${item.bg} and color=${item.color} with w=${item.w} h=${item.h}`, {
      tag: [TAG.PRIORITY_MEDIUM,
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/badge/tests/examples/badge-bg-colors.tsx', 'en', item);
      await expect(page.locator('[data-ui-name="Badge"]')).toHaveScreenshot();
    });
  });

  test(`Verify all main types and inverted styles`, {
    tag: [TAG.PRIORITY_HIGH,
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/badge/docs/examples/badge_main_types.tsx', 'en');
    await expect(page).toHaveScreenshot();
  });

  test(`Verify localizations`, {
    tag: [TAG.PRIORITY_HIGH,
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/badge/tests/examples/badge_i18n_example.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('option').nth(0).waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByRole('option').nth(0).waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});
