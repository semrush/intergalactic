import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Input-Tags Render and Visible', () => {
  test('Input Tag with Select - Empty Input and expanded Select', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Input Tags with Addon, Circle, Text, Close - sized states  and pairs', async ({
    page,
    browserName,
  }) => {
    const standPath = 'stories/components/input-tags/advanced/components/tags_with_addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});
