import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';

test.describe('DataTable', () => {
  test('Renders correctly', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/table-group/data-table/examples/base.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});
