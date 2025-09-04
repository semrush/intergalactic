import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Serp featires visuals when mouse interaction', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox');
    const textbox = page.getByRole('textbox');
    const clearSearch = page.getByRole('button', { name: 'Clear search field' });
    const reload = page.getByRole('button', { name: 'Reload' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');
    await trigger.click();
    await page.getByText('Loading...').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.getByText('Something went wrong.').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await textbox.fill('Test');
    await clearSearch.hover();
    await page.getByText('Clear search field').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await reload.click();
    await apply.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await clearSearch.click();
    await options.first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await options.first().click();
    await apply.click();
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
  test('Verify Serp featires visuals when keyboard interaction', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const apply = page.getByRole('button', { name: 'Apply' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.getByText('Loading...').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.getByText('Something went wrong.').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await apply.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.type('a');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify Serp featires visuals when mouse interaction', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox');
    const textbox = page.getByRole('textbox');
    const clearSearch = page.getByRole('button', { name: 'Clear search field' });
    const reload = page.getByRole('button', { name: 'Reload' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');

    await trigger.click();
    await page.getByText('Loading...').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.getByText('Something went wrong.').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await textbox.fill('Test');
    await clearSearch.hover();
    await page.getByText('Clear search field').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await reload.click();
    await apply.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await clearSearch.click();
    await options.first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await options.first().click();
    await apply.click();
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
  test('Verify Serp featires visuals when keyboard interaction', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox');
    const textbox = page.getByRole('textbox');
    const clearSearch = page.getByRole('button', { name: 'Clear search field' });
    const reload = page.getByRole('button', { name: 'Reload' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.getByText('Something went wrong.').waitFor({ state: 'visible' });
    await expect(clearSearch).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(reload).toBeFocused();
    await page.keyboard.press('Enter');
    await apply.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.type('a');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});
