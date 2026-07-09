import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators } from './utils';
/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify keyboard access with changing data', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table',
      '@pagination',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/pagination.tsx', 'en');

    await page.getByRole('combobox').click();

    // select amount of items for first and last page will have different amount
    await page.getByRole('option', { name: '8' }).waitFor({ state: 'visible' });
    await page.getByRole('option', { name: '8' }).click();

    await test.step('Focus 3rd row cell on 1st page  ', async () => {
      for (let i = 0; i < 4; i++) await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('gridcell', { name: '1 ebay buy' })).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
    });
    await test.step('Switch to the last page that has 2 rows and verify 1st row cell will be focused', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();

      for (let i = 0; i < 6; i++) await page.keyboard.press('Space');

      await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('gridcell', { name: '49 ebay buy' })).toBeFocused();
    });

    await test.step('Focus 2nd row cell in the last page', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('gridcell', { name: '50 ebay buy last' })).toBeFocused();
    });

    await test.step('Switch to prev page', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
    });

    await test.step('Verify 2nd row cell focused on the prev page', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');

      await expect(page.getByRole('gridcell', { name: '42 www.ebay.com' })).toBeFocused();
    });
  });
});
