import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import type { Box } from './bar-chart.helpers';
import {
  BAR_STORY,
  countRoundedCorners,
  dataTypeCases,
  expectDataTypes,
  getBarBoxes,
  getGaps,
  hoverCenter,
  locators,
} from './bar-chart.helpers';

const STACK_STORY = 'stories/components/d3-chart/tests/examples/stacked-bar-chart/basic-usage.tsx';
const PLOT_STORY = 'stories/components/d3-chart/tests/examples/stacked-bar-chart/stack-bar-props-cases.tsx';

/** Groups stack segments by category (same x for vertical, same y for horizontal) and returns the gaps inside each stack. */
const getGapsInsideStacks = (boxes: Box[], axis: 'x' | 'y') => {
  const crossAxis = axis === 'x' ? 'y' : 'x';
  const stacks = new Map<number, Box[]>();

  for (const box of boxes) {
    const key = Math.round(box[crossAxis]);
    stacks.set(key, [...(stacks.get(key) ?? []), box]);
  }

  return [...stacks.values()].flatMap((stack) =>
    getGaps(stack.filter((box) => (axis === 'x' ? box.width : box.height) > 0).sort((a, b) => a[axis] - b[axis]), axis),
  );
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
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
          PLOT_STORY,
          'en',
          variant.props,
        );

        await locators.plot(page).first().waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    const plotDataCases = [
      { dataSet: 'negative', invertAxis: false, priority: TAG.PRIORITY_MEDIUM },
      { dataSet: 'negative', invertAxis: true, priority: TAG.PRIORITY_MEDIUM },
      { dataSet: 'edge', invertAxis: false, priority: TAG.PRIORITY_LOW },
      { dataSet: 'edge', invertAxis: true, priority: TAG.PRIORITY_MEDIUM },
    ];

    plotDataCases.forEach(({ priority, ...props }) => {
      const orientation = props.invertAxis ? 'horizontal' : 'vertical';

      test(`Verify ${orientation} StackBar with ${props.dataSet} values`, {
        tag: [priority, '@bar-chart', '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, PLOT_STORY, 'en', { ...props, duration: 0 });

        await expect(locators.plot(page)).toHaveScreenshot(`stacked-plot-${props.dataSet}-${orientation}.png`);
      });
    });

    test('Verify stacked grouped bars', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
        await hoverCenter(page, locators.stackGroupBarBar(page, 0));
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(locators.tooltip(page)).toContainText('Category 1');
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill mouse interaction', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend', '@checkbox'],
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

        await label2.hover();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify stacked bar legend and pattern fill keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@card', '@chart-legend', '@checkbox'],
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
        const firstItem = page.getByRole('checkbox').first();
        await expect(firstItem).toBeFocused();
        await page.keyboard.press('Space');
        await expect(firstItem).not.toBeChecked();
        await page.keyboard.press('Space');
        await expect(firstItem).toBeChecked();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Stacked bars via Chart.Bar props', () => {
    const hoverCases = [
      { invertAxis: false, patterns: false, priority: TAG.PRIORITY_HIGH },
      { invertAxis: true, patterns: true, priority: TAG.PRIORITY_HIGH },
    ];

    hoverCases.forEach(({ priority, ...props }) => {
      const name = `${props.invertAxis ? 'horizontal' : 'vertical'}${props.patterns ? '-patterns' : ''}`;

      test(`Verify ${name} stacked chart hover rect and tooltip`, {
        tag: [priority, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, STACK_STORY, 'en', { ...props, duration: 0 });
        const segment = props.invertAxis ? locators.stackBarHorizontalBar(page, 1) : locators.stackBarBar(page, 1);

        await hoverCenter(page, segment);
        await expect(locators.tooltip(page)).toBeVisible();
        await expect(page).toHaveScreenshot(`stacked-chart-${name}-hover.png`);
      });
    });

    test('Verify horizontal stacked chart legend mouse interaction', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, STACK_STORY, 'en', { invertAxis: true, duration: 0 });
      const legendItems = locators.legend(page).getByRole('checkbox');

      await test.step('Verify other series fade when a legend item is hovered', async () => {
        await locators.legend(page).getByText('Category2').hover();
        await expect(page).toHaveScreenshot('stacked-chart-horizontal-legend-hover.png');
      });

      await test.step('Verify the series disappears when its legend item is unchecked', async () => {
        await locators.legend(page).getByText('Category1').click();
        await expect(legendItems.first()).not.toBeChecked();
        await expect(locators.stackBarHorizontalBar(page)).toHaveCount(10);
        await page.mouse.move(0, 0);
        await expect(page).toHaveScreenshot('stacked-chart-horizontal-legend-unchecked.png');
      });
    });

    test('Verify horizontal stacked chart legend keyboard interaction with patterns', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, STACK_STORY, 'en', { invertAxis: true, patterns: true, duration: 0 });
      const firstItem = locators.legend(page).getByRole('checkbox').first();

      await test.step('Verify focus ring on the first legend item', async () => {
        await page.keyboard.press('Tab');
        await expect(firstItem).toBeFocused();
        await expect(page).toHaveScreenshot('stacked-chart-horizontal-patterns-legend-focus.png');
      });

      await test.step('Verify Space unchecks the item and hides its series', async () => {
        await page.keyboard.press('Space');
        await expect(firstItem).not.toBeChecked();
        await expect(locators.stackBarHorizontalBar(page)).toHaveCount(10);
        await expect(page).toHaveScreenshot('stacked-chart-horizontal-patterns-legend-unchecked.png');
      });
    });

    test('Verify vertical stacked chart with pattern legend shape and maxBarSize', {
      tag: [TAG.PRIORITY_LOW, '@bar-chart', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, STACK_STORY, 'en', {
        patterns: true,
        maxBarSize: 40,
        legendProps: { shape: 'Pattern' },
        duration: 0,
      });

      await expect(locators.stackBarBar(page)).toHaveCount(15);
      await expect(page).toHaveScreenshot('stacked-chart-vertical-pattern-legend.png');
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  const ariaHiddenDocsCases = [
    {
      title: 'Verify StackBar.Bar aria-hidden attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
      story: 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx',
      bars: locators.stackBarBar,
    },
    {
      title: 'Verify StackGroupBar.Bar aria-hidden attributes',
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
      story: 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx',
      bars: locators.stackGroupBarBar,
    },
    {
      title: 'Verify StackBar.HorizontalBar aria-hidden attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
      story: 'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx',
      bars: locators.stackBarHorizontalBar,
    },
  ];

  ariaHiddenDocsCases.forEach((c) => {
    test(c.title, { tag: c.tag }, async ({ page }) => {
      await loadPage(page, c.story, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Verify bars have aria-hidden', async () => {
        await expectEachToHaveAttribute(c.bars(page), 'aria-hidden', 'true');
      });
    });
  });

  dataTypeCases.forEach((expected) => {
    test(`Verify vertical stacked bars render dataType ${expected.dataType} with highlight ${expected.highlightDots}`, {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_STORY, 'en', {
        type: 'stack',
        secondSeries: true,
        dataType: expected.dataType,
        highlightDots: expected.highlightDots,
        duration: 0,
      });

      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Verify forecast masks, potential gradients and highlight count', async () => {
        await expect(locators.stackBarBar(page)).toHaveCount(10);
        await expectDataTypes(page, expected, 2);
      });
    });
  });

  const stackOrientations = [
    { name: 'vertical', invertAxis: false, locator: locators.stackBarBar, axis: 'y' as const },
    { name: 'horizontal', invertAxis: true, locator: locators.stackBarHorizontalBar, axis: 'x' as const },
  ];

  stackOrientations.forEach((variant) => {
    test(`Verify ${variant.name} stack segments are separated by 2px`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, STACK_STORY, 'en', { invertAxis: variant.invertAxis, duration: 0 });

      await test.step('Verify every gap inside a stack equals 2px', async () => {
        const gaps = getGapsInsideStacks(await getBarBoxes(variant.locator(page), variant.axis), variant.axis);
        expect(gaps.length).toBe(10);

        for (const gap of gaps) {
          expect(gap).toBeCloseTo(2, 1);
        }
      });
    });

    test(`Verify ${variant.name} stack adds no extra gap for a zero segment`, {
      tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_STORY, 'en', {
        type: 'stack',
        invertAxis: variant.invertAxis,
        trend: undefined,
        duration: 0,
        data: [{ category: 'Category 0', a: 3, b: 0, c: 2 }],
      });

      await test.step('Verify the two visible segments are 2px apart', async () => {
        const gaps = getGapsInsideStacks(await getBarBoxes(variant.locator(page), variant.axis), variant.axis);
        expect(gaps).toEqual([2]);
      });
    });

    test(`Verify ${variant.name} stack ends at its total value`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      const size = variant.axis === 'y' ? 'height' : 'width';
      const crossAxis = variant.axis === 'y' ? 'x' : 'y';
      const shortestStackExtent = async (data: Record<string, unknown>[]) => {
        await loadPage(page, BAR_STORY, 'en', {
          type: 'stack',
          invertAxis: variant.invertAxis,
          trend: undefined,
          duration: 0,
          data,
        });
        const boxes = (await getBarBoxes(variant.locator(page), variant.axis)).filter((box) => box[size] > 0);
        expect(boxes.length).toBeGreaterThan(0);

        const stacks = new Map<number, Box[]>();
        for (const box of boxes) {
          const key = Math.round(box[crossAxis]);
          stacks.set(key, [...(stacks.get(key) ?? []), box]);
        }

        return Math.min(...[...stacks.values()].map((stack) =>
          Math.max(...stack.map((box) => box[variant.axis] + box[size])) - Math.min(...stack.map((box) => box[variant.axis])),
        ));
      };

      await test.step('Verify a 5 + 4 + 1 stack is half of a value axis that ends at 20', async () => {
        const stacked = await shortestStackExtent([
          { category: 'Category 0', a: 5, b: 4, c: 1 },
          { category: 'Category 1', a: 20, b: 0, c: 0 },
        ]);
        const valueAxisLength = await page.locator('line[data-ui-name="Axis"]').evaluateAll((lines, axis) => {
          const valueAxis = lines.find((line) =>
            axis === 'x' ? line.getAttribute('y1') === line.getAttribute('y2') : line.getAttribute('x1') === line.getAttribute('x2'),
          )!;
          const [start, end] = axis === 'x' ? ['x1', 'x2'] : ['y1', 'y2'];
          return Math.abs(Number(valueAxis.getAttribute(end)) - Number(valueAxis.getAttribute(start)));
        }, variant.axis);

        expect(stacked).toBeCloseTo(valueAxisLength / 2, 0);
      });
    });
  });

  test('Verify horizontal stack is rounded only at the outer ends', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      type: 'stack',
      invertAxis: true,
      trend: undefined,
      duration: 0,
      data: [{ category: 'Category 0', a: 3, b: 4, c: 2 }],
    });

    await test.step('Verify first and last segments have 2 rounded corners, the middle one none', async () => {
      await expect(locators.stackBarHorizontalBar(page)).toHaveCount(3);
      const paths = await locators.stackBarHorizontalBar(page).evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('d')),
      );

      expect(paths.map(countRoundedCorners)).toEqual([2, 0, 2]);
    });
  });

  test('Verify the only visible horizontal stack series is rounded at both ends', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      type: 'stack',
      invertAxis: true,
      secondSeries: true,
      trend: undefined,
      duration: 0,
    });

    await test.step('Verify segments of the first series have 2 rounded corners', async () => {
      await expect(locators.stackBarHorizontalBar(page)).toHaveCount(10);
      expect(countRoundedCorners(await locators.stackBarHorizontalBar(page, 0).getAttribute('d'))).toBe(2);
    });

    await test.step('Verify each remaining segment has 4 rounded corners after the second series is hidden', async () => {
      await locators.legend(page).getByRole('checkbox').nth(1).click({ force: true });
      await expect(locators.stackBarHorizontalBar(page)).toHaveCount(5);

      const paths = await locators.stackBarHorizontalBar(page).evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('d')),
      );
      expect(paths.map(countRoundedCorners)).toEqual([4, 4, 4, 4, 4]);
    });
  });

  test('Verify a single horizontal stack segment with a zero next segment is rounded at both ends', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      type: 'stack',
      invertAxis: true,
      trend: undefined,
      duration: 0,
      data: [{ category: 'Category 0', a: 5, b: 0 }],
    });

    await test.step('Verify the segment has 4 rounded corners', async () => {
      await expect(locators.stackBarHorizontalBar(page)).toHaveCount(2);
      expect(countRoundedCorners(await locators.stackBarHorizontalBar(page, 0).getAttribute('d'))).toBe(4);
    });
  });

  test.fixme('Verify zero and empty horizontal stack segments are not drawn', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B17: a 0 or null segment of StackBar.HorizontalBar is drawn as a 4px path with rounded corners next to the bar',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      type: 'stack',
      invertAxis: true,
      trend: undefined,
      duration: 0,
      data: [
        { category: 'Category 0', a: 0, b: 4, c: 0 },
        { category: 'Category 1', a: null, b: 2, c: null },
      ],
    });

    await test.step('Verify only the two non-empty segments have a width', async () => {
      await expect(locators.stackBarHorizontalBar(page)).toHaveCount(6);
      const boxes = await getBarBoxes(locators.stackBarHorizontalBar(page));
      expect(boxes.filter((box) => box.width > 0)).toHaveLength(2);
    });
  });
});
