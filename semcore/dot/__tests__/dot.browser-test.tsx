import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
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
        '@link',
        '@base-components',
        '@base-trigger',
        '@flex-box',
        '@link-trigger',
        '@pills'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dot/tests/examples/sizes-and-positions.tsx', 'en', item);

      await test.step('Verify dots styles', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step(`Verify each dot is ${item.size === 'm' ? '6px' : '12px'}`, async () => {
        const dots = page.locator('[data-ui-name="Dot"]');
        const dotSize = item.size === 'm' ? '6px' : '12px';
        await expect(dots).not.toHaveCount(0);
        for (const dot of await dots.all()) {
          await expect(dot).toHaveCSS('width', dotSize);
          await expect(dot).toHaveCSS('height', dotSize);
        }
      });
    });
  });

  variables.filter((item) => item.size === 'm').forEach((item) => {
    test(`Verify dot with counter size=${item.size} up=${item.up}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@dot',
        '@button',
        '@link',
        '@base-components',
        '@base-trigger',
        '@flex-box',
        '@link-trigger',
        '@pills'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dot/tests/examples/with-counter-sizes-and-positions.tsx', 'en', item);

      await test.step('Verify dots with counter styles', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify each dot with counter has 4px horizontal paddings', async () => {
        const dotCounters = page.locator('[data-ui-name="Dot"]');
        await expect(dotCounters).not.toHaveCount(0);
        for (const dotCounter of await dotCounters.all()) {
          await expect(dotCounter).toHaveCSS('padding-left', '4px');
          await expect(dotCounter).toHaveCSS('padding-right', '4px');
        }
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify dot hides by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dot',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dot/docs/examples/example_of_dot_animation.tsx', 'en');

    const button = page.getByRole('button');
    const dot = page.locator('[data-ui-name="Dot"]');

    await test.step('Verify dot is visible on hover', async () => {
      await button.hover();
      await expect(dot).toBeVisible();
    });

    await test.step('Verify dot hides after click', async () => {
      await button.click();
      await expect(dot).toBeHidden();
    });
  });

  test('Verify dot hides by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dot',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dot/docs/examples/example_of_dot_animation.tsx', 'en');

    const button = page.getByRole('button');
    const dot = page.locator('[data-ui-name="Dot"]');

    await test.step('Verify dot is visible when button is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await expect(dot).toBeVisible();
    });

    await test.step('Verify dot hides after Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(dot).toBeHidden();
    });
  });
});
