import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Button with addon and aria-label', () => {
  test('Poppep by mouse iteraction', async ({ page }) => {
    await page.goto('/?path=/story/components-button--button-with-no-visible-text');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    await frame.locator('body').waitFor();
    const popperConfirmLocator = frame.locator('text=Confirm action');
    const popperCloseLocator = frame.locator('text=Close notification');
    const confirmButtonLocator = frame.locator('button[aria-label="Confirm action"]');
    const box = await confirmButtonLocator.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect(popperConfirmLocator).toBeVisible();
    }

    const closeButtonLocator = frame.locator('button[aria-label="Close notification"]');
    const closebox = await closeButtonLocator.boundingBox();
    if (closebox) {
      await page.mouse.move(closebox.x + closebox.width / 2, closebox.y + closebox.height / 2);
      await expect(popperCloseLocator).toBeVisible();
    }
  });

  test('Poppep by keyboard iteraction', async ({ page }) => {
    await page.goto('/?path=/story/components-button--button-with-no-visible-text');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const emelent = frame.locator('body');
    await emelent.waitFor();
    const popperConfirmLocator = frame.locator('text=Confirm action');
    const popperCloseLocator = frame.locator('text=Close notification');
    const x = 50;
    const y = 50;
    await emelent.click({ position: { x, y } });
    await page.keyboard.press('Tab');
    await expect(popperConfirmLocator).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(popperCloseLocator).toBeVisible();
  });
});
