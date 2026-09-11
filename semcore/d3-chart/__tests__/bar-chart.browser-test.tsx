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
  stackGroupBar: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="StackGroupBar"]');
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
  tooltip: (page: Page) => page.locator('[data-ui-name="Bar.Tooltip"], [data-ui-name="HoverLine.Tooltip"], [data-ui-name="HoverRect.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Basic bar chart', () => {
    const variables = [
      {
        description: 'Standard: all features enabled',
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
      {
        description: 'Patterns: minimal axes and UI, multiline ticks',
        plotWidth: 400,
        plotHeight: 350,
        marginX: 40,
        marginY: 40,
        showXAxis: true,
        showYAxis: false,
        invertAxis: false,
        showTooltip: true,
        showLegend: true,
        patterns: true,
        multilineXTicks: true,
        multilineYTicks: false,
        duration: 0,
      },
      {
        description: 'Inverted: horizontal layout, no legend',
        plotWidth: 500,
        plotHeight: 300,
        marginX: 60,
        marginY: 60,
        showXAxis: true,
        showYAxis: true,
        invertAxis: true,
        showTooltip: true,
        showLegend: false,
        patterns: false,
        multilineXTicks: false,
        multilineYTicks: true,
        duration: 0,
      },
    ];

    variables.forEach((vars) => {
      test(`Verify bar chart ${vars.description}`, {
        tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
          'en',
          vars,
        );

        await test.step('Verify chart with tooltip renders correctly', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await page.waitForTimeout(500);
          const chart = locators.plot(page).first();
          const box = await page.locator('path').nth(2).boundingBox();
          if (box) {
            await page.mouse.move(box.x + 50, box.y + 50);
          }

          const tooltip = locators.tooltip(page);
          await tooltip.waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });

    const variablesTrend = [
      {
        description: 'Vertical with trend',
        invertAxis: false,
        showTooltip: true,
        showLegend: true,
        duration: 0,
      },
      {
        description: 'Horizontal with trend',
        invertAxis: true,
        showTooltip: true,
        showLegend: true,
        patterns: true,
        duration: 0,
      },
    ];

    variablesTrend.forEach((vars) => {
      test(`Verify trend for chart ${vars.description}`, {
        tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
          'en',
          vars,
        );

        await test.step('Verify trend renders correctly', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await page.getByText('Trend').click();
          await page.waitForTimeout(500);
          await expect(page).toHaveScreenshot();
        });

        await test.step('Verify hover trend dot', async () => {
          const trendDot = page.locator('[data-ui-name="Line.Dots"]').first();
          const box = await trendDot.boundingBox();
          if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          }
          await locators.tooltip(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
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
      await page.waitForTimeout(500);

      await test.step('Verify no default tooltip when hover', async () => {
        await locators.bar(page, 2).hover();
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

    test('Verify date format in bar chart', {
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
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify negative values look good on bar charts', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
          showTotalInTooltip: true,
          invertAxis: false,
          data: [
            { category: 'Category 0', bar1: 5, bar2: 7, bar3: 4, bar4: 1, bar5: 0, bar6: 1 },
            { category: 'Category 1', bar1: null, bar2: 7, bar3: null, bar4: 3, bar5: 0, bar6: 8 },
            { category: 'Category 2', bar1: 1, bar2: 7, bar3: null, bar4: undefined, bar5: 0 },
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
            { category: 'Category 0', bar1: 5, bar2: 7, bar3: 4, bar4: 1, bar5: 0, bar6: 1 },
            { category: 'Category 1', bar1: null, bar2: 7, bar3: null, bar4: 3, bar5: 0, bar6: 8 },
            { category: 'Category 2', bar1: 1, bar2: 7, bar3: null, bar4: undefined, bar5: 0 },
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
          showTotalInTooltip: true,
          invertAxis: false,
          data: [
            { category: 'Category 0', bar1: 5, bar2: 7, bar3: 4, bar4: 1, bar5: 0, bar6: 1 },
            { category: 'Category 1', bar1: null, bar2: 7, bar3: null, bar4: 3, bar5: 0, bar6: 8 },
            { category: 'Category 2', bar1: 1, bar2: 7, bar3: null, bar4: undefined, bar5: 0 },
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
            { category: 'Category 0', bar1: 5, bar2: 7, bar3: 4, bar4: 1, bar5: 0, bar6: 1 },
            { category: 'Category 1', bar1: null, bar2: 7, bar3: null, bar4: 3, bar5: 0, bar6: 8 },
            { category: 'Category 2', bar1: 1, bar2: 7, bar3: null, bar4: undefined, bar5: 0 },
            { category: 'Category 2', bar1: 8, bar2: 2 },
            { category: 'Category 3', bar1: 6, bar2: 9 },
            { category: 'Category 4', bar1: 1, bar2: 4 },
          ],
        },
      },
    ];

    groupedStackedVariations.forEach((variant) => {
      test(`Verify bar chart ${variant.name}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
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
          if (variant.props.type == 'group') {
            const boxLocator = page.locator('path:nth-child(9)');
            const box = await boxLocator.boundingBox();
            if (!box) throw new Error('Bounding box not found');

            const hoverX = box.x + box.width / 2;
            const hoverY = box.y + box.height / 2;

            await page.mouse.move(hoverX, hoverY);
            await page.waitForTimeout(500);
            await expect(page).toHaveScreenshot();
          } else if (variant.props.type == 'stack') {
            const boxLocator = page.locator('path:nth-child(37)');
            const box = await boxLocator.boundingBox();
            if (!box) throw new Error('Bounding box not found');

            const hoverX = box.x + box.width / 2;
            const hoverY = box.y + box.height / 2;

            await page.mouse.move(hoverX, hoverY);
            await page.waitForTimeout(500);
            await expect(page).toHaveScreenshot();
          }
        });
      });
    });
  });

  test.describe('Bar chart - Legend and interactions', () => {
    test('Verify bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const label = page.getByText('Bar 1');

      await test.step('Verify default state with legend hover', async () => {
        await label.hover();
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify unchecked items behavior and all disabled state', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(300);

        // Disable all items and verify chart appearance
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify keyboard focus state', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify toggle and navigation behavior', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Bar props variations', () => {
    const barPropsVariations = [
      {
        name: 'transparent',
        props: {
          duration: 0,
          transparent: true,
        },
      },
      {
        name: 'with visual styling (color, radius, transparency)',
        props: {
          color: 'yellow',
          r: 6,
          transparent: false,
          duration: 0,
        },
      },
      {
        name: 'with size constraints (hMin, maxBarSize)',
        props: {
          hMin: 20,
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
    const dataVariations = [
      {
        name: 'with null and undefined values',
        data: [
          { category: 'Category 0', bar: 500 },
          { category: 'Category 1', bar: null },
          { category: 'Category 2', bar: 7 },
          { category: 'Category 3', bar: undefined },
          { category: 'Category 4', bar: 0 },
        ],
      },
      {
        name: 'with single data point',
        data: [
          { category: 'Category 0', bar: 5 },
        ],
      },
    ];

    dataVariations.forEach((dataVariant) => {
      test(`Verify bar chart ${dataVariant.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
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
          await page.waitForTimeout(500);

          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Horizontal bars', () => {
    test('Verify HorizontalBar implementation', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
      tag: [TAG.PRIORITY_MEDIUM, '@horizontal-bar-chart', '@bar-chart', '@d3-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/background.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        const bar = locators.horizontalBarBackground(page, 1);
        const bbox = await bar.boundingBox();
        if (bbox) {
          await page.mouse.move(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
          await locators.tooltip(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        }
      });
    });

    test('Verify grouped horizontal bars', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/grouped-horizontal-bars.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
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

    const horizontalBarPropsVariations = [

      {
        name: 'with visual styling (color, array radius, transparency)',
        props: {
          color: '#3498db',
          r: 6,
          transparent: true,
          duration: 0,
        },
      },
      {
        name: 'with size constraints (maxBarSize)',
        props: {
          maxBarSize: 25,
          hMin: 50,
          duration: 0,
        },
      },
      {
        name: 'with primaryText false',
        props: {
          primaryText: false,
        },
      },
    ];

    horizontalBarPropsVariations.forEach((variant) => {
      test(`Verify horizontal bar props ${variant.name}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@horizontal-bar-chart', '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/bar-horizontal/horizontal-bar-props.tsx',
          'en',
          variant.props,
        );

        await test.step('Verify chart renders correctly with current props', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await page.waitForTimeout(500);

          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify horizontal bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await test.step('Verify keyboard focus state', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify toggle and navigation behavior', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);

        // Verify navigation to next checkbox
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Stacked bars', () => {
    const stackBarPropsVariations = [
      {
        name: 'with visual styling (colors, radius, transparency)',
        props: {
          barColor1: '#e74c3c',
          barColor2: '#f39c12',
          barColor3: '#9b59b6',
          barRadius: 6,
          barTransparent: true,
          duration: 0,
        },
      },
      {
        name: 'with size constraints (hMin, maxBarSize)',
        props: {
          barHMin: 15,
          maxBarSize: 30,
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

        await locators.plot(page).first().waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked grouped bars', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await test.step('Verify looks good and tooltip shown on hover', async () => {
        const box = await page.locator('[data-ui-name="StackGroupBar"]').boundingBox();
        if (!box) throw new Error('Bounding box not found');

        const hoverX = box.x + box.x / 2;
        const hoverY = box.y + box.y / 2;

        await page.mouse.move(hoverX, hoverY);
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const label = page.getByText('Category 1');
      const label2 = page.getByText('Category 2');

      await test.step('Verify default hover on legend label', async () => {
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify unchecked label behavior and switching hover', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(500);

        // Verify switching hover to another label
        await label2.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend'],
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
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await test.step('Verify bar highlights on hover and tooltip shown', async () => {
        await locators.stackBarHorizontalBar(page, 1).hover();
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked horizontal bar chart with negative values', {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/stacked-bar-chart/horizontal-stacked-bar-negative.tsx',
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
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const label = page.getByText('Category 1');
      const label2 = page.getByText('Category 2');

      await test.step('Verify default hover on legend label', async () => {
        await label.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify unchecked label behavior and switching hover', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(500);

        // Verify switching hover to another label
        await label2.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked horizontal bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify keyboard focus state', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify toggle behavior and unchecked state', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.waitForTimeout(500);

        // Verify unchecked state
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
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx',
        'en',
        variant.props,
      );

      await test.step('Verify bars have aria-hidden', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });

        const isStacked = variant.props.type === 'stack';
        const isHorizontal = variant.props.invertAxis === true;

        let bars;
        if (isStacked && isHorizontal) {
          bars = await locators.stackBarHorizontalBar(page).all();
        } else if (isStacked && !isHorizontal) {
          bars = await locators.stackBarBar(page).all();
        } else if (!isStacked && isHorizontal) {
          bars = await locators.groupBarHorizontalBar(page).all();
        } else {
          bars = await locators.groupBarBar(page).all();
        }

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

      const bars = await locators.bar(page).all();
      expect(bars.length).toBeGreaterThan(0);

      for (const bar of bars) {
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });
  });

  test('Verify negative values bars attributes', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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

      const bars = await locators.bar(page).all();
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx',
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx',
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
