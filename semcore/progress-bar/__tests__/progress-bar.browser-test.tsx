import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const BAR_EXAMPLE = 'stories/components/progress-bar/tests/examples/customizing_the_bar_with_background.tsx';
const VALUE_EXAMPLE = 'stories/components/progress-bar/tests/examples/customizing_the_value.tsx';

/** The example is mounted into `#root`, so snapshots are scoped to it instead of the whole viewport. */
const stand = (page: Page) => page.locator('#root');

/**
 * `default` and `invert` are the built-in themes; any other value falls through
 * to the custom-theme path, so one custom token is covered alongside them.
 */
const THEMES = ['default', 'invert', 'violet-100'];
const SIZES = ['s', 'm', 'l'];
/** One boundary value per size, so each snapshot also covers a distinct edge case. */
const BOUNDARY_VALUE_BY_SIZE = { s: 1, m: 99, l: 110 } as const;

const themeSizeMatrix = THEMES.flatMap((theme) =>
  SIZES.map((size) => ({
    theme,
    size,
    value: BOUNDARY_VALUE_BY_SIZE[size as keyof typeof BOUNDARY_VALUE_BY_SIZE],
  })),
);

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  // Every case renders the theme on both light and dark backgrounds, across
  // value=<case>, value=0, value=100 and the no value state.
  themeSizeMatrix.forEach((item) => {
    test(`Verify progress bar with background customization with value=${item.value}, size=${item.size}, theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, BAR_EXAMPLE, 'en', item);

      await test.step('Verify progress bar visual with keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await expect(stand(page)).toHaveScreenshot();
      });
    });
  });

  themeSizeMatrix.forEach((item) => {
    test(`Verify progress bar value customization with value=${item.value}, size=${item.size}, theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
    }, async ({ page }) => {
      await loadPage(page, VALUE_EXAMPLE, 'en', item);

      await test.step('Verify progress bar value visual with keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await expect(stand(page)).toHaveScreenshot();
      });
    });
  });

  test('Verify both value and progress bar customized', {
    tag: [TAG.PRIORITY_MEDIUM, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/customizing_the_bar.tsx', 'en');
    await page.keyboard.press('Tab');
    await expect(stand(page)).toHaveScreenshot();
  });

  test('Verify all themes on light and dark backgrounds', {
    tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/advanced/examples/all_themes.tsx', 'en');
    await expect(stand(page)).toHaveScreenshot();
  });
});
