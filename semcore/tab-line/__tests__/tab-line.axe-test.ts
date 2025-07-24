import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('TabLine', () => {
  test('Automatic tab activation', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test.skip('Disabled tabLine item', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('TabLine item addons', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/tab_line_item_addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
