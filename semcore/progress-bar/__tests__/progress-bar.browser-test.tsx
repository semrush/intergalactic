import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const BAR_EXAMPLE = 'stories/components/progress-bar/tests/examples/customizing_the_bar_with_background.tsx';
const VALUE_EXAMPLE = 'stories/components/progress-bar/tests/examples/customizing_the_value.tsx';

/** The example is mounted into `#root`, so snapshots are scoped to it instead of the whole viewport. */
const stand = (page: Page) => page.locator('#root');

/**
 * `default`, `invert` and `brand` are the built-in themes; any other value falls
 * through to the custom-theme path, so one custom token is covered alongside them.
 */
const BAR_THEMES = ['default', 'invert', 'brand', 'violet-100'];
const SIZES = ['s', 'm', 'l'] as const;
/** One boundary value per size, so each snapshot also covers a distinct edge case. */
const BOUNDARY_VALUE_BY_SIZE = { s: 1, m: 99, l: 110 } as const;

const barMatrix = BAR_THEMES.flatMap((theme) =>
  SIZES.map((size) => ({ theme, size, value: BOUNDARY_VALUE_BY_SIZE[size] })),
);

/**
 * `theme` on ProgressBar.Value is deprecated ("Use only predefined themes"), so it
 * gets a single regression guard instead of a matrix — just enough to catch the
 * deprecated path breaking before it is removed.
 */
const deprecatedValueTheme = { theme: 'violet-100', size: 'm', value: 99 } as const;

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  // Every case renders the theme on both light and dark backgrounds, across
  // value=<case>, value=0, value=100 and the no value state.
  barMatrix.forEach((item) => {
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

  test(`Verify progress bar value customization with value=${deprecatedValueTheme.value}, size=${deprecatedValueTheme.size}, theme=${deprecatedValueTheme.theme}`, {
    tag: [TAG.PRIORITY_MEDIUM, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, VALUE_EXAMPLE, 'en', deprecatedValueTheme);

    await test.step('Verify progress bar value visual with keyboard focus', async () => {
      await page.keyboard.press('Tab');
      await expect(stand(page)).toHaveScreenshot();
    });
  });

  test('Verify all themes on light and dark backgrounds', {
    tag: [TAG.PRIORITY_HIGH, '@progress-bar'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/progress-bar/advanced/examples/all_themes.tsx', 'en');
    await expect(stand(page)).toHaveScreenshot();
  });
});
