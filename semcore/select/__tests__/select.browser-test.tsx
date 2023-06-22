import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Select', () => {
  test('Traps focus', async ({ page }) => {
    const standPath = 'website/docs/components/select/examples/filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');

    await expect(page).toHaveScreenshot();
  });
  test('Returns focus', async ({ page }) => {
    const standPath = 'website/docs/components/select/examples/filtering.tsx';
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
  test('Traps focus and handles clicks', async ({ page }) => {
    const standPath = 'website/docs/components/select/examples/filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');
    await page.keyboard.press('Tab');

    const inputLocaltor = await page.locator('input');

    const optionBLocator = await page.locator('text=Option b');
    const optionBRect = (await optionBLocator.boundingBox())!;
    await page.mouse.click(
      optionBRect.x + optionBRect.width / 2,
      optionBRect.y + optionBRect.height / 2,
    );

    await expect(inputLocaltor).toHaveCount(0);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const triggerLocatior = await page.locator('[data-ui-name="Select.Trigger"]');

    await expect(await triggerLocatior.textContent()).toBe('Option b');
  });
});
