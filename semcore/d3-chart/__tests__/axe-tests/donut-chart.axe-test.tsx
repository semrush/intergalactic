import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @donut-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('donut', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/donut.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('donut-controlled-highlight', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/donut-controlled-highlight.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('edge-cases', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/edge-cases.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('semi-donut', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/semi-donut.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
