import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Modal', () => {
  test('Modal with iframe inside', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/advanced/examples/modal_iframe.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (browserName !== 'chromium') {
      await page.keyboard.press('Tab');
    }

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});
