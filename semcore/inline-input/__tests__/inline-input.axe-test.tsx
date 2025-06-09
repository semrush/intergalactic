import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('InlineInput', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // focused editor check
    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Inheriting text size', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/inheriting_text_size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // focused editor check
    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // edit mode
    {
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Number only input', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/number-only_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // focused editor check
    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
