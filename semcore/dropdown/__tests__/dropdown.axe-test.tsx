import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Focus interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
