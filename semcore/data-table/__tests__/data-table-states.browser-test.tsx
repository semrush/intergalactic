import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

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

  test('Verify loading state in with sticky header', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { loading: true });

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const firstHeader = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const headerCheckbox = firstHeader.locator('[data-ui-name="Value.CheckMark"]');

    await headerCheckbox.click();
    await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify skeleton in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const row = await page.locator('div[data-ui-name="Body.Row"][aria-rowindex="2"]');

    const rowCells = row.locator('div[data-ui-name="Row.Cell"]');

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

    const cells = page.locator('div[data-ui-name="Row.Cell"]');
    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const noData = page.locator('[data-ui-name="WidgetNoData"]');

    await test.step('Verify empty state attributes', async () => {
      await expect(cells).toHaveAttribute('tabindex', '-1');
      await expect(cells).toHaveAttribute('data-grouped-by', 'colgroup');
      await expect(cells).toHaveAttribute('scope', 'colgroup');
      await expect(cells).toHaveAttribute('aria-colspan', '5');
      await expect(noData).toHaveAttribute('role', 'status');
    });

    await test.step('Verify styles on hover', async () => {
      await firstRow.hover();
      const background = await cells.first().evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(['rgba(0, 0, 0, 0)', 'transparent', 'rgb(255, 255, 255)']).toContain(background);
    });

    await test.step('Verify empty state focus styles', async () => {
      await page.keyboard.press('Tab');
      const background2 = await cells.first().evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(['rgba(0, 0, 0, 0)', 'transparent', 'rgb(255, 255, 255)']).toContain(background2);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify bottom border', async () => {
      await expect(cells.first()).toHaveCSS('border-bottom-style', 'none');
    });
  });

  test('Verify empty table scroll\'s state when column width is defined', async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/table-states-tests/nothing-found-with-fixed-column-width.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const head = page.locator('[data-ui-name="DataTable.Head"]');
    let hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

    expect(hasScroll).toBe(false);

    page.setViewportSize({ width: 500, height: 700 });

    hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

    expect(hasScroll).toBe(true);
  });
});

test.describe('Additional states', () => {
  const variantCard = [
    { variant: 'card', use: undefined, compact: undefined },
    { variant: 'card', use: 'secondary', compact: undefined },
    { variant: 'card', use: undefined, compact: true },
  ];
  variantCard.forEach((item) => {
    test(`Verify table in table card styles when variant=${item.variant} use=${item.use} and  compact=${item.compact}`, async ({ page }) => {
      const standPath = 'stories/components/card/docs/examples/card_layout_for_tables.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const lastTableRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="6"]');
      const lastTableRowCells = await lastTableRow.locator('[data-ui-name="Row.Cell"]').all();
      const accordionToggles = await page.locator('[data-ui-name="ButtonLink"]').all();
      const accordionLastRowCells = await page.locator('div[role="rowgroup"] div[role="row"]:last-of-type div[role="gridcell"]');

      for (const lastRowCell of lastTableRowCells) {
        await expect(lastRowCell).toHaveCSS('border-bottom-style', 'none');
      }

      await expect(lastTableRowCells[0]).toHaveCSS('padding-left', '20px');
      await expect(lastTableRowCells[lastTableRowCells.length - 1]).toHaveCSS('padding-right', '20px');

      for (const accordionToggle of accordionToggles) {
        await accordionToggle.click();
        await expect(accordionToggle).toHaveAttribute('aria-expanded', 'true');
      }
      await page.locator('[aria-rowindex="12"][aria-level="2"]').waitFor({ state: 'visible' });

      const count = await accordionLastRowCells.count();

      for (let i = 0; i < count / 2; i++) {
        await expect(accordionLastRowCells.nth(i)).toHaveCSS('border-bottom-style', 'solid');
      }
      for (let i = count / 2; i < count; i++) {
        await expect(accordionLastRowCells.nth(i)).toHaveCSS('border-bottom-style', 'none');
      }
      await expect(page).toHaveScreenshot();
    });
  });

  const variantDefault = [
    { variant: 'default', use: undefined, compact: undefined },
    { variant: 'defaul', use: 'secondary', compact: undefined },
    { variant: 'default', use: undefined, compact: true },
  ];
  variantDefault.forEach((item) => {
    test(`Verify table in table card styles when variant=${item.variant} use=${item.use} and  compact=${item.compact}`, async ({ page }) => {
      const standPath = 'stories/components/card/docs/examples/card_layout_for_tables.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const lastTableRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="6"]');
      const lastTableRowCells = await lastTableRow.locator('[data-ui-name="Row.Cell"]').all();
      const accordionToggles = await page.locator('[data-ui-name="ButtonLink"]').all();
      const accordionLastRowCells = await page.locator('div[role="rowgroup"] div[role="row"]:last-of-type div[role="gridcell"]').all();

      for (const lastRowCell of lastTableRowCells) {
        await expect(lastRowCell).toHaveCSS('border-bottom-style', 'solid');
      }

      for (const accordionToggle of accordionToggles) {
        await accordionToggle.click();
        await expect(accordionToggle).toHaveAttribute('aria-expanded', 'true');
      }
      await page.locator('[aria-rowindex="12"][aria-level="2"]').waitFor({ state: 'visible' });

      for (const accordionLastRowCell of accordionLastRowCells) {
        await expect(accordionLastRowCell).toHaveCSS('border-bottom-style', 'solid');
      }

      await expect(page).toHaveScreenshot();
    });
  });

  variantCard.forEach((item) => {
    test(`Verify accordion in table card styles when variant=${item.variant} use=${item.use} and  compact=${item.compact}`, async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const lastTableRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="7"]');
      const accordionToggles = await page.locator('[data-ui-name="ButtonLink"]');

      await accordionToggles.first().click();
      await expect(page.getByRole('gridcell', { name: 'Chart' })).toHaveCSS('border-bottom-style', 'solid');

      await accordionToggles.last().click();
      await expect(page.getByRole('gridcell', { name: 'Chart' }).nth(1)).toHaveCSS('border-bottom-style', 'none');
    });
  });

  test('Verify table with checkbox attributes and mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstHeader = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const firstColumnCells = page.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
    const headerCheckbox = firstHeader.locator('input');
    const region = page.locator('[aria-label="Table action bar"]');
    const collapse = page.locator('[data-ui-name="Collapse"]');
    const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
    const deselectAllButton = collapse.locator('button');
    const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
    const nextButton = page.locator('[data-ui-name="Pagination.NextPage"]');
    const prevButton = page.locator('[data-ui-name="Pagination.PrevPage"]');
    const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

    await test.step('Verify checkbox in header aria label is All items', async () => {
      await expect(headerCheckbox).toHaveAttribute('aria-label', 'All items');
      await expect(headerCheckbox).toHaveAttribute('aria-invalid', 'false');
    });

    await test.step('Verify no action bar when nothing selected', async () => {
      await expect(collapse).toBeHidden();
      await expect(selectedRowsCount).toBeHidden();
      await expect(selectAllCheckbox).not.toBeChecked();
    });

    await test.step('Verify each checkbox in cell has aria-labelledby ', async () => {
      const count = await firstColumnCells.count();
      for (let i = 0; i < count; i++) {
        const firstColumnCell = firstColumnCells.nth(i);
        const checkbox = firstColumnCell.locator('input');
        await expect(checkbox).toHaveAttribute('aria-labelledby');
      }
    });

    await test.step('Verify action bar when one checkbox is checked and unchecked', async () => {
      firstColumnCells.nth(3).click();
      await expect(collapse).toBeVisible();
      await expect(region).toHaveAttribute('role', 'region');

      firstColumnCells.nth(3).click();
      await expect(collapse).toBeHidden();

      firstColumnCells.nth(3).click();
      await expect(collapse).toBeVisible();

      const button = page.locator('[data-ui-name="Button"]');
      button.click();
      await expect(collapse).toBeHidden();
    });

    await test.step('Verify action bar when header checkbox is checked', async () => {
      await selectAllCheckbox.click();
      await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

      await expect(collapse).toBeVisible();
      await expect(selectedRowsCount).toHaveText('5');
      await expect(selectAllCheckbox).toBeChecked();
    });

    await test.step('Verify action bar when next page is opened', async () => {
      await nextButton.click();

      await expect(collapse).toBeVisible();
      await expect(selectedRowsCount).toHaveText('5');
      await expect(selectAllCheckbox).not.toBeChecked();
    });

    await test.step('Verify action bar when all items on next page checked', async () => {
      await selectAllCheckbox.click();

      await expect(selectedRowsCount).toHaveText('10');
      await expect(selectAllCheckbox).toBeChecked();
      await expect(selectAllCheckbox).toHaveClass(/checked/);
    });

    await test.step('Verify action bar when one item on next page unchecked', async () => {
      await rowCheckboxes.first().click();

      await expect(rowCheckboxes.first()).not.toBeChecked();
      await expect(selectedRowsCount).toHaveText('9');
      await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
    });

    await test.step('Verify action bar when next page opened', async () => {
      await nextButton.click();

      await expect(selectAllCheckbox).not.toBeChecked();
      await expect(selectedRowsCount).toHaveText('9');
    });

    await test.step('Verify indeterminate state saved when prev button is opened', async () => {
      await prevButton.click();
      await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
    });

    await test.step('Verify checked state on all pages changes to undhecked by click on Deselect all', async () => {
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

  test('Verify table with checkbox keyboard interaction', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstHeader = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const firstColumnCells = page.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
    const headerCheckbox = firstHeader.locator('input');
    const collapse = page.locator('[data-ui-name="Collapse"]');
    const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
    const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
    const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

    await test.step('Verify checkbox in header focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(headerCheckbox).toBeFocused();
      const classAttr = await headerCheckbox.getAttribute('class');
      expect(classAttr).not.toContain('checked');
    });

    await test.step('Verify no action bar when nothing selected', async () => {
      await expect(collapse).toBeHidden();
      await expect(selectedRowsCount).toBeHidden();
      await expect(selectAllCheckbox).not.toBeChecked();
    });

    await test.step('Verify all checkoxes checked by activating header ', async () => {
      await page.keyboard.press('Space');
      await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

      await expect(collapse).toBeVisible();
      await expect(selectedRowsCount).toHaveText('5');
      await expect(selectAllCheckbox).toBeChecked();

      const count = await firstColumnCells.count();
      for (let i = 0; i < count; i++) {
        const firstColumnCell = firstColumnCells.nth(i);
        const checkbox = firstColumnCell.locator(
          'input[type="checkbox"][data-ui-name="Checkbox.Value"]',
        );
      }
    });
    await test.step('Verify panel state when next page opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(collapse).toBeVisible();
      await expect(selectedRowsCount).toHaveText('5');
      await expect(selectAllCheckbox).not.toBeChecked();
    });
    await test.step('Verify panel when activating Select all on text page', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(selectedRowsCount).toHaveText('10');
      await expect(selectAllCheckbox).toBeChecked();
      await expect(selectAllCheckbox).toHaveClass(/checked/);
    });

    await test.step('Verify counter on the panel decreased and indeterminate state when uncheck one checkbox', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');

      await expect(rowCheckboxes.nth(1)).not.toBeChecked();
      await expect(selectedRowsCount).toHaveText('9');
      await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
    });
    await test.step('Verify panel when opening next page', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(selectAllCheckbox).not.toBeChecked();
      await expect(selectedRowsCount).toHaveText('9');
    });
    await test.step('Verify panel state saved on prev pages', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(selectAllCheckbox).toHaveClass(/indeterminate/);

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(selectAllCheckbox).toBeChecked();
    });
    if (browserName === 'webkit') return; // because of pagination bus in safari

    await test.step('Verify panel hides when press Deselect all', async () => {
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
});
