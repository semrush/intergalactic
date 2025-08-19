import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Pagination', () => {
  test('Verify keyboard access with changing data', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/pagination.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const nav = await page.locator('nav[data-ui-name="Pagination"]');

    const marginTop = await nav.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('margin-top');
    });

    expect(marginTop).toBe('16px');

    await page.getByRole('combobox').click();

    // select amount of items for first and last option will have different amount
    await page.getByRole('option', { name: '8' }).waitFor({ state: 'visible' });
    await page.getByRole('option', { name: '8' }).click();

    await test.step('Focus 3rd row cell on 1st page  ', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('gridcell', { name: '1 ebay buy' })).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
    });
    await test.step('Switch to the last page that has 2 rows and verify 1st row cell will be focused', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();

      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
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
