import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Badge', () => {
  test('All types', async ({ page }) => {
    const standPath = 'stories/components/badge/docs/examples/badge_main_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
