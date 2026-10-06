import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  legendFlex: (page: Page) => page.locator('[data-ui-name="LegendFlex"]'),
  legendTable: (page: Page) => page.locator('[data-ui-name="LegendTable"]'),
  flexItem: (page: Page, index?: number) => {
    const base = page.locator('div[data-ui-name="LegendFlex.LegendItem"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tableItem: (page: Page, index?: number) => {
    const base = page.locator('div[data-ui-name="LegendTable.LegendItem"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tableColumn: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="LegendTable.Column"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  checkboxInput: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Checkbox.Value"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  checkboxMark: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Value.CheckMark"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dimmed: (page: Page) => page.locator('[class*="_transparent_"]'),
  metricLink: (page: Page) => page.locator('[data-ui-name="Metric"] a'),
};

const FLEX_EXAMPLE = 'stories/components/d3-chart/tests/examples/chart-legend/customizable_legend.tsx';
const TABLE_EXAMPLE = 'stories/components/d3-chart/tests/examples/chart-legend/legend-table-data.tsx';
const METRICS_EXAMPLE = 'stories/components/d3-chart/tests/examples/chart-legend/legend-with-metrics.tsx';

/**
 * Pairwise set for LegendFlex.
 *
 * Factors: shape (Checkbox|Circle|Pattern), addon (none|trend|suffix),
 * size (m|l), direction (row|column), patterns (false|true),
 * highlightedItem (-1|0).
 */
const flexPairwiseCases = [
  {
    name: '#1 Checkbox, no addon, m, row, no patterns, no highlight',
    props: { shape: 'Checkbox', size: 'm', direction: 'row', patterns: false, highlightedItem: -1 },
  },
  {
    name: '#2 Checkbox, trend, l, column, patterns, highlight 0',
    props: { shape: 'Checkbox', size: 'l', direction: 'column', patterns: true, highlightedItem: 0, withTrend: true },
  },
  {
    name: '#3 Checkbox, suffix, m, column, patterns, no highlight',
    props: { shape: 'Checkbox', size: 'm', direction: 'column', patterns: true, highlightedItem: -1, withSuffix: true },
  },
  {
    name: '#4 Circle, no addon, l, column, no patterns, highlight 0',
    props: { shape: 'Circle', size: 'l', direction: 'column', patterns: false, highlightedItem: 0 },
  },
  {
    name: '#5 Circle, trend, m, row, patterns, no highlight',
    props: { shape: 'Circle', size: 'm', direction: 'row', patterns: true, highlightedItem: -1, withTrend: true },
  },
  {
    name: '#6 Circle, suffix, l, row, no patterns, highlight 0',
    props: { shape: 'Circle', size: 'l', direction: 'row', patterns: false, highlightedItem: 0, withSuffix: true },
  },
  {
    name: '#7 Pattern, no addon, m, column, patterns, highlight 0',
    props: { shape: 'Pattern', size: 'm', direction: 'column', patterns: true, highlightedItem: 0 },
  },
  {
    name: '#8 Pattern, trend, l, row, no patterns, no highlight',
    props: { shape: 'Pattern', size: 'l', direction: 'row', patterns: false, highlightedItem: -1, withTrend: true },
  },
  {
    name: '#9 Pattern, suffix, m, row, patterns, highlight 0',
    props: { shape: 'Pattern', size: 'm', direction: 'row', patterns: true, highlightedItem: 0, withSuffix: true },
  },
];

/**
 * Pairwise set for LegendTable.
 *
 * Factors: size (m|l), highlightedItem (-1|0), columnsCount (1|2), width (185|300).
 */
const tablePairwiseCases = [
  {
    name: '#1 m, no highlight, 1 column, narrow',
    props: { size: 'm', highlightedItem: -1, columnsCount: 1, w: 185 },
  },
  {
    name: '#2 m, highlight 0, 2 columns, wide',
    props: { size: 'm', highlightedItem: 0, columnsCount: 2, w: 300 },
  },
  {
    name: '#3 l, no highlight, 2 columns, wide',
    props: { size: 'l', highlightedItem: -1, columnsCount: 2, w: 300 },
  },
  {
    name: '#4 l, highlight 0, 1 column, wide',
    props: { size: 'l', highlightedItem: 0, columnsCount: 1, w: 300 },
  },
  {
    name: '#5 l, highlight 0, 2 columns, narrow',
    props: { size: 'l', highlightedItem: 0, columnsCount: 2, w: 185 },
  },
];

/**
 * Pairwise set for the legend with metrics.
 *
 * Factors: diffIcon (none|up|down|mixed), diffUse (good|bad|neutral|mixed),
 * metricLink (none|single|all), metricsPerItem (1|2), size (m|l).
 */
const metricsPairwiseCases = [
  {
    name: '#1 icon none, good, link none, 1 per item, m',
    props: { diffIcon: 'none', diffUse: 'good', metricLink: 'none', metricsPerItem: 1, legendProps: { size: 'm' } },
  },
  {
    name: '#2 icon none, bad, link single, 2 per item, l',
    props: { diffIcon: 'none', diffUse: 'bad', metricLink: 'single', metricsPerItem: 2, legendProps: { size: 'l' } },
  },
  {
    name: '#3 icon none, neutral, link all, 1 per item, m',
    props: { diffIcon: 'none', diffUse: 'neutral', metricLink: 'all', metricsPerItem: 1, legendProps: { size: 'm' } },
  },
  {
    name: '#4 icon none, mixed, link none, 2 per item, l',
    props: { diffIcon: 'none', diffUse: 'mixed', metricLink: 'none', metricsPerItem: 2, legendProps: { size: 'l' } },
  },
  {
    name: '#5 icon up, good, link single, 2 per item, m',
    props: { diffIcon: 'up', diffUse: 'good', metricLink: 'single', metricsPerItem: 2, legendProps: { size: 'm' } },
  },
  {
    name: '#6 icon up, bad, link all, 1 per item, l',
    props: { diffIcon: 'up', diffUse: 'bad', metricLink: 'all', metricsPerItem: 1, legendProps: { size: 'l' } },
  },
  {
    name: '#7 icon up, neutral, link none, 2 per item, m',
    props: { diffIcon: 'up', diffUse: 'neutral', metricLink: 'none', metricsPerItem: 2, legendProps: { size: 'm' } },
  },
  {
    name: '#8 icon up, mixed, link single, 1 per item, l',
    props: { diffIcon: 'up', diffUse: 'mixed', metricLink: 'single', metricsPerItem: 1, legendProps: { size: 'l' } },
  },
  {
    name: '#9 icon down, good, link all, 1 per item, l',
    props: { diffIcon: 'down', diffUse: 'good', metricLink: 'all', metricsPerItem: 1, legendProps: { size: 'l' } },
  },
  {
    name: '#10 icon down, bad, link none, 2 per item, m',
    props: { diffIcon: 'down', diffUse: 'bad', metricLink: 'none', metricsPerItem: 2, legendProps: { size: 'm' } },
  },
  {
    name: '#11 icon down, neutral, link single, 1 per item, l',
    props: { diffIcon: 'down', diffUse: 'neutral', metricLink: 'single', metricsPerItem: 1, legendProps: { size: 'l' } },
  },
  {
    name: '#12 icon down, mixed, link all, 2 per item, m',
    props: { diffIcon: 'down', diffUse: 'mixed', metricLink: 'all', metricsPerItem: 2, legendProps: { size: 'm' } },
  },
  {
    name: '#13 icon mixed, good, link none, 2 per item, l',
    props: { diffIcon: 'mixed', diffUse: 'good', metricLink: 'none', metricsPerItem: 2, legendProps: { size: 'l' } },
  },
  {
    name: '#14 icon mixed, bad, link single, 1 per item, m',
    props: { diffIcon: 'mixed', diffUse: 'bad', metricLink: 'single', metricsPerItem: 1, legendProps: { size: 'm' } },
  },
  {
    name: '#15 icon mixed, neutral, link all, 2 per item, l',
    props: { diffIcon: 'mixed', diffUse: 'neutral', metricLink: 'all', metricsPerItem: 2, legendProps: { size: 'l' } },
  },
  {
    name: '#16 icon mixed, mixed, link none, 1 per item, m',
    props: { diffIcon: 'mixed', diffUse: 'mixed', metricLink: 'none', metricsPerItem: 1, legendProps: { size: 'm' } },
  },
];

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('LegendFlex', () => {
    flexPairwiseCases.forEach((c) => {
      test(`Verify pairwise ${c.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
      }, async ({ page }) => {
        await loadPage(page, FLEX_EXAMPLE, 'en', c.props);

        await locators.legendFlex(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('LegendTable', () => {
    tablePairwiseCases.forEach((c) => {
      test(`Verify pairwise ${c.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
      }, async ({ page }) => {
        await loadPage(page, TABLE_EXAMPLE, 'en', c.props);

        await locators.legendTable(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Legend with metrics', () => {
    metricsPairwiseCases.forEach((c) => {
      test(`Verify pairwise ${c.name}`, {
        tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend', '@link'],
      }, async ({ page }) => {
        await loadPage(page, METRICS_EXAMPLE, 'en', c.props);

        await locators.legendTable(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    [
      { name: 'empty diffValue', props: { diffValue: '' } },
      { name: 'long diffValue', props: { diffValue: '+1 234 567 890%', metricsPerItem: 2 } },
      { name: 'patterns', props: { patterns: true } },
    ].forEach((c) => {
      test(`Verify boundary ${c.name}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend', '@link'],
      }, async ({ page }) => {
        await loadPage(page, METRICS_EXAMPLE, 'en', c.props);

        await locators.legendTable(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify a hovered metric row keeps the other rows dimmed', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart', '@chart-legend', '@link'],
    }, async ({ page }) => {
      await loadPage(page, METRICS_EXAMPLE, 'en', { metricsPerItem: 2 });

      await locators.tableColumn(page, 0).hover();
      await expect(locators.tableColumn(page, 2)).toHaveClass(/_transparent_/);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Custom rendering', () => {
    test('Verify custom shape as legend item', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/custom-shape-as-legenditem.tsx', 'en');

      await expect(page).toHaveScreenshot();
    });

    test('Verify legend table view', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/table-view.tsx', 'en');

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
  test.describe('LegendFlex', () => {
    test('Verify checkbox roles and attributes', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { shape: 'Checkbox' });

      await expectEachToHaveAttribute(locators.checkboxInput(page), 'aria-invalid', 'false');
    });

    test('Verify an item is toggled by its checkbox and by its label', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { shape: 'Checkbox' });

      const first = locators.checkboxInput(page, 0);
      await expect(first).toBeChecked();

      await test.step('Uncheck through the checkbox', async () => {
        await locators.checkboxMark(page, 0).click();
        await expect(first).not.toBeChecked();
      });

      await test.step('Check back through the label', async () => {
        await page.locator('span[data-ui-name="LegendFlex.LegendItem"]').first().click();
        await expect(first).toBeChecked();
      });
    });

    (['Circle', 'Pattern'] as const).forEach((shape) => {
      test(`Verify ${shape} shape renders no checkbox`, {
        tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
      }, async ({ page }) => {
        await loadPage(page, FLEX_EXAMPLE, 'en', { shape, patterns: shape === 'Pattern' });

        await locators.legendFlex(page).waitFor({ state: 'visible' });
        await expect(locators.checkboxInput(page)).toHaveCount(0);
      });
    });

    test('Verify highlightedItem dims every other item', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { highlightedItem: 0 });

      const items = locators.flexItem(page);
      const total = await items.count();
      expect(total).toBeGreaterThan(1);

      await expect(items.nth(0)).not.toHaveClass(/_transparent_/);
      for (let i = 1; i < total; i++) {
        await expect(items.nth(i)).toHaveClass(/_transparent_/);
      }
    });

    test('Verify nothing is dimmed when highlightedItem is -1', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { highlightedItem: -1 });

      await locators.legendFlex(page).waitFor({ state: 'visible' });
      await expect(locators.dimmed(page)).toHaveCount(0);
    });

    test('Verify the trend item renders next to the legend items', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { withTrend: true, trendLabel: 'Trend line' });

      await expect(page.getByText('Trend line')).toBeVisible();
    });

    test('Verify the suffix renders after the legend items', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, FLEX_EXAMPLE, 'en', { withSuffix: true });

      await expect(page.getByText('Suffix')).toBeVisible();
    });
  });

  test.describe('LegendTable', () => {
    test('Verify the design data renders in both columns', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, TABLE_EXAMPLE, 'en', { columnsCount: 2 });

      await expect(locators.tableColumn(page)).toHaveCount(12);
      await expect(locators.tableColumn(page, 0)).toHaveText('8%');
      await expect(locators.tableColumn(page, 1)).toHaveText('6.3K');
      await expect(page.getByText('Other data')).toBeVisible();
    });

    test('Verify a single value column renders one cell per row', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, TABLE_EXAMPLE, 'en', { columnsCount: 1 });

      await expect(locators.tableColumn(page)).toHaveCount(6);
      await expect(locators.tableColumn(page, 0)).toHaveText('6.3K');
    });

    test('Verify a row is toggled by its checkbox', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, TABLE_EXAMPLE, 'en', {});

      const first = locators.checkboxInput(page, 0);
      await expect(first).toBeChecked();

      await locators.checkboxMark(page, 0).click();
      await expect(first).not.toBeChecked();
    });

    test('Verify highlightedItem dims every other row label', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, TABLE_EXAMPLE, 'en', { highlightedItem: 0 });

      const items = locators.tableItem(page);
      const total = await items.count();
      expect(total).toBeGreaterThan(1);

      await expect(items.nth(0)).not.toHaveClass(/_transparent_/);
      for (let i = 1; i < total; i++) {
        await expect(items.nth(i)).toHaveClass(/_transparent_/);
      }
    });

    test('Verify the value columns of a dimmed row are dimmed as well', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, TABLE_EXAMPLE, 'en', { highlightedItem: 0, columnsCount: 2 });

      // Row 1 is dimmed, so both of its value cells (index 2 and 3) are dimmed too.
      await expect(locators.tableColumn(page, 2)).toHaveClass(/_transparent_/);
      await expect(locators.tableColumn(page, 3)).toHaveClass(/_transparent_/);

      // The highlighted row stays fully opaque.
      await expect(locators.tableColumn(page, 0)).not.toHaveClass(/_transparent_/);
      await expect(locators.tableColumn(page, 1)).not.toHaveClass(/_transparent_/);
    });

    test('Verify the columns grid has a track per value column', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      for (const columnsCount of [1, 2]) {
        await loadPage(page, TABLE_EXAMPLE, 'en', { columnsCount });

        const tracks = await locators.legendTable(page).evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        expect(tracks).toBe(columnsCount + 1);
      }
    });
  });

  test.describe('Legend with metrics', () => {
    test('Verify the rows grid has a track per metric', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      for (const metricsPerItem of [1, 2]) {
        await loadPage(page, METRICS_EXAMPLE, 'en', { metricsPerItem });

        const table = locators.legendTable(page);
        await expect(table).toHaveCSS('grid-auto-flow', 'column');

        const tracks = await table.evaluate((el) => getComputedStyle(el).gridTemplateRows.split(' ').length);
        expect(tracks).toBe(metricsPerItem + 1);
      }
    });

    test('Verify the metric link is reachable from the keyboard', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@d3-chart', '@chart-legend', '@link'],
    }, async ({ page }) => {
      await loadPage(page, METRICS_EXAMPLE, 'en', { metricLink: 'single' });

      const link = locators.metricLink(page);
      await expect(link).toHaveCount(1);

      // Checkboxes and the chart summary button come first in the tab order.
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        if (await link.evaluate((el) => el === document.activeElement)) break;
      }

      await expect(link).toBeFocused();
    });

    test('Verify the metric cells use a pointer cursor', {
      tag: [TAG.PRIORITY_LOW, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, METRICS_EXAMPLE, 'en', {});

      await expect(locators.tableColumn(page)).not.toHaveCount(0);
      const cursors = await locators.tableColumn(page).evaluateAll((els) => els.map((el) => getComputedStyle(el).cursor));
      expect(cursors).toEqual(cursors.map(() => 'pointer'));
    });

    test('Verify hovering a metric cell dims the other rows', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@d3-chart', '@chart-legend'],
    }, async ({ page }) => {
      await loadPage(page, METRICS_EXAMPLE, 'en', { metricsPerItem: 1 });

      await test.step('Hover the metric of the first row', async () => {
        await locators.tableColumn(page, 0).hover();

        await expect(locators.tableColumn(page, 0)).not.toHaveClass(/_transparent_/);
        await expect(locators.tableColumn(page, 1)).toHaveClass(/_transparent_/);
        await expect(locators.tableColumn(page, 2)).toHaveClass(/_transparent_/);
        await expect(locators.tableItem(page, 1)).toHaveClass(/_transparent_/);
      });

      await test.step('Move the pointer away', async () => {
        await page.mouse.move(0, 0);

        await expect(locators.dimmed(page)).toHaveCount(0);
      });
    });
  });
});
