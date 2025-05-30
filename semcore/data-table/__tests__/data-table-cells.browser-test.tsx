import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Cells', () => {
  test('Verify long text in cells - default and wrap and ellipsis', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/cells-tests/long-text-in-cells.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify multiple access to cells with spin', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('gridcell', { name: 'Loading…' }).first()).toBeFocused();

    const svgInSecondCell = page.getByLabel('Loading…').first();

    await expect(svgInSecondCell).toHaveCount(1);
    await expect(svgInSecondCell).toHaveAttribute('aria-label', 'Loading…');
    await expect(svgInSecondCell).toHaveAttribute('role', 'img');
  });

  test('Verify keyboard interaction with interactive elements in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/cells-tests/interactive-elements-in-cells.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getCell = (row: number, col: number) =>
      page.locator(
        `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
      );
    const descriptionTooltipTrigger = (row: number, col: number) =>
      getCell(row, col).locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const buttonInCell = (row: number, col: number) =>
      getCell(row, col).locator('[data-ui-name="Button"]').first();

    // Start navigation with Tab
    await page.keyboard.press('Tab');
    await expect(getCell(2, 1)).toBeFocused();

    // Navigate right
    await page.keyboard.press('ArrowRight');
    await expect(descriptionTooltipTrigger(2, 2)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(getCell(2, 3)).toBeFocused();

    // Navigate down
    await page.keyboard.press('ArrowDown');
    await expect(getCell(3, 3)).toBeFocused();

    // Open and close button inside a cell
    await page.keyboard.press('Enter');
    await expect(buttonInCell(3, 3)).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(buttonInCell(3, 3)).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(getCell(3, 3)).toBeFocused();

    // Navigate outside table and back
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-test-id="button-after-table"]')).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(getCell(3, 3)).toBeFocused();

    // Move left and open tooltip
    await page.keyboard.press('ArrowLeft');
    await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Popper"]')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

    // Navigate into link inside tooltip
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

    // Move left and interact with elements
    await page.keyboard.press('ArrowLeft');
    await expect(getCell(3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(getCell(3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(getCell(3, 1).locator('[data-test-id="interactive-icon"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(descriptionTooltipTrigger(3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    await expect(page.getByLabel('About fastest animals')).toBeFocused();
    await page.keyboard.press('Escape');

    await expect(descriptionTooltipTrigger(3, 1)).toBeFocused();
  });

  test('Verify keyboard interaction with dd and select in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/cells-tests/dd-select-in-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getCell = (row: number, col: number) =>
      page.locator(
        `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
      );
    const selectButton = (row: number, col: number) =>
      getCell(row, col).locator('button[data-ui-name="Select"]');
    const dropdownButton = (row: number, col: number) =>
      getCell(row, col).locator('button[data-ui-name="Dropdown.Trigger"]');
    const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await page.keyboard.press('Tab');

    await test.step('Verify interaction with select', async () => {
      const firstCell = getCell(2, 1);
      await expect(firstCell).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(selectButton(2, 1)).toBeFocused();
      await page.keyboard.press('Enter');

      const selectOption = page.getByRole('option', { name: 'Option 0' });
      await expect(selectOption).toBeVisible();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      await expect(selectOption).toBeHidden();
      await expect(selectButton(2, 1)).toHaveAttribute('value', '2');

      await page.keyboard.press('Escape');
      await expect(firstCell).toBeFocused();
    });

    await test.step('Verify interaction with dropdown', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await expect(dropdownButton(2, 3)).toBeFocused();
      await expect(dropdownPopper).toBeHidden();

      await page.keyboard.press('Enter');

      await expect(dropdownPopper).toBeVisible();
      await expect(dropdownPopper).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(dropdownPopper).toBeFocused();

      await page.keyboard.press('Escape');

      await expect(dropdownPopper).toBeHidden();
      await expect(dropdownButton(2, 3)).toBeFocused();
    });
  });

  test('Verify mouse interaction with dd and select in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/cells-tests/dd-select-in-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getCell = (row: number, col: number) =>
      page.locator(
        `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
      );
    const selectButton = getCell(2, 2).locator('button[data-ui-name="Select"]');
    const dropdownButton = getCell(2, 3).locator('button[data-ui-name="Dropdown.Trigger"]');
    const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify interaction with select', async () => {
      await selectButton.click();
      const selectOption = page.getByRole('option', { name: 'Option 0' });
      await expect(selectOption).toBeVisible();

      await selectButton.click();
      await expect(selectOption).toBeHidden();

      await selectButton.click();
      await page.keyboard.press('Escape');
      await expect(selectOption).toBeHidden();
      await expect(selectButton).toBeFocused();

      await selectButton.click();
      await page.getByRole('option', { name: 'Option 2' }).click();
      await expect(selectButton).toHaveAttribute('value', '2');
    });

    await test.step('Verify interaction with dropdown', async () => {
      await dropdownButton.click();
      await expect(dropdownPopper).toBeVisible();

      await dropdownButton.click();
      await expect(dropdownPopper).toBeHidden();

      await dropdownButton.click();
      await page.keyboard.press('Escape');
      await expect(dropdownPopper).toBeHidden();
    });
  });

  test('Verify keyoard navigation from header to merged cell', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/cells-tests/one-merged-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('[data-ui-name="Body.Cell"]')).toBeFocused();
  });

  test('Verify colored cells', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/advanced/examples/row_cell_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    if (browserName !== 'chromium') return;
    const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="4"]');
    const cell = row.locator('[aria-colindex="1"]');
    const box = await cell.boundingBox();

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await expect(page).toHaveScreenshot();
  });
});
