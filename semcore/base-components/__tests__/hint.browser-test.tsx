import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  triggerBth: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  triggerLink: (page: Page, index?: number) => {
    const base = page.getByRole('link');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Hint"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  text: (page: Page) => page.getByText('Export to PDF'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const placementVariants = [
    { placement: 'top-start' },
    { placement: 'top' },
    { placement: 'top-end' },
    { placement: 'bottom-start' },
    { placement: 'bottom' },
    { placement: 'bottom-end' },
    { placement: 'right-start' },
    { placement: 'right' },
    { placement: 'right-end' },
    { placement: 'left-start' },
    { placement: 'left' },
    { placement: 'left-end' },

  ];
  placementVariants.forEach((variant) => {
    test(`Verify hint with placement= ${variant.placement}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@hint'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/hint/tests/examples/base-example-props.tsx', 'en', variant);

      await test.step('Hover trigger and verify hint appears', async () => {
        await locators.triggerBth(page).hover();
        await locators.hint(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify hint focus state', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');
    await page.waitForTimeout(100);

    await test.step('Focus on button', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.triggerBth(page)).toBeFocused();
      await expect(locators.hint(page)).toHaveCount(1);
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Focus on Link', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(locators.triggerLink(page)).toBeFocused();
      await expect(locators.hint(page)).toHaveCount(1);
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify cursor anchoring', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/tests/examples/cursor_anchoring.tsx', 'en');

    await test.step('Hover link and verify hint follows cursor', async () => {
      const link = page.getByRole('link').first();
      const box = await link.boundingBox();
      await link.hover({ position: { x: box!.width / 6, y: box!.height / 2 } });
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify word wrapping', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/tests/examples/word-wrap.tsx', 'en');

    await test.step('Verify long word without space', async () => {
      const link = page.getByRole('link').nth(1);
      const box = await link.boundingBox();
      await link.hover({ position: { x: box!.width / 6, y: box!.height / 2 } });
      await locators.hint(page).waitFor({ state: 'visible' });
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
  test('Verify hint shows on hover and hides on mouse leave', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');

    await test.step('Initial state - hint should not be visible', async () => {
      await expect(locators.hint(page)).toHaveCount(0);
    });

    await test.step('Hover trigger - hint should appear', async () => {
      await locators.triggerBth(page).hover();
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Move mouse away - hint should hide', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify hint shows on focus and hides on esc', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');

    await page.getByRole('button').waitFor({ state: 'visible' });
    await test.step('Hint shown when bth focused', async () => {
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Hint closed on ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.hint(page).waitFor({ state: 'hidden' });
      await expect(locators.hint(page)).toHaveCount(0);
    });

    await test.step('Hint shown when link focused', async () => {
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Hint closed on ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.hint(page).waitFor({ state: 'hidden' });
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify hint hides on blur', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@hint'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');
    if (browserName == 'firefox') test.skip();
    await test.step('Show hint by focusing trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Press Escape - hint should hide', async () => {
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'hidden' });
      await expect(locators.hint(page)).toHaveCount(0);
    });
  });

  test('Verify custom timeout delays', {
    tag: [TAG.PRIORITY_MEDIUM, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/tests/examples/base-example-props.tsx', 'en', { timeout: 1000 });

    await test.step('Hover and verify hint respects custom show delay', async () => {
      await locators.triggerBth(page).hover();

      await page.waitForTimeout(500);
      await expect(locators.hint(page)).toHaveCount(0);

      await page.waitForTimeout(1000);
      await expect(locators.hint(page)).toHaveCount(1);
    });
  });

  test('Verify hint z-index stacking', {
    tag: [TAG.PRIORITY_MEDIUM, '@hint'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');

    await test.step('Show hint', async () => {
      await locators.triggerBth(page).hover();
      await expect(locators.hint(page)).toBeVisible({ timeout: 1000 });
    });

    await test.step('Verify hint has proper z-index', async () => {
      const hint = locators.hint(page);
      const zIndex = await hint.evaluate((el) => {
        return window.getComputedStyle(el).zIndex;
      });

      // Hint should have high z-index for tooltip layer
      expect(parseInt(zIndex)).toBeGreaterThan(0);
    });
  });
});
