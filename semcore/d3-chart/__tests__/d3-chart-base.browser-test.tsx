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

test.describe('Chart grid', () => {
  test('Should skip focusable elements in collapsed items even with preserveNode prop', async ({
    page,
  }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 1' })).toBeFocused();
    const subsection = page.getByText('Hello section');
    await expect(subsection).toHaveCount(3);

    // to the link in first item
    await page.keyboard.press('Tab');
    // to the third toggle item (skip the link in the second item)
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 3' })).toBeFocused();
  });
});
