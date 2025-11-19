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
  // Pairwise testing combinations to cover all props interactions
  const variables = [
    // Combination 1: All features enabled, standard size
    {
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
    // Combination 2: Large size, minimal margins, no axes
    {
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
    // Combination 3: Inverted axis, small size, no tooltip
    {
      plotWidth: 400,
      plotHeight: 250,
      marginX: 60,
      marginY: 60,
      showXAxis: true,
      showYAxis: false,
      invertAxis: true,
      showTooltip: false,
      showTotalInTooltip: false,
      showLegend: false,
      patterns: false,
      duration: 0,
    },
    // Combination 4: Inverted, large margins, patterns
    {
      plotWidth: 600,
      plotHeight: 350,
      marginX: 80,
      marginY: 50,
      showXAxis: false,
      showYAxis: true,
      invertAxis: true,
      showTooltip: true,
      showTotalInTooltip: true,
      showLegend: false,
      patterns: true,
      duration: 0,
    },
    // Combination 5: Minimal features, medium size
    {
      plotWidth: 450,
      plotHeight: 280,
      marginX: 30,
      marginY: 70,
      showXAxis: true,
      showYAxis: true,
      invertAxis: false,
      showTooltip: false,
      showTotalInTooltip: true,
      showLegend: true,
      patterns: true,
      duration: 0,
    },
    // Combination 6: No legend, mixed features
    {
      plotWidth: 550,
      plotHeight: 320,
      marginX: 45,
      marginY: 35,
      showXAxis: true,
      showYAxis: false,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: false,
      showLegend: false,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify scatterplot chart with config ${index + 1}`, {
      tag: [TAG.PRIORITY_HIGH, '@scatterplot-chart', '@d3-chart'],
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
    tag: [TAG.PRIORITY_MEDIUM, '@scatterplot-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/scatterplot-chart/color-customization-and-values-inside.tsx',
      'en',
    );

    await test.step('Verify chart with custom colors and values renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill focus styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@scatterplot-chart', '@d3-chart'],
  }, async ({ page, browserName }) => {
    if (browserName === 'webkit') return;

    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/scatterplot-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
    });

    await test.step('Verify looks good when some items disabled by keyboard', async () => {
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
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@scatterplot-chart', '@d3-chart'],
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
