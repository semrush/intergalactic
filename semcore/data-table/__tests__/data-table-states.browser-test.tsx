import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, checkStyles, getCssVarColor, getTransparentColor } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Loading states', () => {
    test('Verify loading state of table', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/spin-container-in-table.tsx', 'en');

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

    test('Verify loading state in with sticky header', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

      await page.emulateMedia({ reducedMotion: 'reduce' });

      await expect(page).toHaveScreenshot();

      const headerCheckbox = locators.getHeadColumn(page, 1).locator('[data-ui-name="Value.CheckMark"]');

      await headerCheckbox.click();
      await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    test('Verify skeleton in table', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/skeleton-in-table.tsx', 'en');

      const rowCells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

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
      await expect(page).toHaveScreenshot();
    });

    test('Verify empty table state', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/empty-table.tsx', 'en');
      const cellDefaultBg = await getCssVarColor(page, '--intergalactic-bg-primary-neutral');
      const transparentBg = await getTransparentColor(page);
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
        expect([transparentBg, cellDefaultBg]).toContain(background);
      });

      await test.step('Verify empty state focus styles', async () => {
        await page.keyboard.press('Tab');
        const background2 = await cells.first().evaluate((el) => getComputedStyle(el).backgroundColor);
        expect([transparentBg, cellDefaultBg]).toContain(background2);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify bottom border', async () => {
        await expect(cells.first()).toHaveCSS('border-bottom-style', 'none');
      });
    });
  });

  test.describe('Card variant', () => {
    const variantCard = [
      { variant: 'card', use: undefined, compact: undefined },
      { variant: 'card', use: 'secondary', compact: undefined },
      { variant: 'card', use: undefined, compact: true },
    ];
    variantCard.forEach((item) => {
      test(`Verify table in table card styles when variant=${item.variant} use=${item.use} and  compact=${item.compact}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table',
          '@card'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/card/tests/examples/table-with-accordions-in-card.tsx', 'en', item);

        await page.setViewportSize({ width: 1920, height: 1080 });

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
      test(`Verify table in table card styles when variant=${item.variant} use=${item.use} and  compact=${item.compact}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table',
          '@card'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/card/tests/examples/table-with-accordions-in-card.tsx', 'en', item);

        await page.setViewportSize({ width: 1920, height: 1080 });

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
  });

  test.describe('Ellipsis', () => {
    test(`Ellipsis with cropPosition = end`, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table',
        '@ellipsis',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/multiple_use.tsx', 'en');

      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(200); // wait for ellipsis apply
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('ArrowDown');
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="Hint"]')).toHaveCount(0);
    });

    test(`Ellipsis with cropPosition = middle`, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table',
        '@ellipsis',
        '@link',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/ellipsis/tests/examples/in_table_with_link.tsx', 'en');
      await page.waitForTimeout(250); // wait for ellipsis apply
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200); // wait for ellipsis apply
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="Hint"]')).toHaveCount(0);
    });
  });

  test.describe('Limited mode', () => {
    test(`Verify limited state for table with accordion keyboard and mouse interactions`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx', 'en', { rowsLimit: 1, columnsLimit: 2 });

      await test.step('Verify availabe accordion expands and visible ', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.toggle(page).nth(0)).toBeFocused();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await locators.rowTableInTable(page, 2, 4).waitFor({ state: 'visible' });
      });
      await test.step('Verify partly available accordion expands by keyboard', async () => {
        for (let i = 0; i < 6; i++)
          await page.keyboard.press('ArrowDown');
        await expect(locators.toggle(page).nth(2)).toBeFocused();
        await page.keyboard.press('Enter');
        await page.getByText('Nothing found').waitFor({ state: 'visible' });
        await page.waitForTimeout(300);
        await page.keyboard.press('ArrowDown');
        if (browserName !== 'webkit') {
          await expect(page).toHaveScreenshot();
        }
        await page.keyboard.press('ArrowDown');
        await expect(locators.toggle(page).nth(3)).toBeFocused();
      });
      await test.step('Verify hidden accordion cells not focused - overlay contens focused insted', async () => {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await locators.rowTableInTable(page, 2, 11).waitFor({ state: 'visible' });
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowLeft');
        const box = await locators.row(page, 7).getByRole('gridcell').nth(1).boundingBox();
        if (box) {
          await page.mouse.move(box.x + 10, box.y + 5);
        }

        await expect(page).toHaveScreenshot();
      });
      await test.step('Verify  clicking on  cell with accordion activated it when row partly overlayed', async () => {
        await locators.toggle(page).nth(0).click();
        await locators.rowTableInTable(page, 2, 4).waitFor({ state: 'hidden' });

        const box1 = await locators.row(page, 4).getByRole('gridcell').first().boundingBox();
        if (box1) {
          await page.mouse.click(box1.x + 10, box1.y + 5);
        }
        await page.getByRole('status').waitFor({ state: 'hidden' });
        await expect(page).toHaveScreenshot();
      });
    });

    test(`Verify limited state for checkbox in table `, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/checkboxes.tsx', 'en', { rowsLimit: 0, columnsLimit: 0 });

      await page.locator('[data-ui-name="Checkbox"]').first().click();
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('SelectableRows', () => {
    test('Verify sideIndents=wide  and compact', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        sideIndents: 'wide',
      });

      await test.step('Verify wide data-table', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify compact data-table', async () => {
        await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
          compact: true,
        });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify SelectableRows with fixed-left column — checkbox cell positioning', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        fixedColumns: true,
      });

      const selectorCell = locators.getCell(page, 2, 1);
      await expect(selectorCell).toBeVisible();

      await test.step('Selector cell has left: 0 and sticky positioning', async () => {
        await expect(selectorCell).toHaveCSS('left', '0px');
        const position = await selectorCell.evaluate((el) => window.getComputedStyle(el).position);
        expect(['static']).toContain(position);
      });

      await test.step('First data column (keyword) is fixed-left too', async () => {
        const keywordCell = locators.getCell(page, 2, 2);
        const left = await keywordCell.evaluate((el) => window.getComputedStyle(el).left);
        expect(left).not.toBe('auto');
      });
    });

    test('Verify SelectableRows with fixed-left column — checkbox stays pinned on horizontal scroll', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        fixedColumns: true,
      });

      const selectorCell = locators.getCell(page, 2, 1);
      const nonFixedCell = locators.getCell(page, 2, 3);

      const selectorBefore = await selectorCell.boundingBox();
      const nonFixedBefore = await nonFixedCell.boundingBox();

      await locators.dataTable(page).hover();
      await page.mouse.wheel(300, 0);
      await page.waitForTimeout(500);

      const selectorAfter = await selectorCell.boundingBox();
      const nonFixedAfter = await nonFixedCell.boundingBox();

      await test.step('Selector cell X position unchanged after scroll', async () => {
        expect(selectorAfter?.x).toBe(selectorBefore?.x);
        await expect(selectorCell).toBeVisible();
      });

      await test.step('Non-fixed data cell shifted left (scrolled)', async () => {
        expect(nonFixedAfter!.x).toBeLessThan(nonFixedBefore!.x);
      });
    });

    test('Verify SelectableRows with fixed-left column — selection persists after scroll', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        fixedColumns: true,
      });

      const selectorCell = locators.getCell(page, 2, 1);
      const checkbox = selectorCell.locator('input[type="checkbox"]');

      await selectorCell.locator('label').first().click();

      await test.step('Row is selected and action bar appeared', async () => {
        await expect(checkbox).toBeChecked();
        await expect(page.getByRole('button', { name: 'Deselect all' })).toBeVisible();
      });

      await test.step('Checkbox stays checked after horizontal scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(300, 0);
        await page.waitForTimeout(500);
        await expect(checkbox).toBeChecked();
      });
    });

    test('Verify SelectableRows with fixed-left column and accordion rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        fixedColumns: true,
        accordion: true,
      });

      const selectorCell = locators.getCell(page, 2, 1);
      await expect(selectorCell).toBeVisible();
      await expect(selectorCell).toHaveCSS('left', '0px');

      await test.step('Expanding an accordion row keeps selector pinned', async () => {
        await locators.toggle(page).first().click();
        await page.waitForTimeout(300);
        await expect(selectorCell).toHaveCSS('left', '0px');
      });
    });

    test('Verify color on hover when merged rows AND columns with multi-level header', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page, browserName }) => {
      if (browserName == 'firefox') test.skip();

      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/merged-row-for-multi-level-header.tsx', 'en');

      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      const cellHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-hover');
      const cellDefaultBg = await getCssVarColor(page, '--intergalactic-bg-primary-neutral');

      await test.step('Verify Color when child cell hovered', async () => {
        await locators.getCell(page, 3, 1).hover();

        await checkStyles(locators.getCell(page, 3, 1), { 'background-color': cellHoverBg });
        await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellHoverBg });
        await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellDefaultBg });
      });

      await test.step('Verify Color when parent cell hovered', async () => {
        await locators.getCell(page, 2, 2).hover();

        for (let row = 2; row <= 5; row++) {
          await checkStyles(locators.getCell(page, row, 1), { 'background-color': cellHoverBg });
        }
      });

      await test.step('Verify no console errors', async () => {
        expect(consoleErrors, `Console errors found:\n${consoleErrors.join('\n')}`).toHaveLength(0);
      });
    });

    test('Verify styles when checkbox in merged cells checked by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@tooltip'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/selectable_with_merged_rows.tsx', 'en');
      const cellSelectedBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected');
      const cellSelectedHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected-hover');

      await page.keyboard.press('Tab');

      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 2, 1).locator('input')).toBeFocused();

      await page.keyboard.press('Space');

      await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });
      await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 2, 4), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 3, 2), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 3, 3), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 3, 4), { 'background-color': cellSelectedBg });
      await expect(page).toHaveScreenshot();

      if (browserName == 'firefox') return;
      const cell22 = locators.getCell(page, 2, 1);
      const box22 = await cell22.boundingBox();
      if (box22) {
        await page.mouse.move(box22.x + box22.width / 2, box22.y + box22.height / 2);
      }

      await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 4), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 3, 2), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 3, 3), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 3, 4), { 'background-color': cellSelectedHoverBg });

      const cell23 = locators.getCell(page, 2, 3);
      const box23 = await cell23.boundingBox();
      if (box23) {
        await page.mouse.move(box23.x + box23.width / 2, box23.y + box23.height / 2);
      }
      await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 4), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 3, 2), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 3, 3), { 'background-color': cellSelectedBg });
      await checkStyles(locators.getCell(page, 3, 4), { 'background-color': cellSelectedBg });
    });
  });

  test.describe('SelectableRows (legacy API)', () => {
    test('Verify SelectableRows row highlight on selection', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });
      if (browserName == 'firefox') return;
      const cellSelectedHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected-hover');
      const firstRowCheckbox = locators.getCell(page, 2, 1).locator('label');
      await firstRowCheckbox.click();
      await firstRowCheckbox.hover();

      await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellSelectedHoverBg });
      await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellSelectedHoverBg });

      await expect(page).toHaveScreenshot();
    });

    test('Verify sideIndents=wide and compact', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
        sideIndents: 'wide', reactive: false,
      });

      await test.step('Verify wide data-table', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify compact data-table', async () => {
        await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', {
          compact: true, reactive: false,
        });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify SelectableRows select all rows highlight', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });
      const cellSelectedHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected-hover');

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      await selectAllCheckbox.click();

      const bodyRows = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="DataTable.Row"]');
      const rowCount = await bodyRows.count();

      for (let i = 0; i < rowCount; i++) {
        const row = bodyRows.nth(i);
        const cells = row.locator('[data-ui-name="Row.Cell"]');
        const cellCount = await cells.count();
        for (let j = 0; j < cellCount; j++) {
          await checkStyles(cells.nth(j), { 'background-color': cellSelectedHoverBg });
        }
      }
    });

    test('Verify color on hover when merged rows with SelectableRows', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page, browserName }) => {
      if (browserName === 'firefox') test.skip();

      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { mergedRows: true, reactive: false });

      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      const cellHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-hover');
      const cellDefaultBg = await getCssVarColor(page, '--intergalactic-bg-primary-neutral');
      const cellSelectedBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected');
      const cellSelectedHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-selected-hover');

      await test.step('Verify color when child cell hovered', async () => {
        await locators.getCell(page, 3, 3).hover();

        await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellHoverBg });
        await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellHoverBg });
        await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellDefaultBg });
        await checkStyles(locators.getCell(page, 3, 3), { 'background-color': cellHoverBg });
      });

      await test.step('Verify color when parent merged cell hovered', async () => {
        await locators.getCell(page, 2, 2).hover();

        for (let row = 2; row <= 3; row++) {
          await checkStyles(locators.getCell(page, row, 1), { 'background-color': cellHoverBg });
        }
      });

      await test.step('Verify color when checkbox checked', async () => {
        const firstRowCheckbox = locators.getCell(page, 2, 1).locator('label');
        await firstRowCheckbox.click();
        await locators.collapse(page).waitFor({ state: 'visible' });
        for (let row = 2; row <= 3; row++) {
          await checkStyles(locators.getCell(page, row, 1), { 'background-color': cellSelectedHoverBg });
        }
      });

      await test.step('Verify color when parent hovered', async () => {
        await locators.getCell(page, 2, 2).hover();

        for (let row = 2; row <= 3; row++) {
          await checkStyles(locators.getCell(page, row, 1), { 'background-color': cellSelectedHoverBg });
        }
      });

      await test.step('Verify color when child cell hovered', async () => {
        await locators.getCell(page, 3, 3).hover();

        await checkStyles(locators.getCell(page, 2, 1), { 'background-color': cellSelectedHoverBg });
        await checkStyles(locators.getCell(page, 2, 2), { 'background-color': cellSelectedHoverBg });
        await checkStyles(locators.getCell(page, 2, 3), { 'background-color': cellSelectedBg });
        await checkStyles(locators.getCell(page, 3, 3), { 'background-color': cellSelectedHoverBg });
      });

      await test.step('Verify no console errors', async () => {
        expect(consoleErrors, `Console errors found:\n${consoleErrors.join('\n')}`).toHaveLength(0);
      });
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Loading states', () => {
    test('Verify empty table scroll\'s state when column width is defined', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/table-states-tests/nothing-found-with-fixed-column-width.tsx', 'en');

      const head = locators.row(page, 1);
      let hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

      expect(hasScroll).toBe(false);

      await page.setViewportSize({ width: 500, height: 700 });

      hasScroll = await head.evaluate((node) => (node.scrollWidth - node.clientWidth) > 0);

      expect(hasScroll).toBe(true);
    });

    test('Verify focus after loading is finished', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/table-states-tests/loading-in-scroll.tsx', 'en');
      const spin = page.locator('svg[data-ui-name="Spin"]');
      await test.step('Verify Focus returns in cell when focus was in table and loading finished', async () => {
        await locators.dataTable(page).waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await expect(locators.getCell(page, 2, 1)).toBeFocused();
        await spin.waitFor({ state: 'visible' });
        await spin.waitFor({ state: 'hidden' });
        await expect(locators.getCell(page, 2, 1)).toBeFocused();
      });

      await test.step('Verify Focus not goes in cell when focus was outside the table and loading finished', async () => {
        await loadPage(page, 'stories/components/data-table/tests/examples/table-states-tests/loading-in-scroll.tsx', 'en');
        await locators.dataTable(page).waitFor({ state: 'visible' });
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');

        await spin.waitFor({ state: 'visible' });
        await spin.waitFor({ state: 'hidden' });
        await expect(locators.getCell(page, 2, 1)).not.toBeFocused();
      });
    });
  });

  test.describe('Selectable rows ', () => {
    test('Verify empty data with selectable rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox-in-table-with-no-data.tsx', 'en');

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      await expect(selectAllCheckbox).not.toBeChecked();
    });

    test('Verify table with checkbox attributes and mouse interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

      const firstHeader = locators.getHeadColumn(page, 1);
      const firstColumnCells = page.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
      const headerCheckbox = firstHeader.locator('input');
      const region = page.locator('[aria-label="Table action bar"]');
      const collapse = locators.collapse(page);
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
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
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
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify action bar when one item on next page unchecked', async () => {
        await rowCheckboxes.first().click();

        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
        for (let i = 1; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify action bar when next page opened', async () => {
        await nextButton.click();

        await expect(selectAllCheckbox).not.toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });

      await test.step('Verify indeterminate state saved when prev button is opened', async () => {
        await prevButton.click();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
        await expect(rowCheckboxes.first()).not.toBeChecked();
        for (let i = 1; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
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

    test('Verify table with checkbox keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

      const firstHeader = locators.getHeadColumn(page, 1);
      const firstColumnCells = page.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
      const headerCheckbox = firstHeader.locator('input');
      const collapse = locators.collapse(page);
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

        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });
      await test.step('Verify panel state when next page opened', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('5');
        await expect(selectAllCheckbox).not.toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });
      await test.step('Verify panel when activating Select all on text page', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');
        await expect(selectedRowsCount).toHaveText('10');
        await expect(selectAllCheckbox).toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify counter on the panel decreased and indeterminate state when uncheck one checkbox', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');
        await expect(rowCheckboxes.nth(0)).toBeChecked();

        await expect(rowCheckboxes.nth(1)).not.toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
        for (let i = 2; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });
      await test.step('Verify panel when opening next page', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await expect(selectAllCheckbox).not.toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });
      await test.step('Verify panel state saved on prev pages', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
        await expect(rowCheckboxes.nth(0)).toBeChecked();

        await expect(rowCheckboxes.nth(1)).not.toBeChecked();
        for (let i = 2; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');
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

    test('Verify select rows with Shift', {
      tag: [
        TAG.KEYBOARD,
        TAG.MOUSE,

        '@data-table',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en');

      const firstCell = locators.getCell(page, 3, 1);
      const secondCell = locators.getCell(page, 7, 1);

      await firstCell.locator('label').click();
      await secondCell.locator('label').click({ modifiers: ['Shift'] });

      for (let i = 3; i <= 7; i++) {
        await expect(locators.getCell(page, i, 1).locator('input')).toBeChecked();
      }

      await locators.getCell(page, 5, 1).locator('label').click({ modifiers: ['Shift'] });

      for (let i = 5; i <= 7; i++) {
        await expect(locators.getCell(page, i, 1).locator('input')).not.toBeChecked();
      }

      await locators.getCell(page, 9, 1).locator('label').click({ modifiers: ['Shift'] });
      for (let i = 5; i <= 8; i++) {
        await expect(locators.getCell(page, i, 1).locator('input')).not.toBeChecked();
      }
      await expect(locators.getCell(page, 9, 1).locator('input')).toBeChecked();
    });

    test('Verify select rows with Shift when checkbox in merged cells', {
      tag: [
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@data-table',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/selectable_with_merged_rows.tsx', 'en');

      const firstCell = locators.getCell(page, 2, 1);
      const secondCell = locators.getCell(page, 4, 1);

      await firstCell.locator('label').click();
      await secondCell.locator('label').click({ modifiers: ['Shift'] });

      await expect(locators.getCell(page, 2, 1).locator('input')).toBeChecked();
      await expect(locators.getCell(page, 4, 1).locator('input')).toBeChecked();

      await locators.getCell(page, 8, 1).locator('label').click({ modifiers: ['Shift'] });

      await expect(locators.getCell(page, 2, 1).locator('input')).toBeChecked();
      await expect(locators.getCell(page, 4, 1).locator('input')).toBeChecked();
      await expect(locators.getCell(page, 6, 1).locator('input')).toBeChecked();
      await expect(locators.getCell(page, 8, 1).locator('input')).toBeChecked();
    });

    test('Verify keyboard interaction when checkbox in merged cells', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/selectable_with_merged_rows.tsx', 'en');

      await test.step('Verify Focus on checkbox', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 2, 1).locator('input')).toBeFocused();
      });

      await test.step('Verify navigation to the 1st child', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await expect(locators.getCell(page, 2, 3)).toBeFocused();
      });
      await test.step('Verify focus returns to checkbox', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowLeft');
        await expect(locators.getCell(page, 2, 1).locator('input')).toBeFocused();
      });
      await test.step('Verify navigation from non merged to merged', async () => {
        for (let i = 0; i < 4; i++)
          await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 10, 1).locator('input')).toBeFocused();
        await page.keyboard.press('ArrowUp');
        await expect(locators.getCell(page, 8, 1).locator('input')).toBeFocused();
      });
      await test.step('Verify navigation from 2nd child outside the table and back', async () => {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 9, 4)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next')).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(locators.getCell(page, 9, 4)).toBeFocused();
      });
      await test.step('Verify navigation from last child outside the table and back', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(locators.getCell(page, 9, 5)).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next')).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(locators.getCell(page, 9, 5)).toBeFocused();
      });
    });

    test('Verify aria-live announcement when all rows selected via header checkbox', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const announcer = page.locator('[role="status"][aria-live="polite"]');
      await expect(announcer.first()).toBeAttached();

      await test.step('Verify no announcement before any interaction', async () => {
        await expect(announcer.first()).toBeEmpty();
      });

      await test.step('Verify "All items selected" announced when header checkbox clicked', async () => {
        await selectAllCheckbox.click();
        await expect(announcer.first()).toHaveText('Actions are available before the table');
      });
    });

    test('Verify aria-live announcement on partial row selection', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');
      const announcer = page.locator('[role="status"][aria-live="polite"]');

      await test.step('Verify announcement when single row checked', async () => {
        await rowCheckboxes.first().click();
        await expect(announcer.first()).not.toBeEmpty();
        await expect(announcer.first()).toHaveText('Actions are available before the table');
      });
    });
  });

  test.describe('SelectableRows (legacy API)', () => {
    test('Verify SelectableRows empty data with selectable rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox-in-table-with-no-data.tsx', 'en', { reactive: false });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      await expect(selectAllCheckbox).not.toBeChecked();
    });

    test('Verify SelectableRows checkbox attributes and mouse interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const headerCheckbox = locators.getHeadColumn(page, 1).locator('input');
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify header checkbox has aria-label', async () => {
        await expect(headerCheckbox).toHaveAttribute('aria-label', 'All items');
      });

      await test.step('Verify no selection initially', async () => {
        await expect(selectAllCheckbox).not.toBeChecked();
        await expect(rowCheckboxes.first()).not.toBeChecked();
      });

      await test.step('Verify single row selection by click', async () => {
        await rowCheckboxes.first().click();
        await expect(rowCheckboxes.first()).toBeChecked();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      await test.step('Verify single row deselection by click', async () => {
        await rowCheckboxes.first().click();
        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectAllCheckbox).not.toBeChecked();
      });

      await test.step('Verify select all by header checkbox', async () => {
        await selectAllCheckbox.click();
        await expect(selectAllCheckbox).toBeChecked();

        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        }
      });

      await test.step('Verify deselect all by header checkbox', async () => {
        await selectAllCheckbox.click();
        await expect(selectAllCheckbox).not.toBeChecked();

        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
        }
      });

      await test.step('Verify indeterminate state', async () => {
        await selectAllCheckbox.click();
        await rowCheckboxes.first().click();

        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });
    });

    test('Verify SelectableRows keyboard navigation and selection', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const headerCheckbox = locators.getHeadColumn(page, 1).locator('input');
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify header checkbox focused by Tab', async () => {
        await page.keyboard.press('Tab');
        await expect(headerCheckbox).toBeFocused();
      });

      await test.step('Verify select all by Space on header', async () => {
        await page.keyboard.press('Space');

        await expect(selectAllCheckbox).toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        }
      });

      await test.step('Verify deselect all by Space on header', async () => {
        await page.keyboard.press('Space');

        await expect(selectAllCheckbox).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
        }
      });

      await test.step('Verify single row selection by keyboard', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');

        await expect(rowCheckboxes.first()).toBeChecked();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      await test.step('Verify single row deselection by keyboard', async () => {
        await page.keyboard.press('Space');

        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectAllCheckbox).not.toBeChecked();
      });
    });

    test('Verify SelectableRows with pagination mouse interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false, pagination: true });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const collapse = locators.collapse(page);
      const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
      const deselectAllButton = collapse.locator('button');
      const nextButton = page.locator('[data-ui-name="Pagination.NextPage"]');
      const prevButton = page.locator('[data-ui-name="Pagination.PrevPage"]');
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify no action bar when nothing selected', async () => {
        await expect(collapse).toBeHidden();
        await expect(selectAllCheckbox).not.toBeChecked();
      });

      await test.step('Verify action bar when header checkbox is checked', async () => {
        await selectAllCheckbox.click();
        await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('5');
        await expect(selectAllCheckbox).toBeChecked();
      });

      await test.step('Verify action bar persists when navigating to next page', async () => {
        await nextButton.click();

        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('5');
        await expect(selectAllCheckbox).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });

      await test.step('Verify counter increases when selecting on next page', async () => {
        await selectAllCheckbox.click();

        await expect(selectedRowsCount).toHaveText('10');
        await expect(selectAllCheckbox).toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify indeterminate when one row unchecked', async () => {
        await rowCheckboxes.first().click();

        await expect(rowCheckboxes.first()).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 1; i < count; i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      await test.step('Verify counter on next page', async () => {
        await nextButton.click();

        await expect(selectAllCheckbox).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
      });

      await test.step('Verify indeterminate state saved when prev button clicked', async () => {
        await prevButton.click();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
        await expect(rowCheckboxes.first()).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 1; i < count; i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify deselect all clears everything', async () => {
        await deselectAllButton.click();

        await expect(collapse).toBeHidden();
        await expect(selectAllCheckbox).not.toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();

        await nextButton.click();
        await expect(selectAllCheckbox).not.toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });
    });

    test('Verify SelectableRows with pagination keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false, pagination: true });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const collapse = locators.collapse(page);
      const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify select all via keyboard', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('5');
        await expect(selectAllCheckbox).toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify navigate to next page', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('5');
        await expect(selectAllCheckbox).not.toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });

      await test.step('Verify select all on second page', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');
        await expect(selectedRowsCount).toHaveText('10');
        await expect(selectAllCheckbox).toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
      });

      await test.step('Verify uncheck single row', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');
        await expect(rowCheckboxes.nth(0)).toBeChecked();
        await expect(rowCheckboxes.nth(1)).not.toBeChecked();
        for (let i = 2; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        await expect(selectedRowsCount).toHaveText('9');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      if (browserName === 'webkit') return;

      await test.step('Verify deselect all via keyboard', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');

        await expect(collapse).toBeHidden();
        await expect(selectAllCheckbox).not.toBeChecked();
        for (let i = 0; i < await rowCheckboxes.count(); i++)
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
      });
    });

    test('Verify SelectableRows select rows with Shift', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@data-table',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });

      const firstCell = locators.getCell(page, 3, 1);
      const secondCell = locators.getCell(page, 7, 1);

      await test.step('Verify Shift+click selects range', async () => {
        await firstCell.locator('label').click();
        await secondCell.locator('label').click({ modifiers: ['Shift'] });

        for (let i = 3; i <= 7; i++) {
          await expect(locators.getCell(page, i, 1).locator('input')).toBeChecked();
        }
      });

      await test.step('Verify Shift+click deselects partial range', async () => {
        await locators.getCell(page, 5, 1).locator('label').click({ modifiers: ['Shift'] });

        for (let i = 5; i <= 7; i++) {
          await expect(locators.getCell(page, i, 1).locator('input')).not.toBeChecked();
        }
      });

      await test.step('Verify Shift+click on unchecked range', async () => {
        await locators.getCell(page, 9, 1).locator('label').click({ modifiers: ['Shift'] });
        for (let i = 5; i <= 8; i++) {
          await expect(locators.getCell(page, i, 1).locator('input')).not.toBeChecked();
        }
        await expect(locators.getCell(page, 9, 1).locator('input')).toBeChecked();
      });
    });

    test('Verify SelectableRows Shift selection with merged rows', {
      tag: [
        TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@data-table',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false, mergedRows: true });

      const firstCell = locators.getCell(page, 2, 1);
      const secondCell = locators.getCell(page, 4, 1);

      await test.step('Verify Shift+click selects range in merged rows', async () => {
        await firstCell.locator('label').click();
        await secondCell.locator('label').click({ modifiers: ['Shift'] });

        await expect(locators.getCell(page, 2, 1).locator('input')).toBeChecked();
        await expect(locators.getCell(page, 4, 1).locator('input')).toBeChecked();
      });

      await test.step('Verify Shift+click extends selection in merged rows', async () => {
        await locators.getCell(page, 8, 1).locator('label').click({ modifiers: ['Shift'] });

        await expect(locators.getCell(page, 2, 1).locator('input')).toBeChecked();
        await expect(locators.getCell(page, 4, 1).locator('input')).toBeChecked();
        await expect(locators.getCell(page, 6, 1).locator('input')).toBeChecked();
        await expect(locators.getCell(page, 8, 1).locator('input')).toBeChecked();
      });
    });

    test('Verify SelectableRows with merged rows mouse interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false, mergedRows: true });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const collapse = locators.collapse(page);
      const selectedRowsCount = collapse.locator('[data-ui-name="Text"]').nth(1);
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify single row selection in merged group', async () => {
        await rowCheckboxes.first().click();
        await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

        await expect(rowCheckboxes.first()).toBeChecked();
        await expect(collapse).toBeVisible();
        await expect(selectedRowsCount).toHaveText('1');
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      await test.step('Verify deselection', async () => {
        await rowCheckboxes.first().click();
        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectAllCheckbox).not.toBeChecked();
      });

      await test.step('Verify select all with merged rows', async () => {
        await selectAllCheckbox.click();
        await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

        await expect(selectAllCheckbox).toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).toBeChecked();
        }
      });

      await test.step('Verify deselect all with merged rows', async () => {
        await selectAllCheckbox.click();
        await expect(selectAllCheckbox).not.toBeChecked();
        const count = await rowCheckboxes.count();
        for (let i = 0; i < count; i++) {
          await expect(rowCheckboxes.nth(i)).not.toBeChecked();
        }
      });
    });

    test('Verify SelectableRows with merged rows keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false, mergedRows: true });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');

      await test.step('Verify focus on header checkbox', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.getHeadColumn(page, 1).locator('input')).toBeFocused();
      });

      await test.step('Verify select all via keyboard', async () => {
        await page.keyboard.press('Space');
        await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });

        await expect(selectAllCheckbox).toBeChecked();
      });

      await test.step('Verify navigate to row checkbox and deselect', async () => {
        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 2, 1).locator('input')).toBeFocused();

        await page.keyboard.press('Space');
        await expect(rowCheckboxes.first()).not.toBeChecked();
        await expect(selectAllCheckbox).toHaveClass(/indeterminate/);
      });

      await test.step('Verify re-select row', async () => {
        await page.keyboard.press('Space');
        await expect(rowCheckboxes.first()).toBeChecked();
        await expect(selectAllCheckbox).toBeChecked();
      });
    });

    test('Verify aria-live announcement when all rows selected via header checkbox', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });

      const selectAllCheckbox = page.locator('[data-ui-name="DataTable.Head"] [data-ui-name="Checkbox"]');
      const announcer = page.locator('[role="status"][aria-live="polite"]').first();
      await expect(announcer).toBeAttached();
      await test.step('Verify "All items selected" announced when header checkbox clicked', async () => {
        await selectAllCheckbox.click();
        await expect(announcer).toHaveText('Action bar appeared before the table');
      });
    });

    test('Verify aria-live announcement on partial row selection', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox.tsx', 'en', { reactive: false });

      const rowCheckboxes = page.locator('[data-ui-name="DataTable.Body"] [data-ui-name="Checkbox"]');
      const announcer = page.locator('[role="status"][aria-live="polite"]').first();

      await test.step('Verify announcement when single row checked', async () => {
        await page.waitForTimeout(500);
        await rowCheckboxes.first().click();
        await expect(announcer).toHaveText('Action bar appeared before the table');
      });
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
      test(`Verify limited state for base table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/limited-mode.tsx', 'en', item);

        const columnsCount = await page.getByRole('columnheader').count();
        const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          const visibleRowsLocator = page.locator('div[data-ui-name="Row"][role="row"]:not([aria-hidden="true"])');
          if (limitedRows === rowsCount && limitedColumns < columnsCount) {
            const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          expect(cssValue).toContain('blur(6px)');
        });
      });

      test(`Verify limited state for checkbox in table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/checkboxes.tsx', 'en', item);

        const columnsCount = await page.getByRole('columnheader').count();
        const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          const visibleRowsLocator = page.locator('div[data-ui-name="Row"][role="row"]:not([aria-hidden="true"])');
          if (limitedRows === rowsCount && limitedColumns < columnsCount) {
            const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          const visibleRowsLocator = page.locator('div[data-ui-name="Row"][role="row"]:not([aria-hidden="true"])');
          if (limitedRows === rowsCount && limitedColumns < columnsCount) {
            const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          expect(cssValue).toContain('blur(6px)');
        });

        await test.step('Verify overlay shown and aria attributes on the last page', async () => {
          await locators.button(page, 'Last page #').click();
          const columnsCount = await page.getByRole('columnheader').count();
          const rows = page.locator('div[data-ui-name="Row"][role="row"]');
          const rowsCount = await rows.count();
          const limitedContent = page.locator('div[class*="LimitOverlay"]').first();

          if (rowsCount <= item.rowsLimit) {
            await expect(limitedContent).not.toBeVisible();
          } else {
            await expect(limitedContent).toBeVisible();

            await expect(limitedCell).toHaveAttribute('tabindex', '-1');

            const visibleRowsLocator = page.locator('div[data-ui-name="Row"][role="row"]:not([aria-hidden="true"])');
            if (limitedRows === rowsCount && limitedColumns < columnsCount) {
              const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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
      });

      test(`Verify limited state for accordion in table when rowsLimit=${item.rowsLimit} columnsLimit=${item.columnsLimit}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx', 'en', item);

        const columnsCount = await page.getByRole('columnheader').count();
        const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          const visibleRowsLocator = page.locator('div[data-ui-name="Row"][role="row"]:not([aria-hidden="true"])');
          if (limitedRows === rowsCount && limitedColumns < columnsCount) {
            const rows = page.locator('div[data-ui-name="Row"][role="row"]');
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

          expect(cssValue).toContain('blur(6px)');
        });
      });
    });

    test(`Verify limited state for base table keyboard interactions when overlay has one interactive element`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/limited-mode.tsx', 'en', { rowsLimit: 2, columnsLimit: 1 });

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

    test(`Verify limited state for base table keyboard interactions when overlay has few interactive element`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/sortable-table.tsx', 'en', { rowsLimit: 2, columnsLimit: 1 });

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

    test(`Verify limited state for table with rows and columns merging keyboard interactions when overlay without interactive element`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/row-and-column-merging.tsx', 'en', { rowsLimit: 1, columnsLimit: 2 });

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

    test(`Verify limited state for table with accordion keyboard and mouse interactions`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      test.skip(browserName === 'webkit', 'Flaky focus handling in webkit');
      await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx', 'en', { rowsLimit: 1, columnsLimit: 2 });

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
        await page.getByText('Nothing found').waitFor({ state: 'visible' });
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(async () => {
          await expect(locators.toggle(page).nth(3)).toBeFocused();
        }).toPass({ timeout: 5000 });
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
      });
      await test.step('Verify clicking on row with accordion activated it when row partly overlayed', async () => {
        const box2 = await locators.row(page, 5).getByRole('gridcell').nth(1).boundingBox();
        if (box2) {
          await page.mouse.click(box2.x + 10, box2.y + 5);
        }
        await expect(locators.rowTableInTable(page, 2, 5).getByRole('gridcell').first()).not.toBeVisible();
      });

      await test.step('Verify row doesn\'t expand accordion when it\'s under overlay', async () => {
        await loadPage(page, 'stories/components/data-table/tests/examples/limited-mode/accordion.tsx', 'en', { rowsLimit: 0, columnsLimit: 0 });

        await locators.toggle(page).first().click({ force: true });
        await locators.rowTableInTable(page, 2, 4).waitFor({ state: 'detached' });
        await expect(locators.rowTableInTable(page, 2, 5).getByRole('gridcell').first()).not.toBeVisible();
      });
    });
  });
});
