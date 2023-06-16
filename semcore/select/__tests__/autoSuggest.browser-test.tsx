import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('AutoSuggest', () => {
  test('Arrows Navigation', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/auto-suggest/examples/autosuggest.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('S');
    await page.waitForSelector('text=spotify.com');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();
  });
});
