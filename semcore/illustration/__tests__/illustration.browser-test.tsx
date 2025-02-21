import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Illustration size colors and attributes ', () => {
  test('Illustration atrributes', async ({ page }) => {
    const standPath = 'stories/components/illustration/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const illustration = page.locator('svg');
    await expect(illustration).toHaveAttribute('aria-hidden', 'true');
  });

  test('Illustration with color', async ({ page }) => {
    const standPath = 'stories/components/illustration/docs/examples/custom-color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Illustration sizes', async ({ page }) => {
    const standPath = 'stories/components/illustration/tests/examples/illustration_sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const expectedDimensions = [
      { width: 40, height: 40 },
      { width: 80, height: 80 },
      { width: 140, height: 140 },
    ];

    const svgs = page.locator('svg');
    const svgCount = await svgs.count();

    for (let i = 0; i < svgCount; i++) {
      const svg = svgs.nth(i);

      const width = await svg.getAttribute('width');
      const height = await svg.getAttribute('height');

      expect(Number(width)).toBe(expectedDimensions[i]?.width);
      expect(Number(height)).toBe(expectedDimensions[i]?.height);
    }
  });
});
