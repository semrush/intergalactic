import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('ProgressBar', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/progress-bar/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('Custom bar', async ({ page }) => {
    const standPath = 'stories/components/progress-bar/docs/examples/customizing_the_bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
