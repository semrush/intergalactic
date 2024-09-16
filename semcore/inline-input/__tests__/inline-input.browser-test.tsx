import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('InlineInput', () => {
  test('custom texts', async ({ page }) => {
    const standPath = 'semcore/inline-input/__tests__/stands/custom-texts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const confirmLocator = page.locator('#confirm');
    const confirmBox = await confirmLocator.boundingBox();

    const cancelLocator = page.locator('#cancel');
    const cancelBox = await cancelLocator.boundingBox();

    expect(confirmBox).not.toBe(null);
    expect(cancelBox).not.toBe(null);

    await page.mouse.move(confirmBox!.x + 6, confirmBox!.y + 6);
    await new Promise((r) => setTimeout(r, 1000));
    await expect(page).toHaveScreenshot();

    await page.mouse.move(cancelBox!.x + 6, cancelBox!.y + 6);
    await new Promise((r) => setTimeout(r, 1000));
    await expect(page).toHaveScreenshot();
  });
});
