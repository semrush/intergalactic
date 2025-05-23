import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Styles', () => {
  test('Verify render when backgrounds set', async ({ page }) => {
    const standPath = 'stories/components/badge/docs/examples/badge_main_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify render when colors set', async ({ page }) => {
    const standPath = 'stories/components/badge/tests/examples/badge-colors.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify render when colors and backgrounds set', async ({ page }) => {
    const standPath = 'stories/components/badge/tests/examples/badge-bg-colors.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Attributes and interactions', () => {
  test('Verify no aria-hidden and not focused by keyboard', async ({ page }) => {
    const standPath = 'stories/components/badge/docs/examples/badge_main_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const badges = page.locator('[data-ui-name="Badge"]');
    const count = await badges.count();

    for (let i = 0; i < count; i++) {
      await expect(badges.nth(i)).not.toHaveAttribute('aria-hidden');
    }

    await page.keyboard.press('Tab');
    await expect(badges.first()).not.toBeFocused();
  });
});
