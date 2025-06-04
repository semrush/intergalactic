import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('d3-chart', () => {
  test('a11y-formatting', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/a11y-formatting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('adaptive-chart', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/adaptive-chart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('additional-lines', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/additional-lines.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('axes-titles', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/axes-titles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('axis-values', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/axis-values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('base', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('chart-legend', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/chart-legend.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('custom-patterns', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/d3-chart/custom-patterns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
