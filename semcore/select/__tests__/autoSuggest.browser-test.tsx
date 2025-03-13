import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('AutoSuggest', () => {
  test('Keyboard Navigation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
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
  test('Mouse Navigation', async ({ page, browserName }) => {
    // TODO: in firefox it is very unstable
    if (browserName === 'firefox') return;

    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
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

  test('Verify if it is possible to press Enter without selecting option in the list', async ({
    page,
  }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = await page.locator('input');
    const inputRect = (await input.boundingBox())!;
    const inputCoords = [inputRect.x + inputRect.width / 2, inputRect.y + inputRect.height / 2];

    await page.mouse.click(inputCoords[0], inputCoords[1]);

    await page.keyboard.type('a');
    await page.waitForSelector('text=persian');

    const persianOption = await page.locator('text=persian');

    await expect(persianOption).not.toHaveClass(/highlight/);

    await page.keyboard.press('Escape');
    await page.mouse.click(inputCoords[0], inputCoords[1]);
    await page.waitForSelector('text=persian');

    await expect(persianOption).not.toHaveClass(/highlight/);
  });
});
