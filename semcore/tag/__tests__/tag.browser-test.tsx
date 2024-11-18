import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Tags Render and Visible', () => {
  test('Tag with Addon as container', async ({ page }) => {
    const standPath = 'stories/components/tag/advanced/components/tag_container_addon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Tag with Addon all sizes and positions', async ({ page }) => {
    const standPath =
      'stories/components/tag/advanced/components/tag_with_addon_all_sizes_positions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});
