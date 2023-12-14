import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('ScrollArea', () => {
  test('Scrolls with keyboard', async ({ page }) => {
    const standPath = 'website/docs/components/scroll-area/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.03 });
  });
});
