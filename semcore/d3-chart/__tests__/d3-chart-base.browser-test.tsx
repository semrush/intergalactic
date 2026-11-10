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
   * The hovered tick pill is rendered by plain tags, so it has no data-ui-name. Since the
   * tick rework it is a `foreignObject` wrapping HTML rather than a `<g>` of `<rect>` and
   * `<text>`, so the generated class name is the stable anchor. Only the name part is
   * matched; the hash suffix changes between builds.
   */
  hoveredTick: (page: Page) =>
    page.locator('svg[data-ui-name="Plot"] foreignObject[class*="SHoveredTickWrapper"]'),
  /**
   * The rounded background and the label now live on the same `<span>`, so both locators
   * resolve to one node. They are kept apart because the assertions mean different things:
   * one checks the pill box, the other its text.
   */
  hoveredTickRect: (page: Page) => locators.hoveredTick(page).locator('span'),
  hoveredTickText: (page: Page) => locators.hoveredTick(page).locator('span'),
  diffUp: (page: Page) => page.locator('[data-ui-name="DiffUp"]'),
  diffDown: (page: Page) => page.locator('[data-ui-name="DiffDown"]'),
  tooltipTitle: (page: Page) => page.locator('[data-ui-name="HoverLine.Tooltip.Title"]'),
  hoverLine: (page: Page) => page.locator('g[data-ui-name="HoverLine"]'),
};

/** See BASE_RADIUS and ACTIVE_RADIUS in Dots.jsx. */
const BASE_RADIUS = 3.5;
const ACTIVE_RADIUS = 4.5;

const GRID_AXIS_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/grid-axis-props.tsx';
const TOOLTIP_DEFAULT_FORMAT_EXAMPLE = 'stories/components/d3-chart/tests/examples/d3-chart/tooltip-default-format.tsx';
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

/**
 * Trend and resolved colour of every delta cell in the open tooltip, in render order.
 *
 * The trend is read off the generated class rather than an attribute: `sstyled` turns the
 * `trend` / `deltaPercentGrowthColor` props into class names and leaves nothing on the DOM.
 */
const readTrendColours = (page: Page) =>
  page.locator('[class*="STooltipDeltaWrapper"]').evaluateAll((els) =>
    els.map((el) => ({
      trend: Array.from(el.classList).find((c) => c.includes('_trend_'))?.match(/_trend_(\w+?)_/)?.[1],
      color: getComputedStyle(el).color,
    })),
  );

/**
 * The muted colour a `stable` delta falls back to. It is the tooltip's own secondary text
 * colour, so it is read from the title instead of being hard-coded.
 */
const readTooltipTitleColour = (page: Page) =>
  locators.tooltipTitle(page).evaluate((el) => getComputedStyle(el).color);

const hoverPlotCenter = async (page: Page) => {
  const plot = locators.plot(page).first();
  await plot.waitFor({ state: 'visible' });

  const box = await plot.boundingBox();
  if (!box) throw new Error('Bounding box not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  return box;
};

/**
 * Hovers the plot column under the given tick, so the hovered tick pill shows the same
 * content as that tick.
 */
const hoverTickColumn = async (page: Page, tick: ReturnType<Page['locator']>) => {
  const plotBox = await locators.plot(page).first().boundingBox();
  const tickBox = await tick.boundingBox();
  if (!plotBox || !tickBox) throw new Error('Bounding box not found');

  await page.mouse.move(tickBox.x + tickBox.width / 2, plotBox.y + plotBox.height / 2);
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
  await expect(locators.tooltipTitle(page)).toHaveText(expectedTitle);
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Chart Plot', () => {
    test('Verify paddings and margins apply to the plot', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/paddings-&-margins.tsx', 'en');

      const svg = locators.plot(page);

      await test.step('Verify the plot svg has a border, no padding or margin and the given size', async () => {
        await expect(svg).toHaveCSS('border', /1px solid/);
        await expect(svg).toHaveCSS('padding', '0px');
        await expect(svg).toHaveCSS('margin', '0px');
        await expect(svg).toHaveCSS('width', '500px');
        await expect(svg).toHaveCSS('height', '300px');
      });
    });
  });

  test.describe('Reference Lines', () => {
    test('Verify reference line attributes', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/d3-chart/reference-line-props.tsx', 'en');

      await test.step('Verify ReferenceLine attributes', async () => {
        const referenceLine = locators.referenceLine(page, 0);
        await expect(referenceLine).toHaveAttribute('aria-hidden', 'true');
        await expect(referenceLine).toHaveAttribute('title', 'Left data');
      });

      await test.step('Verify ReferenceLine.Title attributes', async () => {
        const referenceTitle = locators.referenceLineTitle(page, 0);
        await expect(referenceTitle).toHaveAttribute('aria-hidden', 'true');
        await expect(referenceTitle).toHaveAttribute('value', 'Category 0');
      });

      await test.step('Verify ReferenceBackground attributes', async () => {
        const background = locators.plot(page, 0).locator('path[value="Category 3"]');
        await expect(background).toHaveAttribute('aria-hidden', 'true');
        await expect(background).toHaveAttribute('value', 'Category 3');
      });

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Axes and Grids', () => {
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
        tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@bar-chart'],
      }, async ({ page }) => {
        await loadPage(page, GRID_AXIS_EXAMPLE, 'en', c.props);
        await locators.plot(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify vertical writing mode + primaryText ticks on both axes', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@bar-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@line-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip-control.tsx', 'en');
      await page.waitForTimeout(500); // wait for finish animation
      await locators.lineDots(page, 0).hover();
      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    test('Verify synchronous charts by EventEmitter', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart', '@bar-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@stacked-area-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/enforcing-patterns.tsx', 'en');

      await page.waitForTimeout(500);
      await expect(locators.plot(page)).toBeVisible();

      await hoverPlotCenter(page);
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
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', hoverType === 'Line' ? '@line-chart' : '@bar-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/d3-chart/plot-props.tsx', 'en');

      const svgs = page.locator('svg');
      const dialog = page.getByRole('dialog', { name: 'Last market trends with pattern data' });

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

        await expectEachToHaveAttribute(svg.locator('path'), 'aria-hidden', 'true');
      });

      await test.step('Verify each plot has an aria-only data summary trigger', async () => {
        const foreignObject = page.locator('foreignObject[data-aria-only="true"]');
        await expect(foreignObject).toHaveCount(2);
        for (let i = 0; i < 2; i++) {
          await expect(foreignObject.nth(i).locator('button')).toHaveAttribute('aria-label', 'Open data summary');
          await expect(foreignObject.nth(i)).toBeVisible();
        }
        await expect(dialog).toBeHidden();
      });

      await test.step('Verify Tab + Enter opens the data summary dialog', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveAttribute('tabindex', '0');
      });

      await test.step('Verify the data summary dialog structure', async () => {
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
      });

      await test.step('Verify the data table in the dialog', async () => {
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
        await expectEachToHaveAttribute(svg.locator('path'), 'aria-hidden', 'true');
      });
    });
  });

  test.describe('Axes and Grids', () => {
    test('Verify attributes of all <text> elements in the chart', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', {
        yShowTitle: true,
        yTitle: 'YAxis title',
        xShowTitle: true,
        xTitle: 'XAxis title',
        yShowGrid: true,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      const elements = [
        { name: 'Axis.Ticks', locator: locators.axisTicks(page), coordinates: ['x', 'y'] },
        { name: 'Axis', locator: locators.axis(page), coordinates: ['x1', 'y1'] },
        { name: 'Axis.Title', locator: locators.axisTitle(page), coordinates: ['x', 'y'] },
        { name: 'Axis.Grid', locator: locators.axisGrid(page), coordinates: ['x1', 'y1'] },
      ];

      for (const { name, locator, coordinates } of elements) {
        await test.step(`Verify every ${name} is aria-hidden and has ${coordinates.join('/')}`, async () => {
          await expectEachToHaveAttribute(locator, 'aria-hidden', 'true');
          await expectEachToDefineAttributes(locator, coordinates);
        });
      }
    });

    ([
      { prop: 'yHide', target: 'at least one axis', locator: locators.axis },
      { prop: 'yTicksHide', target: 'Y tick texts', locator: locators.axisTicks },
    ] as const).forEach(({ prop, target, locator }) => {
      test(`Verify ${prop}=true hides ${target} via display:none`, {
        tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@bar-chart'],
      }, async ({ page }) => {
        await loadPage(page, GRID_AXIS_EXAMPLE, 'en', { [prop]: true });
        await locators.plot(page).waitFor({ state: 'visible' });

        const elements = locator(page);
        await expect(elements).not.toHaveCount(0);

        const displays = await elements.evaluateAll((els) => els.map((el) => getComputedStyle(el).display));
        expect(displays).toContain('none');
      });
    });

    test('Verify grid lines are dashed and drawn with the chart-grid-line token', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en', { yShowGrid: true });
      await locators.plot(page).waitFor({ state: 'visible' });

      const grids = locators.axisGrid(page);
      await expect(grids).not.toHaveCount(0);

      const style = await grids.first().evaluate((el) => {
        const probe = document.createElement('span');
        probe.style.color = 'var(--intergalactic-chart-grid-line)';
        document.body.append(probe);
        const tokenColor = getComputedStyle(probe).color;
        probe.remove();

        const computed = getComputedStyle(el);

        return {
          dashArray: computed.strokeDasharray,
          lineCap: computed.strokeLinecap,
          stroke: computed.stroke,
          tokenColor,
        };
      });

      expect(style.dashArray.replace(/px/g, '').split(/[\s,]+/).filter(Boolean)).toEqual(['0', '6']);
      expect(style.lineCap).toBe('round');
      expect(style.stroke).toBe(style.tokenColor);
    });

    test('Verify tick labels use tabular figures', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, GRID_AXIS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const numeric = await locators
        .axisTicks(page)
        .first()
        .evaluate((el) => getComputedStyle(el).fontVariantNumeric);

      expect(numeric).toContain('tabular-nums');
    });
  });

  test.describe('Tick links', () => {
    const LINKS_EXAMPLE = 'stories/components/d3-chart/docs/examples/bar-chart/links.tsx';

    test('Verify axisXValueFormatter renders links in the X tick labels', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINKS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const links = locators.axisTicks(page).locator('a');

      await expect(links).toHaveCount(3);
      await expect(links.nth(0)).toHaveAttribute('href', 'https://www.semrush.com');
      await expect(links.nth(1)).toHaveAttribute('href', '#legend-and-pattern-fill');
      await expect(links.nth(2)).toHaveAttribute(
        'href',
        '/intergalactic/data-display/area-chart/area-chart',
      );
    });

    test('Verify a tick holding a link is exposed while a plain tick stays hidden', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINKS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const ticks = locators.axisTicks(page);
      const linkTicks = ticks.filter({ has: page.locator('a') });
      const plainTicks = ticks.filter({ hasNot: page.locator('a') });

      await test.step('Verify ticks with a link have no aria-hidden', async () => {
        await expect(linkTicks).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
          await expect(linkTicks.nth(i)).not.toHaveAttribute('aria-hidden');
        }
      });

      await test.step('Verify plain ticks are aria-hidden', async () => {
        await expect(plainTicks).not.toHaveCount(0);
        await expectEachToHaveAttribute(plainTicks, 'aria-hidden', 'true');
      });
    });

    test('Verify tick links can be reached with the keyboard', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINKS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const firstLink = locators.axisTicks(page).locator('a').first();
      await firstLink.focus();

      await expect(firstLink).toBeFocused();
    });

    test('Verify a tick link keeps the tick label font size', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINKS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const ticks = locators.axisTicks(page);
      const linkSize = await ticks
        .locator('a')
        .first()
        .evaluate((el) => getComputedStyle(el).fontSize);

      const plainTick = ticks.filter({ hasNot: page.locator('a') }).first();
      const tickSize = await plainTick.evaluate((el) => getComputedStyle(el).fontSize);

      expect(linkSize).toBe(tickSize);
    });

    test('Verify the hovered tick hides while a tick link has keyboard focus', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@d3-chart',
        '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, LINKS_EXAMPLE, 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      const tickLinks = locators.axisTicks(page).locator('a');
      const pill = locators.hoveredTick(page);

      await hoverTickColumn(page, tickLinks.first());
      await expect(pill).toHaveCSS('visibility', 'visible');

      await test.step('Focus the link with the keyboard', async () => {
        // Focus arrives by Shift+Tab, so the link matches :focus-visible in every browser.
        await tickLinks.nth(1).focus();
        await page.keyboard.press('Shift+Tab');

        await expect(tickLinks.first()).toBeFocused();
        await expect(pill).toHaveCSS('visibility', 'hidden');
      });

      await test.step('Move focus off the tick links', async () => {
        // The first link is the first tab stop, so Shift+Tab would leave the page.
        await tickLinks.first().blur();

        await expect(tickLinks.first()).not.toBeFocused();
        await expect(pill).toHaveCSS('visibility', 'visible');
      });
    });
  });

  test.describe('Pattern fills, dots and lines', () => {
    test('Verify pattern styles', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/pattern-fill.tsx', 'en');

      await test.step('Verify pattern definitions', async () => {
        const patterns = page.locator('pattern[viewBox]');

        await expectEachToHaveAttribute(patterns, 'patternUnits', 'userSpaceOnUse');
        await expectEachToHaveAttribute(patterns, 'width', '12');
        await expectEachToHaveAttribute(patterns, 'height', '12');
      });

      await test.step('Verify the hovered dot is drawn as a <use> of the pattern symbol', async () => {
        await hoverPlotCenter(page);

        const patternDots = page.locator('use[data-ui-name="Area.Dots"]');
        await expect(patternDots).not.toHaveCount(0);
        await expectEachToHaveAttribute(patternDots, 'aria-hidden', 'true');
        await expectEachToDefineAttributes(patternDots, ['href', 'x', 'y']);
      });
    });
  });

  test.describe('Dots', () => {
    test('Verify dots use the base radius at rest', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@line-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');

      const dots = locators.lineDots(page);
      await expect(dots).not.toHaveCount(0);

      const radii = await dots.evaluateAll((els) => els.map((el) => el.getAttribute('r')));
      for (const radius of radii) {
        expect(radius).not.toBeNull();
        expect(Number(radius)).toBeCloseTo(BASE_RADIUS, 1);
      }
    });

    test('Verify exactly one hovered dot grows to the active radius', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');

      await hoverPlotCenter(page);

      await expect(page.locator(`[data-ui-name="Line.Dots"][r="${ACTIVE_RADIUS}"]`)).toHaveCount(1);
    });

    ([
      ['Chart.Line', LINE_CHART_EXAMPLE, '[data-ui-name="Line.Dots"]', '@line-chart'],
      ['Chart.Area', AREA_CHART_EXAMPLE, '[data-ui-name="Area.Dots"]', '@area-chart'],
    ] as const).forEach(([chart, example, dotSelector, chartTag]) => {
      test(`Verify ${chart} keeps the hovered dot when showDots is disabled`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', chartTag, '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { showDots: false, duration: 0 });

        const dots = page.locator(dotSelector);

        await test.step('No dot rests on the chart', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          await expect(dots).toHaveCount(0);
        });

        await test.step('Hovering reveals one active-radius dot per series', async () => {
          await hoverPlotCenter(page);

          await expect(dots).toHaveCount(2);
          await expect(dots.nth(0)).toHaveAttribute('r', String(ACTIVE_RADIUS));
          await expect(dots.nth(1)).toHaveAttribute('r', String(ACTIVE_RADIUS));
        });
      });

      test(`Verify ${chart} renders every dot when showDots is enabled`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', chartTag, '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { showDots: true, duration: 0 });

        const dots = page.locator(dotSelector);

        const resting = await test.step('Verify dots are rendered at rest', async () => {
          await locators.plot(page).first().waitFor({ state: 'visible' });
          const count = await dots.count();
          expect(count).toBeGreaterThan(2);
          return count;
        });

        await test.step('Verify hover grows the active dot of each series and adds none', async () => {
          await hoverPlotCenter(page);

          await expect(dots).toHaveCount(resting);
          await expect(page.locator(`${dotSelector}[r="${ACTIVE_RADIUS}"]`)).toHaveCount(2);
        });
      });
    });
  });

  test.describe('Hovered tick', () => {
    (['Line', 'Rect'] as const).forEach((hoverType) => {
      const chartTag = hoverType === 'Line' ? '@line-chart' : '@bar-chart';

      test(`Verify hideTickHover removes the tick pill for Hover${hoverType}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', chartTag],
      }, async ({ page }) => {
        await loadPage(page, HOVERED_TICK_EXAMPLE, 'en', { hoverType, hideTickHover: true });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTickText(page)).toHaveCount(0);
        await expect(locators.hoveredTickRect(page)).toHaveCount(0);
      });

      test(`Verify the tick pill is rendered on hover for Hover${hoverType}`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', chartTag],
      }, async ({ page }) => {
        await loadPage(page, HOVERED_TICK_EXAMPLE, 'en', { hoverType });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTickText(page)).toHaveCount(1);
        await expect(locators.hoveredTickRect(page)).toHaveCount(1);
      });
    });

    test('Verify the tick pill stays inside the plot on the first and the last tick', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@line-chart'],
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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Line' },
      );

      await hoverPlotCenter(page);

      const hoverLine = locators.hoverLine(page);
      await expect(hoverLine).toHaveAttribute('aria-hidden', 'true');

      await test.step('Verify the hover line consists of the line and two notch caps', async () => {
        await expect(hoverLine.locator('line')).toHaveCount(3);
      });
    });

    ([
      ['Chart.Line', LINE_CHART_EXAMPLE, '@line-chart'],
      ['Chart.Area', AREA_CHART_EXAMPLE, '@area-chart'],
    ] as const).forEach(([chart, example, chartTag]) => {
      test(`Verify ${chart} draws the hover line with a cap on each end`, {
        tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', chartTag, '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, example, 'en', { duration: 0 });

        await hoverPlotCenter(page);

        const { tag, lines } = await readHoverTrigger(page);
        const [bottomCap, line, topCap] = lines;

        await test.step('Verify the hover trigger is a group of three lines', async () => {
          expect(tag).toBe('g');
          expect(lines).toHaveLength(3);
        });

        await test.step('Verify the middle segment is the vertical line', async () => {
          expect(line.x1).toBe(line.x2);
          expect(line.y1).not.toBe(line.y2);
        });

        await test.step('Verify each cap is a horizontal 8.5px segment centred on its own end of the line', async () => {
          [bottomCap, topCap].forEach((cap) => {
            expect(cap.y1).toBe(cap.y2);
            expect([line.y1, line.y2]).toContain(cap.y1);
            expect((cap.x1 + cap.x2) / 2).toBeCloseTo(line.x1, 5);
            expect(cap.x2 - cap.x1).toBeCloseTo(8.5, 5);
          });

          expect(bottomCap.y1).not.toBe(topCap.y1);
        });
      });
    });

    test('Verify Chart.Bar hovers with a rect and gets no caps', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@bar-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);

      const { tag, lines } = await readHoverTrigger(page);

      expect(tag).toBe('rect');
      expect(lines).toHaveLength(0);
    });

    test('Verify hideHoverLine removes the hover line and the tick pill', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        HOVERED_TICK_EXAMPLE,
        'en',
        { hoverType: 'Line', hideHoverLine: true },
      );

      await hoverPlotCenter(page);

      await expect(locators.hoverLine(page)).toHaveCount(0);
      await expect(locators.hoveredTickText(page)).toHaveCount(0);
    });

    test('Verify hovering the axis area below the plot keeps the tooltip open', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@bar-chart'],
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

      await test.step('Hover the tick label zone below the value area', async () => {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height - 20);
      });

      await expect(locators.hoveredTickText(page)).toHaveCount(1);
    });

    (
      [
        ['no axis at all', { showXAxis: false, showYAxis: false }],
        ['only the Y axis', { showXAxis: false }],
      ] as const
    ).forEach(([name, axisProps]) => {
      test(`Verify hovering a chart with ${name} renders no pill and raises no error`, {
        tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@d3-chart',
          '@line-chart', '@checkbox'],
      }, async ({ page }) => {
        const pageErrors: string[] = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));

        await loadPage(page, LINE_CHART_EXAMPLE, 'en', { ...axisProps, duration: 0 });
        await locators.plot(page).first().waitFor({ state: 'visible' });

        await hoverPlotCenter(page);

        await expect(locators.hoveredTick(page)).toHaveCount(0);
        expect(pageErrors).toEqual([]);
      });
    });

    (['bottom', 'top'] as const).forEach((xPosition) => {
      test(`Verify the tick pill sits on the ${xPosition} side when the X axis is there`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart',
          '@bar-chart'],
      }, async ({ page }) => {
        await loadPage(page, GRID_AXIS_EXAMPLE, 'en', { xPosition, hoverType: 'line' });

        const plot = locators.plot(page).first();
        await plot.waitFor({ state: 'visible' });

        await hoverPlotCenter(page);

        const pill = locators.hoveredTick(page).first();
        await expect(pill).toHaveAttribute('position', xPosition);

        const plotBox = await plot.boundingBox();
        const pillBox = await pill.boundingBox();
        if (!plotBox || !pillBox) throw new Error('Bounding box not found');

        const plotCenterY = plotBox.y + plotBox.height / 2;
        const pillCenterY = pillBox.y + pillBox.height / 2;

        if (xPosition === 'top') {
          expect(pillCenterY).toBeLessThan(plotCenterY);
        } else {
          expect(pillCenterY).toBeGreaterThan(plotCenterY);
        }
      });
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
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      await expect(locators.diffUp(page)).toHaveCount(2);
      await expect(locators.diffDown(page)).toHaveCount(0);
      await expect(page.getByText('100%', { exact: true })).toBeVisible();
      await expect(page.getByText('33.3%', { exact: true })).toBeVisible();
    });

    test('Verify downward deltas render with the DiffDown icon', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');

      await test.step('Verify both deltas get the DiffDown icon', async () => {
        await expect(locators.diffDown(page)).toHaveCount(2);
        await expect(locators.diffUp(page)).toHaveCount(0);
      });

      await test.step('Verify values are printed without a minus sign', async () => {
        await expect(page.getByText('14.3%', { exact: true })).toBeVisible();
        await expect(page.getByText('60%', { exact: true })).toBeVisible();
        await expect(page.getByText('-14.3%', { exact: true })).toHaveCount(0);
      });
    });

    test('Verify the diff is green upwards, red downwards and muted when stable', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      const upward = await test.step('Read deltas on Jan 16, where both series grow', async () => {
        await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');
        return readTrendColours(page);
      });

      const downward = await test.step('Read deltas on Jan 31, where both series decline', async () => {
        await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');
        return readTrendColours(page);
      });

      const stable = await test.step('Read the stable delta on Jan 6, where line2 stays put', async () => {
        await hoverAreaPoint(page, 1, 'Saturday, January 6, 2024');
        return (await readTrendColours(page)).find((d) => d.trend === 'stable');
      });

      await test.step('Verify trends are classified', async () => {
        expect(upward.every((d) => d.trend === 'upward')).toBe(true);
        expect(downward.every((d) => d.trend === 'downward')).toBe(true);
        expect(stable).toBeDefined();
      });

      await test.step('Verify upward is green (oklch hue 90..200) and downward is red (hue < 60)', async () => {
        const hueOf = (color: string) => Number(color.match(/oklch\([\d.]+ [\d.]+ ([\d.]+)/)?.[1]);

        expect(hueOf(upward[0].color)).toBeGreaterThan(90);
        expect(hueOf(upward[0].color)).toBeLessThan(200);
        expect(hueOf(downward[0].color)).toBeLessThan(60);
      });

      await test.step('Verify a stable delta uses the tooltip secondary text colour', async () => {
        const titleColour = await readTooltipTitleColour(page);

        expect(stable!.color).toBe(titleColour);
        expect(stable!.color).not.toBe(upward[0].color);
        expect(stable!.color).not.toBe(downward[0].color);
      });
    });

    test('Verify deltaPercentGrowthColor=bad swaps the two trend colours', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart',
        '@area-chart',
        '@base-components',
        '@flex-box',
        '@checkbox'],
    }, async ({ page }) => {
      const readBothTrends = async (deltaPercentGrowthColor: 'good' | 'bad') => {
        await loadPage(page, AREA_CHART_EXAMPLE, 'en', { ...deltaProps, deltaPercentGrowthColor });

        await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');
        const upward = await readTrendColours(page);

        await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');
        const downward = await readTrendColours(page);

        return { upward, downward };
      };

      const good = await test.step('Read trend colours with deltaPercentGrowthColor=good', () => readBothTrends('good'));
      const bad = await test.step('Read trend colours with deltaPercentGrowthColor=bad', () => readBothTrends('bad'));

      await test.step('Verify trend directions are unchanged', async () => {
        expect(bad.upward.every((d) => d.trend === 'upward')).toBe(true);
        expect(bad.downward.every((d) => d.trend === 'downward')).toBe(true);
      });

      await test.step('Verify upward and downward colours are mirrored', async () => {
        expect(bad.upward[0].color).toBe(good.downward[0].color);
        expect(bad.downward[0].color).toBe(good.upward[0].color);
        expect(bad.upward[0].color).not.toBe(good.upward[0].color);
      });
    });

    test('Verify deltaPercentGrowthColor=bad keeps the icons and the printed values', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart',
        '@area-chart',
        '@base-components',
        '@flex-box',
        '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', {
        ...deltaProps,
        deltaPercentGrowthColor: 'bad',
      });

      await test.step('Verify upward deltas on Jan 16', async () => {
        await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

        await expect(locators.diffUp(page)).toHaveCount(2);
        await expect(locators.diffDown(page)).toHaveCount(0);
        await expect(page.getByText('100%', { exact: true })).toBeVisible();
        await expect(page.getByText('33.3%', { exact: true })).toBeVisible();
      });

      await test.step('Verify downward deltas on Jan 31 are printed without a minus sign', async () => {
        await hoverAreaPoint(page, 6, 'Wednesday, January 31, 2024');

        await expect(locators.diffDown(page)).toHaveCount(2);
        await expect(locators.diffUp(page)).toHaveCount(0);
        await expect(page.getByText('14.3%', { exact: true })).toBeVisible();
        await expect(page.getByText('-14.3%', { exact: true })).toHaveCount(0);
      });
    });

    test('Verify deltaPercentGrowthColor=bad leaves a stable delta muted', {
      tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@d3-chart',
        '@area-chart',
        '@base-components',
        '@flex-box',
        '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', {
        ...deltaProps,
        deltaPercentGrowthColor: 'bad',
      });

      const deltas = await test.step('Read deltas on Jan 6, where line grows and line2 stays put', async () => {
        await hoverAreaPoint(page, 1, 'Saturday, January 6, 2024');
        return readTrendColours(page);
      });
      const stable = deltas.find((d) => d.trend === 'stable');
      const upward = deltas.find((d) => d.trend === 'upward');

      expect(stable).toBeDefined();
      expect(upward).toBeDefined();
      expect(stable!.color).toBe(await readTooltipTitleColour(page));
      expect(stable!.color).not.toBe(upward!.color);
    });

    test('Verify how the diff handles extreme and awkward values', {
      tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@d3-chart', '@bar-chart'],
    }, async ({ page }) => {
      await loadPage(page, DELTA_EDGE_CASES_EXAMPLE, 'en', {});

      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });

      const box = await plot.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      await test.step('Hover the second band, which carries every case', async () => {
        await page.mouse.move(box.x + box.width * 0.72, box.y + box.height / 2);
        await expect(page.locator('[data-ui-name="HoverRect.Tooltip.Title"]')).toHaveText('after');
      });

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

      await test.step('Verify growth beyond 100% keeps its full value', async () => {
        expect(diffAfter('overHundred')).toMatchObject({ text: '400%', trend: 'upward' });
        expect(diffAfter('huge')).toMatchObject({ text: '9900%', trend: 'upward' });
      });

      await test.step('Verify fractions keep one decimal place', async () => {
        expect(diffAfter('fraction')).toMatchObject({ text: '0.5%', trend: 'upward' });
      });

      await test.step('Verify a move below 0.05% (10000 -> 10004) collapses into a stable 0%', async () => {
        expect(diffAfter('roundsToZero')).toMatchObject({ text: '0%', trend: 'stable' });
      });

      await test.step('Verify a negative baseline keeps the sign of the actual move (-10 -> -5 is upward 50%)', async () => {
        expect(diffAfter('negativeBase')).toMatchObject({ text: '50%', trend: 'upward' });
      });
    });

    test('Verify an unchanged value renders a stable delta without an icon', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await test.step('Hover Jan 6, where line grows and line2 stays at 3', async () => {
        await hoverAreaPoint(page, 1, 'Saturday, January 6, 2024');
      });

      await expect(locators.diffUp(page)).toHaveCount(1);
      await expect(locators.diffDown(page)).toHaveCount(0);
    });

    test('Verify the first data point renders no delta column', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', deltaProps);

      await hoverAreaPoint(page, 0, 'Monday, January 1, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
    });

    /**
     * Every row must fill all three columns even when its own delta is null, otherwise
     * CSS Grid pulls the next label into the hole.
     */
    test('Verify rows stay aligned when only some series have a delta', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', { ...deltaProps, withZeroValue: true });

      await test.step('Hover Jan 16, where line has no delta (previous value is 0) and line2 has one', async () => {
        await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');
      });

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
            firstColumnTexts: cells.filter((c) => c.x === firstColumnX).map((c) => c.text),
          };
        });

      await test.step('Verify the tooltip switches to three columns', async () => {
        expect(grid.columns).toBe(3);
      });

      await test.step('Verify every row fills all three cells', async () => {
        expect(grid.cellCount % grid.columns).toBe(0);
      });

      await test.step('Verify only the series labels sit in the first column', async () => {
        expect(grid.firstColumnTexts).toEqual(['line', 'line2']);
      });
    });

    test('Verify no delta is rendered when showDeltaPercentInTooltip is off', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', {
        ...deltaProps,
        showDeltaPercentInTooltip: false,
      });

      await hoverAreaPoint(page, 3, 'Tuesday, January 16, 2024');

      await expect(locators.diffUp(page).or(locators.diffDown(page))).toHaveCount(0);
    });
  });

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
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, LINE_CHART_EXAMPLE, 'en', { duration: 0 });

      await test.step('Verify the pill shows x=7 on hover', async () => {
        await hoverDot(page, '[data-ui-name="Line.Dots"]', 7);
        await expect(locators.hoveredTickText(page)).toHaveText('7');
      });

      await test.step('Verify the X axis does not label x=7', async () => {
        const labels = await readXAxisLabels(page);
        expect(labels).not.toContain('7');
      });
    });

    test('Verify HoverLine formats the value the same way the axis does', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@area-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, AREA_CHART_EXAMPLE, 'en', { duration: 0 });

      await test.step('Verify the pill shows Jan 21 on hover', async () => {
        await hoverDot(page, '[data-ui-name="Area.Dots"]', 4);
        await expect(locators.hoveredTickText(page)).toHaveText('Jan 21');
      });

      await test.step('Verify the X axis labels Jan 21 the same way', async () => {
        const labels = await readXAxisLabels(page);
        expect(labels).toContain('Jan 21');
      });
    });

    test('Verify HoverRect highlights the hovered category', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@bar-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);

      await test.step('Verify the hover trigger is a HoverRect', async () => {
        await expect(page.locator('[data-ui-name="Tooltip.Trigger"]').first()).toHaveJSProperty('tagName', 'rect');
      });

      await test.step('Verify the pill shows the hovered category', async () => {
        await expect(locators.hoveredTickText(page)).toHaveText('Category 2');
      });
    });
  });

  /**
   * `chart-palette-order-1` is a dark neutral that matches the inverted tooltip background,
   * so the 1px ring is the only thing separating the two.
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
            offset: lightnessOf(cs.boxShadow) - lightnessOf(cs.backgroundColor),
          };
        }),
      );

    test('Verify each dot is ringed by a lighter shade of its own colour', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, LINE_CHART_EXAMPLE, 'en', { duration: 0 });

      await hoverPlotCenter(page);
      await expect(page.locator('[class*="SDotCircle"]')).toHaveCount(2);

      const rings = await readDotRings(page);

      await test.step('Verify each dot has a 1px ring', async () => {
        rings.forEach((ring) => {
          expect(ring.shadow).toContain('0px 0px 0px 1px');
          expect(ring.shadow).not.toBe('none');
        });
      });

      await test.step('Verify the dark chart-palette-order-1 dot gets the stronger lightness offset', async () => {
        expect(rings[0].offset).toBeCloseTo(0.35, 2);
        expect(rings[1].offset).toBeCloseTo(0.15, 2);
      });
    });
  });

  test.describe('Tooltip default formatting', () => {
    test('Verify a Date group key is formatted through Intl for the given locale', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, TOOLTIP_DEFAULT_FORMAT_EXAMPLE, 'en', { locale: 'de' });

      await hoverPlotCenter(page);

      await expect(locators.tooltipTitle(page)).toHaveText('Freitag, 15. März 2024');
    });

    test('Verify the default date carries the full weekday and month and no time', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, TOOLTIP_DEFAULT_FORMAT_EXAMPLE, 'en');

      await hoverPlotCenter(page);

      const title = locators.tooltipTitle(page);
      await expect(title).toHaveText('Friday, March 15, 2024');

      await test.step('Verify the title is neither a numeric date nor has a time', async () => {
        await expect(title).not.toHaveText(/\d+\/\d+\/\d+/);
        await expect(title).not.toHaveText(/\d{1,2}:\d{2}/);
      });
    });

    const titleFormats: Array<[string, string]> = [
      ['off', 'Friday, March 15, 2024'],
      ['withoutWeekday', 'March 15, 2024'],
      ['short', 'Mar 15'],
      ['monthAndYear', 'March 2024'],
    ];

    for (const [titleFormat, expected] of titleFormats) {
      test(`Verify tooltipTitleFormatter renders the ${titleFormat} title`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
      }, async ({ page }) => {
        await loadPage(page, TOOLTIP_DEFAULT_FORMAT_EXAMPLE, 'en', { titleFormat });

        await hoverPlotCenter(page);

        await expect(locators.tooltipTitle(page)).toHaveText(expected);
      });
    }

    test('Verify tooltipTitleFormatter leaves the series values alone', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@line-chart', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, TOOLTIP_DEFAULT_FORMAT_EXAMPLE, 'en', { titleFormat: 'short' });

      await hoverPlotCenter(page);

      const tooltip = page.locator('[data-ui-name="HoverLine.Tooltip"]').first();
      await expect(locators.tooltipTitle(page)).toHaveText('Mar 15');

      await test.step('Verify values keep the built-in numeric formatting', async () => {
        await expect(tooltip).toContainText('3.1');
        await expect(tooltip).not.toContainText('1970');
      });
    });
  });
});
