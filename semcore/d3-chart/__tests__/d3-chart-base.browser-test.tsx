import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page, index?: number) => {
    const base = page.locator('svg[data-ui-name="Plot"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  lineDots: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Line.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="HoverLine.Tooltip"], [data-ui-name="Chart.Tooltip"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  referenceLine: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="ReferenceLine"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  referenceLineTitle: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="ReferenceLine.Title"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  axisTicks: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Axis.Ticks"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  axis: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Axis"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  axisTitle: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Axis.Title"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  axisGrid: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Axis.Grid"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  areaDots: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Area.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  /**
   * The hovered tick pill is rendered by plain svg tags, so it has no data-ui-name.
   * It is the only rounded rect drawn inside the plot, which makes `rect[rx]` a
   * stable structural anchor that survives style and class-name changes.
   */
  hoveredTick: (page: Page) => page.locator('svg[data-ui-name="Plot"] g:has(> rect[rx])'),
  hoveredTickRect: (page: Page) => locators.hoveredTick(page).locator('rect'),
  hoveredTickText: (page: Page) => locators.hoveredTick(page).locator('text'),
  diffUp: (page: Page) => page.locator('[data-ui-name="DiffUp"]'),
  diffDown: (page: Page) => page.locator('[data-ui-name="DiffDown"]'),
};

const HOVERED_TICK_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/hovered-tick.tsx';
const AREA_CHART_EXAMPLE = 'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx';
const LINE_CHART_EXAMPLE = 'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx';
const BAR_CHART_EXAMPLE = 'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx';
const DELTA_EDGE_CASES_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/tooltip-delta-edge-cases.tsx';

/**
 * `HoverLine.Tooltip` renders the hover line as the tooltip anchor (`<Tooltip tag={HoverLine}>`),
 * so on a high level chart the line carries `data-ui-name="Tooltip.Trigger"` and not
 * `"HoverLine"`. Only a bare `<HoverLine>` keeps its own name.
 */
const readHoverTrigger = async (page: Page) => {
  const trigger = page.locator('svg[data-ui-name="Plot"] [data-ui-name="Tooltip.Trigger"]').first();
  await expect(trigger).toBeAttached();

  return trigger.evaluate((el) => ({
    tag: el.tagName.toLowerCase(),
    lines: Array.from(el.querySelectorAll('line')).map((l) => ({
      x1: Number(l.getAttribute('x1')),
      y1: Number(l.getAttribute('y1')),
      x2: Number(l.getAttribute('x2')),
      y2: Number(l.getAttribute('y2')),
    })),
  }));
};

/**
 * Asserts every match defines the given attributes, whatever their values.
 *
 * Like `expectEachToHaveAttribute`, it reads one DOM snapshot instead of walking the
 * collection by index. The failure lists `#index.attribute` for each miss.
 */
const expectEachToDefineAttributes = async (locator: ReturnType<Page['locator']>, attributes: string[]) => {
  await expect(locator).not.toHaveCount(0);

  const missing = await locator.evaluateAll(
    (elements, names) =>
      elements.flatMap((element, index) =>
        names.filter((name) => element.getAttribute(name) === null).map((name) => `#${index}.${name}`),
      ),
    attributes,
  );

  expect(missing).toEqual([]);
};

const deltaProps = {
  showDeltaPercentInTooltip: true,
  showTotalInTooltip: false,
  // Keep the built-in value formatter, so the assertions read raw numbers.
  useCustomValueFormatter: false,
  duration: 0,
};

const hoverPlotCenter = async (page: Page) => {
  const plot = locators.plot(page).first();
  await plot.waitFor({ state: 'visible' });

  const box = await plot.boundingBox();
  if (!box) throw new Error('Bounding box not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  return box;
};

/**
 * Dots give the exact position of a data point, so the hovered index needs no
 * coordinate math. The first 10 dots belong to the first series, one per point.
 *
 * The move is driven through `page.mouse` rather than `locator.hover()`: the
 * neighbouring area path is painted over the dots, so hover() would fail
 * Playwright's actionability check even though the chart handles the event.
 */
const hoverAreaPoint = async (page: Page, index: number, expectedTitle: string) => {
  await locators.plot(page).first().waitFor({ state: 'visible' });

  const dot = await locators.areaDots(page, index).boundingBox();
  if (!dot) throw new Error(`Bounding box not found for dot ${index}`);

  await page.mouse.move(dot.x + dot.width / 2, dot.y + dot.height / 2);

  // Guards against a silent miss: every assertion below relies on the hovered point.
  await expect(page.locator('[data-ui-name="HoverLine.Tooltip.Title"]')).toHaveText(expectedTitle);
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Chart Plot', () => {
    test('Verify paddings and margins apply to the plot', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/paddings-&-margins.tsx', 'en');

      const svg = locators.plot(page);

      await test.step('Check basic CSS styles of <svg>', async () => {
        const styles = await svg.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            padding: computed.padding,
            margin: computed.margin,
            border: computed.border,
            width: computed.width,
            height: computed.height,
          };
        });

        expect(styles.border).toContain('1px solid');
        expect(styles.padding).toBe('0px');
        expect(styles.margin).toBe('0px');
        expect(styles.width).toBe('500px');
        expect(styles.height).toBe('300px');
      });
    });
  });

  test.describe('Reference Lines', () => {
    test('Verify attributes reference lines ', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/d3-chart/reference-line-props.tsx', 'en');

      const svgs = page.locator('svg');

      const referenceLine = locators.referenceLine(page, 0);
      await expect(referenceLine).toHaveAttribute('aria-hidden', 'true');
      await expect(referenceLine).toHaveAttribute('title', 'Left data');

      const referenceTitle = locators.referenceLineTitle(page, 0);
      await expect(referenceTitle).toHaveAttribute('aria-hidden', 'true');
      await expect(referenceTitle).toHaveAttribute('value', 'Category 0');

      const background = await svgs.first().locator('rect').nth(1);
      await expect(background).toHaveAttribute('aria-hidden', 'true');
      await expect(background).toHaveAttribute('value', 'Category 3');

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Axes and Grids', () => {
    const GRID_AXIS_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/grid-axis-props.tsx';

    const pairwiseCases = [
      {
        name: '#1 left+top, all minimal',
        props: {
          yPosition: 'left',
          xPosition: 'top',
          yTicksMultiline: false,
          yShowGrid: false,
          yShowTitle: false,
          xShowTitle: false,
          xTicksMultiline: false,
        },
      },
      {
        name: '#2 left+top, multiline+grid+titles (yTitle=top, xTitle=right)',
        props: {
          yPosition: 'left',
          xPosition: 'top',
          yTicksMultiline: true,
          yShowGrid: true,
          yShowTitle: true,
          yTitlePosition: 'top',
          xShowTitle: true,
          xTitlePosition: 'right',
          xTicksMultiline: true,
        },
      },
      {
        name: '#3 left+bottom, grid+titles (yTitle=right, xTitle=bottom)',
        props: {
          yPosition: 'left',
          xPosition: 'bottom',
          yTicksMultiline: false,
          yShowGrid: true,
          yShowTitle: true,
          yTitlePosition: 'right',
          xShowTitle: true,
          xTitlePosition: 'bottom',
          xTicksMultiline: false,
        },
      },
      {
        name: '#4 left+bottom, multiline+titles (yTitle=bottom, xTitle=left)',
        props: {
          yPosition: 'left',
          xPosition: 'bottom',
          yTicksMultiline: true,
          yShowGrid: false,
          yShowTitle: true,
          yTitlePosition: 'bottom',
          xShowTitle: true,
          xTitlePosition: 'left',
          xTicksMultiline: true,
        },
      },
      {
        name: '#5 right+top, grid+titles (yTitle=left, xTitle=top)',
        props: {
          yPosition: 'right',
          xPosition: 'top',
          yTicksMultiline: false,
          yShowGrid: true,
          yShowTitle: true,
          yTitlePosition: 'left',
          xShowTitle: true,
          xTitlePosition: 'top',
          xTicksMultiline: true,
        },
      },
      {
        name: '#8 right+bottom, custom yTicks=[0,50,100] suffix=% xCategories=[Jan..Apr]',
        props: {
          yPosition: 'right',
          xPosition: 'bottom',
          yTicks: [0, 50, 100],
          yTickSuffix: '%',
          xCategories: ['Jan', 'Feb', 'Mar', 'Apr'],
          yTicksMultiline: true,
          yShowGrid: true,
          yShowTitle: false,
          xShowTitle: false,
          xTicksMultiline: false,
        },
      },
    ];

    pairwiseCases.forEach((c) => {
      test(`Verify pairwise ${c.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, GRID_AXIS_EXAMPLE, 'en', c.props);
        await locators.plot(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify vertical writing mode + primaryText ticks on both axes', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', {
        yShowTitle: true,
        yTitle: 'YAxis title',
        yTitlePosition: 'left',
        yVerticalWritingMode: true,
        yTicksPrimaryText: true,
        xTicksPrimaryText: true,
      });
      await locators.plot(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Adaptive chart', () => {
    test('Verify chart looks good on small resolutions', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/responsive-low-level-chart.tsx', 'en');

      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();

      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Hover Line and Tooltip', () => {
    test('Verify Tooltip controlled appearing', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip-control.tsx', 'en');
      await page.waitForTimeout(500); // wait for finish animation
      await locators.lineDots(page, 0).hover();
      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    test('Verify synscronous charts by EventEmitter', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/synchronous-charts.tsx', 'en');

      await page.waitForTimeout(500);
      await page.setViewportSize({ width: 768, height: 1200 });
      await locators.lineDots(page, 0).hover();
      await locators.tooltip(page, 0).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Pattern fills, dots and lines', () => {
    test('Verify enforcing patterns', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/enforcing-patterns.tsx', 'en');

      const svg = locators.plot(page);
      await page.waitForTimeout(500);
      await expect(svg).toBeVisible();

      const box = await svg.boundingBox();
      if (!box) throw new Error('SVG bounding box not found');

      const centerX = box.x + box.width / 2;
      const centerY = box.y + box.height / 2;

      await page.mouse.move(centerX, centerY);
      await expect(page).toHaveScreenshot();
    });

    test('Verify low level component use', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/low-level-components-use.tsx', 'en');

      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Hovered tick', () => {
    (['Line', 'Rect'] as const).forEach((hoverType) => {
      test(`Verify the tick pill appears under the hovered tick for Hover${hoverType}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, HOVERED_TICK_EXAMPLE, 'en', { hoverType });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTickText(page)).toHaveCount(1);
        await expect(locators.hoveredTickRect(page)).toHaveCount(1);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Tooltip percent delta', () => {
    test('Verify upward deltas render with the DiffUp icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      // Point 3: line grows by 100%, line2 by 33.3%.
      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      await expect(locators.diffUp(page)).toHaveCount(2);
      await expect(locators.diffDown(page)).toHaveCount(0);
      await expect(page.getByText('100%', { exact: true })).toBeVisible();
      await expect(page.getByText('33.3%', { exact: true })).toBeVisible();
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
  test.describe('Chart Plot', () => {
    test('Verify Plot roles and attributes', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/d3-chart/plot-props.tsx', 'en');

      const svgs = page.locator('svg');
      await test.step('Verify plot svg with aria-label attributes', async () => {
        const svg = svgs.first();
        const svgAttributes = [
          ['aria-label', 'Last market trends with pattern'],
          ['width', '300'],
          ['height', '200'],
          ['data-ui-name', 'Plot'],
        ];

        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }

        const path = svg.locator('path');

        await expect(path).toHaveAttribute('aria-hidden', 'true');
      });

      await test.step('Verify data attributes and accessibility structure', async () => {
        const foreignObject = page.locator('foreignObject[data-aria-only="true"]');
        const foreignObjectCount = await foreignObject.count();
        await expect(foreignObjectCount).toBe(2);
        for (let i = 0; i < foreignObjectCount; i++) {
          await expect(foreignObject.nth(i).locator('button')).toHaveAttribute('aria-label', 'Open data summary');
          await expect(foreignObject.nth(i)).toBeVisible();
        }
        const dialog = page.getByRole('dialog', { name: 'Last market trends with pattern data' });
        await expect(dialog).not.toBeVisible();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(dialog).toBeVisible();

        await expect(dialog).toHaveAttribute('tabindex', '0');

        const closeButton = dialog.getByRole('button', { name: 'Close' });
        await expect(closeButton).toHaveAttribute('type', 'button');

        const skipLink1 = dialog.getByRole('link', { name: 'Skip to content after plot' });
        await expect(skipLink1).toBeVisible();

        const skipLink2 = dialog.getByRole('link', { name: 'Skip to plot data table' });
        await expect(skipLink2).toBeVisible();

        const dataSummaryLabel = dialog.locator('label', { hasText: 'Data summary' });
        await expect(dataSummaryLabel).toBeVisible();

        const dataSummary = dialog.locator('[id$="-data-summary"]');
        await expect(dataSummary).toHaveAttribute('aria-busy', 'false');
        await expect(dataSummary).toContainText('text');

        const dataTableLabel = dialog.locator('label', { hasText: 'Data table' });
        await expect(dataTableLabel).toBeVisible();

        const table = dialog.locator('table[id$="-data-table"]');
        await expect(table).toHaveAttribute('tabindex', '0');

        const headers = table.locator('thead > tr > th');
        await expect(headers).toHaveCount(2);
        await expect(headers.nth(0)).toHaveText('Money volume');
        await expect(headers.nth(1)).toHaveText('Time');

        const rows = table.locator('tbody > tr');
        await expect(rows).toHaveCount(20);

        const firstRow = rows.first().locator('td');
        await expect(firstRow.nth(0)).toHaveText('$5.00');
        await expect(firstRow.nth(1)).toHaveText('0 s.');
      });

      await test.step('Verify plot svg without aria-label attributes', async () => {
        const svg = svgs.nth(1);
        const svgAttributes = [
          ['aria-label', 'Chart'],
          ['data-ui-name', 'Plot'],
        ];

        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }

        const path = svg.locator('path');

        await expect(path).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  test.describe('Axes and Grids', () => {
    const GRID_AXIS_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/grid-axis-props.tsx';

    test('Verify attributes of all <text> elements in the chart', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', {
        yShowTitle: true,
        yTitle: 'YAxis title',
        xShowTitle: true,
        xTitle: 'XAxis title',
        yShowGrid: true,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      // `data-ui-name` is what every locator below already selects on, so asserting it
      // again would only restate the query.
      await expectEachToHaveAttribute(locators.axisTicks(page), 'aria-hidden', 'true');
      await expectEachToDefineAttributes(locators.axisTicks(page), ['x', 'y']);

      await expectEachToHaveAttribute(locators.axis(page), 'aria-hidden', 'true');
      await expectEachToDefineAttributes(locators.axis(page), ['x1', 'y1']);

      await expectEachToHaveAttribute(locators.axisTitle(page), 'aria-hidden', 'true');
      await expectEachToDefineAttributes(locators.axisTitle(page), ['x', 'y']);

      await expectEachToHaveAttribute(locators.axisGrid(page), 'aria-hidden', 'true');
      await expectEachToDefineAttributes(locators.axisGrid(page), ['x1', 'y1']);
    });

    test('Verify yHide=true hides at least one axis via display:none', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', { yHide: true });
      await locators.plot(page).waitFor({ state: 'visible' });

      const axes = locators.axis(page);
      const count = await axes.count();
      expect(count).toBeGreaterThan(0);

      let hiddenCount = 0;
      for (let i = 0; i < count; i++) {
        const display = await axes.nth(i).evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') hiddenCount++;
      }
      expect(hiddenCount).toBeGreaterThan(0);
    });

    test('Verify yTicksHide=true hides Y tick texts via display:none', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', { yTicksHide: true });
      await locators.plot(page).waitFor({ state: 'visible' });

      const ticks = locators.axisTicks(page);
      const count = await ticks.count();
      expect(count).toBeGreaterThan(0);

      let hiddenCount = 0;
      for (let i = 0; i < count; i++) {
        const display = await ticks.nth(i).evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') hiddenCount++;
      }
      expect(hiddenCount).toBeGreaterThan(0);
    });
  });

  test.describe('Pattern fills, dots and lines', () => {
    test('Verify pattern styles', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/pattern-fill.tsx', 'en');

      const patterns = page.locator('pattern');

      const count = await patterns.count();

      for (let i = 0; i < count; i++) {
        const pattern = patterns.nth(i);
        await expect(pattern).toHaveAttribute('patternUnits', 'userSpaceOnUse');
        await expect(pattern).toHaveAttribute('width', '12');
        await expect(pattern).toHaveAttribute('height', '12');
        await expect(pattern).toHaveAttribute('x', '0');
        await expect(pattern).toHaveAttribute('y', '0');
      }

      // The example draws no dots at rest (`showDots` is not set), so the hovered point is
      // the only one that renders. With patterns on, a dot is a `<use>` of the pattern
      // symbol rather than a circle.
      await hoverPlotCenter(page);

      const patternDots = page.locator('use[data-ui-name="Area.Dots"]');
      await expect(patternDots).not.toHaveCount(0);
      await expectEachToHaveAttribute(patternDots, 'aria-hidden', 'true');
      await expectEachToDefineAttributes(patternDots, ['href', 'x', 'y']);
    });
  });

  test.describe('Dots', () => {
    test('Verify dots radius', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');

      const dotsCount = await locators.lineDots(page).count();
      expect(dotsCount).toBeGreaterThan(0);

      for (let i = 0; i < dotsCount; i++) {
        const dot = locators.lineDots(page, i);
        const radius = await dot.getAttribute('r');
        expect(radius).not.toBeNull();
        // Default base radius, see BASE_RADIUS in Dots.jsx.
        expect(Number(radius)).toBeCloseTo(3.5, 1);
      }
    });

    test('Verify hovered dot grows to the active radius', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

      // Exactly one dot is active at a time and it uses ACTIVE_RADIUS.
      const activeDots = page.locator('[data-ui-name="Line.Dots"][r="4.5"]');
      await expect(activeDots).toHaveCount(1);
    });

    /**
     * `showDots` no longer gates the dots on or off, it is forwarded as `display`:
     * `showDots={false}` hides the resting dots but the hovered point is still drawn,
     * while `showDots` renders every dot. Both examples below plot two series.
     */
    ([
      ['Chart.Line', LINE_CHART_EXAMPLE, '[data-ui-name="Line.Dots"]'],
      ['Chart.Area', AREA_CHART_EXAMPLE, '[data-ui-name="Area.Dots"]'],
    ] as const).forEach(([chart, example, dotSelector]) => {
      test(`Verify ${chart} keeps the hovered dot when showDots is disabled`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { showDots: false, duration: 0 });

        const dots = page.locator(dotSelector);

        await test.step('No dot rests on the chart', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await expect(dots).toHaveCount(0);
        });

        await test.step('Hovering reveals one dot per series', async () => {
          await hoverPlotCenter(page);

          await expect(dots).toHaveCount(2);
          // Only the active point is drawn, so every visible dot uses ACTIVE_RADIUS.
          await expect(dots.nth(0)).toHaveAttribute('r', '4.5');
          await expect(dots.nth(1)).toHaveAttribute('r', '4.5');
        });
      });

      test(`Verify ${chart} renders every dot when showDots is enabled`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { showDots: true, duration: 0 });

        const dots = page.locator(dotSelector);

        await locators.plot(page).first().waitFor({ state: 'visible' });
        const resting = await dots.count();
        expect(resting).toBeGreaterThan(2);

        await hoverPlotCenter(page);

        // Hovering only grows the active dot of each series, it adds none.
        await expect(dots).toHaveCount(resting);
        await expect(page.locator(`${dotSelector}[r="4.5"]`)).toHaveCount(2);
      });
    });
  });

  test.describe('Hovered tick', () => {
    (['Line', 'Rect'] as const).forEach((hoverType) => {
      test(`Verify hideTickHover removes the tick pill for Hover${hoverType}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, HOVERED_TICK_EXAMPLE, 'en', { hoverType, hideTickHover: true });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTickText(page)).toHaveCount(0);
        await expect(locators.hoveredTickRect(page)).toHaveCount(0);
      });

      test(`Verify the tick pill is rendered on hover for Hover${hoverType}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, HOVERED_TICK_EXAMPLE, 'en', { hoverType });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTickText(page)).toHaveCount(1);
        await expect(locators.hoveredTickRect(page)).toHaveCount(1);
      });
    });

    test('Verify the tick pill stays inside the plot on the first and the last tick', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Line' },
      );

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const plotBox = await plot.boundingBox();
      if (!plotBox) throw new Error('Bounding box not found');

      // The story is 500px wide with a 40px margin, so the scale range is [40, 460]
      // and the edge ticks sit at 8% and 92% of the plot width.
      for (const [name, ratio] of [['first', 0.08], ['last', 0.92]] as const) {
        await test.step(`Verify the pill on the ${name} tick`, async () => {
          await page.mouse.move(plotBox.x + plotBox.width * ratio, plotBox.y + plotBox.height / 2);

          const pill = locators.hoveredTickRect(page).first();
          await expect(pill).toBeVisible();

          const pillBox = await pill.boundingBox();
          if (!pillBox) throw new Error('Pill bounding box not found');

          expect(pillBox.x).toBeGreaterThanOrEqual(plotBox.x - 1);
          expect(pillBox.x + pillBox.width).toBeLessThanOrEqual(plotBox.x + plotBox.width + 1);
        });
      }
    });

    test('Verify the hover line renders notch caps on both ends', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Line' },
      );

      await hoverPlotCenter(page);

      const hoverLine = page.locator('g[data-ui-name="HoverLine"]');
      await expect(hoverLine).toHaveAttribute('aria-hidden', 'true');
      // Two notch caps plus the line itself.
      await expect(hoverLine.locator('line')).toHaveCount(3);
    });

    /**
     * Caps belong to line and area charts only. Those two build their tooltip on
     * `HoverLine`, while bar-shaped charts use `HoverRect`, so the split falls out of the
     * component each chart picks rather than an explicit chart-type check.
     */
    ([
      ['Chart.Line', LINE_CHART_EXAMPLE],
      ['Chart.Area', AREA_CHART_EXAMPLE],
    ] as const).forEach(([chart, example]) => {
      test(`Verify ${chart} draws the hover line with a cap on each end`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { duration: 0 });

        await hoverPlotCenter(page);

        const { tag, lines } = await readHoverTrigger(page);

        expect(tag).toBe('g');
        expect(lines).toHaveLength(3);

        const [bottomCap, line, topCap] = lines;

        // The middle segment is the vertical line itself.
        expect(line.x1).toBe(line.x2);
        expect(line.y1).not.toBe(line.y2);

        // Each cap is horizontal and sits at one end of the line.
        [bottomCap, topCap].forEach((cap) => {
          expect(cap.y1).toBe(cap.y2);
          expect([line.y1, line.y2]).toContain(cap.y1);
          // Centred on the line, 9px wide minus the stroke, see NOTCH_WIDTH in Hover.jsx.
          expect((cap.x1 + cap.x2) / 2).toBeCloseTo(line.x1, 5);
          expect(cap.x2 - cap.x1).toBeCloseTo(8.5, 5);
        });

        expect(bottomCap.y1).not.toBe(topCap.y1);
      });
    });

    test('Verify Chart.Bar hovers with a rect and gets no caps', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, BAR_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);

      const { tag, lines } = await readHoverTrigger(page);

      expect(tag).toBe('rect');
      expect(lines).toHaveLength(0);
    });

    test('Verify hideHoverLine removes the hover line and the tick pill', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Line', hideHoverLine: true },
      );

      await hoverPlotCenter(page);

      await expect(page.locator('g[data-ui-name="HoverLine"]')).toHaveCount(0);
      await expect(locators.hoveredTickText(page)).toHaveCount(0);
    });

    test('Verify hovering the axis area below the plot keeps the tooltip open', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Rect' },
      );

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      // Below the value area but still inside the plot: the tick label zone.
      await page.mouse.move(box.x + box.width / 2, box.y + box.height - 20);

      await expect(locators.hoveredTickText(page)).toHaveCount(1);
    });
  });

  /**
   * Percent deltas are exercised on the area chart example, whose data already
   * covers every common branch relative to the previous point:
   *
   *   index 0 -> line 2,  line2 3  : no previous point, both deltas are `null`
   *   index 1 -> line 4,  line2 3  : +100% and an unchanged value (stable)
   *   index 3 -> line 6,  line2 4  : +100% and +33.3%, both upward
   *   index 6 -> line 6,  line2 2  : 14.3% and 60% declines, both downward
   *
   * The text is printed through `Math.abs`, so a decline shows no minus sign — only the
   * DiffDown icon and the trend colour tell the direction.
   */
  test.describe('Tooltip percent delta', () => {
    test('Verify upward deltas render with the DiffUp icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      await expect(locators.diffUp(page)).toHaveCount(2);
      await expect(locators.diffDown(page)).toHaveCount(0);
      await expect(page.getByText('100%', { exact: true })).toBeVisible();
      await expect(page.getByText('33.3%', { exact: true })).toBeVisible();
    });

    test('Verify downward deltas render with the DiffDown icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');

      await expect(locators.diffDown(page)).toHaveCount(2);
      await expect(locators.diffUp(page)).toHaveCount(0);
      // The value is printed through `Math.abs`: the DiffDown icon carries the direction.
      await expect(page.getByText('14.3%', { exact: true })).toBeVisible();
      await expect(page.getByText('60%', { exact: true })).toBeVisible();
      await expect(page.getByText('-14.3%', { exact: true })).toHaveCount(0);
    });

    /**
     * The diff carries predefined styles: green for growth, red for decline and the muted
     * secondary colour when nothing changed. Those come from `chart-data-success` /
     * `chart-data-critical`, so the check is on the hue family rather than an exact value —
     * that survives a palette tweak but still catches the two being swapped.
     */
    test('Verify the diff is green upwards, red downwards and muted when stable', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      const readTrendColours = () =>
        page.locator('[class*="STooltipDeltaWrapper"]').evaluateAll((els) =>
          els.map((el) => ({
            trend: Array.from(el.classList).find((c) => c.includes('_trend_'))?.match(/_trend_(\w+?)_/)?.[1],
            color: getComputedStyle(el).color,
          })),
        );

      // Jan 16: both series grow. Jan 6: one grows, the other stays put.
      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');
      const upward = await readTrendColours();

      await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');
      const downward = await readTrendColours();

      await hoverAreaPoint(page, 1, 'Saturday, January 6, 2024');
      const stable = (await readTrendColours()).find((d) => d.trend === 'stable');

      expect(upward.every((d) => d.trend === 'upward')).toBe(true);
      expect(downward.every((d) => d.trend === 'downward')).toBe(true);
      expect(stable).toBeDefined();

      // oklch keeps the hue as the third component: ~143 is green, ~22 is red.
      const hueOf = (color: string) => Number(color.match(/oklch\([\d.]+ [\d.]+ ([\d.]+)/)?.[1]);

      expect(hueOf(upward[0].color)).toBeGreaterThan(90);
      expect(hueOf(upward[0].color)).toBeLessThan(200);
      expect(hueOf(downward[0].color)).toBeLessThan(60);

      // A stable diff is not coloured like a trend, it uses the tooltip's secondary text.
      const titleColour = await page
        .locator('[data-ui-name="HoverLine.Tooltip.Title"]')
        .evaluate((el) => getComputedStyle(el).color);

      expect(stable!.color).toBe(titleColour);
      expect(stable!.color).not.toBe(upward[0].color);
      expect(stable!.color).not.toBe(downward[0].color);
    });

    /**
     * Pins the behaviour of the awkward inputs, all read off the edge-case example.
     * None of these is a crash, but two of them are judgement calls worth noticing if
     * they ever change: a sub-0.05% move collapses into a stable "0", and a negative
     * baseline turns growth into a red decline because the formula divides by it.
     */
    test('Verify how the diff handles extreme and awkward values', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, DELTA_EDGE_CASES_EXAMPLE, 'en', {});

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      // The example has two bands, the second one carries every case.
      await page.mouse.move(box.x + box.width * 0.72, box.y + box.height / 2);
      await expect(page.locator('[data-ui-name="HoverRect.Tooltip.Title"]')).toHaveText('after');

      const rows = await page
        .locator('[class*="STooltipChildrenWrapper"]')
        .first()
        .evaluate((el) =>
          Array.from(el.children).map((c) => ({
            text: c.textContent ?? '',
            trend: Array.from(c.classList).find((x) => x.includes('_trend_'))?.match(/_trend_(\w+?)_/)?.[1] ?? null,
          })),
        );

      const diffAfter = (label: string) => {
        const at = rows.findIndex((c) => c.text === label);
        expect(at, `series "${label}" not found`).toBeGreaterThan(-1);
        return rows[at + 2];
      };

      await test.step('Growth beyond 100% keeps its full value', async () => {
        expect(diffAfter('overHundred')).toMatchObject({ text: '400%', trend: 'upward' });
        expect(diffAfter('huge')).toMatchObject({ text: '9900%', trend: 'upward' });
      });

      await test.step('Fractions keep one decimal place', async () => {
        expect(diffAfter('fraction')).toMatchObject({ text: '0.5%', trend: 'upward' });
      });

      await test.step('A move below 0.05% collapses into a stable zero', async () => {
        // 10000 -> 10004 is +0.04%, which rounds away and reads as no change at all.
        // A stable delta still carries the percent sign, it just loses the icon.
        expect(diffAfter('roundsToZero')).toMatchObject({ text: '0%', trend: 'stable' });
      });

      await test.step('A negative baseline keeps the sign of the actual move', async () => {
        // -10 -> -5 is an improvement, and dividing by |prev| keeps it a green +50%
        // instead of flipping it into a red decline.
        expect(diffAfter('negativeBase')).toMatchObject({ text: '50%', trend: 'upward' });
      });
    });

    test('Verify an unchanged value renders a stable delta without an icon', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      // line grows by 100%, line2 stays at 3.
      await hoverAreaPoint(page, 1, 'Saturday, January 6, 2024');

      await expect(locators.diffUp(page)).toHaveCount(1);
      await expect(locators.diffDown(page)).toHaveCount(0);
    });

    test('Verify the first data point renders no delta column', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 0, 'Monday, January 1, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
    });

    /**
     * A single resolvable delta switches the tooltip to three columns, so every row has
     * to fill all three even when its own delta is null: `renderTooltipPercentDelta`
     * emits an empty wrapper for the `unknown` trend, which keeps the cell count a whole
     * number of rows and stops CSS Grid from pulling the next label into the hole.
     *
     * With `withZeroValue` the `line` series has no delta on Jan 16 (its previous value
     * is 0) while `line2` does, which is exactly the mixed case that would break.
     */
    test('Verify rows stay aligned when only some series have a delta', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', { ...deltaProps, withZeroValue: true });

      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      const grid = await page
        .locator('[class*="STooltipChildrenWrapper"]')
        .first()
        .evaluate((el) => {
          const columns = getComputedStyle(el).gridTemplateColumns.split(' ').length;
          const cells = Array.from(el.children).map((c) => ({
            text: c.textContent ?? '',
            x: Math.round(c.getBoundingClientRect().x),
          }));
          const firstColumnX = Math.min(...cells.map((c) => c.x));

          return {
            columns,
            cellCount: cells.length,
            // Series labels are the only cells that may sit in the leftmost column.
            firstColumnTexts: cells.filter((c) => c.x === firstColumnX).map((c) => c.text),
          };
        });

      expect(grid.columns).toBe(3);
      // A partially filled row would leave a hole, and the cell count would stop being a
      // whole number of rows with everything after it shifted one column to the left.
      expect(grid.cellCount % grid.columns).toBe(0);
      // Both series labels must still start their own row.
      expect(grid.firstColumnTexts).toEqual(['line', 'line2']);
    });

    test('Verify no delta is rendered when showDeltaPercentInTooltip is off', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', {
        ...deltaProps,
        showDeltaPercentInTooltip: false,
      });

      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
    });
  });

  /**
   * The pill under the hovered position highlights the X-axis value of that point. It is
   * driven by the data rather than by the rendered axis, so it also appears for points the
   * axis does not label, and both hover flavours get it: `HoverLine` on line/area charts
   * and `HoverRect` on bar-shaped ones.
   */
  test.describe('Hovered tick value', () => {
    /**
     * Labels of the X axis only. Each tick is its own `Axis.Ticks` element and the axis it
     * belongs to shows up as a position modifier in its generated class, so the vertical
     * axis (`_position_left`) has to be filtered out — its labels are numbers too and
     * would otherwise be mistaken for X values.
     */
    const readXAxisLabels = (page: Page) =>
      page
        .locator('[data-ui-name="Axis.Ticks"][class*="_position_bottom"]')
        .evaluateAll((els) => els.map((e) => e.textContent));

    const hoverDot = async (page: Page, selector: string, index: number) => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const dot = await page.locator(selector).nth(index).boundingBox();
      if (!dot) throw new Error(`Bounding box not found for dot ${index}`);

      await page.mouse.move(dot.x + dot.width / 2, dot.y + dot.height / 2);
    };

    test('Verify HoverLine highlights a value the axis does not label', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINE_CHART_EXAMPLE, 'en', { duration: 0 });

      // The example plots x = 0..19 but the axis only labels every second value.
      await hoverDot(page, '[data-ui-name="Line.Dots"]', 7);

      await expect(locators.hoveredTickText(page)).toHaveText('7');

      const labels = await readXAxisLabels(page);
      expect(labels).not.toContain('7');
    });

    test('Verify HoverLine formats the value the same way the axis does', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', { duration: 0 });

      // Jan 21 is both a data point and an axis label, so the two have to agree.
      await hoverDot(page, '[data-ui-name="Area.Dots"]', 4);

      await expect(locators.hoveredTickText(page)).toHaveText('1/21/2024');

      const labels = await readXAxisLabels(page);
      expect(labels).toContain('1/21/2024');
    });

    test('Verify HoverRect highlights the hovered category', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, BAR_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);

      // Bar charts hover through HoverRect, which has to highlight the tick all the same.
      await expect(page.locator('[data-ui-name="Tooltip.Trigger"]').first()).toHaveJSProperty('tagName', 'rect');
      await expect(locators.hoveredTickText(page)).toHaveText('Category 2');
    });
  });

  /**
   * The tooltip is inverted, and `chart-palette-order-1` is a dark neutral that matches
   * its background, so the 1px ring is the only thing separating the two. The unit tests
   * cover which offset each colour is given; these check the other half of the chain —
   * that the rule applies and the relative colour actually resolves in the browser.
   */
  test.describe('Tooltip dot ring', () => {
    const readDotRings = (page: Page) =>
      page.locator('[class*="SDotCircle"]').evaluateAll((els) =>
        els.map((el) => {
          const cs = getComputedStyle(el);
          const lightnessOf = (color: string) => Number(color.match(/oklch\(([\d.]+)/)?.[1]);

          return {
            background: cs.backgroundColor,
            shadow: cs.boxShadow,
            // How much lighter the ring is than the dot it surrounds.
            offset: lightnessOf(cs.boxShadow) - lightnessOf(cs.backgroundColor),
          };
        }),
      );

    test('Verify each dot is ringed by a lighter shade of its own colour', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINE_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);
      await expect(page.locator('[class*="SDotCircle"]')).toHaveCount(2);

      const rings = await readDotRings(page);

      rings.forEach((ring) => {
        // A dropped rule or an unsupported relative colour would leave no shadow at all.
        expect(ring.shadow).toContain('0px 0px 0px 1px');
        expect(ring.shadow).not.toBe('none');
      });

      // chart-palette-order-1 is the dark one and gets the stronger offset.
      expect(rings[0].offset).toBeCloseTo(0.35, 2);
      expect(rings[1].offset).toBeCloseTo(0.15, 2);
    });
  });

  test.describe('Tooltip default formatting', () => {
    test('Verify a Date group key is formatted through Intl for the given locale', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/d3-chart/tooltip-default-format.tsx',
        'en',
        { locale: 'de' },
      );

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

      // Exact text: the weekday and the full month name both have to be there.
      await expect(page.locator('[data-ui-name="HoverLine.Tooltip.Title"]')).toHaveText(
        'Freitag, 15. März 2024',
      );
    });

    test('Verify the default date carries the full weekday and month and no time', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/d3-chart/tooltip-default-format.tsx',
        'en',
      );

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

      const title = page.locator('[data-ui-name="HoverLine.Tooltip.Title"]');
      await expect(title).toHaveText('Friday, March 15, 2024');

      const text = (await title.textContent()) ?? '';
      // A numeric date (3/15/2024) or a leftover clock (00:00) would both mean the
      // long, time-less format was dropped.
      expect(text).not.toMatch(/\d+\/\d+\/\d+/);
      expect(text).not.toMatch(/\d{1,2}:\d{2}/);
    });

    /**
     * `tooltipTitleFormatter` replaces the title only. The `titleFormat` control of the
     * story maps onto the `Intl` option sets a product usually asks for once the built-in
     * weekday is too much detail.
     */
    const titleFormats: Array<[string, string]> = [
      ['off', 'Friday, March 15, 2024'],
      ['withoutWeekday', 'March 15, 2024'],
      ['short', 'Mar 15'],
      ['monthAndYear', 'March 2024'],
    ];

    for (const [titleFormat, expected] of titleFormats) {
      test(`Verify tooltipTitleFormatter renders the ${titleFormat} title`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/d3-chart/tooltip-default-format.tsx',
          'en',
          { titleFormat },
        );

        await hoverPlotCenter(page);

        await expect(page.locator('[data-ui-name="HoverLine.Tooltip.Title"]')).toHaveText(expected);
      });
    }

    test('Verify tooltipTitleFormatter leaves the series values alone', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/d3-chart/tooltip-default-format.tsx',
        'en',
        { titleFormat: 'short' },
      );

      await hoverPlotCenter(page);

      const tooltip = page.locator('[data-ui-name="HoverLine.Tooltip"]').first();
      await expect(page.locator('[data-ui-name="HoverLine.Tooltip.Title"]')).toHaveText('Mar 15');

      // The values keep the built-in numeric formatting: one decimal place, no dates.
      const text = (await tooltip.textContent()) ?? '';
      expect(text).toContain('3.1');
      expect(text).not.toContain('1970');
    });
  });
});
