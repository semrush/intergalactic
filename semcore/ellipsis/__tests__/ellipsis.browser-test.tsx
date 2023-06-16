import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Ellipsis', () => {
  test('Renders correctly', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/ellipsis/examples/middle.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});
