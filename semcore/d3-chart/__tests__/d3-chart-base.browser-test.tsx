import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Chart Plot', () => {
  test('Verify Plot roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/d3-chart/plot-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const svgs = page.locator('svg');
    await test.step('Verify plot svg with aria-label attributes', async () => {
      const svg = svgs.first();
      const svgAttributes = [
        ['tabindex', '0'],
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
      // Находим первый foreignObject с data-aria-only
      const foreignObject = page.locator('foreignObject[data-aria-only="true"]').first();
      await expect(foreignObject).toBeVisible();
      const dialog = page.getByRole('dialog', { name: 'Last market trends with pattern data' });
      await expect(dialog).not.toBeVisible();
      // Переход по Tab к диалогу
      await page.keyboard.press('Tab');
      await expect(dialog).toBeVisible();

      // Получаем диалог (альтернативный текст в формате dialog role)
      await expect(dialog).toHaveAttribute('tabindex', '0');

      // Кнопка закрытия
      const closeButton = dialog.getByRole('button', { name: 'Close' });
      await expect(closeButton).toHaveAttribute('type', 'button');

      // Ссылка: Skip to content after plot
      const skipLink1 = dialog.getByRole('link', { name: 'Skip to content after plot' });
      await expect(skipLink1).toBeVisible();

      // Ссылка: Skip to plot data table
      const skipLink2 = dialog.getByRole('link', { name: 'Skip to plot data table' });
      await expect(skipLink2).toBeVisible();

      // Лейбл и summary
      const dataSummaryLabel = dialog.locator('label', { hasText: 'Data summary' });
      await expect(dataSummaryLabel).toBeVisible();

      const dataSummary = dialog.locator('[id$="-data-summary"]');
      await expect(dataSummary).toHaveAttribute('aria-busy', 'false');
      await expect(dataSummary).toContainText('text'); // Убеждаемся, что текст есть

      // Лейбл и таблица
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
        ['tabindex', '0'],
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

  test('Verify paddings and margins apply to the plot', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/paddings-&-margins.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const svg = page.locator('svg[data-ui-name="Plot"]');

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
      expect(styles.padding).toBe('0px'); // если не указано явно
      expect(styles.margin).toBe('0px'); // если не указано явно
      expect(styles.width).toBe('500px');
      expect(styles.height).toBe('300px');
    });
  });
});

test.describe('Axes and Grids', () => {
  test('Verify attributes of all <text> elements in the chart ', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/d3-chart/grid-axis-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

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

    const titles = svgs.nth(4).locator('[data-ui-name="Axis.Title"]');

    const count = await titles.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const title = titles.nth(i);

      await expect(title).toHaveAttribute('aria-hidden', 'true');

      const x1 = await title.getAttribute('x');
      const y1 = await title.getAttribute('y');

      expect(x1).not.toBeNull();
      expect(y1).not.toBeNull();
    }

    const grids = svgs.nth(4).locator('[data-ui-name="Axis.Grid"]');

    const count1 = await grids.count();
    expect(count1).toBeGreaterThan(0);

    for (let i = 0; i < count1; i++) {
      const grid = grids.nth(i);

      await expect(grid).toHaveAttribute('aria-hidden', 'true');

      const x1 = await grid.getAttribute('x1');
      const y1 = await grid.getAttribute('y1');

      expect(x1).not.toBeNull();
      expect(y1).not.toBeNull();
    }
  });
});

test.describe('Reference Lines', () => {
  test('Verify attributes reference lines ', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/d3-chart/reference-line-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const svgs = page.locator('svg');

    const referebceLines = svgs.first().locator('[data-ui-name="ReferenceLine"]');

    const referenceLine = await referebceLines.first();
    await expect(referenceLine).toHaveAttribute('aria-hidden', 'true');
    await expect(referenceLine).toHaveAttribute('title', 'Left data');

    const referebceTitles = svgs.first().locator('[data-ui-name="ReferenceLine.Title"]');

    const referenceTitle = await referebceTitles.first();
    await expect(referenceTitle).toHaveAttribute('aria-hidden', 'true');
    await expect(referenceTitle).toHaveAttribute('value', 'Category 0');

    const background = await svgs.first().locator('rect').nth(1);
    await expect(background).toHaveAttribute('aria-hidden', 'true');
    await expect(background).toHaveAttribute('value', 'Category 3');

    //add snapshot here!
  });
});

test.describe('Adaptive chart', () => {
  test('Verify chart looks good on small resolutions ', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/d3-chart/adaptive-зкщзы.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.setViewportSize({ width: 768, height: 1024 });

    //add snapshot here!

    await page.setViewportSize({ width: 375, height: 667 });
    //add snapshot here!
  });
});

test.describe('Hover Line and Tooltip', () => {
  test('Verify Tooltip and Hover Line appearing and styles by hover ', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/d3-chart/tooltip-and-hover-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(100);

    const dots = page.locator('[data-ui-name="Line.Dots"]');
    dots.nth(3).hover();
    await page.waitForTimeout(100);
  });

  test('Verify Tooltip controlled appering', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/tooltip-control.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);

    const dots = page.locator('[data-ui-name="Line.Dots"]');
    const text = page.getByText('This tooltip is under your control!');

    await expect(text).not.toBeVisible();
    dots.first().hover();
    await expect(text).toHaveCount(1);
  });

  test('Verify synscronous charts by EventEmitter', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/synchronous-charts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);

    const dots = page.locator('[data-ui-name="Line.Dots"]');
    const bars = page.locator('[data-ui-name="Bar"]');

    dots.first().hover();
    //snapshot

    bars.nth(3).hover();
    //snapshot
  });
});

test.describe('Pattern fills, dots and lines', () => {
  test('Verify pattern styles and functionality ', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const patterns = page.locator('pattern');

    const count = await patterns.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const pattern = patterns.nth(i);

      await expect(pattern).toHaveAttribute('patternUnits', 'userSpaceOnUse');
      await expect(pattern).toHaveAttribute('width', '12');
      await expect(pattern).toHaveAttribute('height', '12');
      await expect(pattern).toHaveAttribute('x', '0');
      await expect(pattern).toHaveAttribute('y', '0');
    }
    //add snapshot here!

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const count2 = await patterns.count();
    expect(count2).toBe(2);

    //add snapshot here!
  });

  test('Verify enforcing patternd', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/enforcing-patterns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const svg = await page.locator('svg[data-ui-name="Plot"]');

    // Ждём появления SVG на странице
    await expect(svg).toBeVisible();

    // Получаем размеры SVG
    const box = await svg.boundingBox();
    if (!box) throw new Error('SVG bounding box not found');

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // Наводим курсор в центр SVG
    await page.mouse.move(centerX, centerY);
    //add snapshot here!
  });

  test('Verify custom patterns', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/custom-patterns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //add snapshot here!
  });

  test('Verify low level component use', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/d3-chart/low-level-components-use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //add snapshot here!
  });
});
