import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  scatterPlot: (page: Page, index?: number) => {
    const base = page.locator('circle[data-ui-name="ScatterPlot"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="ScatterPlot.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      description: 'Standard: all features enabled, medium size',
      plotWidth: 500,
      plotHeight: 300,
      marginX: 40,
      marginY: 40,
      showXAxis: true,
      showYAxis: true,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: true,
      showLegend: true,
      patterns: false,
      duration: 0,
    },
    {
      description: 'Patterns: no axes, patterns enabled, large size',
      plotWidth: 700,
      plotHeight: 400,
      marginX: 20,
      marginY: 20,
      showXAxis: false,
      showYAxis: false,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: false,
      showLegend: true,
      patterns: true,
      duration: 0,
    },
    {
      description: 'Inverted: axis inversion, no tooltip, no legend',
      plotWidth: 600,
      plotHeight: 350,
      marginX: 80,
      marginY: 50,
      showXAxis: false,
      showYAxis: true,
      invertAxis: true,
      showTooltip: false,
      showTotalInTooltip: false,
      showLegend: false,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify scatterplot chart with config ${index + 1} (${vars.description})`, {
      tag: [TAG.PRIORITY_HIGH, '@scatterplot-chart', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/scatterplot-chart/basic-usage.tsx',
        'en',
        vars,
      );

      await test.step('Verify chart renders correctly with current configuration', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      if (vars.showTooltip) {
        await test.step('Verify tooltip appears on hover', async () => {
          const scatterItem = locators.scatterPlot(page, 5);
          await scatterItem.hover();

          const tooltip = locators.tooltip(page);
          await tooltip.waitFor({ state: 'visible' });
          await expect(tooltip).toBeVisible();
        });
      }
    });
  });

  test('Verify scatterplot with colors and numbers', {
    tag: [TAG.PRIORITY_MEDIUM, '@scatterplot-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/scatterplot-chart/color-customization-and-values-inside.tsx',
      'en',
    );

    await test.step('Verify chart with custom colors and values', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill focus styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@scatterplot-chart', '@d3-chart', '@chart-legend'],
  }, async ({ page, browserName }) => {
    if (browserName === 'webkit') return;

    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/scatterplot-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await test.step('Verify keyboard interaction with legend items', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
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
  test('Verify onClickScatterItem callback', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@scatterplot-chart', '@d3-chart', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('Clicked')) {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/scatterplot-chart/basic-usage.tsx',
      'en',
    );

    await test.step('Verify no callbacks on render', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      expect(messages.length).toBe(0);
    });

    await test.step('Verify onClickScatterItem callback triggered on scatter item click', async () => {
      const scatterItem = locators.scatterPlot(page, 5);
      await scatterItem.click();
      await page.waitForTimeout(100);

      expect(messages.length).toBe(1);
      expect(messages[0]).toBe('Clicked scatterplot item');
    });
  });
});
