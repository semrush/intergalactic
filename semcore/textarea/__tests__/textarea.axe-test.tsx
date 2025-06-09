import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Textarea', () => {
  test('Textarea with auto height', async ({ page }) => {
    const standPath = 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
