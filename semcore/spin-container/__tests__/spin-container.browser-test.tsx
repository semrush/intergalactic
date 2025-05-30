import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Styles', () => {
  test('Verify sizes and theme', async ({ page }) => {
    const standPath = 'stories/components/spin-container/tests/examples/sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const sizes = {
      xs: '16px',
      s: '20px',
      m: '24px',
      l: '32px',
      xl: '48px',
      xxl: '72px',
    };

    const themes = ['dark', 'invert'];

    const flex = page.locator('[data-ui-name="Flex"]');

    for (const [themeIndex, theme] of themes.entries()) {
      const spinContainer = flex.nth(themeIndex).locator('[data-ui-name="SpinContainer"]');

      for (const [size, expectedPx] of Object.entries(sizes)) {
        const spinner = spinContainer.locator(`svg[class*="size_${size}"]`);

        await expect(spinner).toBeVisible();

        const [height, width] = await Promise.all([
          spinner.evaluate((el) => getComputedStyle(el).height),
          spinner.evaluate((el) => getComputedStyle(el).width),
        ]);

        expect(height).toBe(expectedPx);
        expect(width).toBe(expectedPx);

        const style = await spinner.getAttribute('style');
        expect(style).toContain(`${theme};`);
      }
    }
  });

  test('Verify custom backgrouns with themes and overlay and theme', async ({ page }) => {
    const standPath = 'stories/components/spin-container/tests/examples/custom-background.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Attributes and interactions', () => {
  test('Verify interactions when elements when spin container added', async ({ page }) => {
    const standPath =
      'stories/components/spin-container/tests/examples/over-interactive-cotent.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Input.Value"]').first()).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Input.Value"]').nth(1)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Input.Value"]').nth(2)).not.toBeFocused();
    await expect(page.locator('[data-ui-name="SpinContainer.Overlay"]').nth(0)).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="SpinContainer.Overlay"]').nth(1)).not.toBeFocused();
  });

  test('Verify spin container attributes when loading and not loading', async ({ page }) => {
    const standPath = 'stories/components/spin-container/docs/examples/usage_in_content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const spinContainer = page.locator('[data-ui-name="SpinContainer"]');
    await expect(spinContainer).toHaveAttribute('aria-live', 'polite');
    await expect(spinContainer).toHaveAttribute('role', 'status');

    const spinContainerContent = page.locator('[data-ui-name="SpinContainer.Content"]');
    await expect(spinContainerContent).toHaveAttribute('inert', '');

    const animation = page.locator('[data-ui-name="FadeInOut"]');
    await expect(animation).toHaveCount(1);

    const svg = animation.locator('[data-ui-name="Spin"]');
    await expect(svg).toHaveAttribute('aria-label', 'Loading…');
    await expect(svg).toHaveAttribute('role', 'img');

    await page.locator('[data-ui-name="Button"]').click();
    await expect(spinContainerContent).not.toHaveAttribute('inert', '');
    await expect(animation).toHaveCount(0);
    await expect(svg).not.toBeVisible();
  });
});
