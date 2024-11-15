import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Select', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/select/__stories__/docs-examples/options_filtering.tsx';
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
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
