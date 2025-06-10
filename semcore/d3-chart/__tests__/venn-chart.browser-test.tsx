import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Venn chart', () => {
  test('Verify basic usage ', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/venn-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const venns = page.locator('[data-ui-name="Venn.Circle"]');
    await expect(chart).toBeVisible();

    await test.step('Verify venns aria-hidden', async () => {
      const count = await venns.count();
      await expect(count).not.toBeNull();
      for (let i = 0; i < count; i++) {
        const bar = venns.nth(i);
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify hihlights on hover', async () => {
      await page.locator('circle').nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Venn usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/venn-chart/venn.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const venns = page.locator('[data-ui-name="Venn.Circle"]');
    await expect(chart).toBeVisible();

    await test.step('Verify venns aria-hidden', async () => {
      const count = await venns.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const venn = venns.nth(i);
        await expect(venn.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify venns hihlights on hover and tooltip shown', async () => {
      await page.locator('circle').nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Custom intersection styles', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/venn-chart/custom-intersection-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    const box = await chart.boundingBox();
    if (!box) throw new Error('Bounding box not found');

    const targetX = 128.42;
    const targetY = 190.53;

    const hoverX = box.x + targetX;
    const hoverY = box.y + targetY;

    await page.mouse.move(hoverX, hoverY);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Setting orientation', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/venn-chart/setting-orientation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    // switch orientation
    const buttons = page.locator('[data-ui-name="Button"]');
    await buttons.first().click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    // switch order
    await buttons.nth(1).click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify bar legend and pattern fill mouse interactions', async ({ page, browserName }) => {
    const standPath =
    'stories/components/d3-chart/docs/examples/venn-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const label = page.getByText('Good');
    const label2 = page.getByText('Cheap');

    await test.step('Verify higlights by hover on label', async () => {
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not higlights by hover on unchecked label', async () => {
      await label.click();
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify higlights by hover on other label', async () => {
      await label2.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bar legend and pattern fill keyboard interactions', async ({ page, browserName }) => {
    const standPath =
    'stories/components/d3-chart/docs/examples/venn-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify highlights when focused', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlights when checked and unchecked', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not highlights when unchecked', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
