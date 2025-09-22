import type { Page } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

const locators = {
  toggle: (page: Page) => page.getByRole('row').getByLabel('Show details'),
  chart: (page: Page, text: string) => page.getByRole('gridcell', { name: text }),
  row: (page: Page, index: number) =>
    page.locator(`[aria-rowindex="${index}"]`),
  rowTableInTable: (page: Page, level: number, index: number) =>
    page.locator(`[role="row"][aria-level="${level}"][aria-rowindex="${index}"]`),
  dataTable: (page: Page) => page.getByRole('grid'),

};

test.describe('Accordion in table', () => {
  test('Verify keyboard interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
    await expect(locators.chart(page, 'Chart')).toHaveCount(1);

    await page.keyboard.press('Enter');
    await locators.chart(page, 'Chart').waitFor({ state: 'hidden' });
    await expect(locators.chart(page, 'Chart')).toHaveCount(0);

    await expect(page).toHaveScreenshot();
    await expect(locators.toggle(page).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(locators.chart(page, 'Chart')).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await expect(locators.toggle(page).nth(1)).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
    await expect(locators.chart(page, 'Chart')).toHaveCount(1);

    await page.keyboard.press('ArrowDown');
    // verify the focus not swicthed to other cells by arrows when chart is focused
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    await expect(locators.toggle(page).nth(2)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await expect(locators.toggle(page).nth(0)).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify accordion collapse when clicking directly on toggle', async () => {
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
        await page.waitForTimeout(250);
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

  test('Verify accordion with chart styles', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const marginRight1 = await locators.toggle(page).first().evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await locators.toggle(page).first().click();
    await locators.chart(page, 'Chart').waitFor({ state: 'visible' });
    await expect(locators.chart(page, 'Chart')).toHaveCount(1);

    const marginRight = await locators.toggle(page).first().evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');

    const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');
    const cellCount = await cells.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    await checkStyles(locators.row(page, 3).locator('[data-ui-name="Row.Cell"]').first(), {
      'background-color': 'rgb(244, 245, 249)',
    });

    await locators.toggle(page).first().hover();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    await locators.toggle(page).nth(1).click();
    await locators.chart(page, 'Chart').nth(1).waitFor({ state: 'visible' });
    await locators.toggle(page).first().hover();
    await expect(locators.chart(page, 'Chart')).toHaveCount(2);
    const cells5 = locators.row(page, 4).locator('[data-ui-name="Row.Cell"]');

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

    await locators.toggle(page).nth(1).hover();
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

    await locators.toggle(page).first().click();
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

  test('Verify table in table styles', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const marginRight1 = await locators.toggle(page).first().evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await locators.toggle(page).first().click();
    await locators.rowTableInTable(page, 2, 3).waitFor({ state: 'visible' });
    const marginRight = await locators.toggle(page).first().evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');

    const cells2 = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

    const cellCount = await cells2.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells2.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const cells3 = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]');
    const cellCount3 = await cells3.count();

    for (let i = 0; i < cellCount3; i++) {
      const cell = cells3.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(244, 245, 249)',
      });
    }

    const paddingLeft = await cells3.first().evaluate((el) => {
      return window.getComputedStyle(el).paddingLeft;
    });

    expect(paddingLeft).toBe('38px');
  });

  test('Verify table in table attributes', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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

  test('Verify table in table keyboard navigation when accordionMode=independent', async ({ page }) => {
    let messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
        messages.push(msg.text());
      }
    });

    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', {
      accordionMode: 'independent',
      onAccordionToggle: `function(type, rowId, rowIndex) {
  console.log("Accordion " + type + " for row #" + rowIndex);
}`,
    });

    await page.setContent(htmlContent);

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
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion open for row #0']);

      for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');

      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="9"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });

    await test.step('Verify it is possible to scroll the last cell by keyboard when second accordion expanded', async () => {
      messages = [];
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion open for row #1']);
      for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowDown');

      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="12"]');
      const cellinLastRow = lastRow.locator(
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
      await page.waitForEvent('console', {
        predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #1',
        timeout: 200,
      });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion close for row #1']);
      messages = [];

      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 9).waitFor({ state: 'visible' });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion open for row #1']);

      for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowUp');

      await expect(page.locator('[data-ui-name="ButtonLink"]').first()).toBeFocused();
    });
  });

  test('Verify table in table mouse navigation when accordionMode=independent', async ({ page, browserName }) => {
    if (browserName === 'webkit') return;// disabled for websbkit because works in debug mode but lags in docker
    let messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
        messages.push(msg.text());
      }
    });

    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', {
      accordionMode: 'independent',
      onAccordionToggle: `function(type, rowId, rowIndex) {
        console.log("Accordion " + type + " for row #" + rowIndex);
      }` });

    await page.setContent(htmlContent);

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
      await page.waitForEvent('console', {
        predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #0',
        timeout: 500,
      });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion close for row #0']);
    });

    await test.step('Verify accordion collapses cell click', async () => {
      messages = [];
      const row = locators.row(page, 3);
      await row.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]').first().click();
      await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'hidden' });
      await page.waitForEvent('console', {
        predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #1',
        timeout: 200,
      });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion close for row #1']);
    });
  });

  test('Verify table in table keyboard navigation when accordionMode=toggle', async ({ page }) => {
    let messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
        messages.push(msg.text());
      }
    });
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', {
      accordionMode: 'toggle',
      onAccordionToggle: `function(type, rowId, rowIndex) {
        console.log("Accordion " + type + " for row #" + rowIndex);
      }` });
    await page.setContent(htmlContent);

    const rows = page.locator('[data-ui-name="Body.Row"]');
    await page.keyboard.press('Tab');

    await test.step('Verify it is possible to scroll the last cell by keyboard', async () => {
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        await page.keyboard.press('ArrowDown');
      }
      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="6"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });

    await test.step('Verify keyboard navigation in table works well when one accordion axpanded', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await locators.rowTableInTable(page, 2, 5).waitFor({ state: 'visible' });
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['Accordion open for row #0']);
      for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowDown');
      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="9"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });

    await test.step('Verify first accordion closed when second is collapsed and keyboard navigation not broken', async () => {
      messages = [];
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'visible' });
      await page.waitForEvent('console', {
        predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #0',
        timeout: 200,
      });
      expect(messages.length).toBe(2);
      expect(messages).toEqual(['Accordion open for row #1',
        'Accordion close for row #0']);
      for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowDown');

      const lastRow = page.locator('[data-ui-name="Body.Row"][aria-rowindex="9"]');
      const cellinLastRow = lastRow.locator(
        '[data-ui-name="Row.Cell"][aria-colindex="1"][data-aria-level="1"]',
      );

      await expect(cellinLastRow).toBeFocused();
    });

    await test.step('Verify keyboard navigation not broken when second accordion just expanded', async () => {
      messages = [];

      for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.rowTableInTable(page, 2, 6).waitFor({ state: 'hidden' });
      await page.waitForEvent('console', {
        predicate: (msg) => msg.type() === 'log' && msg.text() === 'Accordion close for row #1',
        timeout: 200,
      });
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

  test('Verify table in table mouse navigation when accordionMode=toggle', async ({ page }) => {
    let messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('Accordion')) {
        messages.push(msg.text());
      }
    });

    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en', {
      accordionMode: 'toggle',
      onAccordionToggle: `function(type, rowId, rowIndex) {
        console.log("Accordion " + type + " for row #" + rowIndex);
      }` });

    await page.setContent(htmlContent);

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
    const firstrowCell = row.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
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
      await widget.waitFor({ state: 'visible' });
      await expect(elementsIncell.first()).toBeFocused();
      await expect(widget).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(elementsIncell.nth(1)).toBeFocused();
      await expect(widget).toBeVisible();
    });

    await test.step('Verify accordion not collapsed by esc', async () => {
      await page.keyboard.press('Escape');
      await expect(firstrowCell).toBeFocused();
      await expect(widget).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify accordion is responsive', async () => {
      await page.keyboard.press('ArrowDown');
      await page.setViewportSize({ width: 920, height: 1080 });
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
    const firstrowCell = row.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]');
    const widget = page.locator('[data-ui-name="WidgetNoData"]');

    await firstrowCell.click();
    await widget.waitFor({ state: 'visible' });
    await expect(widget).toBeVisible();
    await firstrowCell.click();
    await widget.waitFor({ state: 'hidden' });
    await expect(widget).not.toBeVisible();

    await elementsIncell.nth(1).click();
    await page.keyboard.press('Escape');
    await expect(widget).not.toBeVisible();
  });

  test('Verify table in table with sorting keyboard interaction', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

    const row = locators.row(page, 2);
    const headColumnKeyword = page.locator('[data-ui-name="Head.Column"][name="keyword"]');
    const sortIconKeyword = headColumnKeyword.locator('[data-ui-name="ButtonLink"]');
    const headColumnKd = page.locator('[data-ui-name="Head.Column"][name="kd"]');
    const sortIconKd = headColumnKd.locator('[data-ui-name="ButtonLink"]');

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
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');

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

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify accordion with custom component and fixed column', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/accordion-with-fixed-column.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const Widget = page.getByRole('status');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await Widget.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    if (browserName === 'webkit')
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    else await expect(page).toHaveScreenshot();
  });

  test('Verify accordion with table in table and fixed column', async ({ page, browserName }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-fixed-column.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const tableInTableRow = page.locator('[aria-rowindex="5"][aria-level="2"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await tableInTableRow.waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot();
    if (browserName === 'webkit')
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    else await expect(page).toHaveScreenshot();
  });

  test('Verify keyboard navigation when table component inside table', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const table = locators.dataTable(page);
    const sortIconKeywordAcc = locators.row(page, 4).locator('[data-ui-name="ButtonLink"]');

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
      await locators.dataTable(page).nth(1).waitFor({ state: 'visible' });
    });

    await test.step('Verify rowcount when accordion expanded', async () => {
      await expect(table.first()).toHaveAttribute('aria-rowcount', '8');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
    });

    const collapse = page.locator('[data-ui-name="Collapse"]');
    const cell = collapse.locator('[data-ui-name="Row.Cell"][aria-level="2"]');

    await test.step('Verify child attributes', async () => {
      await expect(collapse).toHaveAttribute('aria-rowindex', '5');
      await expect(collapse).toHaveAttribute('role', 'row');
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
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
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
      const nextRow = table.first().locator('[data-ui-name="Body.Row"][aria-rowindex="5"]');
      const nextCell = nextRow.locator('[data-ui-name="Row.Cell"][aria-colindex="4"]').first();
      await expect(nextCell).toBeFocused();
    });
  });

  test('Verify table component inside table expands by mouse', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/accordion-tests/table-in-table-with-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const table = locators.dataTable(page);
    const sortIconKeywordAcc = locators.row(page, 4).locator('[data-ui-name="ButtonLink"]');
    const collapse = page.locator('[data-ui-name="Collapse"]');
    const cell = collapse.locator('[data-ui-name="Row.Cell"][aria-level="2"]');

    await test.step('Verify table component expands by click on toggle', async () => {
      await sortIconKeywordAcc.click();
      await locators.dataTable(page).nth(1).waitFor({ state: 'visible' });
      await expect(table.first()).toHaveAttribute('aria-rowcount', '8');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.dataTable(page).nth(1)).toHaveCount(1);
    });

    await test.step('Verify table component collpases by click on toggle', async () => {
      await sortIconKeywordAcc.click();
      await locators.dataTable(page).nth(1).waitFor({ state: 'hidden' });
      await expect(table.first()).toHaveAttribute('aria-rowcount', '7');
      await expect(sortIconKeywordAcc).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.dataTable(page).nth(1)).toHaveCount(0);
    });
  });

  test('Verify mouse interaction on a cell with merged rows', async ({ page }) => {
    const standPath =
      'stories/components/data-table/advanced/examples/accordion_in_merged_rows.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const collapse = page.locator('[data-ui-name="Collapse"]');
    const spannedCell = page.locator('[data-ui-name="Body.Row"] div[aria-rowspan="3"]');
    const showDetails = page.locator('[aria-label="Show details"]').first();

    await expect(collapse).toBeHidden();

    await spannedCell.click();
    await expect(collapse).toBeVisible();

    await showDetails.click();
    await expect(collapse).toBeHidden();
  });
});
