import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test(`Verify all main types, invert and light styles`, {
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
