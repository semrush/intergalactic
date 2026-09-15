import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
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

const deltaProps = {
  showDeltaPercentInTooltip: true,
  showTotalInTooltip: false,
  // The example's custom formatter renders values as dates, which only adds noise here.
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
      await hoverAreaPoint(page, 3, 'January 16, 2024');

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

      const ticks = locators.axisTicks(page);
      const ticksCount = await ticks.count();
      expect(ticksCount).toBeGreaterThan(0);

      for (let i = 0; i < ticksCount; i++) {
        const tick = ticks.nth(i);
        await expect(tick).toHaveAttribute('aria-hidden', 'true');
        await expect(tick).toHaveAttribute('data-ui-name', 'Axis.Ticks');
        const x = await tick.getAttribute('x');
        const y = await tick.getAttribute('y');
        expect(x).not.toBeNull();
        expect(y).not.toBeNull();
      }

      const axes = locators.axis(page);
      const axesCount = await axes.count();
      expect(axesCount).toBeGreaterThan(0);

      for (let i = 0; i < axesCount; i++) {
        const axis = axes.nth(i);
        await expect(axis).toHaveAttribute('aria-hidden', 'true');
        await expect(axis).toHaveAttribute('data-ui-name', 'Axis');
        const x1 = await axis.getAttribute('x1');
        const y1 = await axis.getAttribute('y1');
        expect(x1).not.toBeNull();
        expect(y1).not.toBeNull();
      }

      const titles = locators.axisTitle(page);
      const titleCount = await titles.count();
      expect(titleCount).toBeGreaterThan(0);

      for (let i = 0; i < titleCount; i++) {
        const title = titles.nth(i);
        await expect(title).toHaveAttribute('aria-hidden', 'true');
        const x = await title.getAttribute('x');
        const y = await title.getAttribute('y');
        expect(x).not.toBeNull();
        expect(y).not.toBeNull();
      }

      const grids = locators.axisGrid(page);
      const gridCount = await grids.count();
      expect(gridCount).toBeGreaterThan(0);

      for (let i = 0; i < gridCount; i++) {
        const grid = grids.nth(i);
        await expect(grid).toHaveAttribute('aria-hidden', 'true');
        const x1 = await grid.getAttribute('x1');
        const y1 = await grid.getAttribute('y1');
        expect(x1).not.toBeNull();
        expect(y1).not.toBeNull();
      }
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

      const patternDotsCount = await page.locator('[data-ui-name="Area.Dots"][svg]').count();
      for (let i = 0; i < patternDotsCount; i++) {
        const patternDot = locators.areaDots(page, i);
        await expect(patternDot).toHaveAttribute('aria-hidden', 'true');
      }
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

    test('Verify a dot still appears on hover when showDots is disabled', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
        'en',
        { showDots: false, duration: 0 },
      );

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

      // `showDots` is now forwarded as `display`, so the active dot is still rendered.
      await expect(locators.lineDots(page).first()).toBeVisible();
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
   *   index 6 -> line 6,  line2 2  : -14.3% and -60%, both downward
   */
  test.describe('Tooltip percent delta', () => {
    test('Verify upward deltas render with the DiffUp icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 3, 'January 16, 2024');

      await expect(locators.diffUp(page)).toHaveCount(2);
      await expect(locators.diffDown(page)).toHaveCount(0);
      await expect(page.getByText('100%', { exact: true })).toBeVisible();
      await expect(page.getByText('33.3%', { exact: true })).toBeVisible();
    });

    test('Verify downward deltas render with the DiffDown icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 6, 'January 31, 2024');

      await expect(locators.diffDown(page)).toHaveCount(2);
      await expect(locators.diffUp(page)).toHaveCount(0);
      await expect(page.getByText('-14.3%', { exact: true })).toBeVisible();
      await expect(page.getByText('-60%', { exact: true })).toBeVisible();
    });

    test('Verify an unchanged value renders a stable delta without an icon', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      // line grows by 100%, line2 stays at 3.
      await hoverAreaPoint(page, 1, 'January 6, 2024');

      await expect(locators.diffUp(page)).toHaveCount(1);
      await expect(locators.diffDown(page)).toHaveCount(0);
    });

    test('Verify the first data point renders no delta column', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 0, 'January 1, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
    });

    test('Verify no delta is rendered when showDeltaPercentInTooltip is off', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', {
        ...deltaProps,
        showDeltaPercentInTooltip: false,
      });

      await hoverAreaPoint(page, 3, 'January 16, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
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

      await expect(page.getByText('15. März 2024')).toBeVisible();
    });
  });
});
