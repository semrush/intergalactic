import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('area-chart', () => {
  test('area', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/area.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('edge-cases', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('stacked-area-chart', () => {
  test('basic-usage', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/stacked-area-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('edge-cases', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/stacked-area-chart/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
