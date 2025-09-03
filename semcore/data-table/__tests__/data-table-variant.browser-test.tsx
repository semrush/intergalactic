import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Variant', () => {
  test('Card - verify styles', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/card_layout_for_tables.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const lastTableRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="6"]');
    const lastTableRowCells = await lastTableRow.locator('[data-ui-name="Body.Cell"]').all();
    const accordionToggles = await page.locator('[data-ui-name="ButtonLink"]').all();
    const accordionLastRowCells = await page.locator('div[role="rowgroup"] div[role="row"]:last-of-type div[role="gridcell"]').all();

    for (const lastRowCell of lastTableRowCells) {
      await expect(lastRowCell).toHaveCSS('border-bottom-style', 'none');
    }

    await expect(lastTableRowCells[0]).toHaveCSS('padding-left', '20px');
    await expect(lastTableRowCells[lastTableRowCells.length - 1]).toHaveCSS('padding-right', '20px');

    for (const accordionToggle of accordionToggles) {
      await accordionToggle.click();
      await expect(accordionToggle).toHaveAttribute('aria-expanded', 'true');
    }

    for (const accordionLastRowCell of accordionLastRowCells) {
      await expect(accordionLastRowCell).toHaveCSS('border-bottom-style', 'none');
    }
  });
});
