import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Carousel', () => {
  // skipped temporary till new tests will be merged
  test.skip('Zoom item after cyclic scroll', async ({ page }) => {
    const standPath =
      'stories/components/carousel/docs/examples/carousel_with_default_indicators.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    /** Need this to be sure that the image is loaded **/
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(page).toHaveScreenshot();

    await page.getByLabel('Next').click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.getByLabel('Next').click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.getByLabel('Next').click();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const items = await page.locator('[data-ui-name="Carousel.Item"]').all();
    expect(items.length).toBe(3);

    for (const item of items) {
      if (await item.isVisible()) {
        await item.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
        break;
      }
    }

    /** Need this to be sure that the image is loaded **/
    await new Promise((resolve) => setTimeout(resolve, 600));
    await expect(page).toHaveScreenshot();
  });
});
