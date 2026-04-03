import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, checkStyles, stylesActiveHovered, stylesNotActive } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Accordion in table', () => {
    test('Verify accordion with custom component styles', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-button-not-in-accordion-cell.tsx', 'en');

      await test.step('Verify toggle styles', async () => {
        const toggles = locators.toggle(page);
        await checkStyles(toggles, { 'margin-right': '12px' });
      });

      await locators.toggle(page).first().click();
      await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
      await expect(locators.chart(page, 'Chart')).toHaveCount(1);

      await test.step('Verify cells styles when accordion expanded in 1st cell', async () => {
        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');
        await checkStyles(cells, { 'background-color': 'rgb(230, 231, 237)' });

        await locators.toggle(page).first().hover();
        await checkStyles(cells, { 'background-color': 'rgb(230, 231, 237)' });
      });

      await test.step('Verify styles of cell with accordion', async () => {
        await checkStyles(locators.row(page, 3).locator('[data-ui-name="Row.Cell"]').first(), {
          'background-color': 'rgb(244, 245, 249)',
        });

        await checkStyles(locators.row(page, 3).locator('[data-ui-name="Row.Cell"]').first(), {
          padding: '12px',
        });
      });

      await test.step('Verify styles of the cell with accordion', async () => {
        await locators.toggle(page).first().click();
        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');
        await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
        if (browserName !== 'firefox') {
          await checkStyles(cells, {
            'background-color': 'rgb(240, 240, 244)',
          });
        }
      });

      await test.step('Verify cells styles when accordion not in 1st cell', async () => {
        await locators.toggle(page).nth(1).click();
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await locators.toggle(page).first().hover();

        const cells3 = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]');

        const cellCount3 = await cells3.count();
        for (let i = 0; i < cellCount3 - 1; i++) {
          const cell = cells3.nth(i);
          await checkStyles(cell, { 'background-color': 'rgb(255, 255, 255)' });
        }
        await checkStyles(cells3.nth(3), { 'background-color': 'rgb(230, 231, 237)' });

        await locators.toggle(page).nth(1).hover();
        await checkStyles(cells3.nth(3), { 'background-color': 'rgb(230, 231, 237)' });

        if (browserName !== 'firefox')
          for (let i = 0; i < cellCount3 - 1; i++) {
            const cell = cells3.nth(i);
            await checkStyles(cell, { 'background-color': 'rgb(240, 240, 244)' });
          }
      });
    });

    test('Verify accordion and custom component inside after keyboard interactions ', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-button-not-in-accordion-cell.tsx', 'en', { h: '100%' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
      await page.waitForTimeout(500); // for chart animation is finished (webkit needs more time)

      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });

    test('Verify table component inside accordion', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-sorting.tsx', 'en');

      const sortIconKeywordAcc = locators.row(page, 4).locator('[data-ui-name="ButtonLink"]');

      await test.step('Verify table component expands by activating the toggle', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowDown');
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');

        await expect(sortIconKeywordAcc).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.collapse(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(200);
        await page.keyboard.press('ArrowDown');
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify accordion with renderCell function for parent', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-render-cell.tsx', 'en');

      await test.step('Verify accordion expanded', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');

        await locators.collapse(page).waitFor({ state: 'visible' });
        await page.keyboard.press('ArrowDown');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify styles when they changed via renderCell', async () => {
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');

        await locators.collapse(page).waitFor({ state: 'hidden' });
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');

        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);
        if (browserName !== 'firefox')
          await checkStyles(locators.row(page, 5).locator('[data-ui-name="Row.Cell"]').first(), {
            padding: '0px',
          });
        else
          await checkStyles(locators.row(page, 5).locator('[data-ui-name="Row.Cell"]').first(), {
            padding: '0%',
          });
      });
    });

    const variantWithScrollBar = [
      { withScrollBar: true },
      { withScrollBar: false },
    ];
    variantWithScrollBar.forEach((item) => {
      test(`Verify accordion with fixed Column withScrollBar=${item.withScrollBar}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-fixed-column.tsx', 'en', item);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.collapse(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        if (browserName === 'webkit')
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
        else await expect(page).toHaveScreenshot();
      });
    });

    test('Verify table with checkbox and accordion not in 1st cell', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table',
        '@pagination'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_with_pagination.tsx', 'en');

      await locators.toggle(page).first().click();
      await page.locator('[data-ui-name="Checkbox"]').nth(0).click();
      await page.waitForTimeout(50);

      const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');
      const cellCount = await cells.count();

      await test.step('Verify cells when expanded accordion not in 1st cell and checkbox is checked', async () => {
        for (let i = 0; i < cellCount - 2; i++) {
          const cell = cells.nth(i);
          await checkStyles(cell, {
            'background-color': stylesNotActive[1],
          });
        }

        await checkStyles(cells.nth(cellCount - 1), {
          'background-color': stylesActiveHovered[1],
        });
      });
      await test.step('Verify cells when expanded accordion not in 1st cell and checkbox is checked and row hovered', async () => {
        const box = await locators.row(page, 2).getByRole('gridcell').nth(1).boundingBox();
        if (box) {
          await page.mouse.move(box.x + 10, box.y + 5);
        }

        if (browserName !== 'firefox') {
          for (let i = 0; i < cellCount; i++) {
            await checkStyles(cells, {
              'background-color': stylesActiveHovered[1],
            });
          }
        }
      });
      await expect(page).toHaveScreenshot();
    });

    const variantExample = [
      { variant: 'card', sideIndents: undefined },
      { variant: 'card', sideIndents: 'wide' },
      { variant: undefined, sideIndents: undefined },
      { variant: 'default', sideIndents: undefined },
      { variant: 'default', sideIndents: 'wide' },
    ];
    variantExample.forEach((item) => {
      test(`Verify checkbox and accordion in first cell mouse interactions when variant=${item.variant} and sedeIndents=${item.sideIndents}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table',
          '@d3-chart'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_with_checkbox.tsx', 'en', item);

        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');
        await page.locator('[data-ui-name="Checkbox"]').nth(1).click();
        const accordion = page.locator('[role="gridcell"][aria-level="2"]');

        await locators.toggle(page).first().click();
        await locators.collapse(page).waitFor({ state: 'visible' });
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[1],
        });

        await checkStyles(accordion, {
          'background-color': stylesNotActive[2],
        });

        await expect(page).toHaveScreenshot();

        if (item.variant == 'card' || item.sideIndents == 'wide') {
          const paddingRight = await accordion.evaluate((el) => {
            return window.getComputedStyle(el).paddingRight;
          });
          const paddingLeft = await accordion.evaluate((el) => {
            return window.getComputedStyle(el).paddingLeft;
          });

          expect(paddingRight).toBe('20px');
          expect(paddingLeft).toBe('20px');
        }
      });
    });

    test('Verify accordion with themed rows', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/themed-parent-rows.tsx', 'en');

      await test.step('Verify success theme', async () => {
        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

        await checkStyles(cells, {
          'background-color': stylesNotActive[0],
        });

        await locators.toggle(page).first().click();
        await page.getByText('Nothing found').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[0],
        });

        await locators.toggle(page).first().click();
        await page.getByText('Nothing found').waitFor({ state: 'hidden' });
      });

      await test.step('Verify info theme', async () => {
        const cells = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]');
        await checkStyles(cells, {
          'background-color': stylesNotActive[1],
        });

        await locators.toggle(page).nth(1).click();
        await page.getByText('Nothing found').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[1],
        });
        await locators.toggle(page).nth(1).click();
        await page.getByText('Nothing found').waitFor({ state: 'hidden' });
      });

      await test.step('Verify muted theme', async () => {
        const cells = locators.row(page, 4).locator('[data-ui-name="Row.Cell"]');
        await checkStyles(cells, {
          'background-color': stylesNotActive[2],
        });

        await locators.toggle(page).nth(2).click();
        await page.getByText('Nothing found').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[2],
        });
        await locators.toggle(page).nth(2).click();
        await page.getByText('Nothing found').waitFor({ state: 'hidden' });
      });

      await test.step('Verify warning theme', async () => {
        const cells = locators.row(page, 5).locator('[data-ui-name="Row.Cell"]');

        await checkStyles(cells, {
          'background-color': stylesNotActive[3],
        });

        await locators.toggle(page).nth(3).click();
        await page.getByText('Nothing found').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[3],
        });
        await locators.toggle(page).nth(3).click();
        await page.getByText('Nothing found').waitFor({ state: 'hidden' });
      });

      await test.step('Verify danger theme', async () => {
        const cells = locators.row(page, 6).locator('[data-ui-name="Row.Cell"]');

        await checkStyles(cells, {
          'background-color': stylesNotActive[4],
        });

        await locators.toggle(page).nth(4).click();
        await page.getByText('Nothing found').waitFor({ state: 'visible' });

        await checkStyles(cells, {
          'background-color': stylesActiveHovered[4],
        });
      });
    });

    test('Verify accordion with themed cells', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table',
        '@base-components'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/colored-parent-cells', 'en');

      const cells = locators.row(page, 2).getByRole('gridcell');
      const cellCount = await cells.count();

      await test.step('Verify expanded state', async () => {
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          await checkStyles(cell, {
            'background-color': stylesActiveHovered[i],
          });
        }
      });
      await test.step('Verify hovered state', async () => {
        if (browserName === 'firefox') test.skip();
        await locators.toggle(page).click();
        await locators.toggle(page).hover();
        await locators.collapse(page).waitFor({ state: 'hidden' });
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          await checkStyles(cell, {
            'background-color': stylesActiveHovered[i],
          });
        }
      });

      await test.step('Verify initial state', async () => {
        const box = await page.getByRole('columnheader').first().boundingBox();

        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        }

        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          await checkStyles(cell, {
            'background-color': stylesNotActive[i],
          });
        }
      });
    });

    test('Verify cell with merged rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_in_merged_rows.tsx', 'en');

      const spannedCell = page.locator('[data-ui-name="Body.Row"] div[aria-rowspan="3"]');

      await spannedCell.click();
      await locators.collapse(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Table in table', () => {
    test('Verify table in table styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en');

      const toggles = locators.toggle(page);

      await test.step('Verify toggle styles', async () => {
        await checkStyles(toggles, { 'margin-right': '12px' });
      });

      await test.step('Verify toggle styles when one expanded', async () => {
        await locators.toggle(page).first().click();
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        await page.waitForTimeout(200);
        await checkStyles(toggles, { 'margin-right': '12px' });
      });
      await test.step('Verify cells in expanded state style', async () => {
        const cells2 = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

        await checkStyles(cells2, {
          'background-color': 'rgb(230, 231, 237)',
        });
      });
      await test.step('Verify accordion cells style', async () => {
        const cells = locators.rowTableInTable(page, 2, 1).locator('[data-ui-name="Row.Cell"]');

        await checkStyles(cells, {
          'background-color': 'rgb(244, 245, 249)',
        });

        await checkStyles(cells, { 'padding-left': '38px' });
      });

      await test.step('Verify accordion is responsive', async () => {
        await page.setViewportSize({ width: 920, height: 1080 });
        await locators.toggle(page).first().waitFor({ state: 'visible' });
        await locators.rowTableInTable(page, 2, 3).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.02 });
      });
    });

    test('Verify table in table with sorting', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-sorting.tsx', 'en');

      await page.keyboard.press('Tab');

      for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });

      for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');

      await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100); // just make sure that sorting happened
      await expect(page).toHaveScreenshot();

      locators.button(page, 'ascending').click();
      await page.waitForTimeout(100); // just make sure that sorting happened

      await expect(page).toHaveScreenshot();
    });

    const variantWithScrollBar = [
      { withScrollBar: true },
      { withScrollBar: false },
    ];
    variantWithScrollBar.forEach((item) => {
      test(`Verify accordion with fixed column withScrollBar=${item.withScrollBar}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-fixed-column.tsx', 'en', item);

        await new Promise((resolve) => setTimeout(resolve, 1000)); // need this for AccordionRows grid calculations after rendering
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        if (browserName === 'webkit')
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
        else await expect(page).toHaveScreenshot();
      });
    });

    const variantJustifyContent = [
      { justifyContent: 'flex-start' },
      { justifyContent: 'flex-end' },
      { justifyContent: 'center' },
    ];
    variantJustifyContent.forEach((item) => {
      test(`Verify accordion with justifyContent=${item.justifyContent}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/for-animation-and-justify-content-test', 'en', item);

        await new Promise((resolve) => setTimeout(resolve, 1000)); // need this for AccordionRows grid calculations after rendering
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
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
  test.describe('Accordion in table', () => {
    test('Verify keyboard navigation when table component inside accordion', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-sorting.tsx', 'en');

      const sortIconKeywordAcc = locators.row(page, 4).locator('[data-ui-name="ButtonLink"]');

      await test.step('Verify initial rowcount', async () => {
        await expect(locators.dataTable(page).first()).toHaveAttribute('aria-rowcount', '7');
        await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
      });

      await test.step('Verify table component expands by activating the toggle', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowDown');
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');

        await expect(sortIconKeywordAcc).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.dataTable(page).nth(1).waitFor({ state: 'visible' });
      });

      await test.step('Verify rowcount when accordion expanded', async () => {
        await expect(locators.dataTable(page).first()).toHaveAttribute('aria-rowcount', '8');
        await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
      });

      await test.step('Verify child table attributes', async () => {
        const cell = locators.collapse(page).locator('[data-ui-name="Row.Cell"][aria-level="2"]');
        await expect(locators.collapse(page)).toHaveAttribute('aria-rowindex', '5');
        await expect(locators.collapse(page)).toHaveAttribute('role', 'row');
        await expect(cell).toHaveAttribute('tabindex', '-1');
        await expect(cell).toHaveAttribute('role', 'gridcell');
        await expect(cell).toHaveAttribute('aria-colindex', '1');
        await expect(cell).toHaveAttribute('aria-setsize', '1');
        await expect(cell).toHaveAttribute('aria-posinset', '1');
        await expect(locators.dataTable(page).nth(1)).toBeVisible();
      });

      await test.step('Verify child table keyboard navigation when child expanded', async () => {
        await page.keyboard.press('ArrowDown');
        const childFirstRow = locators.dataTable(page).nth(1).locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
        const childFirstCell = childFirstRow.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
        await expect(childFirstCell).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(childFirstCell).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(sortIconKeywordAcc).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(childFirstCell).toBeFocused();

        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowDown');
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');

        const childFLastRow = locators.dataTable(page).nth(1).locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
        const childlastCell = childFLastRow.locator('[data-ui-name="Row.Cell"][aria-colindex="4"]');
        await expect(childlastCell).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(sortIconKeywordAcc).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(childlastCell).toBeFocused();

        await page.keyboard.press('Escape');
      });

      await test.step('Verify keyboard navigation when child table collapsed', async () => {
        await page.keyboard.press('Enter');
        await locators.dataTable(page).nth(1).waitFor({ state: 'hidden' });
        await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
        await page.keyboard.press('ArrowDown');
        const nextRow = locators.dataTable(page).first().locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
        const nextCell = nextRow.locator('[data-ui-name="Row.Cell"][aria-colindex="4"]').first();
        await expect(nextCell).toBeFocused();
      });
    });

    test('Verify table component inside table expands by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-sorting.tsx', 'en');

      const sortIconKeywordAcc = locators.row(page, 4).locator('[data-ui-name="ButtonLink"]');

      await test.step('Verify table component expands by click on toggle', async () => {
        await sortIconKeywordAcc.click();
        await locators.dataTable(page).nth(1).waitFor({ state: 'visible' });
        await expect(locators.dataTable(page).first()).toHaveAttribute('aria-rowcount', '8');
        await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
        await expect(locators.dataTable(page).nth(1)).toHaveCount(1);
      });

      await test.step('Verify table component collpases by click on toggle', async () => {
        await sortIconKeywordAcc.click();
        await locators.dataTable(page).nth(1).waitFor({ state: 'hidden' });
        await expect(locators.dataTable(page).first()).toHaveAttribute('aria-rowcount', '7');
        await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
        await expect(locators.dataTable(page).nth(1)).toHaveCount(0);
      });
    });

    test('Verify mouse interaction on a cell with merged rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_in_merged_rows.tsx', 'en');

      const spannedCell = page.locator('[data-ui-name="Body.Row"] div[aria-rowspan="3"]');
      const showDetails = page.locator('[aria-label="Show details"]').first();

      await expect(locators.collapse(page)).toBeHidden();

      await spannedCell.click();
      await expect(locators.collapse(page)).toBeVisible();

      await showDetails.click();
      await expect(locators.collapse(page)).toBeHidden();
    });

    test('Verify keyboard interaction on a cell with merged rows', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_in_merged_rows.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.collapse(page).waitFor({ state: 'visible' });
      await expect(locators.collapse(page)).toBeVisible();

      await page.keyboard.press('ArrowDown');
      await expect(locators.collapse(page).locator('[data-ui-name="Row.Cell"]')).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 2, 2)).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.collapse(page).locator('[data-ui-name="Row.Cell"]')).toBeFocused();
    });

    test('Verify base keyboard interactions with accordion ', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-button-not-in-accordion-cell.tsx', 'en');

      await test.step('Verify accordion in 1st cell expands and collapses', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);

        await page.keyboard.press('Enter');
        await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(0);
      });

      await test.step('Verify accordion not expands when pressing TAB on cell without toggle', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(locators.chart(page, 'Chart')).toHaveCount(0);
      });

      await test.step('Verify accordion expands and collapses not from 1st cell', async () => {
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');
        await expect(locators.toggle(page).nth(1)).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);
      });

      await test.step('Verify the focus not swicthed to other cells by arrows when chart is focused', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowDown');
        await expect(locators.toggle(page).nth(2)).toBeFocused();
      });

      await test.step('Verify accordion not expanded when activating other element in cell', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(locators.button(page, 'Click Me')).toBeFocused();
        await page.keyboard.press('Enter');
        await page.keyboard.press('Space');
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);
      });

      await test.step('Verify focus returns to the 1st toggle', async () => {
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowUp');
        await expect(locators.toggle(page).nth(0)).toBeFocused();
      });
    });

    test('Verify base mouse interactions with accordion', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-button-not-in-accordion-cell.tsx', 'en');

      await test.step('Verify accordion collapse and expands when clicking directly on toggle', async () => {
        await locators.toggle(page).nth(0).click();
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);
        await locators.toggle(page).nth(0).click();
        await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(0);
      });

      await test.step('Verify accordion collapse when clicking any cell in row in case accordion in 1st cell', async () => {
        const cells = locators.row(page, 2).locator('[data-ui-name="Box"]');
        const firstBox = await cells.first().boundingBox();
        const lastBox = await cells.nth(3).boundingBox();
        if (firstBox && lastBox) {
          await page.mouse.click(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
          await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
          await expect(locators.chart(page, 'Chart')).toHaveCount(1);
          await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
          await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
          await expect(locators.chart(page, 'Chart')).toHaveCount(0);
          await page.waitForTimeout(250); // needed for next step
        }
      });

      await test.step('Verify accordion collapse logic when clicking cell in case accordion not in 1st cell', async () => {
        const cells = locators.row(page, 3).locator('[data-ui-name="Box"]');

        const firstBox = await cells.first().boundingBox();
        const lastBox = await cells.nth(3).boundingBox();

        if (firstBox && lastBox) {
          await page.mouse.click(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
          await expect(locators.chart(page, 'Chart')).toHaveCount(0);
          await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
          await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
          await expect(locators.chart(page, 'Chart')).toBeVisible();
          await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
          await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
          await expect(locators.chart(page, 'Chart')).not.toBeVisible();
        }
      });

      await test.step('Verify accordion not expands when clicking interactive element in any cell when accordion on 1st', async () => {
        const button = page.getByRole('button', { name: 'Click Me' });
        await button.click();
        await expect(locators.chart(page, 'Chart')).not.toBeVisible();
      });
    });

    test('Verify accordion attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-button-not-in-accordion-cell.tsx', 'en');

      await test.step('Verify cell with accordion attributes', async () => {
        await expect(locators.toggle(page).first()).not.toHaveAttribute('aria-controls');

        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

        await expect(locators.toggle(page).first()).toHaveAttribute('aria-expanded', 'false');
        await expect(cells.nth(1)).not.toHaveAttribute('aria-expanded', 'false');
        await locators.toggle(page).first().click();
        await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
        await expect(locators.chart(page, 'Chart')).toHaveCount(1);
        await expect(locators.toggle(page).first()).toHaveAttribute('aria-expanded', 'true');
        await expect(locators.toggle(page).first()).toHaveAttribute('aria-controls');
        await expect(cells.first()).toHaveAttribute('data-aria-level', '1');
      });

      await test.step('Verify accordion attributes when expanded', async () => {
        const accordion = page.locator('[data-ui-name="Collapse"]');
        await expect(accordion).toHaveAttribute('role', 'row');
        await expect(accordion).toHaveAttribute('aria-rowindex', '3');
        const accordionCell = accordion.locator('[data-ui-name="Row.Cell"]');
        await expect(accordionCell).toHaveAttribute('tabindex', '-1');
        await expect(accordionCell).toHaveAttribute('role', 'gridcell');
        await expect(accordionCell).toHaveAttribute('aria-colindex', '1');
        await expect(accordionCell).toHaveAttribute('aria-level', '2');
        await expect(accordionCell).toHaveAttribute('aria-setsize', '1');
        await expect(accordionCell).toHaveAttribute('aria-posinset', '1');
      });
    });

    test('Verify mouse inreaction when interactive element inside cell with toggle', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@data-table',
        '@select',
        '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-interactive-elements-in-cell-with-toggle.tsx', 'en');

      const firstrowCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');

      await firstrowCell.click();
      await locators.collapse(page).waitFor({ state: 'visible' });

      await firstrowCell.click();
      await locators.collapse(page).waitFor({ state: 'hidden' });

      await locators.toggle(page).nth(1).click();
      await locators.collapse(page).waitFor({ state: 'visible' });

      await locators.toggle(page).nth(1).click();
      await locators.collapse(page).waitFor({ state: 'hidden' });

      await page.getByRole('combobox').first().click();
      await expect(locators.collapse(page)).toHaveCount(0);
    });

    test('Verify keyboard navigation when interactive element inside cell with toggle', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@data-table',
        '@select',
        '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/with-component/with-interactive-elements-in-cell-with-toggle.tsx', 'en');

      const firstrowCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');

      await test.step('Verify focus first cell', async () => {
        await page.keyboard.press('Tab');
        await expect(firstrowCell).toBeFocused();
      });

      await test.step('Verify focus on accrordion toggle inside cell ', async () => {
        await page.keyboard.press('Enter');
        await expect(locators.toggle(page).first()).toBeFocused();
        await expect(locators.collapse(page)).toHaveCount(0);
      });

      await test.step('Verify focus on body cell by escape', async () => {
        await page.keyboard.press('Escape');
        await expect(firstrowCell).toBeFocused();
      });

      if (browserName === 'webkit') test.skip();
      await test.step('Verify focus on the next focusable element by tab', async () => {
        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await expect(locators.collapse(page)).toHaveCount(0);
        await expect(firstrowCell).not.toBeFocused();
        await expect(locators.toggle(page).first()).not.toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.toggle(page).first()).toBeFocused();
      });

      await test.step('Verify accordion can be expanded', async () => {
        await page.keyboard.press('Enter');
        await locators.collapse(page).waitFor({ state: 'visible' });

        await expect(locators.collapse(page)).toHaveCount(1);
      });

      await test.step('Verify accordion not collapsed by esc', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.collapse(page)).toHaveCount(1);
      });
    });

    test('Verify accordion with pagination by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table',
        '@pagination'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/advanced/examples/accordion_with_pagination.tsx', 'en');

      await locators.toggle(page).first().click();
      await locators.collapse(page).waitFor({ state: 'visible' });
      await locators.toggle(page).nth(1).click();
      await locators.collapse(page).nth(1).waitFor({ state: 'visible' });

      await locators.button(page, 'Next').click();

      await expect(locators.collapse(page)).toHaveCount(0);

      await locators.toggle(page).first().click();
      await locators.collapse(page).waitFor({ state: 'visible' });
      await expect(locators.collapse(page)).toHaveCount(1);
      // expanded accordions saved
      await locators.button(page, 'Prev').click();
      await expect(locators.collapse(page)).toHaveCount(2);
    });
  });

  test.describe('Table in table', () => {
    test('Verify table in table attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en');

      await test.step('Verify cell with accordion attributes', async () => {
        const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

        await expect(locators.toggle(page).first()).toHaveAttribute('aria-expanded', 'false');
        await expect(locators.toggle(page).first()).not.toHaveAttribute('aria-controls');

        await expect(cells.nth(1)).not.toHaveAttribute('aria-expanded', 'false');
        await locators.toggle(page).first().click();
        await locators.rowTableInTable(page, 2, 3).waitFor({ state: 'visible' });
        await expect(locators.toggle(page).first()).toHaveAttribute('aria-expanded', 'true');
        await expect(locators.toggle(page).first()).toHaveAttribute('aria-controls');
        await expect(cells.first()).toHaveAttribute('data-aria-level', '1');
      });

      await test.step('Verify child table attributes when expanded', async () => {
        const nestedRows = page.locator('[role="row"][aria-level="2"]');
        const rowCount = await nestedRows.count();

        for (let i = 0; i < rowCount; i++) {
          const row = nestedRows.nth(i);
          const cells = row.locator('[data-ui-name="Row.Cell"]');
          const cellCount = await cells.count();

          for (let j = 0; j < cellCount; j++) {
            const cell = cells.nth(j);
            await expect(cell).toHaveAttribute('role', 'gridcell');
            await expect(cell).toHaveAttribute('aria-colindex');
            await expect(cell).toHaveAttribute('tabindex', '-1');
          }
        }
      });
    });

    test('Verify table in table with sorting keyboard interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/with-sorting.tsx', 'en');

      const row = locators.row(page, 2);
      const headColumnKeyword = page.locator('[data-ui-name="Head.Column"][name="keyword"]');
      const sortIconKeyword = headColumnKeyword.locator('[data-ui-name="ButtonLink"]');
      const headColumnKd = page.locator('[data-ui-name="Head.Column"][name="kd"]');
      const sortIconKd = headColumnKd.locator('[data-ui-name="ButtonLink"]');

      await page.keyboard.press('Tab');

      await test.step('Verify focus on sorting icon', async () => {
        await expect(sortIconKeyword).toBeFocused();
      });

      await test.step('Verify focus on accordion arrow by click downArrow', async () => {
        await page.keyboard.press('ArrowDown');
        await expect(row.locator('[data-ui-name="ButtonLink"]').first()).toBeFocused();
      });

      await test.step('Verify rowcount when accordion not expanded', async () => {
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '7');
        await expect(row.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'false',
        );
      });

      await test.step('Verify table in table expands', async () => {
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        await expect(row.locator('[data-ui-name="ButtonLink"]').first()).toBeFocused();
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '10');
        await expect(row.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
      });

      await test.step('Verify focus table in table cell and back by arrows', async () => {
        await page.keyboard.press('ArrowDown');
        const cell = locators.rowTableInTable(page, 2, 3).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
        await expect(cell).toBeFocused();
        await page.keyboard.press('ArrowUp');
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '10');
        await expect(row.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
      });

      await test.step('Verify focus on the next paren row when child table finished', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        const cell2 = locators.row(page, 6).locator('[data-ui-name="Row.Cell"][aria-colindex="2"]');
        await expect(cell2).toBeFocused();
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '10');
        await expect(row.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
        await page.keyboard.press('Enter');
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '10');
        await page.keyboard.press('ArrowLeft');
        await expect(locators.row(page, 6).locator('[data-ui-name="ButtonLink"]')).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '13');
        await expect(row.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
        await expect(locators.row(page, 6).locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
      });

      await test.step('Verify expanded cell dont collapse when changing place by sorting', async () => {
        await page.keyboard.press('ArrowRight');
        for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowUp');

        await expect(sortIconKd).toBeFocused();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(250);
        await expect(locators.dataTable(page)).toHaveAttribute('aria-rowcount', '13');

        const newCell = locators.row(page, 7).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
        await expect(newCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );

        const newCell2 = locators.row(page, 11).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
        await expect(newCell2.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
          'aria-expanded',
          'true',
        );
      });
    });

    test('Verify table in table keyboard navigation when accordionMode=independent', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en', {
        accordionMode: 'independent',
        onAccordionToggle: `function(type, rowId, rowIndex) {
    console.log("Accordion " + type + " for row #" + rowIndex);}`,
      });

      let messages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
          messages.push(msg.text());
        }
      });

      const rows = page.locator('[data-ui-name="Body.Row"]');
      await page.keyboard.press('Tab');

      await test.step('Verify it is possible to scroll the last cell by keyboard when accordion collapsed', async () => {
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
          await page.keyboard.press('ArrowDown');
        }
        const cellinLastRow = locators.row(page, 6).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify it is possible to scroll the last cell by keyboard when first accordion expanded', async () => {
        for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #0']);

        for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');

        const cellinLastRow = locators.row(page, 9).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify it is possible to scroll the last cell by keyboard when second accordion expanded', async () => {
        messages = [];
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #1']);
        for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowDown');

        const cellinLastRow = locators.row(page, 12).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify no issues with keyboard navigation up when second accordion just collapsed', async () => {
        messages = [];

        for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowUp');
        await expect(page.locator('[data-ui-name="ButtonLink"]').nth(1)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'hidden' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion close for row #1']);
        messages = [];

        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #1']);

        for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowUp');

        await expect(locators.toggle(page).first()).toBeFocused();
      });
    });

    test('Verify table in table mouse navigation when accordionMode=independent', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en', {
        accordionMode: 'independent',
        onAccordionToggle: `function(type, rowId, rowIndex) {
    console.log("Accordion " + type + " for row #" + rowIndex);}`,
      });

      if (browserName === 'webkit') test.skip();// disabled for webkit because works in debug mode but lags in docker
      let messages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
          messages.push(msg.text());
        }
      });

      await test.step('Verify accordion expands by toggle click', async () => {
        await locators.toggle(page).first().click();
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #0']);
      });

      await test.step('Verify accordion expands cell click', async () => {
        messages = [];
        const row = page.locator('[aria-rowindex="6"]');
        await row.locator('[data-ui-name="Row.Cell"][aria-colindex="2"]').first().click();
        await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #1']);
      });

      await test.step('Verify accordion collapses by toggle click', async () => {
        messages = [];
        await locators.toggle(page).first().click();
        await locators.rowTableInTable(page, 2, 3).waitFor({ state: 'hidden' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion close for row #0']);
      });

      await test.step('Verify accordion collapses cell click', async () => {
        messages = [];
        const row = locators.row(page, 3);
        await row.getByRole('gridcell').first().click();
        await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'hidden' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion close for row #1']);
      });
    });

    test('Verify table in table keyboard navigation when accordionMode=toggle', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en', {
        accordionMode: 'toggle',
        onAccordionToggle: `function(type, rowId, rowIndex) {
    console.log("Accordion " + type + " for row #" + rowIndex);}`,
      });

      let messages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
          messages.push(msg.text());
        }
      });

      const rows = page.locator('[data-ui-name="Body.Row"]');
      await page.keyboard.press('Tab');

      await test.step('Verify it is possible to scroll the last cell by keyboard', async () => {
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
          await page.keyboard.press('ArrowDown');
        }
        const cellinLastRow = locators.row(page, 6).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify keyboard navigation in table works well when one accordion axpanded', async () => {
        for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #0']);
        for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');
        const cellinLastRow = locators.row(page, 9).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify first accordion closed when second is collapsed and keyboard navigation not broken', async () => {
        messages = [];
        for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowUp');
        const waitForAccordionClose = page.waitForEvent('console', {
          predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #0',
          timeout: 1000,
        });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'visible' });
        await waitForAccordionClose;

        expect(messages).toEqual(['Accordion open for row #1',
          'Accordion close for row #0']);
        for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowDown');

        const cellinLastRow = locators.row(page, 9).locator(
          '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
        );

        await expect(cellinLastRow).toBeFocused();
      });

      await test.step('Verify keyboard navigation not broken when second accordion just expanded', async () => {
        messages = [];

        for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'hidden' });

        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion close for row #1']);
        messages = [];
        await page.keyboard.press('Enter');
        await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'visible' });

        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #1']);

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('[data-ui-name="ButtonLink"]').first()).toBeFocused();
      });
    });

    test('Verify table in table mouse navigation when accordionMode=toggle', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en', {
        accordionMode: 'toggle',
        onAccordionToggle: `function(type, rowId, rowIndex) {
    console.log("Accordion " + type + " for row #" + rowIndex);}`,
      });
      let messages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
          messages.push(msg.text());
        }
      });

      await test.step('Verify accordion expands by toggle click', async () => {
        await locators.toggle(page).first().click();
        await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Accordion open for row #0']);
      });

      await test.step('Verify accordion expands cell click and prev accordion closed', async () => {
        messages = [];
        const row = page.locator('[aria-rowindex="6"]');
        await row.locator('[data-ui-name="Row.Cell"][aria-colindex="2"]').first().click();
        await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'visible' });
        await page.waitForEvent('console', {
          predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #0',
          timeout: 500,
        });
        expect(messages.length).toBe(2);
        expect(messages).toEqual(['Accordion open for row #1', 'Accordion close for row #0']);
      });
    });
  });

  test('Verify accordion toggle mode works correctly with nested tables', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.FUNCTIONAL,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/table-in-table-in-table.tsx', 'en', {
      accordionMode: 'toggle',
    });

    await test.step('Expand first accordion - verify only 1 accordion is open', async () => {
      const toggles = locators.toggle(page);
      await toggles.nth(1).click();

      const nestedCells = page.locator('[role="gridcell"][data-aria-level="2"]');
      await nestedCells.first().waitFor({ state: 'visible' });

      const collapses = locators.collapse(page);
      await expect(collapses).toHaveCount(0);
      await expect(locators.dataTable(page)).toHaveCount(1);
    });

    await test.step('Expand second accordion - should close first in toggle mode', async () => {
      const toggles = locators.toggle(page);
      await toggles.nth(2).click();

      const collapses = locators.collapse(page);
      await collapses.first().waitFor({ state: 'visible' });

      await expect(collapses).toHaveCount(1);
      await expect(locators.dataTable(page)).toHaveCount(2);
    });

    await test.step('Expand third accordion - should close second in toggle mode', async () => {
      const toggles = locators.toggle(page);
      await toggles.nth(6).click();
      const collapses = locators.collapse(page);
      await collapses.first().waitFor({ state: 'visible' });
      await expect(collapses).toHaveCount(1);

      await expect(locators.dataTable(page)).toHaveCount(2);
    });
  });

  test('Verify accordion after skeleton in table cell', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/accordion-tests/table-in-table/table-in-table-in-table.tsx', 'en', {
      withSkeletonsAndAsyncDataLoading: true,
    });

    const row = locators.row(page, 4);
    const cell = row.locator('[role="gridcell"][aria-colindex="4"]');
    const accordionCellButton = cell.locator('button');
    const collapse = locators.collapse(page);

    await accordionCellButton.waitFor({ state: 'visible' });

    await accordionCellButton.click();

    await expect(collapse).toBeVisible({ timeout: 500 });
  });
});
