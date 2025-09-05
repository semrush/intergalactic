import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Serp features mouse interaction', async ({ page }) => {
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

    await textbox.fill('Ads');
    await page.getByRole('option', { name: 'Shopping Ads (Product Listing' }).hover();
    await page.getByText('Shopping Ads (Product Listing').nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await options.first().click();
    await apply.click();
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
  test('Verify Serp features keyboard interaction', async ({ page }) => {
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
    await page.keyboard.type('Ads');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await apply.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interaction', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.getByRole('combobox');
    const textbox = page.getByRole('textbox');
    const clearSearch = page.getByRole('button', { name: 'Clear search field' });
    const reload = page.getByRole('button', { name: 'Reload' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const options = page.getByRole('option');
    const checkboxes = page.locator('[data-ui-name="Select.Option.Checkbox"]');
    const clear = page.getByRole('button', { name: 'Clear' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await test.step('Verify focus order when reload state', async () => {
      await page.getByText('Something went wrong.').waitFor({ state: 'visible' });
      await expect(textbox).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(reload).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(textbox).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(reload).toBeFocused();
    });

    await test.step('Verify focus order in the input', async () => {
      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await expect(clearSearch).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(clearSearch).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(clearSearch).not.toBeVisible();
      await expect(textbox).toBeFocused();
    });

    await test.step('Verify all options can be selected', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('option', { name: 'Select all' })).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await options.count();
      for (let i = 0; i < count - 2; i++) {
        await expect(checkboxes.nth(i)).toHaveClass(/selected/);
      }
      await expect(page.getByRole('option', { name: 'None' })).toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'hidden' });
      await expect(trigger).toHaveText(/SERP Features: All selected/);
    });

    await test.step('Verify all options can be deselected and cleared', async () => {
      await page.keyboard.press('ArrowDown');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('option', { name: 'Deselect all' })).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await options.count();
      for (let i = 0; i < count - 2; i++) {
        await expect(checkboxes.nth(i)).not.toHaveClass(/selected/);
      }
      await expect(page.getByRole('option', { name: 'None' })).not.toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await expect(clear).toBeFocused();
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'hidden' });
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveText(/SERP Features/);
    });

    await test.step('Verify none can be deselected', async () => {
      await page.keyboard.press('ArrowDown');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      await expect(page.getByRole('option', { name: 'None' })).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await options.count();
      for (let i = 0; i < count - 2; i++) {
        await expect(checkboxes.nth(i)).toHaveAttribute('disabled');
      }
      await expect(page.getByRole('option', { name: 'None' })).not.toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'hidden' });
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveText(/SERP Features: %none%/);
    });
  });
});
