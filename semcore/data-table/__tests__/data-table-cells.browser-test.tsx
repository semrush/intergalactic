import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, checkStyles } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify long text in cells and wrap and ellipsis', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/long-text-in-cells.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify overflow=hidden visual finctionality', {
    tag: [TAG.PRIORITY_LOW,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/advanced/examples/overflow_in_cells.tsx', 'en');
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify colored cells', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/advanced/examples/row_cell_states.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    if (browserName !== 'chromium') test.skip();
    const cell = locators.row(page, 4).locator('[aria-colindex="1"]');
    const box = await cell.boundingBox();

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await expect(page).toHaveScreenshot();
  });

  test('Verify empty data with selectable rows', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/checkbox-in-table-with-no-data.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify sideIndents=wide with selectable rows non compact and compact', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en', {
      sideIndents: 'wide',
    });

    await test.step('Verify wide for non compact data-table', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify wide for compact data-table', async () => {
      await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en', {
        sideIndents: 'wide', compact: true,
      });
      await expect(page).toHaveScreenshot();
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

    await test.step('Verify Color when child cell hovered', async () => {
      await locators.getCell(page, 3, 1).hover();

      await checkStyles(locators.getCell(page, 3, 1), { 'background-color': 'rgb(240, 240, 244)' });
      await checkStyles(locators.getCell(page, 2, 2), { 'background-color': 'rgb(240, 240, 244)' });
      await checkStyles(locators.getCell(page, 2, 1), { 'background-color': 'rgb(255, 255, 255)' });
    });

    await test.step('Verify Color when parent cell hovered', async () => {
      await locators.getCell(page, 2, 2).hover();

      for (let row = 2; row <= 5; row++) {
        await checkStyles(locators.getCell(page, row, 1), { 'background-color': 'rgb(240, 240, 244)' });
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

    await page.keyboard.press('Tab');

    await page.keyboard.press('ArrowDown');
    await expect(locators.getCell(page, 2, 1).locator('input')).toBeFocused();

    await page.keyboard.press('Space');

    await page.getByRole('button', { name: 'Deselect all' }).waitFor({ state: 'visible' });
    await checkStyles(locators.getCell(page, 2, 1), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 2, 2), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 2, 3), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 2, 4), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 3, 2), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 3, 3), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 3, 4), { 'background-color': 'rgb(233, 247, 255)' });
    await expect(page).toHaveScreenshot();

    if (browserName == 'firefox') return;
    const cell22 = locators.getCell(page, 2, 1);
    const box22 = await cell22.boundingBox();
    if (box22) {
      await page.mouse.move(box22.x + box22.width / 2, box22.y + box22.height / 2);
    }

    await checkStyles(locators.getCell(page, 2, 1), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 2), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 3), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 4), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 3, 2), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 3, 3), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 3, 4), { 'background-color': 'rgb(196, 229, 254)' });

    const cell23 = locators.getCell(page, 2, 3);
    const box23 = await cell23.boundingBox();
    if (box23) {
      await page.mouse.move(box23.x + box23.width / 2, box23.y + box23.height / 2);
    }
    await checkStyles(locators.getCell(page, 2, 1), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 2), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 3), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 2, 4), { 'background-color': 'rgb(196, 229, 254)' });
    await checkStyles(locators.getCell(page, 3, 2), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 3, 3), { 'background-color': 'rgb(233, 247, 255)' });
    await checkStyles(locators.getCell(page, 3, 4), { 'background-color': 'rgb(233, 247, 255)' });
  });
});
/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify keyboard interaction with interactive elements in cells', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/interactive-elements-in-cells.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.getCell(page, 2, 1)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(locators.descriptionTooltipTrigger(page, 2, 2)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(locators.getCell(page, 2, 3)).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(locators.getCell(page, 3, 3)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.buttonInCell(page, 3, 3)).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.buttonInCell(page, 3, 3)).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(locators.getCell(page, 3, 3)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-test-id="button-after-table"]')).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(locators.getCell(page, 3, 3)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(locators.descriptionTooltipTrigger(page, 3, 2)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Popper"]')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(locators.descriptionTooltipTrigger(page, 3, 2)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(locators.descriptionTooltipTrigger(page, 3, 2)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(locators.getCell(page, 3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(locators.getCell(page, 3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(locators.getCell(page, 3, 1).locator('[data-test-id="interactive-icon"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.descriptionTooltipTrigger(page, 3, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await page.getByLabel('About fastest animals').waitFor({ state: 'visible' });
    await expect(page.getByLabel('About fastest animals')).toBeFocused();
    await page.keyboard.press('Escape');

    await expect(locators.descriptionTooltipTrigger(page, 3, 1)).toBeFocused();
  });

  test('Verify keyboard interaction with dd and select in cells', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown',
      '@select',
      '@tooltip',
      '@checkbox',
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/dd-select-in-cell.tsx', 'en');

    const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await page.keyboard.press('Tab');

    await test.step('Verify interaction with select', async () => {
      await expect(locators.getCell(page, 2, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.selectButton(page, 2, 1)).toBeFocused();
      await page.keyboard.press('Enter');

      const selectOption = page.getByRole('option', { name: 'Option 0' });
      await expect(selectOption).toBeVisible();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      await expect(selectOption).toBeHidden();
      await expect(locators.selectButton(page, 2, 1)).toHaveAttribute('value', '2');

      await page.keyboard.press('Escape');
      await expect(locators.getCell(page, 2, 1)).toBeFocused();
    });

    await test.step('Verify interaction with dropdown', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await expect(locators.dropdownButton(page, 2, 3)).toBeFocused();
      await expect(dropdownPopper).toBeHidden();

      await page.keyboard.press('Enter');

      await expect(dropdownPopper).toBeVisible();
      await expect(dropdownPopper).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(dropdownPopper).toBeFocused();

      await page.keyboard.press('Escape');

      await expect(dropdownPopper).toBeHidden();
      await expect(locators.dropdownButton(page, 2, 3)).toBeFocused();
    });
  });

  test('Verify mouse interaction with dd and select in cells', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown',
      '@select',
      '@tooltip',
      '@checkbox',
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/dd-select-in-cell.tsx', 'en');

    const selectButton = locators.getCell(page, 2, 2).locator('button[data-ui-name="Select"]');
    const dropdownButton = locators.getCell(page, 2, 3).locator('button[data-ui-name="Dropdown.Trigger"]');
    const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify interaction with select', async () => {
      await selectButton.click();
      const selectOption = page.getByRole('option', { name: 'Option 0' });
      await expect(selectOption).toBeVisible();

      await selectButton.click();
      await expect(selectOption).toBeHidden();

      await selectButton.click();
      await selectOption.waitFor({ state: 'visible' });
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

  test('Verify keyboard navigation from header to merged cell', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/one-merged-cell.tsx', 'en');

    const cell = page.locator('[data-ui-name="Row.Cell"]');
    await expect(cell).toHaveAttribute('data-grouped-by', 'colgroup');
    await expect(cell).toHaveAttribute('scope', 'colgroup');
    await expect(cell).toHaveAttribute('aria-colspan', '4');
    await expect(cell).toHaveAttribute('aria-colindex', '1');
    await expect(cell).toHaveAttribute('data-aria-level', '1');
    await expect(cell).toHaveAttribute('role', 'gridcell');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('[data-ui-name="Row.Cell"]')).toBeFocused();
  });

  test('Verify keyboard navigation when merged rows AND columns with multi-level header', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/merged-row-for-multi-level-header.tsx', 'en');

    await test.step('Verify keyboard navigation through child cells', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.getCell(page, 2, 1)).toBeFocused();
      for (let row = 3; row <= 5; row++) {
        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, row, 1)).toBeFocused();
      }
    });

    await test.step('Verify keyboard navigation between merged cell and child cells', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 2, 2)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 6, 2)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await expect(locators.getCell(page, 2, 5)).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.getCell(page, 2, 2)).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.getCell(page, 2, 1)).toBeFocused();
    });
  });

  test('Verify keyboard navigation when merged rows AND columns with multi-level header - right and top child column', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/merged-row-column-with-fixed', 'en', { lastRowsPosition: 'both', showRightColumn: true });

    await page.keyboard.press('Tab');

    await test.step('Verify keyboard navigation from upper chid to bittom child', async () => {
      await page.keyboard.press('ArrowRight');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 9, 2)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 9, 2)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();
    });

    await test.step('Verify keyboard navigation from right to left child column', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 4, 5)).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();

      await page.keyboard.press('ArrowLeft');

      await expect(locators.getCell(page, 4, 1)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 4, 5)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.getCell(page, 4, 2)).toBeFocused();
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

  test('Verify multiple access to cells with spin', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown',
      '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx', 'en');

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
});
