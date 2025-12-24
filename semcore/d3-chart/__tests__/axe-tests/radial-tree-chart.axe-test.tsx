import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @radial-tree-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('custom-svg-in-center', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/custom-svg-in-center.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('edge-cases', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/edge-cases.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('multicolor-and-accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/multicolor-and-accessibility.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('multiline-text', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radial-tree-chart/multiline-text.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
