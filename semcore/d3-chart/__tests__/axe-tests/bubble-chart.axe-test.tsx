import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @bubble-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('bubble-chart', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bubble-chart/bubble-chart.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('color-customization', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('initial-data-loading', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bubble-chart/initial-data-loading.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
