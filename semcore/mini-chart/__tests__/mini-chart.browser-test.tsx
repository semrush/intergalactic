import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('MiniChart', () => {
  test.describe('Score', () => {
    test('render Lines', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
    test('render Line.Segments', async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-line-segments.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const segmentContainers = page.locator('[data-ui-name="Flex"]');
      const firstSegmentContainer = segmentContainers.first();
      const lastSegmentContainer = segmentContainers.last();

      const firstContainerSegments = await (firstSegmentContainer.locator('[data-ui-name="ScoreLine.Segment"]')).count();
      const lastContainerSegments = await (lastSegmentContainer.locator('[data-ui-name="ScoreLine.Segment"]')).count();

      expect(firstContainerSegments, 'There should be only 2 renderable segments').toEqual(2);
      expect(lastContainerSegments, 'There should be only 1 renderable segment').toEqual(1);

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
