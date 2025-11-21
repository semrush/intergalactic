import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  spinContainer: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spinContainerContent: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer.Content"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spinContainerOverlay: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer.Overlay"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spin: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Spin"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Input.Value"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  flex: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Flex"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  fadeInOut: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="FadeInOut"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify sizes and theme', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/tests/examples/sizes.tsx', 'en');

    await test.step('Verify screenshot', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify sizes and themes', async () => {
      const sizes = {
        xs: '16px',
        s: '20px',
        m: '24px',
        l: '32px',
        xl: '48px',
        xxl: '72px',
      };

      const themes = ['dark', 'invert'];

      for (const [themeIndex, theme] of themes.entries()) {
        const spinContainer = locators.flex(page, themeIndex).locator('[data-ui-name="SpinContainer"]');

        for (const [size, expectedPx] of Object.entries(sizes)) {
          const spinner = spinContainer.locator(`svg[class*="size_${size}"]`);

          await expect(spinner).toBeVisible();

          const [height, width] = await Promise.all([
            spinner.evaluate((el) => getComputedStyle(el).height),
            spinner.evaluate((el) => getComputedStyle(el).width),
          ]);

          expect(height).toBe(expectedPx);
          expect(width).toBe(expectedPx);

          const style = await spinner.getAttribute('style');
          expect(style).toContain(`${theme};`);
        }
      }
    });
  });

  test('Verify custom backgrounds with themes and overlay and theme', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/tests/examples/custom-background.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify when elements and spin container added', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/tests/examples/over-interactive-content.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify interactions when elements when spin container added', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/tests/examples/over-interactive-content.tsx', 'en');

    await test.step('Verify tab navigation to first input', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page, 0)).toBeFocused();
    });

    await test.step('Verify tab navigation to second input', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page, 1)).toBeFocused();
    });

    await test.step('Verify third input is not focusable due to overlay', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page, 2)).not.toBeFocused();
      await expect(locators.spinContainerOverlay(page, 0)).not.toBeFocused();
    });

    await test.step('Verify overlay is not focusable', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.spinContainerOverlay(page, 1)).not.toBeFocused();
    });
  });

  test('Verify spin container attributes when loading and not loading', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/docs/examples/usage_in_content.tsx', 'en');

    await test.step('Verify spin container attributes when loading', async () => {
      await expect(locators.spinContainer(page)).toHaveAttribute('aria-live', 'polite');
      await expect(locators.spinContainer(page)).toHaveAttribute('role', 'status');
    });

    await test.step('Verify content is inert when loading', async () => {
      await expect(locators.spinContainerContent(page)).toHaveAttribute('inert', '');
    });

    await test.step('Verify animation and spin attributes', async () => {
      await expect(locators.fadeInOut(page)).toHaveCount(1);

      const svg = locators.fadeInOut(page).locator('[data-ui-name="Spin"]');
      await expect(svg).toHaveAttribute('aria-label', 'Loading…');
      await expect(svg).toHaveAttribute('role', 'img');
    });

    await test.step('Verify attributes after stopping loading', async () => {
      await locators.button(page).click();
      await expect(locators.spinContainerContent(page)).not.toHaveAttribute('inert', '');
      await expect(locators.fadeInOut(page)).toHaveCount(0);

      const svg = locators.fadeInOut(page).locator('[data-ui-name="Spin"]');
      await expect(svg).not.toBeVisible();
    });
  });
});
