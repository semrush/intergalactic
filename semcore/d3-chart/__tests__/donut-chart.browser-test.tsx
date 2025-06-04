import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Donut chart', () => {
  test('Verify donut without label', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const pies = page.locator('[data-ui-name="Donut.Pie"]');
    await expect(chart).toBeVisible();

    await test.step('Verify pies aria-hidden', async () => {
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify pie highlights on hover', async () => {
      await page.locator('path').nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut with inner outer duration label and tooltips', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const pies = page.locator('[data-ui-name="Donut.Pie"]');
    await expect(chart).toBeVisible();

    await test.step('Verify pies aria-hidden', async () => {
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
      const labels = page.locator('[data-ui-name="Donut.Label"]');
      const countlabel = await labels.count();

      for (let i = 0; i < countlabel; i++) {
        const label = labels.nth(i);

        await expect(label).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify pie with tooltip hihlights on hover', async () => {
      await pies.nth(5).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pie with without animation not changes size by hover', async () => {
      await pies.nth(10).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut controlled highlight interactions', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/donut-chart/donut-controlled-highlight.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify higlights by default in controlled mode', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify added higlighted section by checkbox click', async () => {
      const pie0 = page.getByText('Option C');

      await pie0.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut legend and pattern fill', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/donut-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify higlights by hover on label', async () => {
      const label = page.getByText('Category 1');
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    if (browserName === 'webkit') return;
    await test.step('Verify looks good when all items by keyboatd', async () => {
      for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');

      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Semi donut chart', () => {
  test('Verify semidonut with labels', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/donut-chart/semi-donut.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify semidonut with one data', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/donut-chart/semi-donut.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });
});
