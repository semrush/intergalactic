import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

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
  link: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="CompactHorizontalBar.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      description: 'Standard: all features, medium size, with axis',
      plotHeight: 350,
      marginX: 40,
      marginY: 40,
      showXAxis: true,
      showTooltip: true,
      patterns: false,
      duration: 0,
    },
    {
      description: 'Patterns: no margins, no axis, patterns enabled',
      plotHeight: 450,
      marginX: 0,
      marginY: 0,
      showXAxis: false,
      showTooltip: true,
      patterns: true,
      duration: 0,
    },
    {
      description: 'Standart: No margins no tooltip',
      plotHeight: 250,
      marginX: 0,
      marginY: 0,
      showXAxis: false,
      showTooltip: false,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify bar horizontal compact with config ${index + 1} (${vars.description})`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/bar-horizontal-compact/basic_usage.tsx',
        'en',
        vars,
      );

      await test.step('Verify chart renders correctly with current configuration', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      if (vars.showTooltip) {
        await test.step('Verify tooltip appears on hover', async () => {
          await locators.barFill(page, 1).hover();
          const tooltip = locators.tooltip(page);
          await tooltip.waitFor({ state: 'visible' });
          await expect(tooltip).toBeVisible();
        });
      }
    });
  });

  test('Verify advanced usage of bar horizontal compact', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/advanced_usage.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify bar highlights on hover and tooltip shown', async () => {
      await locators.barFill(page, 1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bar horizontal compact with links', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box', '@link', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/links.tsx',
      'en',
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await test.step('Verify links hover and keyboard navigation', async () => {
      await locators.link(page, 2).hover();

      // Navigate with keyboard to verify focus state
      await page.keyboard.press('Tab');
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
  test('Verify bar elements aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-horizontal-compact', '@d3-chart', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/basic_usage.tsx',
      'en',
    );

    await test.step('Verify bar backgrounds have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const barBacks = await locators.barBackground(page).all();
      expect(barBacks.length).toBeGreaterThan(0);

      for (const bar of barBacks) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar fills have aria-hidden', async () => {
      const barFills = await locators.barFill(page).all();
      expect(barFills.length).toBeGreaterThan(0);

      for (const bar of barFills) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });
});
