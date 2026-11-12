import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import {
  BAR_STORY,
  countRoundedCorners,
  getBarBoxes,
  getCornerRadius,
  getCurveCornerSizes,
  getGaps,
  hoverCenter,
  locators,
} from './bar-chart.helpers';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
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

    test('Verify grouped horizontal bars', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
        await hoverCenter(page, locators.groupBarHorizontalBar(page, 1));
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    const horizontalBarPropsVariations = [

      {
        name: 'with visual styling (color, array radius, transparency)',
        props: {
          barColor: '#3498db',
          barRadius: 6,
          barTransparent: true,
          duration: 0,
        },
      },
      {
        name: 'with size constraints (maxBarSize)',
        props: {
          maxBarSize: 25,
          duration: 0,
        },
      },
      {
        name: 'with primaryText false',
        props: {
          primaryText: false,
        },
      },
      {
        name: 'with negative, zero, tiny and empty values',
        props: {
          dataSet: 'edge',
          duration: 0,
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography', '@checkbox'],
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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography', '@checkbox'],
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
        const firstItem = page.getByRole('checkbox').first();
        await expect(firstItem).toBeFocused();
        await page.keyboard.press('Space');
        await expect(firstItem).not.toBeChecked();
        await page.keyboard.press('Space');
        await expect(firstItem).toBeChecked();
        await page.waitForTimeout(200);

        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
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
  const ariaHiddenDocsCases = [
    {
      title: 'Verify Chart.Bar with GroupBar.HorizontalBar aria-hidden attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart'],
      story: 'stories/components/d3-chart/docs/examples/bar-horizontal/basic-usage.tsx',
      bars: locators.groupBarHorizontalBar,
    },
    {
      title: 'Verify HorizontalBar aria-hidden attributes',
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@typography', '@horizontal-bar-chart'],
      story: 'stories/components/d3-chart/docs/examples/bar-horizontal/horizontal-bar.tsx',
      bars: locators.horizontalBar,
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

  test('Verify horizontal bars are rounded on both ends by default', {
    tag: [TAG.PRIORITY_MEDIUM, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, duration: 0 });

    await test.step('Verify each bar has 4 rounded corners of radius 2', async () => {
      await expect(locators.groupBarHorizontalBar(page)).toHaveCount(5);
      const paths = await locators.groupBarHorizontalBar(page).evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('d')),
      );
      expect(paths.length).toBe(5);

      for (const d of paths) {
        expect(countRoundedCorners(d)).toBe(4);
        expect(getCornerRadius(d)).toBe(2);
      }
    });
  });

  test('Verify horizontal hover rect follows the pointer between bars and hides on leave', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify hover rect and tooltip appear over the first bar', async () => {
      await hoverCenter(page, locators.groupBarHorizontalBar(page, 0));
      await expect(locators.hoverRect(page)).toBeVisible();
      await expect(locators.tooltip(page)).toContainText('Category 0');
    });

    await test.step('Verify tooltip switches to the hovered bar', async () => {
      await hoverCenter(page, locators.groupBarHorizontalBar(page, 3));
      await expect(locators.tooltip(page)).toContainText('Category 3');
    });

    await test.step('Verify hover rect and tooltip hide when the pointer leaves the plot', async () => {
      await page.mouse.move(0, 0);
      await expect(locators.hoverRect(page)).toHaveCount(0);
      await expect(locators.tooltip(page)).toBeHidden();
    });
  });

  test('Verify horizontal hover rect is rounded at all 4 corners', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, duration: 0 });
    await hoverCenter(page, locators.groupBarHorizontalBar(page, 1));

    await test.step('Verify the hover path has 4 rounded corners', async () => {
      await expect(locators.hoverRect(page)).toBeVisible();
      expect(countRoundedCorners(await locators.hoverRect(page).getAttribute('d'))).toBe(4);
    });
  });

  test.fixme('Verify horizontal bars start at the y axis', {
    tag: [TAG.PRIORITY_HIGH, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B18: HorizontalBar treats every bar without x0 as a non-first stack segment and moves it 2px off the axis',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, dataType: 'none', highlightDots: 'none', duration: 0 });

    await test.step('Verify the left edge of every bar is on the y axis line', async () => {
      const axisX = await page.locator('line[data-ui-name="Axis"]').evaluateAll((lines) =>
        Number(lines.find((line) => line.getAttribute('x1') === line.getAttribute('x2'))!.getAttribute('x1')),
      );
      const boxes = await getBarBoxes(locators.groupBarHorizontalBar(page), 'y');
      expect(boxes).toHaveLength(5);
      expect(boxes.map((box) => box.x)).toEqual(boxes.map(() => axisX));
    });
  });

  test.fixme('Verify horizontal hover rect corners have a 6px radius', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B14: getHorizontalPathFromRect starts the right corners at width − 2r, so they are 12 by 6',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, duration: 0 });
    await hoverCenter(page, locators.groupBarHorizontalBar(page, 1));

    await test.step('Verify all 4 corners are 6 by 6', async () => {
      await expect(locators.hoverRect(page)).toBeVisible();
      expect(getCurveCornerSizes(await locators.hoverRect(page).getAttribute('d'))).toEqual([[6, 6], [6, 6], [6, 6], [6, 6]]);
    });
  });

  test.fixme('Verify horizontal hover rect keeps a valid shape on a narrow category band', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@horizontal-bar-chart', '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B4: the 6px radius is not clamped, so a band lower than 12px gives a self-intersecting path',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { invertAxis: true, plotHeight: 150, duration: 0 });
    await hoverCenter(page, locators.groupBarHorizontalBar(page, 1));

    await test.step('Verify the right edge does not run upwards', async () => {
      const d = await locators.hoverRect(page).getAttribute('d');
      const match = d?.match(/Q\s*[-\d.]+,[-\d.]+\s+[-\d.]+,([-\d.]+)\s*V\s*([-\d.]+)/);
      expect(match).not.toBeNull();

      const [curveEndY, rightEdgeEndY] = match!.slice(1).map(Number);
      expect(rightEdgeEndY).toBeGreaterThanOrEqual(curveEndY);
    });
  });

  test.fixme('Verify the gap between horizontal bars inside a group is about 2px', {
    tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart', '@base-components', '@flex-box', '@checkbox', '@horizontal-bar-chart'],
    annotation: {
      type: 'issue',
      description: 'UIK-5880: GroupBar keeps paddingInner at 0.1, the gap is 0.64px at plotHeight 300 and maxBarSize 12',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      groupKey: 'category',
      type: 'group',
      invertAxis: true,
      trend: undefined,
      duration: 0,
      data: [
        { category: 'Category 0', bar1: 4, bar2: 7 },
        { category: 'Category 1', bar1: 3, bar2: 5 },
        { category: 'Category 2', bar1: 8, bar2: 2 },
      ],
    });

    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify gaps within every group are between 1.5px and 2.5px', async () => {
      const boxes = await getBarBoxes(locators.groupBarHorizontalBar(page), 'y');
      expect(boxes.length).toBe(6);

      const withinGroup = getGaps(boxes, 'y').filter((_, index) => index % 2 === 0);

      for (const gap of withinGroup) {
        expect(gap).toBeGreaterThanOrEqual(1.5);
        expect(gap).toBeLessThanOrEqual(2.5);
      }
    });
  });
});
