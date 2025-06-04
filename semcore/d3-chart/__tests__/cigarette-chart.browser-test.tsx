import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Cigarette chart', () => {
  test('Verify cigarette renders tooltip shown on hover and click interaction', async ({
    page,
  }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/cigarette-chart/click-interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const items = page.locator('[data-ui-name="Cigarette.BarItem"]');
    await expect(chart).toBeVisible();

    await test.step('Verify items attributes', async () => {
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('direction', 'horizontal');
      }
    });

    await test.step('Verify on click handles', async () => {
      const messages: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          messages.push(msg.text());
        }
      });

      await page.locator('path').nth(2).click();
      const clickLogs = messages.filter((msg) => msg.includes('click Capybaras'));
      expect(clickLogs).toHaveLength(1);
    });
  });

  test('Verify tooltip shown on hover', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/tooltip-type.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]');
    await expect(chart.first()).toBeVisible();

    await test.step('Verify tooltip with all values shown', async () => {
      await chart.first().locator('path').nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip with one value shown', async () => {
      await chart.nth(1).locator('path').nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify layouts and highlights on hover', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/layouts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify horizontal higlighted section by hover legend item', async () => {
      const cats = page.getByText('Cats');

      await cats.first().hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify vertical higlighted section by hover legend item', async () => {
      const cats = page.getByText('Cats');

      await cats.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify empty values', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/cigarette-chart/no-values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify empty values not displayed', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify unchecking the empty and non empty items', async () => {
      const cats = page.getByText('Cats');
      const hamsters = page.getByText('Hamsters');

      await cats.click();
      await hamsters.click();

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
