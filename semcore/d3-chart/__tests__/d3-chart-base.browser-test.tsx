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
  legendItem: (page: Page, text?: string, index?: number) => {
    const base = text ? page.getByText(text) : page.locator('[data-ui-name="LegendFlex.LegendItem"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legendFlex: (page: Page) => page.locator('[data-ui-name="LegendFlex"]'),
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

  test.describe('Adaptive chart', () => {
    test('Verify chart looks good on small resolutions', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/adaptive-chart.tsx', 'en');

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
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@d3-chart'],
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

  test.describe('Chart legend', () => {
    const legendPropsCombinations = [
      {
        description: ' size M, Checkbox shape',
        size: 'm',
        shape: 'Checkbox',
      },
      {
        description: ' size L, Checkbox shape',
        size: 'l',
        shape: 'Checkbox',
      },
      {
        description: ' size M, Circle shape',
        size: 'm',
        shape: 'Circle',
      },
      {
        description: ' size L, Circle shape',
        size: 'l',
        shape: 'Circle',
      },
      {
        description: ' size M, Square shape',
        size: 'm',
        shape: 'Square',
      },
      {
        description: ' size L, Square shape',
        size: 'l',
        shape: 'Square',
      },
      {
        description: ' size M, Line shape',
        size: 'm',
        shape: 'Line',
      },
      {
        description: ' size L, Line shape',
        size: 'l',
        shape: 'Line',
      },
      {
        description: ' size M, Pattern shape',
        size: 'm',
        shape: 'Pattern',
      },
      {
        description: ' size L, Pattern shape',
        size: 'l',
        shape: 'Pattern',
      },
    ];

    legendPropsCombinations.forEach((props) => {
      test(`Verify legend with ${props.description}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@d3-chart', '@chart-legend'],
      }, async ({ page }) => {
        await loadPage(
          page,
          'stories/components/d3-chart/tests/examples/chart-legend/customizable_legend.tsx',
          'en',
          props,
        );

        await test.step('Verify legend renders correctly', async () => {
          await locators.legendFlex(page).waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });

    test('Verify custom shape as leged item', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/custom-shape-as-legenditem.tsx', 'en');
      await expect(page).toHaveScreenshot();
    });

    test('Verify leged table view', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
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
    test('Verify attributes of all <text> elements in the chart ', {
      tag: [TAG.PRIORITY_HIGH, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/d3-chart/grid-axis-props.tsx', 'en');

      const svgs = page.locator('svg');
      for (let i = 0; i < 2; i++) {
        const svg = svgs.nth(i);
        const lines = svg.locator('text');

        const count = await lines.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const line = lines.nth(i);

          await expect(line).toHaveAttribute('aria-hidden', 'true');
          await expect(line).toHaveAttribute('data-ui-name', 'Axis.Ticks');

          const x = await line.getAttribute('x');
          const y = await line.getAttribute('y');

          expect(x).not.toBeNull();
          expect(y).not.toBeNull();
        }
      }

      for (let i = 0; i < 1; i++) {
        const svg = svgs.nth(i);
        const lines = svg.locator('line');

        const count = await lines.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const line = lines.nth(i);

          await expect(line).toHaveAttribute('aria-hidden', 'true');
          await expect(line).toHaveAttribute('data-ui-name', 'Axis');

          const x1 = await line.getAttribute('x1');
          const y1 = await line.getAttribute('y1');

          expect(x1).not.toBeNull();
          expect(y1).not.toBeNull();
        }
      }

      const svg4 = svgs.nth(4);
      const titleCount = await svg4.locator('[data-ui-name="Axis.Title"]').count();
      expect(titleCount).toBeGreaterThan(0);

      for (let i = 0; i < titleCount; i++) {
        const title = locators.axisTitle(page, i);

        await expect(title).toHaveAttribute('aria-hidden', 'true');

        const x1 = await title.getAttribute('x');
        const y1 = await title.getAttribute('y');

        expect(x1).not.toBeNull();
        expect(y1).not.toBeNull();
      }

      const gridCount = await svg4.locator('[data-ui-name="Axis.Grid"]').count();
      expect(gridCount).toBeGreaterThan(0);

      for (let i = 0; i < gridCount; i++) {
        const grid = locators.axisGrid(page, i);

        await expect(grid).toHaveAttribute('aria-hidden', 'true');

        const x1 = await grid.getAttribute('x1');
        const y1 = await grid.getAttribute('y1');

        expect(x1).not.toBeNull();
        expect(y1).not.toBeNull();
      }
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
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');

      const dotsCount = await locators.lineDots(page).count();
      expect(dotsCount).toBeGreaterThan(0);

      for (let i = 0; i < dotsCount; i++) {
        const dot = locators.lineDots(page, i);
        const radius = await dot.getAttribute('r');
        expect(radius).not.toBeNull();
        expect(Number(radius)).toBeCloseTo(4, 1);
      }
    });
  });

  test.describe('Chart legend', () => {
    test('Verify checkbox roles and attributes', {
      tag: [TAG.PRIORITY_MEDIUM, '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/chart-legend/customizable_legend.tsx', 'en');

      const checkboxes = page.locator('[data-ui-name="LegendFlex.LegendItem"][shape="Checkbox"]');
      const checkboxesInputs = checkboxes.locator('input');
      const inputsCount = await checkboxesInputs.count();
      expect(inputsCount).toBeGreaterThan(0);

      for (let i = 0; i < inputsCount; i++) {
        const checkboxInput = checkboxesInputs.nth(i);
        await expect(checkboxInput).toHaveAttribute('aria-invalid', 'false');
      }
    });
  });
});
