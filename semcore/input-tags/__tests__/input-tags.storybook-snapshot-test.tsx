import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Input-Tags Render and Visible', () => {
  test('Input Tag with Select - Empty Input ans expanded select', async ({ page, browserName }) => {
    await page.goto('/?path=/story/components-inputtags--select-tag-for-filtering');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    await frame.locator('body').waitFor();
    const element = page.locator('div.css-1beo138');
    const x = 150;
    const y = 30;
    await element.click({ position: { x, y } });
    await element.click({ position: { x, y } });
    if (browserName === 'firefox') {
      await page.keyboard.press('Tab');
    } else {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    }
    await expect(element).toHaveScreenshot();
  });
});