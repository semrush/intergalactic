import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Dynamic search', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.getByText('Clear').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Shift+Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Search by button', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/search-by-button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.locator('label').click();
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.getByRole('button').nth(1).hover();
    await page.getByText('Search').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
  test('Verify Search with Select', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/search-with-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.locator('label').click();
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await page.getByRole('option').first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify focus returns on Clear Addon by mouse click in Dynamic dearch', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const input = await page.getByRole('textbox');
    const clearButton = await page.getByRole('button');

    await page.locator('label').click();
    await page.keyboard.type('Hello world');
    await expect(await input.inputValue()).toBe('Hello world');
    await clearButton.click();

    await expect(await input.inputValue()).toBe('');
    await expect(input).toBeFocused();
    await expect(clearButton).toBeHidden();
  });

  test('Verify focus returns on Clear addon by keyboard interaction in Dynamic dearch', async ({
    page,
  }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const input = await page.getByRole('textbox');
    const clearButton = await page.getByRole('button');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(await input.inputValue()).toBe('Hello world');
    await page.keyboard.press('Tab');
    await expect(clearButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(await input.inputValue()).toBe('');
    await expect(input).toBeFocused();
    await expect(clearButton).toBeHidden();
  });
});
