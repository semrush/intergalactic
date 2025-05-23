import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dot', () => {
  test('Verify dot styles and view in different posisions', async ({ page }) => {
    const standPath = 'stories/components/dot/tests/examples/different-sizes-and-positions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
    const dotElementM = page.locator('span[aria-label="M size"][data-ui-name="Dot"]');

    const width = await dotElementM.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('width'),
    );
    const height = await dotElementM.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('height'),
    );

    expect(width.trim()).toBe('6px');
    expect(height.trim()).toBe('6px');

    const dotElementL = page.locator('span[aria-label="L size"][data-ui-name="Dot"]');

    const widthL = await dotElementL.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('width'),
    );
    const heightL = await dotElementL.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('height'),
    );

    expect(widthL.trim()).toBe('12px');
    expect(heightL.trim()).toBe('12px');

    const dotCounter = page.locator('span[aria-label="Value"][data-ui-name="Dot"]');

    const paddingLeft = await dotCounter.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('padding-left'),
    );
    const paddingRight = await dotCounter.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('padding-right'),
    );

    expect(paddingLeft.trim()).toBe('4px');
    expect(paddingRight.trim()).toBe('4px');
  });

  test('Verify dot hides by mouse', async ({ page }) => {
    const standPath = 'stories/components/dot/docs/examples/example_of_dot_animation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const button = page.locator('[data-ui-name="Button"]');
    const dot = page.locator('[data-ui-name="Dot"]');

    await button.hover();
    await expect(dot).toBeVisible();
    await button.click();
    await expect(dot).not.toBeVisible();
  });

  test('Verify dot hides by keyboard', async ({ page }) => {
    const standPath = 'stories/components/dot/docs/examples/example_of_dot_animation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const button = page.locator('[data-ui-name="Button"]');
    const dot = page.locator('[data-ui-name="Dot"]');

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(dot).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(dot).not.toBeVisible();
  });
});
