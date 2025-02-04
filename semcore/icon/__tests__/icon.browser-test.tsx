import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Icons size rendering and attributes', () => {
  test('Icon in button', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icon_in_buttons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();

    const svgs = page.locator('svg');
    const firstIcon = svgs.first();
    await expect(firstIcon).toHaveAttribute('aria-hidden', 'true');
    await expect(firstIcon).toHaveAttribute('tabindex', '-1');
  });

  test('Icons in buttonLink', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icon_in_buttonLink.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Icon in buttonLink', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icons_in_links.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Icon attributes in interactive', async ({ page }) => {
    const standPath = 'stories/components/icon/docs/examples/interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const svgElement = await page.locator('svg[data-ui-name="Hint"]');

    await expect(svgElement).toHaveAttribute('role', 'button');
    await expect(svgElement).toHaveAttribute('tabindex', '0');
    await expect(svgElement).toHaveAttribute('width', '16');
    await expect(svgElement).toHaveAttribute('height', '16');
    await expect(svgElement).toHaveAttribute('viewBox', '0 0 16 16');
    await expect(svgElement).toHaveAttribute('focusable', 'true');
    await expect(svgElement).toHaveAttribute('data-group', 'm');
  });
});
