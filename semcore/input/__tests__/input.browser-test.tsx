import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Input', () => {
  test('Returns focus on Clear Addon mouse click', async ({ page }) => {
    const standPath = 'website/docs/filter-group/filter-search/examples/DynamicSearch.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    const inputLocator = await page.locator('input');
    await expect(await inputLocator.inputValue()).toBe('Hello world');
    const clearButtonLocator = await page.locator('[data-name="Close"]');
    await clearButtonLocator.click();

    await expect(await inputLocator.inputValue()).toBe('');
    await expect(inputLocator).toBeFocused();
  });
  test('Returns focus on Clear Addon keyboard press', async ({ page }) => {
    const standPath = 'website/docs/filter-group/filter-search/examples/DynamicSearch.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    const inputLocator = await page.locator('input');
    await expect(await inputLocator.inputValue()).toBe('Hello world');
    await page.keyboard.press('Tab');
    const clearButtonLocator = await page.locator('[data-name="Close"]');
    await expect(clearButtonLocator).toBeFocused();
    await page.keyboard.down('Enter');

    await expect(await inputLocator.inputValue()).toBe('');
    await expect(inputLocator).toBeFocused();
  });
});
