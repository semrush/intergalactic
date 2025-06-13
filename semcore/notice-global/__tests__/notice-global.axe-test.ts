import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Notice global', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/components/notice-global/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
