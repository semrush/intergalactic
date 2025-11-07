import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [

    { size: 'm', up: true },
    { size: 'm', up: false },
    { size: 'l', up: true },
    { size: 'l', up: false },

  ];

  variables.forEach((item) => {
    test(`Verify dot size=${item.size} up=${item.up} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@dot',
        '@button',
        '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dot/tests/examples/sizes-and-positions.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
      const dot = page.locator('[data-ui-name="Dot"]');

      const count = await dot.count();
      for (let i = 0; i < count; i++) {
        const width = await dot.nth(i).evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('width'),
        );
        const height = await dot.nth(i).evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('height'),
        );

        if (item.size == 'm') {
          expect(width.trim()).toBe('6px');
          expect(height.trim()).toBe('6px');
        } else {
          expect(width.trim()).toBe('12px');
          expect(height.trim()).toBe('12px');
        }
      }
    });

    test(`Verify dot with counter size=${item.size} up=${item.up} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@dot',
        '@button',
        '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dot/tests/examples/with-counter-sizes-and-positions.tsx', 'en', item);
      if (item.size == 'l') test.skip();// the size L is not actual for dot with counter
      await expect(page).toHaveScreenshot();
      const dotCounter = page.locator('span[aria-label="Value"][data-ui-name="Dot"]');

      const count = await dotCounter.count();
      for (let i = 0; i < count; i++) {
        const paddingLeft = await dotCounter.nth(i).evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('padding-left'),
        );
        const paddingRight = await dotCounter.nth(i).evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('padding-right'),
        );

        expect(paddingLeft.trim()).toBe('4px');
        expect(paddingRight.trim()).toBe('4px');
      }
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify dot hides by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dot',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dot/docs/examples/example_of_dot_animation.tsx', 'en');

    const button = page.locator('[data-ui-name="Button"]');
    const dot = page.locator('[data-ui-name="Dot"]');

    await button.hover();
    await expect(dot).toBeVisible();
    await button.click();
    await expect(dot).not.toBeVisible();
  });

  test('Verify dot hides by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dot',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dot/docs/examples/example_of_dot_animation.tsx', 'en');

    const button = page.locator('[data-ui-name="Button"]');
    const dot = page.locator('[data-ui-name="Dot"]');

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(dot).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(dot).not.toBeVisible();
  });
});
