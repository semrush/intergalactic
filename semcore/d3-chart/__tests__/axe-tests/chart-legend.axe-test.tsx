import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @chart-legend ${TAG.ACCESSIBILITY}`, () => {
  test('custom-shape-as-legenditem', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/custom-shape-as-legenditem.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('table-view', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/chart-legend/table-view.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
