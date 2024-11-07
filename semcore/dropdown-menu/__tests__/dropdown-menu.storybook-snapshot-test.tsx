import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Menu item with actions example ', () => {
  test('Renders and visisble when just expanded', async ({ page}) => {
    await page.goto('/?path=/story/components-dropdown-menu--menu-item-with-actions');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    const x = 20;
    const y = 20;
    await element.click({ position: { x, y } });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(element).toHaveScreenshot();
  });
});
