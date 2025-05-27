import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function getColumnWidth(page: any, colIndex: any) {
  const column = await page.locator(`[aria-colindex="${colIndex}"][role="columnheader"]`);
  const box = await column.boundingBox();
  return box ? box.width : 0;
}

test.describe('Columns', () => {
  test('Verify alingnment props', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/rows-columns-tests/column-alignment.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const checkAlignment = async (columnIndex: any, justifyContent: any, alignItems: any) => {
      const headerCell = page.locator(
        `[data-ui-name="Head.Column"][aria-colindex="${columnIndex}"]`,
      );

      if (justifyContent) {
        const justify = await headerCell.evaluate(
          (el) => window.getComputedStyle(el).justifyContent,
        );
        expect(justify).toBe(justifyContent);
      }

      if (alignItems) {
        const align = await headerCell.evaluate((el) => window.getComputedStyle(el).alignItems);
        expect(align).toBe(alignItems);
      }
    };

    await checkAlignment(2, 'center', null);
    await checkAlignment(3, 'flex-start', null);
    await checkAlignment(4, 'flex-end', null);

    await checkAlignment(5, null, 'center');
    await checkAlignment(6, null, 'flex-end');
    await checkAlignment(7, null, 'flex-start');

    await expect(page).toHaveScreenshot();
    await expect(page).toHaveScreenshot();
  });

  test('Verify column width - static and based on content', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/rows-columns-tests/column-expand.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const getWidths = async (viewportWidth: any) => {
      await page.setViewportSize({ width: viewportWidth, height: 800 });
      const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));
      return widths;
    };

    const [width1Desktop, width2Desktop, width3Desktop, width4Desktop, width5Desktop] =
      await getWidths(1280);
    const [width1Mobile, width2Mobile, width3Mobile, width4Mobile, width5Mobile] = await getWidths(
      375,
    );

    expect(width1Mobile).toBeLessThan(width1Desktop);
    expect(width2Mobile).toBeLessThan(width2Desktop);
    expect(width3Mobile).toBeLessThan(width3Desktop);
    expect(width4Mobile).toBeLessThan(width4Desktop);
    expect(width5Mobile).toBeLessThan(width5Desktop);

    await expect(page).toHaveScreenshot();
  });

  test('Verify Column sizes functionality', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/column-sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();

    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify merged columns keyboard navigation', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(0);
    const secondCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(1);

    const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
    const secondCell2 = secondRow.locator('[data-ui-name="Body.Cell"]').nth(1);
    const fourthCell2 = secondRow.locator('[data-ui-name="Body.Cell"]').nth(2);

    await page.keyboard.press('Tab');
    await expect(firstCell).toBeFocused();
    await page.keyboard.press('ArrowRight');

    await expect(page).toHaveScreenshot();
    await expect(secondCell).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(secondCell2).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(fourthCell2).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(secondCell).toBeFocused();
    await page.keyboard.press('ArrowDown');
  });

  test('Verify merged columns and interactive cells', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/access-to-cells.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="7"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(lastRow.locator('[data-ui-name="Body.Cell"]').first()).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(lastRow.locator('[data-ui-name="Body.Cell"]').nth(1)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(lastRow.locator('[data-ui-name="Body.Cell"]').first()).toBeFocused();
  });

  test('Verify data table renders when refs in columns', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/multiple_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();
    await page.keyboard.press('Tab');
    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(0);
    await expect(firstCell).toBeFocused();
  });
});
