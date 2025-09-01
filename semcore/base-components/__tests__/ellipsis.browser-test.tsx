import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visuals', () => {
  const withEllipsis = [
    { ellipsis: true },
    { ellipsis: { trim: 'middle' } },
    { ellipsis: { trim: 'end' } },
    { ellipsis: { trim: 'end', maxLine: 2 } },
    { ellipsis: { trim: 'end', maxLine: 6 } },
  ];

  withEllipsis.forEach((item) => {
    test(`Verify ellipsis ${JSON.stringify(item.ellipsis)}`, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);
      // await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.locator('[class*="HintPopper"]').waitFor({ state: 'visible' });
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(1);

      await page.keyboard.press('Tab');
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(0);
      await page.getByRole('link').hover();
      await page.locator('[class*="HintPopper"]').waitFor({ state: 'visible' });
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(1);
    });
  });

  const withoutEllipsis = [
    { ellipsis: false },
    { ellipsis: { trim: 'end', maxLine: 6 } },
  ];

  withoutEllipsis.forEach((item) => {
    test(`Verify no ellipsis ${JSON.stringify(item.ellipsis)}`, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);
      // await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(0);
    });
  });
});
