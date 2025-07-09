import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Pagination', () => {
  test('Verify keyboard access with changing data', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/pagination.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const nav = await page.locator('nav[data-ui-name="Pagination"]');

    const marginTop = await nav.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('margin-top');
    });

    expect(marginTop).toBe('16px');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('gridcell', { name: 'ebay buy' })).toBeFocused();
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();

    await page.keyboard.press('Space');
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('gridcell', { name: 'ebay buy last' })).toBeFocused();
  });

  test('Verify row selection works correctly', async ({ page, browser }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const collapse = page.locator('[data-ui-name="Collapse"]');
    const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
    const deselectAllButton = collapse.locator('button');
    const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
    const nextButton = page.locator('[data-ui-name="Pagination.NextPage"]');
    const prevButton = page.locator('[data-ui-name="Pagination.PrevPage"]');
    const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

    await expect(collapse).toBeHidden();
    await expect(selectedRowsCount).toBeHidden();
    await expect(selectAllCheckbox).not.toBeChecked();
    await page.waitForTimeout(10000);
    await selectAllCheckbox.click();

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).toBeChecked();

    await nextButton.click();

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).not.toBeChecked();

    await selectAllCheckbox.click();

    await expect(selectedRowsCount).toHaveText('10');
    await expect(selectAllCheckbox).toBeChecked();

    await rowCheckboxes.first().click();

    await expect(rowCheckboxes.first()).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('9');
    await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

    await nextButton.click();

    await expect(selectAllCheckbox).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('9');

    await prevButton.click();
    await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

    await prevButton.click();
    await expect(selectAllCheckbox).toBeChecked();

    await deselectAllButton.click();

    await expect(collapse).toBeHidden();
    await expect(selectedRowsCount).toBeHidden();
    await expect(selectAllCheckbox).not.toBeChecked();

    await nextButton.click();
    await expect(selectAllCheckbox).not.toBeChecked();

    await nextButton.click();
    await expect(selectAllCheckbox).not.toBeChecked();
  });
});
