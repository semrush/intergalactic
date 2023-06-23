import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('FilterTrigger', () => {
  test('Focus control', async ({ page }) => {
    const standPath = 'website/docs/components/filter-trigger/examples/select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.waitForSelector('[data-ui-name="Select.Menu"]');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
    await expect(popperLocator).toHaveCount(0);

    const triggerLocator = await page.locator(
      '[data-ui-name="Select.Trigger"] [data-ui-name="Select.Trigger"]',
    );

    await expect(triggerLocator).toBeFocused();

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');

    const clearButtonLocator = await page.locator('button[data-ui-name="BaseTrigger"]');

    await expect(clearButtonLocator).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Select option');

    await expect(triggerLocator).toBeFocused();

    await expect(page).toHaveScreenshot();
  });
});
