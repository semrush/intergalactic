import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Tooltip', () => {
  test('Opens on mouse hover', async ({ page }) => {
    const standPath = 'website/docs/components/tooltip/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('article:has-text("Trigger');
    const triggerRect = (await trigger.boundingBox())!;

    await page.mouse.move(
      triggerRect.x + triggerRect.width / 2,
      triggerRect.y + triggerRect.height / 2,
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });

  test('Opens on keyboard focus', async ({ page }) => {
    const standPath = 'website/docs/components/tooltip/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });

  test.only('Passes focus through', async ({ page }) => {
    const standPath = 'website/docs/components/tooltip/examples/with_focusable_elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    const linkBefore = await page.locator('a:has-text("Normal link before tooltip")');

    await expect(linkBefore).toBeFocused();

    await page.keyboard.press('Tab');

    const trigger = await page.locator('a:has-text("Link with tooltip")');
    await expect(trigger).toBeFocused();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const popperLink = await page.locator('[data-ui-name="Tooltip.Popper"] a:has-text("link")');
    await expect(popperLink).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(popperLink).toHaveCount(0);

    await page.keyboard.press('Tab');

    const linkAfter = await page.locator('a:has-text("Normal link after tooltip")');
    await expect(linkAfter).toBeFocused();
  });
});
