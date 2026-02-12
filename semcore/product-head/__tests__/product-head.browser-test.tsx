import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  textarea: (page: Page) => page.locator('[data-ui-name="Textarea"]'),
  label: (page: Page) => page.locator('label'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const breakpoints = [
    { width: 320 },
    { width: 768 },
    { width: 1280 },
    { width: 1920 },
  ];

  breakpoints.forEach(({ width }) => {
    test(`Verify base example looks good on screen width ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        '@product-head',
        '@button',
        '@tooltip',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/product-head/docs/examples/extended_example.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify looks good when long long title', {
    tag: [TAG.PRIORITY_HIGH,
      '@product-head',
      '@button',
    ],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/product-head/advanced/examples/long-long-title.tsx', 'en');
    await page.locator('[data-ui-name="Text"]').nth(1).waitFor({ state: 'visible' });
    if (browserName == 'webkit') await expect(page).toHaveScreenshot(); // the hint not stable on webkit in ci
    else {
      await page.locator('[data-ui-name="Text"]').nth(1).hover();
      await page.waitForTimeout(100); // needed for ff
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible', timeout: 1500 });
      await expect(page).toHaveScreenshot();
    }
  });

  test('Verify renders when single items used', {
    tag: [TAG.PRIORITY_HIGH,
      '@product-head',
      '@button',
      '@tooltip',
      '@breadcrumbs',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/product-head/tests/examples/test_example.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify focus by keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@product-head',
      '@button',
      '@tooltip',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/product-head/docs/examples/extended_example.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Breadcrumbs.Item"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="ButtonLink"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Button"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Select"]').first()).toBeFocused();

    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'hidden' });
    await expect(page.locator('[data-ui-name="Select"]').first()).toBeFocused();
    await expect(page.locator('[data-ui-name="Select"]').first()).toHaveAttribute('value', 'us');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]').first()).toBeFocused();
    await page.keyboard.press('Space');

    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Popper"]')).toBeFocused();
    await page.keyboard.press('Escape');

    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="Select"]').nth(1)).toBeFocused();
  });
});
