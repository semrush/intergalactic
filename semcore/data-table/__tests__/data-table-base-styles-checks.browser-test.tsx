import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function getColumnWidth(page: any, colIndex: any) {
  const column = await page.locator(`[aria-colindex="${colIndex}"][role="columnheader"]`);
  const box = await column.boundingBox();
  return box ? box.width : 0;
}

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('Base styles Primary Table', () => {
  test('Verify styles when no interactive elements in header', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

    await checkStyles(keywordHeader, {
      'font-size': '12px',
      'line-height': 'normal',
      color: 'rgb(25, 27, 35)',
      padding: '12px',
      'background-color': 'rgb(244, 245, 249)',
      'border-bottom': '1px solid rgb(224, 225, 233)',
    });

    await keywordHeader.hover();
    if (browserName !== 'firefox')
      await expect(keywordHeader).toHaveCSS('background-color', 'rgb(244, 245, 249)');

    await checkStyles(firstCell, {
      'font-size': '14px',
      'border-bottom': '1px solid rgb(224, 225, 233)',
      color: 'rgb(25, 27, 35)',
      'background-color': 'rgb(255, 255, 255)',
      padding: '12px',
      'min-height': '45px',
    });

    await firstCell.hover();
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
  });

  test('Verify padding when sideIndent l is set', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/advanced/examples/side-indents.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    const cellsFirstColumn = page.locator('[aria-colindex="1"]');
    const cellsMiddleColumn = page.locator('[aria-colindex="3"]');
    const cellsMLastColumn = page.locator('[aria-colindex="5"]');

    const count1 = await cellsFirstColumn.count();
    for (let i = 0; i < count1; i++) {
      await checkStyles(cellsFirstColumn.nth(i), {
        padding: '12px 12px 12px 20px',
      });
    }

    const count2 = await cellsMiddleColumn.count();
    for (let i = 0; i < count2; i++) {
      await checkStyles(cellsMiddleColumn.nth(i), {
        padding: '12px',
      });
    }
    const count3 = await cellsMLastColumn.count();
    for (let i = 0; i < count3; i++) {
      await checkStyles(cellsMLastColumn.nth(i), {
        padding: '12px 20px 12px 12px',
      });
    }
  });

  test('Verify styles when long text and icons in header', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/header-content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const amazonIcon = page.getByLabel('AmazonM non interactive').nth(1);
    await amazonIcon.hover();
    await page.waitForTimeout(100);

    await expect(page.getByText('AmazonM non interactive')).toHaveCount(1);

    await page.locator('[data-ui-name="Ellipsis"]').hover();
    await page.waitForTimeout(100);
    await expect(page.getByRole('tooltip', { name: 'Difficulty Difficulty' })).toHaveCount(1);

    const elements = page.locator('[data-ui-name="Head.Column"]');
    for (const element of await elements.all()) {
      const alignItems = await element.evaluate((el) => window.getComputedStyle(el).alignItems);
      expect(alignItems).toBe('flex-start');
    }
  });

  test('Verify styles of Compact table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
    const firstCell = page.getByRole('gridcell').first();

    await checkStyles(keywordHeader, {
      'font-size': '12px',
      'line-height': 'normal',
      color: 'rgb(25, 27, 35)',
      padding: '12px 8px',
      'background-color': 'rgb(244, 245, 249)',
      'border-bottom': '1px solid rgb(224, 225, 233)',
    });

    await checkStyles(firstCell, {
      'font-size': '14px',
      'border-bottom': '1px solid rgb(224, 225, 233)',
      'background-color': 'rgb(255, 255, 255)',
      color: 'rgb(25, 27, 35)',
      padding: '12px 8px',
    });

    await firstCell.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify styles of sorting button', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
    await expect(buttonLink1).toHaveCSS('margin-left', '4px');
    await page.keyboard.press('Tab');
    await expect(buttonLink1).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');
    await expect(buttonLink1).toHaveCSS('margin-left', '4px');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Column width by default - auto', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));

    expect(widths[1]).toBeLessThan(widths[0]);
    expect(widths[2]).toBeLessThan(widths[0]);
    expect(widths[1]).toBeLessThan(widths[4]);
    expect(widths[2]).toBeLessThan(widths[4]);
  });

  test('Verify Column width when 1fr', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/table-with-1tf-and diff-elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));

    expect(widths[0]).toBeLessThanOrEqual(widths[1]);
    expect(widths[0]).toBeCloseTo(widths[2], 1);
    expect(widths[1]).toBeLessThanOrEqual(widths[4]);
    expect(widths[1]).toBeLessThanOrEqual(widths[3]);
  });
});

test.describe('Base styles Secondary Table', () => {
  test('Verify Keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    await page.keyboard.press('Tab');

    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

    await expect(firstCell).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');

    const secondCell = page.locator('[role="gridcell"][aria-colindex="2"]').first();
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    const secondCellSecondRow = page.locator('[role="gridcell"][aria-colindex="2"]').nth(1);
    await expect(secondCellSecondRow).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(secondCell).not.toBeFocused();

    if (browserName === 'firefox') return;
    await page.keyboard.press('Shift+Tab');
    await expect(secondCellSecondRow).toBeFocused();
  });

  test('Verify Secondary styles', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

    await checkStyles(keywordHeader, {
      'font-size': '12px',
      'line-height': 'normal',
      color: 'rgb(25, 27, 35)',
      padding: '8px',
      'background-color': 'rgb(255, 255, 255)',
      'border-bottom': '1px solid rgb(169, 171, 182)',
    });

    await keywordHeader.hover();
    if (browserName !== 'firefox')
      await expect(keywordHeader).toHaveCSS('background-color', 'rgb(255, 255, 255)');

    await checkStyles(firstCell, {
      'font-size': '14px',
      'border-bottom': '1px solid rgb(224, 225, 233)',
      color: 'rgb(25, 27, 35)',
      'background-color': 'rgb(255, 255, 255)',
      padding: '8px',
    });

    await firstCell.hover();
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
  });

  test('Verify Secondary padding when sideIndent l is set', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/secondary-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    const cellsFirstColumn = page.locator('[aria-colindex="1"]');
    const cellsMiddleColumn = page.locator('[aria-colindex="3"]');
    const cellsMLastColumn = page.locator('[aria-colindex="5"]');

    const count1 = await cellsFirstColumn.count();
    for (let i = 0; i < count1; i++) {
      await checkStyles(cellsFirstColumn.nth(i), {
        padding: '8px 8px 8px 20px',
      });
    }

    const count2 = await cellsMiddleColumn.count();
    for (let i = 0; i < count2; i++) {
      await checkStyles(cellsMiddleColumn.nth(i), {
        padding: '8px',
      });
    }
    const count3 = await cellsMLastColumn.count();
    for (let i = 0; i < count3; i++) {
      await checkStyles(cellsMLastColumn.nth(i), {
        padding: '8px 20px 8px 8px',
      });
    }
  });

  test('Verify styles when long text and icons in header', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/secondary-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const Icon = page.getByLabel('WhatsApp icon').first();
    await Icon.hover();

    await expect(page.getByText('WhatsApp icon')).toHaveCount(1);

    await page.locator('[data-ui-name="Ellipsis"]').hover();
    await expect(page.getByRole('tooltip', { name: 'Difficulty' })).toHaveCount(1);

    const elements = page.locator('[data-ui-name="Head.Column"]');
    for (const element of await elements.all()) {
      const alignItems = await element.evaluate((el) => window.getComputedStyle(el).alignItems);
      expect(alignItems).toBe('flex-start');
    }
  });

  test('Verify sorting icon style and interactions ', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/secondary-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
    const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
    await column1.hover();
    if (browserName !== 'firefox')
      await expect(column1).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(buttonLink1).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await buttonLink1.hover();
    if (browserName !== 'firefox')
      await expect(column1).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(buttonLink1).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
    await expect(buttonLink1).toBeFocused();
  });

  test('Verify Column width by default - auto', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

    expect(widths[1]).toBeLessThan(widths[0]);
    expect(widths[1]).toBeCloseTo(widths[2], 1);
    expect(widths[2]).toBeLessThan(widths[3]);
  });

  test('Verify Column width when 1fr', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/secondary-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

    expect(widths[0]).toEqual(widths[1]);
    expect(widths[1]).toEqual(widths[2]);
    expect(widths[2]).toEqual(widths[3]);
  });
});
