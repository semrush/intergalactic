import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Vertical Scroll', () => {
  test('Verify Keyboard scroll', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('ArrowDown', { delay: 50 });
    }
    await page.waitForSelector('[role="gridcell"][data-ui-name="Row.Cell"][name="id"]:has-text("#50")', { state: 'visible' });
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
    await page.setContent(htmlContent);

    const plot = page.locator('[data-ui-name="Plot"]');
    const toggle = page.locator('[data-ui-name="ButtonLink"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await expect(toggle.first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(plot).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await expect(toggle.nth(1)).toBeFocused();

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(toggle.nth(2)).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/virtualization/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const toggle = await page.locator('[data-ui-name="ButtonLink"]');
    const plot = await page.locator('[data-ui-name="Plot"]');

    await toggle.first().click();
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);
    await toggle.first().click();
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await toggle.first().click();

    await toggle.nth(2).click();
    await plot.nth(1).waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(2);
  });
});
