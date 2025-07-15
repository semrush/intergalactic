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

  test('Verify checkbox selection works correctly by mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/table-states-tests/checkbox-pagination-diff-rows-count.tsx';
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
    await selectAllCheckbox.click();
    await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).toBeChecked();

    await nextButton.click();

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).not.toBeChecked();

    await selectAllCheckbox.click();

    await expect(selectedRowsCount).toHaveText('8');
    await expect(selectAllCheckbox).toBeChecked();
    await expect(selectAllCheckbox).toHaveClass(/checked/);

    await rowCheckboxes.first().click();

    await expect(rowCheckboxes.first()).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('7');
    await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

    await nextButton.click();

    await expect(selectAllCheckbox).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('7');

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

  test('Verify checkbox selection works correctly by keyboard interaction', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/tests/examples/table-states-tests/checkbox-pagination-diff-rows-count.tsx';
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
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).toBeChecked();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(collapse).toBeVisible();
    await expect(selectedRowsCount).toHaveText('5');
    await expect(selectAllCheckbox).not.toBeChecked();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await expect(selectedRowsCount).toHaveText('8');
    await expect(selectAllCheckbox).toBeChecked();
    await expect(selectAllCheckbox).toHaveClass(/checked/);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');

    await expect(rowCheckboxes.nth(1)).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('7');
    await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(selectAllCheckbox).not.toBeChecked();
    await expect(selectedRowsCount).toHaveText('7');

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await expect(selectAllCheckbox).toBeChecked();

    if (browserName === 'webkit') return; // because of pagination bus in safari
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');

    await expect(collapse).toBeHidden();
    await expect(selectedRowsCount).toBeHidden();
    await expect(selectAllCheckbox).not.toBeChecked();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(selectAllCheckbox).not.toBeChecked();

    await page.keyboard.press('Space');
    await expect(selectAllCheckbox).not.toBeChecked();
  });
});
