import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('radial-tree-chart', () => {
  test('basic', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('custom-svg-in-center', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/radial-tree-chart/custom-svg-in-center.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
