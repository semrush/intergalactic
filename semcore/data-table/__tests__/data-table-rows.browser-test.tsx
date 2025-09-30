import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Rows', () => {
  test('Verify merged cells on Hover', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstCell = firstRow.locator('[data-ui-name="Row.Cell"]').nth(0);
    await firstCell.hover();
    await expect(page).toHaveScreenshot();

    const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
    const secondCellSecondRow = secondRow.locator('[data-ui-name="Row.Cell"]').nth(1);
    await secondCellSecondRow.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify merged rows keyboard navigation', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/rows-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstMergedCell = firstRow.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
    await expect(firstMergedCell).toBeFocused();
    await expect(firstMergedCell).toHaveAttribute('tabindex', '-1');
    await expect(firstMergedCell).toHaveAttribute('data-grouped-by', 'rowgroup');
    await expect(firstMergedCell).toHaveAttribute('scope', 'rowgroup');
    await expect(firstMergedCell).toHaveAttribute('aria-rowspan', '3');
    await expect(firstMergedCell).toHaveAttribute('role', 'gridcell');

    const secondCell = firstRow.locator('[data-ui-name="Row.Cell"]').nth(1);
    await page.keyboard.press('ArrowRight');
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await expect(firstMergedCell).not.toHaveAttribute('inert');
    await expect(firstMergedCell).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await expect(firstMergedCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    const fourthRow = page.locator('[data-ui-name="Body.Row"]').nth(3);
    const MergedCellSecondRow = fourthRow.locator('[data-ui-name="Row.Cell"]').nth(0);
    await expect(MergedCellSecondRow).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(MergedCellSecondRow).toBeFocused();
  });

  test('Verify colored rows', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/row-themes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    if (browserName === 'firefox') return;
    const row = page.locator('[role="gridcell"][aria-colindex="1"]');
    const rowsCount = await row.count();
    for (let i = 0; i < rowsCount; i++) {
      await row.nth(i).hover({ force: true });
      await expect(page).toHaveScreenshot();
    }
  });
});
