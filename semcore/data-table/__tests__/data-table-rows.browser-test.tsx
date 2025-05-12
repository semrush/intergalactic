import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Rows', () => {
  test('Verify merged cells on Hover', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(0);
    await firstCell.hover();
    await expect(page).toHaveScreenshot();

    const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
    const secondCellSecondRow = secondRow.locator('[data-ui-name="Body.Cell"]').nth(1);
    await secondCellSecondRow.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify merged rows keyboard navigation', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/rows-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstMergedCell = firstRow.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    await expect(firstMergedCell).toBeFocused();

    const secondCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(1);
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
    const MergedCellSecondRow = fourthRow.locator('[data-ui-name="Body.Cell"]').nth(0);
    await expect(MergedCellSecondRow).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(MergedCellSecondRow).toBeFocused();
  });
});
