import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Auto suggest', () => {
  test('Base example', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('before typing', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('with suggestions', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('pe');
      await page.getByRole('listbox').waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
  test('Combobox example', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('before typing', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('with suggestions', async () => {
      await page.keyboard.press('Tab');
      await page.getByRole('listbox').waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
