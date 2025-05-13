import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Vertical Scroll', () => {
  test('Verify Keyboard scroll', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    for (let i = 0; i < 100; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Mouse scroll', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');

    await dataTable.hover();
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Keyboard scroll when cells have different height', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/virtualization/header-content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Mouse scroll when cells have different height', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/virtualization/header-content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');
    await dataTable.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});
