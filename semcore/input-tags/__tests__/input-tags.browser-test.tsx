import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Input-tags', () => {
  test('Should focus every time when user navigates by tab', async ({ page }) => {
    const standPath = 'website/docs/components/input-tags/examples/select_for_tag_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page.locator('[data-ui-name="Select.Trigger"]')).toBeVisible();
    
    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]')
    ).toBeVisible();
    await expect(page.locator('input[aria-expanded="true"]')).toBeVisible();
    await expect(page.locator('input[aria-expanded="true"][class*="keyboardFocused"]')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-ui-name="Select.Trigger"][class*="keyboardFocused"]')
    ).not.toBeVisible();
    await expect(page.locator('input[aria-expanded="true"][class*="keyboardFocused"]')).not.toBeVisible();

  });

  
});
