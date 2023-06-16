import { expect } from '@playwright/test';
import { voTest as test } from '@guidepup/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';

test('Renders correctly', async ({ page }) => {
  const standPath = resolvePath(
    __dirname,
    '../../../website/docs/table-group/data-table/examples/base.tsx',
  );
  const htmlContent = await e2eStandToHtml(standPath, 'en', true);

  await page.setContent(htmlContent);

  await expect(page).toHaveScreenshot();
});
