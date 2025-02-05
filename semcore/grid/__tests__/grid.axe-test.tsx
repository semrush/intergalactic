import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Flex-Box', () => {
  test('Flex usage', async ({ page }) => {
    const sizes = [{ width: 320 }, { width: 768 }, { width: 1200 }, { width: 1920 }];

    const standPath = 'stories/components/grid/docs/examples/responsive.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    for (let i = 0; i < sizes.length; i++) {
      const { width } = sizes[i];
      await page.setViewportSize({ width, height: 800 });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
