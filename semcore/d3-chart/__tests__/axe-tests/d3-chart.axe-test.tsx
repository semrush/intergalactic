import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart ${TAG.ACCESSIBILITY}`, () => {
  test('a11y-formatting', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/a11y-formatting.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('responsive-low-level-chart', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/responsive-low-level-chart.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('additional-lines', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/additional-lines.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('axes', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/axes.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('axes-titles', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/axes-titles.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('axis-values', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/axis-values.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('base', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/base.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('chart-legend', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/chart-legend.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('custom-patterns', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/custom-patterns.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('enforcing-patterns', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/enforcing-patterns.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('export-to-image', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/export-to-image.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('low-level-components-use', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/low-level-components-use.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('paddings-&-margins', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/paddings-&-margins.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('reference-line', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/reference-line.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('synchronous-charts', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/synchronous-charts.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tooltip', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tooltip-control', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/d3-chart/tooltip-control.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
