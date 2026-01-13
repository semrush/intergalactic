import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variablesBarCustomization = [
    { theme: 'invert', size: 's', value: 0 },
    { theme: 'dark', size: 'm', value: 110 },
    { theme: 'violet-100', size: 'l', value: 50 },
  ];
  variablesBarCustomization.forEach((item) => {
    test(`Verify progress bar with background customization with value=${item.value}, size=${item.size}, theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/progress-bar/tests/examples/customizing_the_bar_with_background.tsx', 'en', item);

      await test.step('Verify progress bar visual with keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const variablesValueCustomization = [
    { value: 0, theme: 'inviolet-500', size: 's' },
    { value: 110, theme: 'violet-100', size: 'm' },
    { value: 50, theme: 'violet-100', size: 'l' },
  ];
  variablesValueCustomization.forEach((item) => {
    test(`Verify progress bar value customization with value=${item.value}, size=${item.size}, theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/progress-bar/tests/examples/customizing_the_value.tsx', 'en', item);

      await test.step('Verify progress bar value visual with keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify both value and progress bar customized', {
    tag: [TAG.PRIORITY_MEDIUM, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/customizing_the_bar.tsx', 'en');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});
