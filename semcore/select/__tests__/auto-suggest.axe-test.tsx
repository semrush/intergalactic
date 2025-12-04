import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.ACCESSIBILITY}`, () => {
  test('Combobox', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Default state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Opened combobox', async () => {
      await page.keyboard.press('Tab');
      await page.getByRole('option').first().waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('AutoSuggest', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx', 'en');

    await test.step('Default state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Opened autosuggest with typed input', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await page.getByText('persian').waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
