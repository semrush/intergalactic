import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} '@mini-charts'`, () => {
  test('Colors', async ({ page }) => {
    await loadPage(page, 'stories/components/mini-chart/docs/examples/base_color.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Basic', async ({ page }) => {
    await loadPage(page, 'stories/components/mini-chart/docs/examples/basic_usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
