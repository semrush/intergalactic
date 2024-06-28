import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Select', () => {
    test('AutoSuggest Keyboard Navigation', async ({page}) => {
      const standPath = 'website/docs/components/auto-suggest/examples/autosuggest_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');

      await expect(page).toHaveScreenshot();
    });
    test('AutoSuggest Mouse Navigation', async ({page}) => {
      const standPath = 'website/docs/components/auto-suggest/examples/autosuggest_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const input = await page.locator('input');
      const inputRect = (await input.boundingBox())!;
      const inputCoords = [inputRect.x + inputRect.width / 2, inputRect.y + inputRect.height / 2];

      await page.mouse.click(inputCoords[0], inputCoords[1]);

      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');

      await expect(page).toHaveScreenshot();

      const persianOption = await page.locator('text=persian');
      const persianOptionRect = (await persianOption.boundingBox())!;
      const persianOptionCoords = [
        persianOptionRect.x + persianOptionRect.width / 2,
        persianOptionRect.y + persianOptionRect.height / 2,
      ];

      await page.mouse.click(persianOptionCoords[0], persianOptionCoords[1]);

      await expect(persianOption).toHaveCount(0);

      await expect(page).toHaveScreenshot();
    });
});
