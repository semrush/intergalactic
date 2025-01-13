import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('MiniChart', () => {
  test.describe('Score', () => {
    test('render Lines', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
    test('render Donuts', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-donuts.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });
  test.describe('Trend', () => {
    test('render Lines', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/trend-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
    test('render Bars', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/trend-bars.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });
});
