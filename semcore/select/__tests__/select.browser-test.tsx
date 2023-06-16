import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Select', () => {
  test('Traps focus', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/select/examples/filtering.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');

    await expect(page).toHaveScreenshot();
  });
  test('Returns focus', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/select/examples/filtering.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');
    const inputLocaltor = await page.locator('input');

    await page.keyboard.press('Escape');

    await expect(inputLocaltor).toHaveCount(0);

    await expect(page).toHaveScreenshot();
  });
});
