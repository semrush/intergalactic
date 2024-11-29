import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('DataTable', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.evaluate(() => {
      document.querySelectorAll('[role=columnheader], [role=gridcell]').forEach((el) => {
        el.removeAttribute('inert');
      });
    });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
