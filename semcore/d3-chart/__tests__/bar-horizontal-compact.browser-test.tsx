import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/** CompactHorizontalBar is deprecated (replaced by ScoreBarChart): only smoke tests are kept. */
const STORY = 'stories/components/d3-chart/tests/examples/bar-horizontal-compact/basic_usage.tsx';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  barBackground: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Background"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  barFill: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Fill"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="CompactHorizontalBar.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify bar horizontal compact with config 1 (Standard: all features, medium size, with axis)', {
    tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', {
      plotHeight: 350,
      marginX: 40,
      marginY: 40,
      showXAxis: true,
      showTooltip: true,
      patterns: false,
      duration: 0,
    });

    await test.step('Verify chart renders correctly with current configuration', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip appears on hover', async () => {
      await locators.barFill(page, 1).hover();
      await expect(locators.tooltip(page)).toBeVisible();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify bar elements aria-hidden attributes', {
    tag: [TAG.PRIORITY_LOW, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { duration: 0 });

    await test.step('Verify bar backgrounds have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      await expect(locators.barBackground(page)).not.toHaveCount(0);

      for (const bar of await locators.barBackground(page).all()) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar fills have aria-hidden', async () => {
      await expect(locators.barFill(page)).not.toHaveCount(0);

      for (const bar of await locators.barFill(page).all()) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });
});
