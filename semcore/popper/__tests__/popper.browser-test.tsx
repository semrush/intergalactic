import { test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Popper', () => {
  test('Focus lock', async ({ page }) => {
    const standPath = 'semcore/popper/__tests__/stands/dropdown.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
    }

    await page.waitForFunction(() => {
      const focusedElement = document.activeElement;
      return (
        focusedElement?.matches('[data-testid="popper"]') ||
        focusedElement?.matches('[data-testid="input-in-popper"]')
      );
    });
  });
  test('Focus lock with disablePortal', async ({ page }) => {
    const standPath = 'semcore/popper/__tests__/stands/disablePortal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
    }

    await page.waitForFunction(() => {
      const focusedElement = document.activeElement;
      return (
        focusedElement?.matches('[data-testid="popper"]') ||
        focusedElement?.matches('[data-testid="input-in-popper"]')
      );
    });
  });
});
