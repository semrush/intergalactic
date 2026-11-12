import type { Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import {
  BAR_STORY,
  countRoundedCorners,
  dataTypeCases,
  expectDataTypes,
  getBarBoxes,
  getCornerRadius,
  getCurveCornerSizes,
  getGaps,
  hoverCenter,
  locators,
} from './bar-chart.helpers';

const HIDDEN_TAB_STORY = 'stories/components/d3-chart/tests/examples/bar-chart/hidden-tab-panel.tsx';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Basic bar chart', () => {
    const variables = [
      {
        description: 'Standard: all features enabled',
        priority: TAG.PRIORITY_HIGH,
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
        priority: TAG.PRIORITY_MEDIUM,
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
        priority: TAG.PRIORITY_MEDIUM,
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

    variables.forEach(({ priority, ...vars }) => {
      test(`Verify bar chart ${vars.description}`, {
        tag: [priority, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(
          page,
          BAR_STORY,
          'en',
          vars,
        );

        await test.step('Verify chart with tooltip renders correctly', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await page.waitForTimeout(500);
          const bar = vars.invertAxis ? locators.groupBarHorizontalBar(page, 1) : locators.groupBarBar(page, 1);
          await hoverCenter(page, bar);

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
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(
          page,
          BAR_STORY,
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
          const trendDot = locators.lineDots(page).first();
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
        await locators.groupBarBar(page, 2).hover();
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

      await test.step('Verify bars are not rendered', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });
        await expect(locators.bar(page)).toHaveCount(0);
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

        await hoverCenter(page, locators.groupBarBar(page, 1));
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
        await hoverCenter(page, locators.bar(page, 1));
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify trend line', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart',
        '@line-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bar-chart/trend-line.tsx',
        'en',
      );

      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      await test.step('Verify looks good and tooltip shown on hover', async () => {
        await hoverCenter(page, locators.bar(page, 1));
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Grouped and stacked bars', () => {
    const groupedStackedVariations = [
      {
        name: 'with grouped bars (vertical)',
        priority: TAG.PRIORITY_HIGH,
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
        priority: TAG.PRIORITY_MEDIUM,
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
        priority: TAG.PRIORITY_HIGH,
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
        priority: TAG.PRIORITY_MEDIUM,
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
        tag: [variant.priority, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(
          page,
          BAR_STORY,
          'en',
          { ...variant.props, duration: 0 },
        );

        const chart = locators.plot(page).first();
        await chart.waitFor({ state: 'visible' });

        await test.step('Verify chart renders correctly', async () => {
          await expect(page).toHaveScreenshot();
        });

        await test.step('Verify tooltip on hover', async () => {
          const isStack = variant.props.type === 'stack';
          const bars = variant.props.invertAxis
            ? (isStack ? locators.stackBarHorizontalBar : locators.groupBarHorizontalBar)
            : (isStack ? locators.stackBarBar : locators.groupBarBar);

          await hoverCenter(page, bars(page, 2));
          await page.waitForTimeout(500);
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Bar chart - Legend and interactions', () => {
    test('Verify bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography', '@checkbox'],
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

      await test.step('Verify unchecked item, Tab navigation and hover on plot', async () => {
        await label.click();
        await label.hover();
        await page.waitForTimeout(300);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await hoverCenter(page, locators.groupBarBar(page, 1));
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography', '@checkbox'],
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
        const firstItem = page.getByRole('checkbox').first();
        await expect(firstItem).toBeFocused();
        await page.keyboard.press('Space');
        await expect(firstItem).not.toBeChecked();
        await page.keyboard.press('Space');
        await expect(firstItem).toBeChecked();
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
        priority: TAG.PRIORITY_MEDIUM,
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
        priority: TAG.PRIORITY_LOW,
        data: [
          { category: 'Category 0', bar: 5 },
        ],
      },
    ];

    dataVariations.forEach((dataVariant) => {
      test(`Verify bar chart ${dataVariant.name}`, {
        tag: [dataVariant.priority, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(
          page,
          BAR_STORY,
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

  test.describe('Data types and highlights', () => {
    const dataTypeVisualCases = [
      { dataType: 'both', highlightDots: 'mixed', patterns: false, priority: TAG.PRIORITY_HIGH },
      { dataType: 'forecast', highlightDots: 'good', patterns: true, priority: TAG.PRIORITY_MEDIUM },
      { dataType: 'potential', highlightDots: 'bad', patterns: false, priority: TAG.PRIORITY_MEDIUM },
      { dataType: 'both', highlightDots: 'insightful', patterns: true, priority: TAG.PRIORITY_MEDIUM },
    ];

    dataTypeVisualCases.forEach(({ priority, ...props }) => {
      const name = `${props.dataType}-${props.highlightDots}${props.patterns ? '-patterns' : ''}`;

      test(`Verify vertical bars with dataType ${props.dataType}, highlight ${props.highlightDots}, patterns ${props.patterns}`, {
        tag: [priority, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, BAR_STORY, 'en', { ...props, duration: 0 });

        await test.step('Verify forecast stripes, potential gradient and highlights', async () => {
          await locators.plot(page).waitFor({ state: 'visible' });
          await expect(locators.plot(page)).toHaveScreenshot(`bar-data-types-${name}.png`);
        });
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
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(
        page,
        BAR_STORY,
        'en',
        variant.props,
      );

      await test.step('Verify bars have aria-hidden', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });

        const isStacked = variant.props.type === 'stack';
        const isHorizontal = variant.props.invertAxis === true;

        let barsLocator: Locator;
        if (isStacked && isHorizontal) {
          barsLocator = locators.stackBarHorizontalBar(page);
        } else if (isStacked && !isHorizontal) {
          barsLocator = locators.stackBarBar(page);
        } else if (!isStacked && isHorizontal) {
          barsLocator = locators.groupBarHorizontalBar(page);
        } else {
          barsLocator = locators.groupBarBar(page);
        }

        await expectEachToHaveAttribute(barsLocator, 'aria-hidden', 'true');
      });
    });
  });

  const DOCS = 'stories/components/d3-chart/docs/examples/bar-chart';

  const docsAttributeCases = [
    {
      title: 'Verify bars with scaleBand attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
      story: `${DOCS}/bar.tsx`,
      bars: locators.groupBarBar,
    },
    {
      title: 'Verify negative values bars attributes',
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
      story: `${DOCS}/negative-values.tsx`,
      bars: locators.bar,
    },
    {
      title: 'Verify trend line attributes',
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@line-chart'],
      story: `${DOCS}/trend-line.tsx`,
      bars: locators.bar,
      withTrendDots: true,
    },
    {
      title: 'Verify grouped bars count and attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
      story: `${DOCS}/grouped-bars.tsx`,
      bars: locators.groupBarBar,
      count: 10,
    },
  ];

  docsAttributeCases.forEach((c) => {
    test(c.title, { tag: c.tag }, async ({ page }) => {
      await loadPage(page, c.story, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Verify bars are hidden from assistive technology and have radius 2', async () => {
        if (c.count) await expect(c.bars(page)).toHaveCount(c.count);
        await expectEachToHaveAttribute(c.bars(page), 'aria-hidden', 'true');
        await expectEachToHaveAttribute(c.bars(page), 'r', '2');
      });

      await (c.withTrendDots ? test.step : test.step.skip)('Verify trend dots are hidden and have radius 3.5', async () => {
        await expectEachToHaveAttribute(locators.lineDots(page), 'aria-hidden', 'true');
        await expectEachToHaveAttribute(locators.lineDots(page), 'r', '3.5');
      });
    });
  });

  const MAX_BAR_SIZE = 12;

  const groupedData = [
    { category: 'Category 0', bar1: 4, bar2: 7 },
    { category: 'Category 1', bar1: 3, bar2: 5 },
    { category: 'Category 2', bar1: 8, bar2: 2 },
  ];

  const maxBarSizeVariations = [
    {
      name: 'single series (vertical)',
      locator: locators.groupBarBar,
      axis: 'x' as const,
      props: {
        groupKey: 'category',
        data: [
          { category: 'Category 0', bar: 4 },
          { category: 'Category 1', bar: 3 },
          { category: 'Category 2', bar: 8 },
        ],
      },
    },
    {
      name: 'grouped bars (vertical)',
      locator: locators.groupBarBar,
      axis: 'x' as const,
      props: { groupKey: 'category', type: 'group', data: groupedData },
    },
    {
      name: 'grouped bars (horizontal)',
      locator: locators.groupBarHorizontalBar,
      axis: 'y' as const,
      // Needs a taller plot: at plotHeight 300 the group band is already thinner than 12px,
      // so the cap would never kick in and the assertion would test nothing.
      props: {
        groupKey: 'category',
        type: 'group',
        invertAxis: true,
        plotHeight: 500,
        data: groupedData,
      },
    },
    {
      name: 'stacked bars (vertical)',
      locator: locators.stackBarBar,
      axis: 'x' as const,
      props: { groupKey: 'category', type: 'stack', data: groupedData },
    },
    {
      name: 'stacked bars (horizontal)',
      locator: locators.stackBarHorizontalBar,
      axis: 'y' as const,
      props: { groupKey: 'category', type: 'stack', invertAxis: true, data: groupedData },
    },
  ];

  maxBarSizeVariations.forEach((variant) => {
    test(`Verify default maxBarSize limits ${variant.name} to ${MAX_BAR_SIZE}px`, {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(
        page,
        BAR_STORY,
        'en',
        { ...variant.props, trend: undefined, duration: 0, maxBarSize: undefined },
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });

      const sizes = await test.step(`Verify every bar is at most ${MAX_BAR_SIZE}px thick`, async () => {
        const boxes = await getBarBoxes(variant.locator(page), variant.axis);
        expect(boxes.length).toBeGreaterThan(0);

        const barSizes = boxes.map((box) => (variant.axis === 'x' ? box.width : box.height));

        for (const size of barSizes) {
          expect(size).toBeLessThanOrEqual(MAX_BAR_SIZE);
        }

        return barSizes;
      });

      await test.step(`Verify the widest bar equals the ${MAX_BAR_SIZE}px cap (plot is wide enough for the cap to apply)`, async () => {
        expect(Math.max(...sizes)).toBeCloseTo(MAX_BAR_SIZE, 1);
      });
    });
  });

  test('Verify custom maxBarSize overrides the default', {
    tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(
      page,
      BAR_STORY,
      'en',
      {
        groupKey: 'category',
        type: 'group',
        data: groupedData,
        trend: undefined,
        duration: 0,
        maxBarSize: 6,
      },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step('Verify bars respect the explicitly passed value', async () => {
      const boxes = await getBarBoxes(locators.groupBarBar(page));
      expect(boxes.length).toBeGreaterThan(0);

      for (const box of boxes) {
        expect(box.width).toBeCloseTo(6, 1);
      }
    });
  });

  test('Verify bars stay thinner than maxBarSize when the group has no room', {
    tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@bar-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(
      page,
      BAR_STORY,
      'en',
      {
        groupKey: 'category',
        type: 'group',
        plotWidth: 400,
        trend: undefined,
        duration: 0,
        data: [
          { category: 'Category 0', bar1: 4, bar2: 7, bar3: 3, bar4: 5, bar5: 6, bar6: 2 },
          { category: 'Category 1', bar1: 3, bar2: 5, bar3: 8, bar4: 2, bar5: 4, bar6: 7 },
          { category: 'Category 2', bar1: 8, bar2: 2, bar3: 5, bar4: 6, bar5: 3, bar6: 4 },
        ],
      },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step('Verify bars shrink below the cap instead of overflowing the group', async () => {
      const boxes = await getBarBoxes(locators.groupBarBar(page));
      expect(boxes.length).toBe(18);

      for (const box of boxes) {
        expect(box.width).toBeGreaterThan(0);
        expect(box.width).toBeLessThan(MAX_BAR_SIZE);
      }
    });
  });

  test('Verify histogram bar width is not limited by the bar chart default', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@histogram-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/histogram-chart/basic-usage.tsx',
      'en',
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step(`Verify histogram bars keep their band width and exceed the ${MAX_BAR_SIZE}px cap`, async () => {
      const boxes = await getBarBoxes(locators.bar(page));
      expect(boxes.length).toBeGreaterThan(0);
      expect(Math.max(...boxes.map((box) => box.width))).toBeGreaterThan(MAX_BAR_SIZE);
    });
  });

  test.fixme('Verify the gap between bars inside a group is 2px', {
    tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'UIK-5880: GroupBar keeps paddingInner hardcoded to 0.1, so the gap is a share of the band step instead of a fixed 2px (3.74px at plotWidth 500, ~28px at plotWidth 800)',
    },
  }, async ({ page }) => {
    await loadPage(
      page,
      BAR_STORY,
      'en',
      {
        groupKey: 'category',
        type: 'group',
        data: groupedData,
        trend: undefined,
        duration: 0,
      },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step('Verify gaps within every group equal 2px', async () => {
      const boxes = await getBarBoxes(locators.groupBarBar(page));
      expect(boxes.length).toBe(6);

      // 2 bars per group: even indexes are gaps inside a group, odd ones are between groups.
      const gaps = getGaps(boxes);
      const withinGroup = gaps.filter((_, index) => index % 2 === 0);

      for (const gap of withinGroup) {
        expect(gap).toBeCloseTo(2, 1);
      }
    });
  });

  dataTypeCases.forEach((expected) => {
    test(`Verify vertical bars render dataType ${expected.dataType} with highlight ${expected.highlightDots}`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_STORY, 'en', {
        dataType: expected.dataType,
        highlightDots: expected.highlightDots,
        duration: 0,
      });

      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Verify forecast masks, potential gradients and highlight count', async () => {
        await expectDataTypes(page, expected);
      });
    });
  });

  test.fixme('Verify bar highlights are hidden from assistive technology like the bars', {
    tag: [TAG.PRIORITY_LOW, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Highlight paths from renderHighlight have no aria-hidden, bars have aria-hidden="true"',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { highlightDots: 'mixed', duration: 0 });

    await test.step('Verify every highlight sits inside an aria-hidden element', async () => {
      await expect(locators.highlights(page)).toHaveCount(3);

      const exposed = await locators.highlights(page).evaluateAll((elements) =>
        elements.filter((element) => !element.closest('[aria-hidden="true"]')).length,
      );
      expect(exposed).toBe(0);
    });
  });

  test('Verify highlights use the mask of their own chart when an earlier chart is in a hidden tab', {
    tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, HIDDEN_TAB_STORY, 'en');

    const insightsTab = page.getByRole('tab', { name: 'Insights' });
    const insightsPanel = page.locator('#panel-insights');

    await test.step('Open the tab with highlights while the first chart stays mounted and hidden', async () => {
      await expect(page.locator('#panel-traffic svg[data-ui-name="Plot"]')).toBeVisible();
      await insightsTab.click();
      await expect(insightsTab).toHaveAttribute('aria-selected', 'true');
      await expect(insightsPanel).toBeVisible();
      await expect(page.locator('#panel-traffic')).toBeHidden();
    });

    await test.step('Verify every highlight mask resolves inside the visible panel', async () => {
      await expect(insightsPanel.locator('path[mask]')).toHaveCount(3);

      const maskOwners = await insightsPanel.locator('path[mask]').evaluateAll((elements) =>
        elements.map((element) => {
          const id = element.getAttribute('mask')!.match(/url\(#(.+)\)/)![1];
          return document.getElementById(id)?.closest('[role="tabpanel"]')?.id;
        }),
      );
      expect(maskOwners).toEqual(['panel-insights', 'panel-insights', 'panel-insights']);
    });
  });

  test('Verify vertical bars start at the x axis', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { dataType: 'none', highlightDots: 'none', duration: 0 });

    await test.step('Verify the bottom of every bar is on the x axis line', async () => {
      await expect(locators.groupBarBar(page)).toHaveCount(5);
      await expect(page.locator('line[data-ui-name="Axis"]')).toHaveCount(2);
      const axisY = await page.locator('line[data-ui-name="Axis"]').evaluateAll((lines) =>
        Number(lines.find((line) => line.getAttribute('y1') === line.getAttribute('y2'))!.getAttribute('y1')),
      );
      const boxes = await getBarBoxes(locators.groupBarBar(page));
      expect(boxes).toHaveLength(5);
      expect(boxes.map((box) => Number((box.y + box.height).toFixed(2)))).toEqual(boxes.map(() => axisY));
    });
  });

  test('Verify positive vertical bars are rounded only at the top', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { dataType: 'none', highlightDots: 'none', duration: 0 });

    await test.step('Verify each bar has 2 rounded corners of radius 2', async () => {
      await expect(locators.groupBarBar(page)).toHaveCount(5);
      const paths = await locators.groupBarBar(page).evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('d')),
      );
      expect(paths.length).toBe(5);

      for (const d of paths) {
        expect(countRoundedCorners(d)).toBe(2);
        expect(getCornerRadius(d)).toBe(2);
      }
    });
  });

  test('Verify hover rect follows the pointer between bars and hides on leave', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify hover rect and tooltip appear over the first bar', async () => {
      await hoverCenter(page, locators.groupBarBar(page, 0));
      await expect(locators.hoverRect(page)).toBeVisible();
      await expect(locators.tooltip(page)).toContainText('Category 0');
    });

    await test.step('Verify tooltip switches to the hovered bar', async () => {
      await hoverCenter(page, locators.groupBarBar(page, 3));
      await expect(locators.tooltip(page)).toContainText('Category 3');
    });

    await test.step('Verify hover rect and tooltip hide when the pointer leaves the plot', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hoverRect(page)).toHaveCount(0);
      await expect(locators.tooltip(page)).toBeHidden();
    });
  });

  test('Verify vertical hover rect is rounded at the top', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0 });
    await hoverCenter(page, locators.groupBarBar(page, 1));

    await test.step('Verify the hover path has 2 rounded corners', async () => {
      await expect(locators.hoverRect(page)).toBeVisible();
      expect(countRoundedCorners(await locators.hoverRect(page).getAttribute('d'))).toBe(2);
    });
  });

  test('Verify vertical hover rect corners have a 6px radius', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0 });
    await hoverCenter(page, locators.groupBarBar(page, 1));

    await test.step('Verify both top corners are 6 by 6', async () => {
      await expect(locators.hoverRect(page)).toBeVisible();
      expect(getCurveCornerSizes(await locators.hoverRect(page).getAttribute('d'))).toEqual([[6, 6], [6, 6]]);
    });
  });

  test.fixme('Verify hover rect keeps a valid shape on a narrow category band', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'The 6px radius is not clamped, so a band narrower than 12px gives a self-intersecting path',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { plotWidth: 100, duration: 0 });
    await hoverCenter(page, locators.groupBarBar(page, 1));

    await test.step('Verify the top edge does not run backwards', async () => {
      const d = await locators.hoverRect(page).getAttribute('d');
      const match = d?.match(/Q\s*[-\d.]+,[-\d.]+\s+([-\d.]+),[-\d.]+\s*H\s*([-\d.]+)/);
      expect(match).not.toBeNull();

      const [curveEndX, topEdgeEndX] = match!.slice(1).map(Number);
      expect(topEdgeEndX).toBeGreaterThanOrEqual(curveEndX);
    });
  });
});
