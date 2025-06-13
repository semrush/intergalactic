import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('TabPanel', () => {
  test('Automatic tab activation', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test.skip('Disabled tabLine item', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/disabled_tab_panel_item.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('TabLine item addons', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/tab_panel_item_addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
