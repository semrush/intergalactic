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
});
