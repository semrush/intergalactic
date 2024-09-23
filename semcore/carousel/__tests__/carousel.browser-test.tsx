import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Carousel', () => {
  test('Zoom item after cyclic scroll', async ({ page }) => {
    const standPath =
      'website/docs/components/carousel/examples/carousel_with_default_indicators.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    /** Need this to be sure that the image is loaded **/
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(page).toHaveScreenshot();

    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();

    const items = await page.locator('[data-ui-name="Carousel.Item"]').all();

    expect(items.length).toBe(3);

    for (const item of items) {
      if (await item.isVisible()) {
        await item.click();
        break;
      }
    }

    /** Need this to be sure that the image is loaded **/
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(page).toHaveScreenshot();
  });
});
