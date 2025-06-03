import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('AutoSuggest', () => {
  test('Combobox', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened select check
    {
      await page.keyboard.press('Tab');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('AutoSuggest', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened select check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
