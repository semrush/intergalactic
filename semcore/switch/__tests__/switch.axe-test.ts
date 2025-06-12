import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Switch', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
  test('Basic example with icon', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/basic_example_with_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
  test('External label', async ({ page }) => {
    const standPath = 'stories/components/switch/docs/examples/external_label.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
