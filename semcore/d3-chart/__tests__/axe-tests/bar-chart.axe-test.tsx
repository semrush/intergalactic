import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('bar-chart', () => {
  test('bar', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('date-format', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/date-format.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('negative-values', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/negative-values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('grouped-bars', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/grouped-bars.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('trend-line', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-chart/trend-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('bar-horizontal-chart', () => {
  test('bar-labels', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-horizontal/bar-labels.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-horizontal/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('grouped-horizontal-bars', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal/grouped-horizontal-bars.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('bar-horizontal-compact', () => {
  test('basic-usage', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('clickable-advanced', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/clickable_advanced.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('stacked-bar-chart', () => {
  test('stacked-bar', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/stacked-bar-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('stacked-grouped-bars', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('stacked-horizontal-bar', () => {
  test('stacked-horizontal-bar', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
