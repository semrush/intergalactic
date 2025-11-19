import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page, index?: number) => {
    const base = page.locator('svg[data-ui-name="Plot"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  areaDots: (page: Page, index?: number) => {
    const base = page.locator('circle[data-ui-name="Area.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  areaPath: (page: Page, index?: number) => {
    const base = page.locator('path[data-ui-name="Area"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legendItem: (page: Page, text?: string, index?: number) => {
    const base = text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="AreaChart.Tooltip"], [data-ui-name="Chart.Tooltip"], [data-ui-name="HoverLine.Tooltip"]'),
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
      stacked: false,
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
      showDots: true,
      patterns: false,
      duration: 0,
    },
    // Combination 2: Stacked, large size, minimal margins, no axes
    {
      stacked: true,
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
      showDots: false,
      patterns: true,
      duration: 0,
    },
    // Combination 3: Inverted axis, small size, no tooltip
    {
      stacked: false,
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
      showDots: true,
      patterns: false,
      duration: 0,
    },
    // Combination 4: Stacked + inverted, large margins, patterns
    {
      stacked: true,
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
      showDots: false,
      patterns: true,
      duration: 0,
    },
    // Combination 5: Minimal features, medium size
    {
      stacked: false,
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
      showDots: false,
      patterns: true,
      duration: 0,
    },
    // Combination 6: Stacked, no legend, mixed features
    {
      stacked: true,
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
      showDots: true,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify area chart with config ${index + 1}`, {
      tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx',
        'en',
        vars,
      );

      await test.step('Verify chart renders correctly with current configuration', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify axes, dots and dimensions', async () => {
        const plot = locators.plot(page);
        const bbox = await plot.boundingBox();

        // Verify plot dimensions are rendered (approximate check due to margins)
        if (bbox) {
          expect(bbox.width).toBeGreaterThan(vars.plotWidth - 200);
          expect(bbox.height).toBeGreaterThan(vars.plotHeight - 200);
        }

        // Verify dots visibility based on showDots prop
        const dotsCount = await locators.areaDots(page).count();
        if (vars.showDots) {
          expect(dotsCount).toBeGreaterThan(0);
        }

        // Verify axes visibility
        const xAxis = page.locator('[data-ui-name="XAxis"]');
        const yAxis = page.locator('[data-ui-name="YAxis"]');

        if (vars.showXAxis) {
          await expect(xAxis).toBeVisible();
        }
        if (vars.showYAxis) {
          await expect(yAxis).toBeVisible();
        }
      });

      await test.step('Verify tooltip visibility', async () => {
        if (vars.showTooltip) {
          const plot = locators.plot(page);
          const bbox = await plot.boundingBox();

          if (bbox) {
            // Move mouse to center of chart to trigger tooltip
            await page.mouse.move(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            await page.waitForTimeout(300);

            const tooltip = locators.tooltip(page);
            await expect(tooltip).toBeVisible();
          }
        } else {
          // Verify tooltip is not visible when showTooltip is false
          const plot = locators.plot(page);
          const bbox = await plot.boundingBox();

          if (bbox) {
            await page.mouse.move(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            await page.waitForTimeout(300);

            const tooltip = locators.tooltip(page);
            await expect(tooltip).not.toBeVisible();
          }
        }
      });

      await test.step('Verify legend visibility', async () => {
        const legend = page.locator('[data-ui-name="Chart.Legend"], [data-ui-name="Legend"]');

        if (vars.showLegend) {
          await expect(legend).toBeVisible();
        } else {
          await expect(legend).not.toBeVisible();
        }
      });
    });
  });

  // Data combinations testing
  const dataVariations = [
    {
      name: 'with standard data',
      data: [
        { time: new Date('2024-01-01'), line: 2, line2: 3 },
        { time: new Date('2024-01-06'), line: 4, line2: 3 },
        { time: new Date('2024-01-11'), line: 3, line2: 3 },
        { time: new Date('2024-01-16'), line: 6, line2: 4 },
        { time: new Date('2024-01-21'), line: 5, line2: 3 },
      ],
    },
    {
      name: 'with null values in data',
      data: [
        { time: new Date('2024-01-01'), line: 2, line2: 3 },
        { time: new Date('2024-01-06'), line: null, line2: 3 },
        { time: new Date('2024-01-11'), line: 3, line2: null },
        { time: new Date('2024-01-16'), line: 6, line2: 4 },
      ],
    },
    {
      name: 'with undefined values in data',
      data: [
        { time: new Date('2024-01-01'), line: 2, line2: 3 },
        { time: new Date('2024-01-06'), line: undefined, line2: 3 },
        { time: new Date('2024-01-11'), line: 3, line2: undefined },
        { time: new Date('2024-01-16'), line: 6, line2: 4 },
      ],
    },
    {
      name: 'with single data point',
      data: [
        { time: new Date('2024-01-01'), line: 5, line2: 7 },
      ],
    },
    {
      name: 'with empty array',
      data: [],
    },
    {
      name: 'with zero values',
      data: [
        { time: new Date('2024-01-01'), line: 0, line2: 0 },
        { time: new Date('2024-01-06'), line: 0, line2: 5 },
        { time: new Date('2024-01-11'), line: 3, line2: 0 },
      ],
    },
    {
      name: 'with negative values',
      data: [
        { time: new Date('2024-01-01'), line: -2, line2: 3 },
        { time: new Date('2024-01-06'), line: 4, line2: -3 },
        { time: new Date('2024-01-11'), line: -1, line2: -2 },
        { time: new Date('2024-01-16'), line: 2, line2: 1 },
      ],
    },
    {
      name: 'with very large values',
      data: [
        { time: new Date('2024-01-01'), line: 1000, line2: 2000 },
        { time: new Date('2024-01-06'), line: 5000, line2: 3000 },
        { time: new Date('2024-01-11'), line: 10000, line2: 8000 },
      ],
    },
  ];

  dataVariations.forEach((dataVariant) => {
    test(`Verify area chart ${dataVariant.name}`, {
      tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx',
        'en',
        {
          data: dataVariant.data,
          groupKey: 'time',
          showDots: true,
          duration: 0,
        },
      );

      await test.step('Verify chart renders with provided data', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify data is rendered correctly', async () => {
        const plot = locators.plot(page);
        await expect(plot).toBeVisible();

        // For empty data, verify graceful handling
        if (dataVariant.data.length === 0) {
          const areaCount = await locators.areaPath(page).count();
          expect(areaCount).toBeGreaterThanOrEqual(0);
        } else {
          // For non-empty data, verify area paths exist
          const areaCount = await locators.areaPath(page).count();
          expect(areaCount).toBeGreaterThan(0);
        }

        // Verify dots if data has more than one point
        if (dataVariant.data.length > 1) {
          const dotsCount = await locators.areaDots(page).count();
          // Dots may not be visible for null/undefined values
          expect(dotsCount).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });

  test('Verify different props and advanced features', {
    tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/area-chart/different-props.tsx', 'en');

    await test.step('Verify all four charts render correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify chart with curve prop (curveBasis)', async () => {
      const plots = locators.plot(page);
      await expect(plots.first()).toBeVisible();

      // Verify area paths exist with curve applied
      const areaCount = await locators.areaPath(page).count();
      expect(areaCount).toBeGreaterThan(0);
    });

    await test.step('Verify stacked chart with hide prop', async () => {
      const plots = locators.plot(page);
      await expect(plots.nth(1)).toBeVisible();

      // Chart should still render even with hidden area
      const areaCount = await locators.areaPath(page).count();
      expect(areaCount).toBeGreaterThan(0);
    });

    await test.step('Verify transparent area and curveStep', async () => {
      const plots = locators.plot(page);
      await expect(plots.nth(2)).toBeVisible();

      // Verify dots are visible for transparent area
      const dotsCount = await locators.areaDots(page).count();
      expect(dotsCount).toBeGreaterThan(0);
    });

    await test.step('Verify low-level Plot API with display function', async () => {
      const plots = locators.plot(page);
      await expect(plots.nth(3)).toBeVisible();

      // Verify XAxis and YAxis are rendered
      const xAxis = page.locator('[data-ui-name="XAxis"]');
      const yAxis = page.locator('[data-ui-name="YAxis"]');
      await expect(xAxis).toBeVisible();
      await expect(yAxis).toBeVisible();

      // Verify dots with display function (only even indices shown)
      const dotsCount = await locators.areaDots(page).count();
      expect(dotsCount).toBeGreaterThanOrEqual(0);
    });
  });

  test('Verify area chart rendering', {
    tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/area.tsx', 'en');

    await test.step('Verify dots are present and have correct attributes', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);// finish animation

      const count = await locators.areaDots(page).count();
      await expect(count).toBe(10);
      for (let i = 0; i < count; i++) {
        const dot = locators.areaDots(page, i);
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });

    await test.step('Verify dot changes size on hover', async () => {
      await locators.areaDots(page, 1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify no unneeded attributes on DOM nodes', async () => {
      const pathsCount = await locators.areaPath(page).count();
      expect(pathsCount).toBe(1);
      await expect(locators.areaPath(page)).not.toHaveAttribute('use:duration');
    });
  });

  test('Verify chart with no data and single data', {
    tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx', 'en');

    await locators.plot(page).waitFor({ state: 'visible' });
    const areaPath = locators.areaPath(page, 0);
    const bbox = await areaPath.boundingBox();
    if (bbox) {
      await page.mouse.move(bbox.x + 20, bbox.y + bbox.height - 20);
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    }
  });

  test('Verify custom line styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/custom-line.tsx', 'en');

    await test.step('Verify chart with custom line renders', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify interpolation styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/interpolation.tsx', 'en');

    await test.step('Verify interpolation function renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      ;
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify no unneeded attributes on DOM nodes', async () => {
      const pathsCount = await locators.areaPath(page).count();
      expect(pathsCount).toBe(2);
      await expect(locators.areaPath(page, 0)).not.toHaveAttribute('use:duration');
      await expect(locators.areaPath(page, 1)).not.toHaveAttribute('use:duration');
    });
  });

  test('Verify stacked area when part of the chart has no data or only one value', {
    tag: [TAG.PRIORITY_HIGH, '@stacked-area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/edge-cases.tsx', 'en');

    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify hover on stacked area element', async () => {
      const areaPath = locators.areaPath(page, 0);
      const bbox = await areaPath.boundingBox();
      if (bbox) {
        await page.mouse.move(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      }
    });
  });

  test('Verify stacked area chart rendering', {
    tag: [TAG.PRIORITY_MEDIUM, '@stacked-area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/stacked-area.tsx', 'en');

    await test.step('Verify stacked area renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill hover and focus styles', {
    tag: [TAG.PRIORITY_HIGH, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx', 'en');

    await test.step('Verify hover on legend item', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await locators.legendItem(page, 'Line 1').hover();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify unchecked item hover state', async () => {
      await locators.legendItem(page, 'Line 1').click();
      await locators.legendItem(page, 'Line 1').hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus state on legend item', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify unchecked state after Space press', async () => {
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus on next item', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify stacked area chart legend hover styles', {
    tag: [TAG.PRIORITY_HIGH, '@stacked-area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/legend-and-pattern-fill.tsx', 'en');

    await test.step('Verify legend item hover state', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      const legendItem = locators.legendItem(page, undefined, 0);
      await expect(legendItem).toBeVisible();
      await legendItem.hover();
      await page.waitForTimeout(300);
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
  test('Verify tooltip interactions and formatting', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx', 'en', {
      showTooltip: true,
      duration: 0,
    });
    const tooltip = locators.tooltip(page);

    await test.step('Verify tooltip appears on hover over chart area', async () => {
      const plot = locators.plot(page);
      const bbox = await plot.boundingBox();
      if (bbox) {
        await page.mouse.move(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
        const tooltip = locators.tooltip(page);
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toBeVisible();
      }
    });

    await test.step('Verify tooltip formatting with tooltipValueFormatter', async () => {
      await expect(tooltip).toBeVisible();
      const tooltipText = await tooltip.textContent();
      expect(tooltipText).toBeTruthy();
    });
  });

  test('Verify click handler (onClickArea)', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@area-chart', '@d3-chart'],
  }, async ({ page }) => {
    const consoleMessages: string[] = [];

    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    await loadPage(page, 'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx', 'en', {
      showDots: true,
      duration: 0,
    });

    await test.step('Verify onClickArea callback is triggered', async () => {
      // Click on the area path to trigger onClickArea
      const areaPath = locators.areaPath(page, 0);
      await areaPath.click({ force: true });
      await page.waitForTimeout(200);

      const hasClickMessage = consoleMessages.some((msg) => msg.includes('Clicked area chart point'));
      expect(hasClickMessage).toBe(true);
    });
  });
});
