import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Loading states', () => {
  test('Verify loading state of table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/spin-container-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify roles and attributes', async () => {
      const loadingIcon = page.locator('svg[data-ui-name="Spin"]');
      await expect(loadingIcon).toBeVisible();
      await expect(loadingIcon).toHaveAttribute('role', 'gridcell');
      await expect(loadingIcon).toHaveAttribute('aria-label', 'Loading…');
    });

    await test.step('Verify focus when loading ', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('row', { name: 'Loading…' })).toBeFocused();
    });
    await expect(page).toHaveScreenshot();
  });

  test('Verify skeleton in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const row = await page.locator('div[data-ui-name="Body.Row"][aria-rowindex="2"]');

    const rowCells = row.locator('div[data-ui-name="Body.Cell"]');

    const cellsCount = await rowCells.count();
    for (let i = 0; i < cellsCount; i++) {
      const cell = rowCells.nth(i);
      const svg = cell.locator('svg');
      await expect(svg).toBeVisible();

      const width = await svg.getAttribute('width');
      const ariaLabel = await svg.getAttribute('aria-label');
      const role = await svg.getAttribute('role');

      expect(width).toBe('100%');
      expect(ariaLabel).toBe('Loading…');
      expect(role).toBe('img');
    }
  });

  test('Verify empty table state', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/empty-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const rowCell = page.locator('div[data-ui-name="Body.Cell"]');

    await expect(rowCell).toHaveAttribute('tabindex', '-1');
    await expect(rowCell).toHaveAttribute('data-grouped-by', 'colgroup');
    await expect(rowCell).toHaveAttribute('scope', 'colgroup');
    await expect(rowCell).toHaveAttribute('aria-colspan', '5');

    const noData = page.locator('[data-ui-name="WidgetNoData"]');
    await expect(noData).toHaveAttribute('role', 'status');

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Additional states', () => {
  test('Verify table with checkbox attributes and mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstHeader = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const actionBar = page.locator('[aria-label="Table action bar"]');
    const firstColumnCells = page.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    const headerCheckbox = firstHeader.locator('input');

    await test.step('Verify checkbox in header aria label is All items', async () => {
      await expect(headerCheckbox).toHaveAttribute('aria-label', 'All items');
      await expect(headerCheckbox).toHaveAttribute('aria-invalid', 'false');
    });

    await test.step('Verify no action bar when nothing selected', async () => {
      await expect(actionBar).toBeHidden();
    });

    await test.step('Verify neach checkbox in cell has aria-labelledby ', async () => {
      const count = await firstColumnCells.count();
      for (let i = 0; i < count; i++) {
        const firstColumnCell = firstColumnCells.nth(i);
        const checkbox = firstColumnCell.locator('input');
        await expect(checkbox).toHaveAttribute('aria-labelledby');
      }
    });

    await test.step('Verify  action bar when one checkbox is selected', async () => {
      firstColumnCells.nth(3).click();
      await expect(actionBar).toBeVisible();
      await expect(actionBar).toHaveAttribute('role', 'region');
      await expect(actionBar).toHaveAttribute('aria-label', 'Table action bar');

      firstColumnCells.nth(3).click();
      await expect(actionBar).toBeHidden();

      firstColumnCells.nth(3).click();
      await expect(actionBar).toBeVisible();

      const button = page.locator('[data-ui-name="Button"]');
      button.click();
      await expect(actionBar).toBeHidden();
    });
  });

  test('Verify table with checkbox keyboard interaction', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstHeader = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const actionBar = page.locator('[aria-label="Table action bar"]');
    const firstColumnCells = page.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    const headerCheckbox = firstHeader.locator('input');

    await test.step('Verify checkbox in header focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(headerCheckbox).toBeFocused();
      const classAttr = await headerCheckbox.getAttribute('class');
      expect(classAttr).not.toContain('checked');
    });

    await test.step('Verify no action bar when nothing selected', async () => {
      await expect(actionBar).toBeHidden();
    });

    await test.step('Verify all checkoxes checked by activating header ', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(150);
      const classAttr = await headerCheckbox.getAttribute('class');
      expect(classAttr).toContain('checked');
      await expect(actionBar).toBeVisible();

      const count = await firstColumnCells.count();
      for (let i = 0; i < count; i++) {
        const firstColumnCell = firstColumnCells.nth(i);
        const checkbox = firstColumnCell.locator(
          'input[type="checkbox"][data-ui-name="Checkbox.Value"]',
        );

        await expect(checkbox).toHaveCount(1);

        const classAttr = await checkbox.getAttribute('class');

        expect(classAttr).toContain('checked');
      }
    });

    await test.step('Verify panel appears by activating at least one checkbox ', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(actionBar).toBeHidden();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await page.waitForTimeout(150);
      await expect(actionBar).toBeVisible();

      const checkbox = firstColumnCells
        .nth(0)
        .locator('input[type="checkbox"][data-ui-name="Checkbox.Value"]');

      const classAttr = await checkbox.getAttribute('class');
      expect(classAttr).toContain('checked');
    });

    if (browserName === 'webkit') return; // skipped step for webkit because works unstable
    await test.step('Verify focus returns correctly by activating Deseslect all', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
      const cell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="4"]');
      await expect(cell).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      const button = page.locator('[data-ui-name="Button"]');
      await expect(button).toBeFocused();

      await page.keyboard.press('Space');
      await page.waitForTimeout(150);
      await expect(actionBar).toBeHidden();
      await expect(cell).toBeFocused();
    });
  });
});
