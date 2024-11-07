import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Tooltip renders', () => {
  test('Singleton - select expands and visible', async ({ page, browserName }) => {
    await page.goto('/?path=/story/components-tooltip--singleton');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    await frame.locator('body').waitFor();
    const element = page.locator('div.css-1beo138');
    await frame.locator('[data-ui-name="Select.Trigger"]').waitFor();
    const x = 10;
    const y = 10;
    await element.click({ position: { x, y } });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(element).toHaveScreenshot();
  });
});
