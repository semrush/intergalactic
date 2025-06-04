import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('cigarette-chart', () => {
  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('custom-a11y', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/custom-a11y.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('layouts', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/layouts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
