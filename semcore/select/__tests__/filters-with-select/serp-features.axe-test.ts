import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.ACCESSIBILITY}`, () => {
  test('SERP features filter with all interaction states', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx', 'en');

    await test.step('Initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Loading state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('After reload with options', async () => {
      const reloadButton = page.getByRole('button', { name: 'Reload' });
      await reloadButton.waitFor({ state: 'visible' });
      await reloadButton.click();
      const selectAllOption = page.getByRole('option', { name: 'Select all' });
      await selectAllOption.waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Select some items', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('After apply', async () => {
      const applyButton = page.getByRole('button', { name: 'Apply' });
      await applyButton.click();
      await page.getByRole('listbox').waitFor({ state: 'detached' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
