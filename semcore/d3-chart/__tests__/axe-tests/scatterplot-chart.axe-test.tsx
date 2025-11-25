import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @scatterplot-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('color-customization', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/color-customization.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('color-customization-and-values-inside', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/color-customization-and-values-inside.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('initial-data-loading', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/initial-data-loading.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('scatter-plot', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/scatter-plot.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('scatter-plot-with-values-inside', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/scatterplot-chart/scatter-plot-with-values-inside.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
