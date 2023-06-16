import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Accordion', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'website/docs/components/accordion/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');

    await expect(page).toHaveScreenshot();
  });
  test('Handles with mouse', async ({ page }) => {
    const standPath = 'website/docs/components/accordion/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const section1Header = await page.locator('text=Section 1');

    await expect(page).toHaveScreenshot();

    await section1Header.first().click();

    await expect(page).toHaveScreenshot();

    await section1Header.click();

    await expect(page).toHaveScreenshot();
  });
});
