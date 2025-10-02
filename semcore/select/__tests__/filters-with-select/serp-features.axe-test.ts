import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('SERP features', () => {
  test('Base example', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('loading state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('after reload', async () => {
      const reloadButton = page.getByRole('button', { name: 'Reload' });
      await reloadButton.waitFor({ state: 'visible' });
      await reloadButton.click();
      const selectAllOption = page.getByRole('option', { name: 'Select all' });
      await selectAllOption.waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('select some items', async () => {
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
    await test.step('after apply', async () => {
      const applyButton = page.getByRole('button', { name: 'Apply' });
      await applyButton.click();
      await page.getByRole('listbox').waitFor({ state: 'detached' });

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
