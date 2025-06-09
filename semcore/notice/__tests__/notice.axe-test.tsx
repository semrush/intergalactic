import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Notice', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/components/notice/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Custom', async ({ page }) => {
    const standPath = 'stories/components/notice/docs/examples/custom_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Smart', async ({ page }) => {
    const standPath = 'stories/components/notice/docs/examples/noticesmart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
