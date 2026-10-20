import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @line-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/basic-usage.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('curve', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/curve.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('dots-display-function', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/dots-display-function.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('hover-line', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/hover-line.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('interpolation', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/interpolation.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('legend-and-symbols-for-dots', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/legend-and-symbols-for-dots.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('line', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/line.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('line-with-area', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/line-with-area.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('time', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/time.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('tooltip', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/line-chart/tooltip.tsx', 'en');

    await test.step('Verify initial state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
