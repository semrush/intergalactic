import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  groupBarBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="GroupBar.Bar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  groupBarHorizontalBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="GroupBar.HorizontalBar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  bar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Bar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  horizontalBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="HorizontalBar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  horizontalBarBackground: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="HorizontalBar.Background"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stackBarBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="StackBar.Bar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stackBarHorizontalBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="StackBar.HorizontalBar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stackGroupBarBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="StackGroupBar.Bar"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  lineDots: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Line.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  checkbox: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Checkbox"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="Bar.Tooltip"], [data-ui-name="HoverLine.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Basic bar chart', () => {
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
        showLegend: true,
        patterns: false,
        multilineXTicks: false,
        multilineYTicks: false,
        duration: 0,
      },
      // Combination 2: Large size, minimal margins, no axes, multiline X ticks
      {
        plotWidth: 700,
        plotHeight: 400,
        marginX: 20,
        marginY: 20,
        showXAxis: false,
        showYAxis: false,
        invertAxis: false,
        showTooltip: true,
        showLegend: true,
        patterns: true,
        multilineXTicks: true,
        multilineYTicks: false,
        duration: 0,
      },
      // Combination 3: Horizontal mode (inverted), small size, large margins, no tooltip, multiline Y ticks
      {
        plotWidth: 400,
        plotHeight: 250,
        marginX: 60,
        marginY: 60,
        showXAxis: true,
        showYAxis: false,
        invertAxis: true,
        showTooltip: false,
        showLegend: false,
        patterns: false,
        multilineXTicks: false,
        multilineYTicks: true,
        duration: 0,
      },
      // Combination 4: Horizontal mode (inverted), medium size, medium margins, patterns, multiline both
      {
        plotWidth: 600,
        plotHeight: 350,
        marginX: 50,
        marginY: 50,
        showXAxis: false,
        showYAxis: true,
        invertAxis: true,
        showTooltip: true,
        showLegend: false,
        patterns: true,
        multilineXTicks: true,
        multilineYTicks: true,
        duration: 0,
      },
      // Combination 5: Minimal features, multiline X ticks
      {
        plotWidth: 450,
        plotHeight: 280,
        marginX: 30,
        marginY: 70,
        showXAxis: true,
        showYAxis: true,
        invertAxis: false,
        showTooltip: false,
        showLegend: true,
        patterns: true,
        multilineXTicks: true,
        multilineYTicks: false,
        duration: 0,
      },
      // Combination 6: Horizontal mode with legend, multiline Y ticks
      {
        plotWidth: 550,
        plotHeight: 320,
        marginX: 45,
        marginY: 35,
        showXAxis: true,
        showYAxis: false,
        invertAxis: true,
        showTooltip: true,
        showLegend: true,
        patterns: false,
        multilineXTicks: false,
        multilineYTicks: true,
        duration: 0,
      },
    ];

    variables.forEach((vars, index) => {
      test(`Verify bar chart with config ${index + 1}`, {
        tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
          'en',
          vars,
        );

        await test.step('Verify chart renders correctly with current configuration', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });

        if (vars.showTooltip) {
          await test.step('Verify tooltip appears on hover', async () => {
            await locators.groupBarBar(page, 1).hover();
            const tooltip = locators.tooltip(page);
            await tooltip.waitFor({ state: 'visible' });
            await expect(tooltip).toBeVisible();
          });
        }
      });
    });

    test('Verify bar with scaleBand and scaleLinear usage', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/bar.tsx',
        'en',
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });

      await test.step('Verify cases render correctly', async () => {
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify no default tooltip when hover', async () => {
        await locators.groupBarBar(page, 2).hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify HoverRect component in bar chart', {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/bar-hover.tsx',
        'en',
      );

      await test.step('Verify bar do not render', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });

        const count = await locators.bar(page).count();
        expect(count).toBe(0);
      });
    });

    test('Verify date format and tooltip in bar chart', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/date-format.tsx',
        'en',
      );

      await test.step('Verify tooltip shown on hover', async () => {
        const chart = locators.plot(page).first();
        await chart.waitFor({ state: 'visible' });

        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;

        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify negative values look good on bar charts', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/negative-values.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify negative values rendering', async () => {
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify tooltip shown on hover', async () => {
        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;

        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify trend line', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/trend-line.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify looks good and tooltip shown on hover', async () => {
        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;

        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Grouped and stacked bars', () => {
  // Grouped and stacked bars combinations testing
    const groupedStackedVariations = [
      {
        name: 'with grouped bars (vertical)',
        props: {
          groupKey: 'category',
          type: 'group',
          invertAxis: false,
          data: [
            { category: 'Category 0', bar1: 4, bar2: 7 },
            { category: 'Category 1', bar1: 3, bar2: 5 },
            { category: 'Category 2', bar1: 8, bar2: 2 },
            { category: 'Category 3', bar1: 6, bar2: 9 },
            { category: 'Category 4', bar1: 1, bar2: 4 },
          ],
        },
      },
      {
        name: 'with grouped bars (horizontal)',
        props: {
          groupKey: 'category',
          type: 'group',
          invertAxis: true,
          data: [
            { category: 'Category 0', bar1: 4, bar2: 7 },
            { category: 'Category 1', bar1: 3, bar2: 5 },
            { category: 'Category 2', bar1: 8, bar2: 2 },
            { category: 'Category 3', bar1: 6, bar2: 9 },
            { category: 'Category 4', bar1: 1, bar2: 4 },
          ],
        },
      },
      {
        name: 'with stacked bars (vertical)',
        props: {
          groupKey: 'category',
          type: 'stack',
          invertAxis: false,
          data: [
            { category: 'Category 0', bar1: 4, bar2: 7 },
            { category: 'Category 1', bar1: 3, bar2: 5 },
            { category: 'Category 2', bar1: 8, bar2: 2 },
            { category: 'Category 3', bar1: 6, bar2: 9 },
            { category: 'Category 4', bar1: 1, bar2: 4 },
          ],
        },
      },
      {
        name: 'with stacked bars (horizontal)',
        props: {
          groupKey: 'category',
          type: 'stack',
          invertAxis: true,
          data: [
            { category: 'Category 0', bar1: 4, bar2: 7 },
            { category: 'Category 1', bar1: 3, bar2: 5 },
            { category: 'Category 2', bar1: 8, bar2: 2 },
            { category: 'Category 3', bar1: 6, bar2: 9 },
            { category: 'Category 4', bar1: 1, bar2: 4 },
          ],
        },
      },
    ];

    groupedStackedVariations.forEach((variant) => {
      test(`Verify bar chart ${variant.name}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
          'en',
          variant.props,
        );

        const chart = locators.plot(page).first();
        await chart.waitFor({ state: 'visible' });

        await test.step('Verify chart renders correctly', async () => {
          await expect(page).toHaveScreenshot();
        });

        await test.step('Verify tooltip on hover', async () => {
          const box = await chart.boundingBox();
          if (!box) throw new Error('Bounding box not found');

          const targetX = 128.42;
          const targetY = 190.53;
          const hoverX = box.x + targetX;
          const hoverY = box.y + targetY;

          await page.mouse.move(hoverX, hoverY);
          await page.waitForTimeout(500);
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Legend and interactions', () => {
    test('Verify bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      const label = page.getByText('Category 1');

      await test.step('Verify highlights by hover on label', async () => {
        await label.hover();
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlights by hover when unchecked', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify looks good when all items disabled by keyboard', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;

        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify highlighted when focused', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlighted when unchecked and checked', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlighted when one left focused', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Bar props variations', () => {
  // Bar props combinations testing
    const barPropsVariations = [
      {
        name: 'with default props',
        props: {
          duration: 0,
        },
      },
      {
        name: 'with custom color',
        props: {
          barColor: '#FF5733',
          duration: 0,
        },
      },
      {
        name: 'with custom radius',
        props: {
          barRadius: 8,
          duration: 0,
        },
      },
      {
        name: 'with hMin prop',
        props: {
          barHMin: 10,
          duration: 0,
        },
      },
      {
        name: 'with transparent prop',
        props: {
          barTransparent: true,
          duration: 0,
        },
      },
      {
        name: 'with maxBarSize',
        props: {
          maxBarSize: 20,
          duration: 0,
        },
      },
      {
        name: 'with combined props',
        props: {
          barColor: '#3498db',
          barRadius: 6,
          maxBarSize: 30,
          duration: 0,
        },
      },
    ];

    barPropsVariations.forEach((variant) => {
      test(`Verify bar props ${variant.name}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/bars-props.tsx',
          'en',
          variant.props,
        );

        await test.step('Verify chart renders correctly with current props', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Data variations', () => {
  // Data combinations testing
    const dataVariations = [
      {
        name: 'with standard data',
        data: [
          { category: 'Category 0', bar: 2 },
          { category: 'Category 1', bar: 5 },
          { category: 'Category 2', bar: 7 },
          { category: 'Category 3', bar: 4 },
          { category: 'Category 4', bar: 8 },
        ],
      },
      {
        name: 'with null values in data',
        data: [
          { category: 'Category 0', bar: 2 },
          { category: 'Category 1', bar: null },
          { category: 'Category 2', bar: 7 },
          { category: 'Category 3', bar: null },
          { category: 'Category 4', bar: 8 },
        ],
      },
      {
        name: 'with undefined values in data',
        data: [
          { category: 'Category 0', bar: 2 },
          { category: 'Category 1', bar: undefined },
          { category: 'Category 2', bar: 7 },
          { category: 'Category 3', bar: undefined },
          { category: 'Category 4', bar: 8 },
        ],
      },
      {
        name: 'with single data point',
        data: [
          { category: 'Category 0', bar: 5 },
        ],
      },
      {
        name: 'with empty array',
        data: [],
      },
      {
        name: 'with zero values',
        data: [
          { category: 'Category 0', bar: 0 },
          { category: 'Category 1', bar: 0 },
          { category: 'Category 2', bar: 5 },
          { category: 'Category 3', bar: 0 },
        ],
      },
      {
        name: 'with very large values',
        data: [
          { category: 'Category 0', bar: 1000 },
          { category: 'Category 1', bar: 5000 },
          { category: 'Category 2', bar: 10000 },
        ],
      },
    ];

    dataVariations.forEach((dataVariant) => {
      test(`Verify bar chart ${dataVariant.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
          'en',
          {
            data: dataVariant.data,
            groupKey: 'category',
            type: 'group',
          },
        );

        await test.step('Verify chart renders correctly with current data', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Horizontal bars', () => {
    test('Verify HorizontalBar implementation', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/horizontal-bar.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        await locators.horizontalBar(page, 2).hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify horizontal bar with custom labels', {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/bar-labels.tsx',
        'en',
      );

      await test.step('Verify chart renders with custom labels', async () => {
        const chart = locators.plot(page).first();
        await chart.waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify horizontal bar with background', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/background.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        await locators.horizontalBarBackground(page, 1).hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify grouped horizontal bars', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/grouped-horizontal-bars.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;
        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    // HorizontalBar props combinations testing
    const horizontalBarPropsVariations = [
      {
        name: 'with default props',
        props: {
          duration: 0,
        },
      },
      {
        name: 'with custom color',
        props: {
          barColor: '#FF5733',
          duration: 0,
        },
      },
      {
        name: 'with custom radius (number)',
        props: {
          barRadius: 8,
          duration: 0,
        },
      },
      {
        name: 'with custom radius (array)',
        props: {
          barRadius: [6, 6, 0, 0],
          duration: 0,
        },
      },
      {
        name: 'with transparent prop',
        props: {
          barTransparent: true,
          duration: 0,
        },
      },
      {
        name: 'with maxBarSize',
        props: {
          maxBarSize: 20,
          duration: 0,
        },
      },
      {
        name: 'with combined props',
        props: {
          barColor: '#3498db',
          barRadius: [4, 4, 0, 0],
          maxBarSize: 25,
          barTransparent: true,
          duration: 0,
        },
      },
    ];

    horizontalBarPropsVariations.forEach((variant) => {
      test(`Verify horizontal bar props ${variant.name}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-horizontal/horizontal-bar-props.tsx',
          'en',
          variant.props,
        );

        await test.step('Verify chart renders correctly with current props', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify horizontal bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      const label = page.getByText('Bar 1');

      await test.step('Verify highlights by hover on label', async () => {
        await label.hover();
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlights when uncheck item and hover it', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify horizontal bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify highlighted when focused', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlighted when check and uncheck', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlight when navigation next unchecked checkbox', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Stacked bars', () => {
    // StackBar props combinations testing
    const stackBarPropsVariations = [
      {
        name: 'with default props',
        props: {
          duration: 0,
        },
      },
      {
        name: 'with custom colors',
        props: {
          barColor1: '#FF5733',
          barColor2: '#3498db',
          barColor3: '#2ecc71',
          duration: 0,
        },
      },
      {
        name: 'with custom radius',
        props: {
          barRadius: 8,
          duration: 0,
        },
      },
      {
        name: 'with hMin prop',
        props: {
          barHMin: 5,
          duration: 0,
        },
      },
      {
        name: 'with transparent prop',
        props: {
          barTransparent: true,
          duration: 0,
        },
      },
      {
        name: 'with maxBarSize',
        props: {
          maxBarSize: 30,
          duration: 0,
        },
      },
      {
        name: 'with combined props',
        props: {
          barColor1: '#e74c3c',
          barColor2: '#f39c12',
          barColor3: '#9b59b6',
          barRadius: 6,
          maxBarSize: 25,
          barTransparent: true,
          duration: 0,
        },
      },
    ];

    stackBarPropsVariations.forEach((variant) => {
      test(`Verify stacked bar props ${variant.name}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/stacked-bar-chart/stack-bar-props-cases.tsx',
          'en',
          variant.props,
        );

        await test.step('Verify chart renders correctly with current props', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify stacked bar chart with HoverRect tooltip', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        await locators.stackBarBar(page, 1).hover();
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked grouped bars', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify looks good and tooltip shown on hover', async () => {
        const box = await chart.boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const targetX = 128.42;
        const targetY = 190.53;
        const hoverX = box.x + targetX;
        const hoverY = box.y + targetY;

        await page.mouse.move(hoverX, hoverY);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      const label = page.getByText('Category 1');
      const label2 = page.getByText('Category 2');

      await test.step('Verify highlights by hover on label', async () => {
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlights by hover on unchecked label', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlights by hover on other label', async () => {
        await label2.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify highlights when focused', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlights when checked and unchecked', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Stacked horizontal bars', () => {
    test('Verify stacked horizontal bar chart with HoverRect tooltip', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        await locators.stackBarHorizontalBar(page, 1).hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked horizontal bar chart with negative values', {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar-negative.tsx',
        'en',
      );

      await test.step('Verify chart renders correctly with negative values', async () => {
        const chart = locators.plot(page).first();
        await chart.waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked horizontal bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      const label = page.getByText('Category 1');
      const label2 = page.getByText('Category 2');

      await test.step('Verify highlights by hover on label', async () => {
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlights by hover on unchecked label', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlights by hover on other label', async () => {
        await label2.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked horizontal bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify highlights when focused', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify highlights when checked and unchecked', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify not highlights when unchecked', async () => {
        await page.keyboard.press('Space');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  // Aria-hidden attribute testing for different bar types
  const ariaHiddenVariations = [
    {
      name: 'grouped bars (vertical)',
      props: {
        groupKey: 'category',
        type: 'group',
        invertAxis: false,
        data: [
          { category: 'Category 0', bar1: 4, bar2: 7 },
          { category: 'Category 1', bar1: 3, bar2: 5 },
          { category: 'Category 2', bar1: 8, bar2: 2 },
        ],
      },
    },
    {
      name: 'grouped bars (horizontal)',
      props: {
        groupKey: 'category',
        type: 'group',
        invertAxis: true,
        data: [
          { category: 'Category 0', bar1: 4, bar2: 7 },
          { category: 'Category 1', bar1: 3, bar2: 5 },
          { category: 'Category 2', bar1: 8, bar2: 2 },
        ],
      },
    },
    {
      name: 'stacked bars (vertical)',
      props: {
        groupKey: 'category',
        type: 'stack',
        invertAxis: false,
        data: [
          { category: 'Category 0', bar1: 4, bar2: 7 },
          { category: 'Category 1', bar1: 3, bar2: 5 },
          { category: 'Category 2', bar1: 8, bar2: 2 },
        ],
      },
    },
    {
      name: 'stacked bars (horizontal)',
      props: {
        groupKey: 'category',
        type: 'stack',
        invertAxis: true,
        data: [
          { category: 'Category 0', bar1: 4, bar2: 7 },
          { category: 'Category 1', bar1: 3, bar2: 5 },
          { category: 'Category 2', bar1: 8, bar2: 2 },
        ],
      },
    },
  ];

  ariaHiddenVariations.forEach((variant) => {
    test(`Verify bars aria-hidden attribute for ${variant.name}`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
        'en',
        variant.props,
      );

      await test.step('Verify bars have aria-hidden', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });

        const bars = await locators.groupBarBar(page).all();
        expect(bars.length).toBeGreaterThan(0);

        for (const bar of bars) {
          await expect(bar).toHaveAttribute('aria-hidden', 'true');
        }
      });
    });
  });

  test('Verify bars with scaleBand attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-chart/bar.tsx',
      'en',
    );

    await test.step('Verify bars have correct attributes', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.groupBarBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });
  });

  test('Verify negative values bars attributes', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-chart/negative-values.tsx',
      'en',
    );

    await test.step('Verify bars have correct attributes', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.bar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });
  });

  test('Verify trend line attributes', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-chart/trend-line.tsx',
      'en',
    );

    await test.step('Verify bar with trend line has correct attributes', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.groupBarBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }

      const dots = await locators.lineDots(page).all();
      expect(dots.length).toBeGreaterThan(0);

      for (const dot of dots) {
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });
  });

  test('Verify grouped bars count and attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-chart/grouped-bars.tsx',
      'en',
    );

    await test.step('Verify bar with trend line has correct attributes', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.groupBarBar(page).all();
      expect(bars.length).toBe(10);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });
  });

  test('Verify Chart.Bar with GroupBar.HorizontalBar aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal/basic-usage.tsx',
      'en',
    );

    await test.step('Verify bars have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.groupBarHorizontalBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify HorizontalBar aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal/horizontal-bar.tsx',
      'en',
    );

    await test.step('Verify bars have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.horizontalBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify HorizontalBar.Background aria-hidden attributes', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bar-horizontal/background.tsx',
      'en',
    );

    await test.step('Verify backgrounds have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const backgrounds = await locators.horizontalBarBackground(page).all();
      expect(backgrounds.length).toBeGreaterThan(0);

      for (const background of backgrounds) {
        await expect(background).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify StackBar.Bar aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/stacked-bar-chart/stacked-bar-chart.tsx',
      'en',
    );

    await test.step('Verify bars have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.stackBarBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify StackGroupBar.Bar aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/stacked-bar-chart/stacked-grouped-bar.tsx',
      'en',
    );

    await test.step('Verify bars have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.stackGroupBarBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify StackBar.HorizontalBar aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx',
      'en',
    );

    await test.step('Verify bars have aria-hidden', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const bars = await locators.stackBarHorizontalBar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });
});
