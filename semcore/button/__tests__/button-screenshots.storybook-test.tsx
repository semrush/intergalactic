import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Website Examples visual regression', () => {
//this is exmaple of screenshot test
  test('[Basic] Button Renders and Visible', async ({ page }) => {
    await page.goto('/?path=/story/components-button--simple-button');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('[Buttons with Addons and text] Button Renders and Visible', async ({ page }) => {
    await page.goto('/?path=/story/components-button--addons');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('[Buttons Sizes M/L] Button Renders and Visible', async ({ page }) => {
    await page.goto('/?path=/story/components-button--sizes');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('[Buttons Icon Only] Button Renders and Visible', async ({ page }) => {
    await page.goto('/?path=/story/components-button--icon-only-button');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

});
