import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('Accordion in table', () => {
  test('Verify keyboard interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(0);

    await expect(page).toHaveScreenshot();
    await expect(firstArrow).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(250);
    await expect(plot).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);

    await expect(secondArrow).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(250);
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await expect(plot).not.toBeVisible();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(350);

    await page.keyboard.press('ArrowDown');
    //verify the focus not swicthed to other cells by arrows when chart is focused
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
    await expect(thirdArrow).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    const plot = await page.locator('[data-ui-name="Plot"]');

    await test.step('Verify accordion collapse when clicking directly on toggle', async () => {
      await firstArrow.click();
      await page.waitForTimeout(350);
      await expect(plot).toHaveCount(1);
      await firstArrow.click();
      await page.waitForTimeout(350);
      await expect(plot).toHaveCount(0);
      await firstArrow.click();
      await page.waitForTimeout(350);

      const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
      await thirdArrow.click();
      await page.waitForTimeout(350);
      await expect(plot).toHaveCount(2);
      await thirdArrow.click();
      await firstArrow.click();
      await page.waitForTimeout(350);
      await expect(plot).toHaveCount(0);
    });

    await test.step('Verify accordion collapse when clicking any cell in row in case accordion in 1st cell', async () => {
      const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
      const cells = row.locator('[data-ui-name="Box"]');

      const firstBox = await cells.first().boundingBox();
      const lastBox = await cells.nth(3).boundingBox();
      if (firstBox && lastBox) {
        await page.mouse.click(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
        await page.waitForTimeout(300);
        await expect(plot).toBeVisible();
        await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
        await page.waitForTimeout(300);
        await expect(plot).not.toBeVisible();
      }
    });

    await test.step('Verify accordion collapse logic when clicking cell in case accordion not in 1st cell', async () => {
      const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="3"]');
      const cells = row.locator('[data-ui-name="Box"]');

      const firstBox = await cells.first().boundingBox();
      const lastBox = await cells.nth(3).boundingBox();

      if (firstBox && lastBox) {
        await page.mouse.click(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
        await expect(plot).not.toBeVisible();
        await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
        await page.waitForTimeout(250);
        await expect(plot).toBeVisible();
        await page.mouse.click(lastBox.x + lastBox.width / 2, lastBox.y + lastBox.height / 2);
        await page.waitForTimeout(250);
        await expect(plot).not.toBeVisible();
      }
    });

    await test.step('Verify accordion not expands when clicking interactive element in any cell when accordion on 1st', async () => {
      const button = page.getByRole('button', { name: 'Click Me' });
      await button.click();
      await expect(plot).not.toBeVisible();
    });
  });

  test('Verify accordion with chart styles', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    const marginRight1 = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await firstArrow.click();
    await page.waitForTimeout(250);
    const marginRight = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await expect(plot).toHaveCount(1);

    const row3 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const cells = row3.locator('[data-ui-name="Body.Cell"]');
    const cellCount = await cells.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const row4 = page.locator('[data-ui-name="Collapse"][aria-rowindex="3"]');
    await checkStyles(row4.locator('[data-ui-name="Body.Cell"]').first(), {
      'background-color': 'rgb(244, 245, 249)',
    });

    await firstArrow.hover();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);
    await secondArrow.click();
    await page.waitForTimeout(250);
    await firstArrow.hover();
    await page.waitForTimeout(100);
    await expect(plot).toHaveCount(2);
    const row5 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="4"]');
    const cells5 = row5.locator('[data-ui-name="Body.Cell"]');

    const cellCount5 = await cells5.count();
    for (let i = 0; i < cellCount5 - 1; i++) {
      const cell = cells5.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(255, 255, 255)',
      });
    }

    await checkStyles(cells5.nth(3), {
      'background-color': 'rgb(230, 231, 237)',
    });

    await secondArrow.hover();
    if (browserName !== 'firefox')
      for (let i = 0; i < cellCount5 - 1; i++) {
        const cell = cells5.nth(i);
        await checkStyles(cell, {
          'background-color': 'rgb(240, 240, 244)',
        });
      }

    await checkStyles(cells5.nth(3), {
      'background-color': 'rgb(230, 231, 237)',
    });

    await firstArrow.click();
    await page.waitForTimeout(250);
    if (browserName !== 'firefox')
      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        await checkStyles(cell, {
          'background-color': 'rgb(240, 240, 244)',
        });
      }
  });

  test('Verify accordion with with chart attributes', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await test.step('Verify cell with accordion attributes', async () => {
      await expect(firstArrow).toHaveAttribute('aria-controls');
      await expect(firstArrow).toHaveAttribute('aria-label', 'Show details');

      const row3 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
      const cells = row3.locator('[data-ui-name="Body.Cell"]');

      await expect(firstArrow).toHaveAttribute('aria-expanded', 'false');
      await expect(cells.nth(1)).not.toHaveAttribute('aria-expanded', 'false');
      await firstArrow.click();
      await page.waitForTimeout(250);
      await expect(firstArrow).toHaveAttribute('aria-expanded', 'true');
      await expect(cells.first()).toHaveAttribute('data-aria-level', '1');
    });

    await test.step('Verify accordion attributes when expanded', async () => {
      const accordion = page.locator('[data-ui-name="Collapse"]');
      await expect(accordion).toHaveAttribute('role', 'row');
      await expect(accordion).toHaveAttribute('aria-rowindex', '3');
      const accordionCell = accordion.locator('[data-ui-name="Body.Cell"]');
      await expect(accordionCell).toHaveAttribute('tabindex', '-1');
      await expect(accordionCell).toHaveAttribute('role', 'gridcell');
      await expect(accordionCell).toHaveAttribute('aria-colindex', '1');
      await expect(accordionCell).toHaveAttribute('aria-level', '2');
      await expect(accordionCell).toHaveAttribute('aria-setsize', '1');
      await expect(accordionCell).toHaveAttribute('aria-posinset', '1');
    });
  });

  test('Verify accordion table in table styles', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    const marginRight1 = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await firstArrow.click();
    await page.waitForTimeout(250);
    const marginRight = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');

    const row2 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const cells2 = row2.locator('[data-ui-name="Body.Cell"]');

    const cellCount = await cells2.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells2.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const row3 = page.locator('[data-ui-name="Row"][aria-rowindex="3"]');
    const cells3 = row3.locator('[data-ui-name="Body.Cell"]');
    const cellCount3 = await cells3.count();

    for (let i = 0; i < cellCount3; i++) {
      const cell = cells3.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(244, 245, 249)',
      });
    }

    const peddingLeft = await cells3.first().evaluate((el) => {
      return window.getComputedStyle(el).paddingLeft;
    });

    expect(peddingLeft).toBe('40px');
  });

  test('Verify table in table attributes', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await test.step('Verify cell with accordion attributes', async () => {
      await expect(firstArrow).toHaveAttribute('aria-label', 'Show details');
      const row3 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
      const cells = row3.locator('[data-ui-name="Body.Cell"]');

      await expect(firstArrow).toHaveAttribute('aria-expanded', 'false');
      await expect(firstArrow).toHaveAttribute('aria-controls');

      await expect(cells.nth(1)).not.toHaveAttribute('aria-expanded', 'false');
      await firstArrow.click();
      await page.waitForTimeout(250);
      await expect(firstArrow).toHaveAttribute('aria-expanded', 'true');
      await expect(cells.first()).toHaveAttribute('data-aria-level', '1');
    });

    await test.step('Verify child table attributes when expanded', async () => {
      const nestedRows = page.locator('[role="row"][aria-level="2"]');

      await expect(nestedRows.first()).toBeVisible();
      const rowCount = await nestedRows.count();

      for (let i = 0; i < rowCount; i++) {
        const row = nestedRows.nth(i);

        await expect(row).toHaveAttribute('role', 'row');
        await expect(row).toHaveAttribute('aria-level', '2');
        await expect(row).toHaveAttribute('aria-rowindex');

        const cells = row.locator('[data-ui-name="Body.Cell"]');
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

  test('Verify table in table keyboard navigation', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const rows = page.locator('[data-ui-name="Body.Row"]');
    await page.keyboard.press('Tab');

    await test.step('Verify it is possible to scroll the last cell by keyboard when accordion collapsed', async () => {
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        await page.keyboard.press('ArrowDown');
      }
      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="6"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Body.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });

    await test.step('Verify it is possible to scroll the last cell by keyboard when accordion expanded', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowDown');

      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="9"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Body.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });
  });

  test('Verify keyboard navigation when interactive element inside cell', async ({
    page,
    browserName,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-with-render-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

    const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const elementsIncell = await row.locator('[data-ui-name="ButtonLink"]');
    const firstrowCell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    const widget = page.locator('[data-ui-name="WidgetNoData"]');

    await test.step('Verify focus on whole first body cell', async () => {
      await expect(firstrowCell).toBeFocused();
    });

    await test.step('Verify focus on accrordion arrow inside cell and its collapsed ', async () => {
      await page.keyboard.press('Enter');
      await expect(elementsIncell.first()).toBeFocused();
      await expect(widget).not.toBeVisible();
    });

    await test.step('Verify focus on whole first body cell by escape', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      await expect(firstrowCell).toBeFocused();
    });

    if (browserName === 'webkit') return;
    await test.step('Verify focus on the next focusable element by tab', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(widget).not.toBeVisible();
      await expect(elementsIncell.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(elementsIncell.first()).toBeFocused();
    });

    await test.step('Verify accordion can be expanded', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      await expect(elementsIncell.first()).toBeFocused();
      await expect(widget).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(elementsIncell.nth(1)).toBeFocused();
      await expect(widget).toBeVisible();
    });

    await test.step('Verify accordion not collapsed by esc', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      await expect(firstrowCell).toBeFocused();
      await expect(widget).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify mouse inreaction when interactive element inside cell with toggle', async ({
    page,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-with-render-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const elementsIncell = await row.locator('[data-ui-name="ButtonLink"]');
    const firstrowCell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    const widget = page.locator('[data-ui-name="WidgetNoData"]');

    await firstrowCell.click();
    await page.waitForTimeout(250);
    await expect(widget).toBeVisible();
    await firstrowCell.click();
    await page.waitForTimeout(250);
    await expect(widget).not.toBeVisible();

    await elementsIncell.nth(1).click();
    await page.waitForTimeout(250);
    await page.keyboard.press('Escape');
    await expect(widget).not.toBeVisible();
  });

  test('Verify table in table with sorting keyboard interaction', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

    const table = page.locator('[data-ui-name="DataTable"]');
    const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const elementsIncell = await row.locator('[data-ui-name="ButtonLink"]');
    const firstrowCell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
    const headColumnKeyword = page.locator('[data-ui-name="Head.Column"][name="keyword"]');
    const sortIconKeyword = headColumnKeyword.locator('[data-ui-name="ButtonLink"]');
    const headColumnKd = page.locator('[data-ui-name="Head.Column"][name="kd"]');
    const sortIconKd = headColumnKd.locator('[data-ui-name="ButtonLink"]');

    await test.step('Verify focus on sorting icon', async () => {
      await expect(sortIconKeyword).toBeFocused();
    });

    await test.step('Verify focus on accordion arrow by click downArrow', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(elementsIncell.first()).toBeFocused();
    });

    await test.step('Verify rowcount when accordion not expanded', async () => {
      await expect(table).toHaveAttribute('aria-rowcount', '7');
      await expect(firstrowCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    await test.step('Verify table in table expands', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      await expect(elementsIncell.first()).toBeFocused();
      await expect(table).toHaveAttribute('aria-rowcount', '10');
      await expect(firstrowCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    await test.step('Verify focus table in table cell and back by arrows', async () => {
      await page.keyboard.press('ArrowDown');
      const row = page.locator('[role="row"][aria-rowindex="3"][aria-level="2"]');
      const cell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(cell).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(table).toHaveAttribute('aria-rowcount', '10');
      await expect(firstrowCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
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
      const row = page.locator('[role="row"][aria-rowindex="6"]');
      const cell2 = row.locator('[data-ui-name="Body.Cell"][aria-colindex="2"]');
      await expect(cell2).toBeFocused();
      await expect(table).toHaveAttribute('aria-rowcount', '10');
      await expect(firstrowCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      await expect(table).toHaveAttribute('aria-rowcount', '10');
      await page.keyboard.press('ArrowLeft');
      const elementsIncell = await row.locator('[data-ui-name="ButtonLink"]');
      await expect(elementsIncell).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      const cell1 = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(table).toHaveAttribute('aria-rowcount', '13');
      await expect(firstrowCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      await expect(cell1.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    await test.step('Verify expanded cell dont collapse when changing place by sorting', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');

      await expect(sortIconKd).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
      await expect(table).toHaveAttribute('aria-rowcount', '13');

      const newRow1 = page.locator('[role="row"][aria-rowindex="7"]');
      const newCell = newRow1.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(newCell.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );

      const newRow2 = page.locator('[role="row"][aria-rowindex="11"]');
      const newCell2 = newRow2.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(newCell2.locator('[data-ui-name="ButtonLink"]')).toHaveAttribute(
        'aria-expanded',
        'true',
      );

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify accordion with fixed column', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-with-fixed-column.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(250);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard navigation when table component inside table', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const table = page.locator('[data-ui-name="DataTable"]');
    const rowWithAcc = page.locator('[data-ui-name="Body.Row"][aria-rowindex="4"]');
    const rowCellWithAcc = rowWithAcc.locator('[data-ui-name="Body.Cell"][aria-colindex="4"]');
    const sortIconKeywordAcc = rowCellWithAcc.locator('[data-ui-name="ButtonLink"]');

    await test.step('Verify table component expands by activating the toggle', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await expect(sortIconKeywordAcc).toBeFocused();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(250);
    });

    await test.step('Verify rowcount when accordion expanded', async () => {
      await expect(table.first()).toHaveAttribute('aria-rowcount', '8');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
    });

    const collapse = page.locator('[data-ui-name="Collapse"]');
    const cell = collapse.locator('[data-ui-name="Body.Cell"][aria-level="2"]');
    const datatableChild = cell.locator('[data-ui-name="DataTable"]');

    await test.step('Verify child attributes', async () => {
      await expect(collapse).toHaveAttribute('aria-rowindex', '5');
      await expect(collapse).toHaveAttribute('role', 'row');
      await expect(cell).toHaveAttribute('tabindex', '-1');
      await expect(cell).toHaveAttribute('role', 'gridcell');
      await expect(cell).toHaveAttribute('aria-colindex', '1');
      await expect(cell).toHaveAttribute('aria-setsize', '1');
      await expect(cell).toHaveAttribute('aria-posinset', '1');
      await expect(datatableChild).toBeVisible();
    });

    await test.step('Verify child table keyboard navigation when child expanded', async () => {
      await page.keyboard.press('ArrowDown');
      const childFirstRow = datatableChild.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
      const childFirstCell = childFirstRow.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(childFirstCell).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(childFirstCell).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(sortIconKeywordAcc).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(childFirstCell).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      const childFLastRow = datatableChild.locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
      const childlastCell = childFLastRow.locator('[data-ui-name="Body.Cell"][aria-colindex="4"]');
      await expect(childlastCell).toBeFocused();

      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      await expect(sortIconKeywordAcc).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(childlastCell).toBeFocused();

      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    });

    await test.step('Verify keyboard navigation when child table collapsed', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(350);
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
      await page.keyboard.press('ArrowDown');
      const nextRow = table.first().locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
      const nextCell = nextRow.locator('[data-ui-name="Body.Cell"][aria-colindex="4"]').first();
      await expect(nextCell).toBeFocused();
    });
  });

  test('Verify table component inside table expands by mouse', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const table = page.locator('[data-ui-name="DataTable"]');
    const rowWithAcc = page.locator('[data-ui-name="Body.Row"][aria-rowindex="4"]');
    const rowCellWithAcc = rowWithAcc.locator('[data-ui-name="Body.Cell"][aria-colindex="4"]');
    const sortIconKeywordAcc = rowCellWithAcc.locator('[data-ui-name="ButtonLink"]');
    const collapse = page.locator('[data-ui-name="Collapse"]');
    const cell = collapse.locator('[data-ui-name="Body.Cell"][aria-level="2"]');
    const datatableChild = cell.locator('[data-ui-name="DataTable"]');

    await test.step('Verify table component expands by click on toggle', async () => {
      await sortIconKeywordAcc.click();
      await page.waitForTimeout(250);
      await expect(table.first()).toHaveAttribute('aria-rowcount', '8');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
      await expect(datatableChild).toBeVisible();
    });

    await test.step('Verify table component collpases by click on toggle', async () => {
      await sortIconKeywordAcc.click();
      await page.waitForTimeout(250);
      await expect(table.first()).toHaveAttribute('aria-rowcount', '7');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
      await expect(datatableChild).not.toBeVisible();
    });
  });
});
