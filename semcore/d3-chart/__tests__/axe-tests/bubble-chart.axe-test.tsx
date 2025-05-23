import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('bubble-chart', () => {
  test('bubble-chart', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bubble-chart/bubble-chart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
