import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@d3-chart @cigarette-chart ${TAG.ACCESSIBILITY}`, () => {
  test('basic-usage', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/basic-usage.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('click-interaction', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/click-interaction.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('custom-a11y', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/custom-a11y.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('layouts', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/layouts.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('no-values', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/no-values.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('tooltip-type', async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/cigarette-chart/tooltip-type.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
