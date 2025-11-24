import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  spin: (page: Page, index?: number) => {
    const base = page.locator('svg[role="img"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify spin with correct sizes and right text', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/tests/examples/spin-sizes.tsx', 'en');

    await test.step('Verify screenshot', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify sizes', async () => {
      const sizes = {
        xs: '16px',
        s: '20px',
        m: '24px',
        l: '32px',
        xl: '48px',
        xxl: '72px',
      };

      for (const [size, expectedPx] of Object.entries(sizes)) {
        const spinner = page.locator(`svg[class*="size_${size}"]`);

        await expect(spinner).toBeVisible();

        const height = await spinner.evaluate((el) => getComputedStyle(el).height);
        const width = await spinner.evaluate((el) => getComputedStyle(el).width);

        expect(height).toBe(expectedPx);
        expect(width).toBe(expectedPx);

        const style = await spinner.getAttribute('style');
        expect(style).toContain('dark');
      }
    });
  });

  test('Verify spin with bottom text', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/tests/examples/spin-sizes-bottom-text.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify themes and default sizes', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/tests/examples/spin-theme.tsx', 'en');

    await test.step('Verify theme styles', async () => {
      const styleDark = await locators.spin(page, 0).getAttribute('style');
      expect(styleDark).toContain('dark');

      const styleInvert = await locators.spin(page, 1).getAttribute('style');
      expect(styleInvert).toContain('invert');
    });

    await test.step('Verify default size', async () => {
      const height = await locators.spin(page, 1).evaluate((el) => getComputedStyle(el).height);
      const width = await locators.spin(page, 1).evaluate((el) => getComputedStyle(el).width);

      expect(height).toBe('24px');
      expect(width).toBe('24px');
    });

    await test.step('Verify screenshot', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom themes and default sizes', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/tests/examples/spin-custom-theme.tsx', 'en');

    await test.step('Verify custom theme colors', async () => {
      const styleFirst = await locators.spin(page, 0).getAttribute('style');
      expect(styleFirst).toContain('blanchedalmond');

      const styleSecond = await locators.spin(page, 1).getAttribute('style');
      expect(styleSecond).toContain('3eeb4c');

      const styleThird = await locators.spin(page, 2).getAttribute('style');
      expect(styleThird).toContain('8649e1');
    });

    await test.step('Verify screenshot', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify spin box props', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/tests/examples/spin-box-props.tsx', 'en');

    await test.step('Verify custom width', async () => {
      const customWidth = await locators.spin(page, 0).evaluate((el) => getComputedStyle(el).width);
      expect(customWidth).toBe('50px');
    });

    await test.step('Verify custom height', async () => {
      const customHeight = await locators.spin(page, 1).evaluate((el) => getComputedStyle(el).height);
      expect(customHeight).toBe('50px');
    });

    await test.step('Verify custom width and height together', async () => {
      const customWidth = await locators.spin(page, 2).evaluate((el) => getComputedStyle(el).width);
      const customHeight = await locators.spin(page, 2).evaluate((el) => getComputedStyle(el).height);
      expect(customWidth).toBe('50px');
      expect(customHeight).toBe('50px');
    });

    await test.step('Verify margin', async () => {
      const margin = await locators.spin(page, 2).evaluate((el) => getComputedStyle(el).margin);
      expect(margin).toBe('16px');
    });

    await test.step('Verify padding', async () => {
      const padding = await locators.spin(page, 3).evaluate((el) => getComputedStyle(el).padding);
      expect(padding).toBe('16px');
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify spin attributes inside table', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin/docs/examples/basic_example.tsx', 'en');

    const div = page.locator('div[role="status"][aria-live="polite"]');
    const svg = div.locator('svg');

    await test.step('Verify spin visibility and attributes', async () => {
      await expect(svg).toBeVisible();

      await expect(svg).toHaveAttribute('role', 'img');
      await expect(svg).toHaveAttribute('aria-label', 'Loading…');
      await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    await test.step('Verify spin hides after button click', async () => {
      await locators.button(page).click();
      await expect(svg).not.toBeVisible();
    });
  });
});
