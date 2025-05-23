import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('line-chart', () => {
  test('legend-and-symbols-for-dots', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/line-chart/legend-and-symbols-for-dots.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/line-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
