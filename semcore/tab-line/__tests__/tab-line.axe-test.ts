import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @tab-line`, () => {
  test('Automatic tab activation', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/docs/examples/manual_tab_activation.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test.skip('Disabled tabLine item', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('TabLine item addons', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/docs/examples/tab_line_item_addons.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
