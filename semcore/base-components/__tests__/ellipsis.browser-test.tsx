import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual - link', () => {
  const withEllipsis = [
    { ellipsis: true },
    { ellipsis: { trim: 'middle' } },
    { ellipsis: { trim: 'end' } },
    { ellipsis: { trim: 'end', maxLine: 2 } },
    { ellipsis: { maxLine: 2 } },
  ];

  withEllipsis.forEach((item) => {
    test(`Verify ellipsis by @keyboard focus and @mouse hover Link on link when ${JSON.stringify(item.ellipsis)}`, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.getByRole('link').hover();
      await page.locator('[class*="HintPopper"]').waitFor({ state: 'visible' });
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    test(`Verify ellipsis by @mouse hover on Link when ${JSON.stringify(item.ellipsis)}`, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      await page.getByRole('link').hover();
      await page.locator('[class*="HintPopper"]').waitFor({ state: 'visible' });
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });
  });

  const withoutEllipsis = [
    { ellipsis: false },
    { ellipsis: { trim: 'end', maxLine: 6 } },
  ];

  withoutEllipsis.forEach((item) => {
    test(`Verify no ellipsis on Link when ${JSON.stringify(item.ellipsis)}`, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/link_with_ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(0);
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.getByRole('link').hover();
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(0);
    });
  });
});

test.describe('Visual - text', () => {
  const withEllipsis = [
    { ellipsis: true, size: 100 },
    { ellipsis: { trim: 'end' }, size: 200 },
    { ellipsis: true, size: 200 },
    { ellipsis: { trim: 'end' }, size: 400 },
    { ellipsis: true, size: 500 },
    { ellipsis: { trim: 'end' }, size: 600 },
    { ellipsis: true, size: 700 },
    { ellipsis: { trim: 'end' }, size: 800 },
    { ellipsis: { trim: 'middle' }, size: 100 },
    { ellipsis: { trim: 'middle' }, size: 200 },
    { ellipsis: { trim: 'middle' }, size: 300 },
    { ellipsis: { trim: 'middle' }, size: 400 },
    { ellipsis: { trim: 'middle' }, size: 500 },
    { ellipsis: { trim: 'middle' }, size: 600 },
    { ellipsis: { trim: 'middle' }, size: 700 },
    { ellipsis: { trim: 'middle' }, size: 800 },

  ];

  withEllipsis.forEach((item) => {
    test(`Verify ellipsis on Text when ellipsis  ${JSON.stringify(item.ellipsis)} and text size =${item.size} `, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);
      await page.locator('[data-ui-name="Text"]').hover();
      await page.locator('[class*="HintPopper"]').waitFor({ state: 'visible' });
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });
  });

  const withoutEllipsis = [
    { ellipsis: false },
    { ellipsis: { trim: 'end', maxLine: 6 } },
  ];

  withoutEllipsis.forEach((item) => {
    test(`Verify no ellipsis on Text when ellipsis  ${JSON.stringify(item.ellipsis)} `, async ({ page }) => {
      const standPath =
        'stories/components/base-components/ellipsis/tests/examples/trim_with_special_text_size.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);
      await page.locator('[data-ui-name="Text"]').hover();
      await expect(page.locator('[class*="HintPopper"]')).toHaveCount(0);
    });
  });
});
