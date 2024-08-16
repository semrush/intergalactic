import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Button', () => {
  test('Should support hover with only Addon', async ({ page }) => {
    const standPath = 'website/docs/components/button/examples/button_with_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const popperLocator = page.locator('text=Confirm');

    await page.mouse.move(20, 20);
    await popperLocator.waitFor();

    await expect(page).toHaveScreenshot();
  });

  test('Should support hover with only addon prop', async ({ page }) => {
    const standPath = 'website/docs/components/button/examples/button_accessibility.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const popperConfirmLocator = page.locator('text=Confirm action');
    const popperCloseLocator = page.locator('text=Close notification');

    await page.mouse.move(20, 20);
    await popperConfirmLocator.waitFor();

    await expect(page).toHaveScreenshot();

    await page.mouse.move(50, 20);
    await popperCloseLocator.waitFor();

    await expect(page).toHaveScreenshot();
  });
});
