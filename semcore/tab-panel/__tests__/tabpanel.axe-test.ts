import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @tab-panel`, () => {
  test('Automatic tab activation', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test.skip('Disabled tabLine item', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/disabled_tab_panel_item.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('TabLine item addons', async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/tab_panel_item_addons.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
