import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Button Renders and Visible', () => {
  //this is exmaple of screenshot test
  test('Basic', async ({ page }) => {
    await page.goto('/?path=/story/components-button--simple-button');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('Buttons with Addons and text', async ({ page }) => {
    await page.goto('/?path=/story/components-button--addons');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('Buttons Sizes M/L', async ({ page }) => {
    await page.goto('/?path=/story/components-button--sizes');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });

  test('Buttons Icon Only', async ({ page }) => {
    await page.goto('/?path=/story/components-button--icon-only-button');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    const element = await frame.locator('body');
    await element.waitFor();
    await expect(element).toHaveScreenshot();
  });
});
