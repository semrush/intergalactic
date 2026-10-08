import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @chart-legend ${TAG.ACCESSIBILITY}`, () => {
  test('custom-shape-as-legenditem', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/chart-legend/custom-shape-as-legenditem.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('table-view', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/table-view.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-with-metrics', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/legend-with-metrics.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-with-metrics with links and two metrics per item', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/chart-legend/legend-with-metrics.tsx', 'en', {
      metricLink: 'all',
      metricsPerItem: 2,
    });
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
