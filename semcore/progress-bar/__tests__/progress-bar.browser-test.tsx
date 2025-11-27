import type { Page } from '@playwright/test';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variablesCustomization = [
    { theme: 'invert', size: 's' },
    { theme: 'dark', size: 'm' },
    { theme: 'violet-100', size: 'l' },
  ];
  variablesCustomization.forEach((item) => {
    test(`Verify progress bar customization with size=${item.size} and theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/progress-bar/tests/examples/customizing_the_bar1.tsx', 'en', item);

      await test.step('Verify progress bar visual with keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const variablesProgressValue = [
    { value: 0, size: 's' },
    { value: 110, size: 'm' },
    { value: 50, size: 'l' },
  ];
  variablesProgressValue.forEach((item) => {
    test(`Verify progress bar with value=${item.value} and size=${item.size}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/progress-bar/tests/examples/customizing_the_bar1.tsx', 'en', item);

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

  test('Verify progress bar and value customization', {
    tag: [TAG.PRIORITY_MEDIUM, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/customizing_the_bar.tsx', 'en');

    await test.step('Verify progress bar and value customization visual', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  const locators = {
    progressBar: (page: Page) => page.locator('[data-ui-name="ProgressBar"]'),
  };

  test('Verify keyboard interactions and attributes', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/basic-usage.tsx', 'en');

    const progressBar = locators.progressBar(page);

    await test.step('Verify attributes', async () => {
      await expect(progressBar).toHaveAttribute('role', 'progressbar');
      await expect(progressBar).toHaveAttribute('value');
      await expect(progressBar).toHaveAttribute('aria-valuenow');
      await expect(progressBar).toHaveAttribute('aria-valuetext');
      await expect(progressBar).toHaveAttribute('aria-label', 'Basic ProgressBar example');
      await expect(progressBar).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify focus on progress bar by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(progressBar).toBeFocused();
    });
  });
});
