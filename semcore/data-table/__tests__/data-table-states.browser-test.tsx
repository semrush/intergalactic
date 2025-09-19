import type { Page } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import { LimitOverlay } from 'data-table/src/components/Body/LimitOverlay';

const locators = {
  toggle: (page: Page) => page.getByRole('row').getByLabel('Show details'),
  chart: (page: Page, text: string) => page.getByRole('gridcell', { name: text }),
  row: (page: Page, index: number) =>
    page.locator(`[aria-rowindex="${index}"]`),
  rowTableInTable: (page: Page, level: number, index: number) =>
    page.locator(`[role="row"][aria-level="${level}"][aria-rowindex="${index}"]`),
  dataTable: (page: Page) => page.getByRole('grid'),
  columnHeader: (page: Page) => page.getByRole('columnheader'),
  button: (page: Page, text: string) => page.getByRole('button', { name: text }),
};

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

    const rowCells = locators.row(page, 2).locator('div[data-ui-name="Row.Cell"]');

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
    const firstRow = locators.row(page, 2);
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

    const head = locators.row(page, 1);
    let hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

    expect(hasScroll).toBe(false);

    page.setViewportSize({ width: 500, height: 700 });

    hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

    expect(hasScroll).toBe(true);
  });
});

test.describe('Limited state', () => {
  const variantState = [
    { rowsLimit: 3, columnsLimit: 0 },
    { rowsLimit: 0, columnsLimit: 3 },
    { rowsLimit: 3, columnsLimit: 2 },
    { rowsLimit: 0, columnsLimit: 0 },
  ];
  variantState.forEach((item) => {
    test(`Verify limited state for base table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, async ({ page, browserName }) => {
      const standPath = 'stories/components/data-table/docs/examples/limited-mode.tsx';

      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const columnsCount = await locators.columnHeader(page).count();
      const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
      const rowsCount = await rows.count();
      const limitedContent = page.locator('div[class*="LimitOverlay"]').first();

      await expect(limitedContent).toBeVisible();

      const limitedCell = limitedContent.locator('[role="gridcell"]');

      const colspanStr = await limitedCell.getAttribute('aria-colspan');
      const rowspanStr = await limitedCell.getAttribute('aria-rowspan');

      const limitedColumns = parseInt(colspanStr || '0', 10);
      const limitedRows = parseInt(rowspanStr || '0', 10);

      const hiddenRows = Number.isFinite(limitedRows) && limitedRows > 0 ? limitedRows : 0;
      const hiddenStartIndex = Math.max(0, rowsCount - hiddenRows);

      await test.step('Verify aria attributes', async () => {
        await expect(limitedCell).toHaveAttribute('tabindex', '-1');

        const visibleRowsLocator = page.locator('div[data-ui-name="Body.Row"][role="row"]:not([aria-hidden="true"])');
        if (limitedRows === rowsCount && limitedColumns < columnsCount) {
          const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
          const rowCount = await rows.count();

          for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            await expect(row).not.toHaveAttribute('aria-hidden', 'true');

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();

            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              await expect(cell).toHaveAttribute('aria-hidden', 'true');
            }
          }
        } else if (limitedRows < rowsCount && limitedColumns === columnsCount) {
          await expect(visibleRowsLocator).toHaveCount(Math.max(0, rowsCount - hiddenRows + 1));

          for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            if (rowIndex > hiddenStartIndex) {
              await expect(row).toHaveAttribute('aria-hidden', 'true');
            } else {
              await expect(row).not.toHaveAttribute('aria-hidden', 'true');
            }

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();
            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              if (rowIndex >= hiddenStartIndex) {
                await expect(cell).toHaveAttribute('aria-hidden', 'true');
              } else {
                await expect(cell).not.toHaveAttribute('aria-hidden', 'true');
              }
            }
          }
        }
      });

      await test.step('Verify overlay style', async () => {
        if (browserName === 'webkit') return; // skipped because the style does not apply for older webkit versions
        const cssValue = await limitedContent.evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('backdrop-filter'),
        );

        expect(cssValue).toContain('blur(3px)');
      });
    });

    test(`Verify limited state for checkbox in table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, async ({ page, browserName }) => {
      const standPath = 'stories/components/data-table/tests/examples/limited-mode/checkboxes.tsx';

      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const columnsCount = await locators.columnHeader(page).count();
      const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
      const rowsCount = await rows.count();
      const limitedContent = page.locator('div[class*="LimitOverlay"]').first();

      const limitedCell = limitedContent.locator('[role="gridcell"]');

      const colspanStr = await limitedCell.getAttribute('aria-colspan');
      const rowspanStr = await limitedCell.getAttribute('aria-rowspan');

      const limitedColumns = parseInt(colspanStr || '0', 10);
      const limitedRows = parseInt(rowspanStr || '0', 10);

      const hiddenRows = Number.isFinite(limitedRows) && limitedRows > 0 ? limitedRows : 0;
      const hiddenStartIndex = Math.max(0, rowsCount - hiddenRows);

      await test.step('Verify overlay shown and aria attributes on the first page', async () => {
        await expect(limitedContent).toBeVisible();

        await expect(limitedCell).toHaveAttribute('tabindex', '-1');

        const visibleRowsLocator = page.locator('div[data-ui-name="Body.Row"][role="row"]:not([aria-hidden="true"])');
        if (limitedRows === rowsCount && limitedColumns < columnsCount) {
          const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
          const rowCount = await rows.count();

          for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            await expect(row).not.toHaveAttribute('aria-hidden', 'true');

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();

            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              await expect(cell).toHaveAttribute('aria-hidden', 'true');
            }
          }
        } else if (limitedRows < rowsCount && limitedColumns === columnsCount) {
          await expect(visibleRowsLocator).toHaveCount(Math.max(0, rowsCount - hiddenRows + 1));

          for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            if (rowIndex > hiddenStartIndex) {
              await expect(row).toHaveAttribute('aria-hidden', 'true');
            } else {
              await expect(row).not.toHaveAttribute('aria-hidden', 'true');
            }

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();
            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              if (rowIndex >= hiddenStartIndex) {
                await expect(cell).toHaveAttribute('aria-hidden', 'true');
              } else {
                await expect(cell).not.toHaveAttribute('aria-hidden', 'true');
              }
            }
          }
        }
      });

      await test.step('Verify overlay shown and aria attributes on the second page', async () => {
        await locators.button(page, 'Next').click();
        await expect(limitedContent).toBeVisible();

        await expect(limitedCell).toHaveAttribute('tabindex', '-1');

        const visibleRowsLocator = page.locator('div[data-ui-name="Body.Row"][role="row"]:not([aria-hidden="true"])');
        if (limitedRows === rowsCount && limitedColumns < columnsCount) {
          const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
          const rowCount = await rows.count();

          for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            await expect(row).not.toHaveAttribute('aria-hidden', 'true');

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();

            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              await expect(cell).toHaveAttribute('aria-hidden', 'true');
            }
          }
        } else if (limitedRows < rowsCount && limitedColumns === columnsCount) {
          await expect(visibleRowsLocator).toHaveCount(Math.max(0, rowsCount - hiddenRows + 1));

          for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            if (rowIndex > hiddenStartIndex) {
              await expect(row).toHaveAttribute('aria-hidden', 'true');
            } else {
              await expect(row).not.toHaveAttribute('aria-hidden', 'true');
            }

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();
            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              if (rowIndex >= hiddenStartIndex) {
                await expect(cell).toHaveAttribute('aria-hidden', 'true');
              } else {
                await expect(cell).not.toHaveAttribute('aria-hidden', 'true');
              }
            }
          }
        }
      });

      await test.step('Verify overlay style', async () => {
        if (browserName === 'webkit') return; // skipped because the style does not apply for older webkit versions
        const cssValue = await limitedContent.evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('backdrop-filter'),
        );

        expect(cssValue).toContain('blur(3px)');
      });

      await test.step('Verify overlay shown and aria attributes on the last page', async () => {
        await locators.button(page, 'Last page #').click();
        const columnsCount = await locators.columnHeader(page).count();
        const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
        const rowsCount = await rows.count();
        const limitedContent = page.locator('div[class*="LimitOverlay"]').first();

        if (rowsCount <= item.rowsLimit) {
          await expect(limitedContent).not.toBeVisible();
        } else {
          await expect(limitedContent).toBeVisible();

          await expect(limitedCell).toHaveAttribute('tabindex', '-1');

          const visibleRowsLocator = page.locator('div[data-ui-name="Body.Row"][role="row"]:not([aria-hidden="true"])');
          if (limitedRows === rowsCount && limitedColumns < columnsCount) {
            const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
            const rowCount = await rows.count();

            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
              const row = rows.nth(rowIndex);

              await expect(row).not.toHaveAttribute('aria-hidden', 'true');

              const cells = row.locator('[data-ui-name="Body.Cell"]');
              const cellCount = await cells.count();

              for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
                const cell = cells.nth(cellIndex);
                await expect(cell).toHaveAttribute('aria-hidden', 'true');
              }
            }
          } else if (limitedRows < rowsCount && limitedColumns === columnsCount) {
            await expect(visibleRowsLocator).toHaveCount(Math.max(0, rowsCount - hiddenRows + 1));

            for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
              const row = rows.nth(rowIndex);

              if (rowIndex > hiddenStartIndex) {
                await expect(row).toHaveAttribute('aria-hidden', 'true');
              } else {
                await expect(row).not.toHaveAttribute('aria-hidden', 'true');
              }

              const cells = row.locator('[data-ui-name="Body.Cell"]');
              const cellCount = await cells.count();
              for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
                const cell = cells.nth(cellIndex);
                if (rowIndex >= hiddenStartIndex) {
                  await expect(cell).toHaveAttribute('aria-hidden', 'true');
                } else {
                  await expect(cell).not.toHaveAttribute('aria-hidden', 'true');
                }
              }
            }
          }
        }
      });

      await test.step('Verify table with overlay snapshot', async () => {
        await locators.button(page, 'Prev').click();
        await page.locator('[data-ui-name="Checkbox"]').first().click();
        const box = await rows.nth(3).boundingBox();
        if (box) {
          await page.mouse.move(box.x + 10, box.y + 5);
        }
        await expect(page).toHaveScreenshot();
      });
    });

    test(`Verify limited state for accordion in table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, async ({ page, browserName }) => {
      const standPath = 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx';

      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      const columnsCount = await locators.columnHeader(page).count();
      const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
      const rowsCount = await rows.count();
      const limitedContent = page.locator('div[class*="LimitOverlay"]').first();

      await expect(limitedContent).toBeVisible();

      const limitedCell = limitedContent.locator('[role="gridcell"]');

      const colspanStr = await limitedCell.getAttribute('aria-colspan');
      const rowspanStr = await limitedCell.getAttribute('aria-rowspan');

      const limitedColumns = parseInt(colspanStr || '0', 10);
      const limitedRows = parseInt(rowspanStr || '0', 10);

      const hiddenRows = Number.isFinite(limitedRows) && limitedRows > 0 ? limitedRows : 0;
      const hiddenStartIndex = Math.max(0, rowsCount - hiddenRows);

      await test.step('Verify aria attributes', async () => {
        await expect(limitedCell).toHaveAttribute('tabindex', '-1');

        const visibleRowsLocator = page.locator('div[data-ui-name="Body.Row"][role="row"]:not([aria-hidden="true"])');
        if (limitedRows === rowsCount && limitedColumns < columnsCount) {
          const rows = page.locator('div[data-ui-name="Body.Row"][role="row"]');
          const rowCount = await rows.count();

          for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            await expect(row).not.toHaveAttribute('aria-hidden', 'true');

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();

            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              await expect(cell).toHaveAttribute('aria-hidden', 'true');
            }
          }
        } else if (limitedRows < rowsCount && limitedColumns === columnsCount) {
          await expect(visibleRowsLocator).toHaveCount(Math.max(0, rowsCount - hiddenRows + 1));

          for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            const row = rows.nth(rowIndex);

            if (rowIndex > hiddenStartIndex) {
              await expect(row).toHaveAttribute('aria-hidden', 'true');
            } else {
              await expect(row).not.toHaveAttribute('aria-hidden', 'true');
            }

            const cells = row.locator('[data-ui-name="Body.Cell"]');
            const cellCount = await cells.count();
            for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
              const cell = cells.nth(cellIndex);
              if (rowIndex >= hiddenStartIndex) {
                await expect(cell).toHaveAttribute('aria-hidden', 'true');
              } else {
                await expect(cell).not.toHaveAttribute('aria-hidden', 'true');
              }
            }
          }
        }
      });

      await test.step('Verify overlay style', async () => {
        if (browserName === 'webkit') return; // skipped because the style does not apply for older webkit versions
        const cssValue = await limitedContent.evaluate((el) =>
          window.getComputedStyle(el).getPropertyValue('backdrop-filter'),
        );

        expect(cssValue).toContain('blur(3px)');
      });
    });
  });

  test(`Verify limited state for base table keyboard interactions when overlay has one interactive element`, async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/limited-mode.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', { rowsLimit: 2, columnsLimit: 1 });
    await page.setContent(htmlContent);

    await test.step('Verify focus on onteractive element on overlay and back from rows ', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');

      await expect(locators.row(page, 2).getByRole('gridcell').nth(1)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(locators.button(page, 'Upgrade to Guru')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(locators.row(page, 3).getByRole('gridcell').nth(1)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await expect(locators.button(page, 'Upgrade to Guru')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(locators.row(page, 3).getByRole('gridcell').nth(1)).toBeFocused();
    });

    await test.step('Verify focus on onteractive element on overlay and back from column ', async () => {
      await page.keyboard.press('ArrowLeft');

      await expect(locators.row(page, 3).getByRole('gridcell').nth(0)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await expect(locators.button(page, 'Upgrade to Guru')).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.row(page, 4).getByRole('gridcell').nth(0)).toBeFocused();
    });
  });

  test(`Verify limited state for base table keyboard interactions when overlay has few interactive element`, async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/limited-mode/sortable-table.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', { rowsLimit: 2, columnsLimit: 1 });
    await page.setContent(htmlContent);
    const limitedContent = page.locator('div[class*="LimitOverlay"]').first();
    const limitedCell = limitedContent.locator('[role="gridcell"]');

    await test.step('Verify focus on the overlay cell', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(limitedCell).toBeFocused();
    });
    await test.step('Verify navigation inside overlay', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.button(page, 'Upgrade to Guru').first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Upgrade to Guru').nth(1)).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(limitedCell).toBeFocused();
    });
    await test.step('Verify focus on table call', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.row(page, 3).getByRole('gridcell').nth(1)).toBeFocused();
    });
  });

  test(`Verify limited state for table with rows and columns merging keyboard interactions when overlay without interactive element`, async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/tests/examples/limited-mode/row-and-column-merging.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', { rowsLimit: 1, columnsLimit: 2 });
    await page.setContent(htmlContent);
    const limitedContent = page.locator('div[class*="LimitOverlay"]').first();
    const limitedCell = limitedContent.locator('[role="gridcell"]');

    await test.step('Verify focus on the overlay cell and navigation between merger rows', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await expect(locators.row(page, 2).getByRole('gridcell').nth(1)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(locators.row(page, 3).getByRole('gridcell').nth(1)).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(limitedCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(limitedCell).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(limitedCell).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.row(page, 3).getByRole('gridcell').nth(1)).toBeFocused();

      for (let i = 0; i < 6; i++)
        await page.keyboard.press('ArrowDown');
    });
  });

  test(`Verify limited state for table with accordion keyboard and mouse interactions`, async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', { rowsLimit: 1, columnsLimit: 2 });
    await page.setContent(htmlContent);

    await test.step('Verify availabe accordion expands and visible ', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 4).waitFor({ state: 'visible' });
    });
    await test.step('Verify partly available accordion expands by keyboard', async () => {
      for (let i = 0; i < 6; i++)
        await page.keyboard.press('ArrowDown');
      await expect(locators.toggle(page).nth(2)).toBeFocused();
      await page.keyboard.press('Enter');

      await page.getByRole('status').waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowDown');
      await expect(locators.toggle(page).nth(3)).toBeFocused();
    });
    await test.step('Verify hidden accordion cells not focused - overlay contens focused insted', async () => {
      await page.keyboard.press('Enter');

      await locators.rowTableInTable(page, 2, 11).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await expect(locators.rowTableInTable(page, 2, 11).getByRole('gridcell').first()).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await expect(locators.button(page, 'Upgrade to Guru')).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.row(page, 7).getByRole('gridcell').nth(1)).toBeFocused();

      const box = await locators.row(page, 7).getByRole('gridcell').nth(1).boundingBox();
      if (box) {
        await page.mouse.move(box.x + 10, box.y + 5);
      }

      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify accordion toggle works by mouse', async () => {
      await locators.toggle(page).nth(0).click();

      await locators.rowTableInTable(page, 2, 4).waitFor({ state: 'hidden' });
    });
    await test.step('Verify  clicking on  cell with accordion activated it when row partly overlayed', async () => {
      const box1 = await locators.row(page, 4).getByRole('gridcell').first().boundingBox();
      if (box1) {
        await page.mouse.click(box1.x + 10, box1.y + 5);
      }
      await page.getByRole('status').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify clicking on row with accordion activated it when row partly overlayed', async () => {
      const box2 = await locators.row(page, 5).getByRole('gridcell').nth(1).boundingBox();
      if (box2) {
        await page.mouse.click(box2.x + 10, box2.y + 5);
      }
      await expect(locators.rowTableInTable(page, 2, 5).getByRole('gridcell').first()).not.toBeVisible();
    });
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
      const standPath = 'stories/components/card/tests/examples/table-with-accordions-in-card.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const lastTableRowCells = await locators.row(page, 6).locator('[data-ui-name="Row.Cell"]').all();
      const accordionToggles = await locators.toggle(page).all();
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
      await locators.rowTableInTable(page, 2, 12).waitFor({ state: 'visible' });

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
      const standPath = 'stories/components/card/tests/examples/table-with-accordions-in-card.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const lastTableRowCells = await locators.row(page, 6).locator('[data-ui-name="Row.Cell"]').all();
      const accordionToggles = await locators.toggle(page).all();
      const accordionLastRowCells = await page.locator('div[role="rowgroup"] div[role="row"]:last-of-type div[role="gridcell"]').all();

      for (const lastRowCell of lastTableRowCells) {
        await expect(lastRowCell).toHaveCSS('border-bottom-style', 'solid');
      }

      for (const accordionToggle of accordionToggles) {
        await accordionToggle.click();
        await expect(accordionToggle).toHaveAttribute('aria-expanded', 'true');
      }
      await locators.rowTableInTable(page, 2, 12).waitFor({ state: 'visible' });

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

      const accordionToggles = await locators.toggle(page);

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
