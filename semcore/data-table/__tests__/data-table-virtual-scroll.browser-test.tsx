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

    const dataTable = await page.locator('[data-ui-name="Body.Row"]');
    await dataTable.first().hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/virtualization/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(0);

    await expect(firstArrow).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(plot).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);

    await expect(secondArrow).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(plot).toBeVisible();
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    await expect(plot).toHaveCount(0);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
    await expect(thirdArrow).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/virtualization/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await firstArrow.click();
    await page.waitForTimeout(300);
    const plot = await page.locator('[data-ui-name="Plot"]');
    await expect(plot).toHaveCount(1);
    await firstArrow.click();
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(0);
    await firstArrow.click();

    const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
    await thirdArrow.click();
    await page.waitForTimeout(300);
    await expect(plot).toHaveCount(2);
  });
});
