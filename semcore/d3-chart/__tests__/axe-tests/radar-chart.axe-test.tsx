import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @radar-chart ${TAG.ACCESSIBILITY}`, () => {
  test('background-color', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/background-color.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('circle', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/circle.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('color', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/color.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('label-custom', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/label-custom.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('label-long', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/label-long.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/legend-and-pattern-fill.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('rotated', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/rotated.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('scale', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/scale.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tick-size', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/tick-size.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tooltip', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/tooltip.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
