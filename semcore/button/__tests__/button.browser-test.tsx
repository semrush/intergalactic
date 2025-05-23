import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Button', () => {
  test('All themes', async ({ page }) => {
    const standPath = 'stories/components/button/tests/examples/icon_uses_and_themes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Buttons with Addons and text', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Buttons Sizes M/L', async ({ page }) => {
    const standPath = 'stories/components/button/advanced/examples/ButtonSizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Buttons Icon Only', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_with_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Should support hover with only Addon', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_with_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const popperLocator = page.locator('text=Confirm');

    await page.mouse.move(20, 20);
    await popperLocator.waitFor();

    await expect(page).toHaveScreenshot();
  });

  test('Should support hover with only addon prop', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_accessibility.tsx';
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
