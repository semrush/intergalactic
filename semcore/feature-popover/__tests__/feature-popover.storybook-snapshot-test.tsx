import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Feature Popover', () => {
  test('Basic - Popper Renders and focused', async ({ page }) => {
    await page.goto('/?path=/story/components-featurepopover--animation-example');
    const frame = page.frameLocator('iframe[data-is-storybook="true"]');
    await frame.locator('body').waitFor();
    await frame.locator('[data-ui-name="FeaturePopover.Popper"]').waitFor();
    const element = page.locator('div.css-1beo138');
    await expect(element).toHaveScreenshot();
  });
});
