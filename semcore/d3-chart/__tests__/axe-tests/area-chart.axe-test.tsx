import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @area-chart ${TAG.ACCESSIBILITY}`, () => {
  test('area', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/area.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/basic-usage.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('custom-line', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/custom-line.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('edge-cases', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('interpolation', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/interpolation.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});

test.describe(`@d3-chart @area-chart @stacked-area-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/basic-usage.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('edge-cases', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/edge-cases.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('legend-and-pattern-fill', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/legend-and-pattern-fill.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('stacked-area', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/stacked-area-chart/stacked-area.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
