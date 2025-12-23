import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @bar-chart ${TAG.ACCESSIBILITY}`, () => {
  test('bar', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/bar.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('bar-hover', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/bar-hover.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('date-format', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/date-format.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('grouped-bars', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/grouped-bars.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('negative-values', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/negative-values.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tooltip', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/tooltip.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('trend-line', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-chart/trend-line.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});

test.describe(`@d3-chart/bar-horizontal-chart ${TAG.ACCESSIBILITY}`, () => {
  test('background', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/background.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('bar-labels', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/bar-labels.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('grouped-horizontal-bars', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/grouped-horizontal-bars.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('horizontal-bar', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/horizontal-bar.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});

test.describe(`@d3-chart/bar-horizontal-compact ${TAG.ACCESSIBILITY}`, () => {
  test('advanced-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/advanced_usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/basic_usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('clickable-advanced', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/clickable_advanced.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('clickable-basic', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/clickable_basic.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('links', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/links.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});

test.describe(`@d3-chart/stacked-bar-chart ${TAG.ACCESSIBILITY}`, () => {
  test('stacked-bar', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-bar-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('stacked-grouped-bars', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});

test.describe(`@d3-chart/stacked-horizontal-bar ${TAG.ACCESSIBILITY}`, () => {
  test('horizontal-stacked-bar', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
