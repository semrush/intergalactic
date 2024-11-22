import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Feature Popover', () => {
  test('Basic - Popper Renders and focused', async ({ page }) => {
    const standPath = 'stories/components/feature-popover/docs/examples/Basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});
