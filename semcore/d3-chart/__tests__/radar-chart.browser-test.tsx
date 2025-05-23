import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Radar chart', () => {
  test('Verify basic usage ', async ({ page, browserName }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const labels = page.locator('[data-ui-name="Polygon.Labels"]');
    const linePs = page.locator('[data-ui-name="Line.Polygon"]');
    const polygonLines = page.locator('[data-ui-name="Polygon.Line"]');

    await expect(chart).toBeVisible();

    await test.step('Verify labels aria-hidden', async () => {
      const count = await labels.count();

      for (let i = 0; i < count; i++) {
        const bar = labels.nth(i);
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify Line.Polygon aria-hidden', async () => {
      const count = await linePs.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = linePs.nth(i);
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify Polygon.Line aria-hidden', async () => {
      const count = await polygonLines.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = polygonLines.nth(i);
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify hihlights and tooltip on hover', async () => {
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

    if (browserName === 'webkit') return;
    await test.step('Verify all items can be removed and chart looks good', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Scale', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/scale.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Color', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify fill="transparent"', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/background-color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify long label"', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/label-long.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom label"', async ({ page, browserName }) => {
    if (browserName === 'webkit') return;
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/label-custom.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Radar.Tooltip', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/tooltip.tsx';
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

  test('Verify circle radar', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/circle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify tick-size', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/tick-size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify rotation', async ({ page, browserName }) => {
    if (browserName === 'webkit') return;
    const standPath = 'stories/components/d3-chart/docs/examples/radar-chart/rotated.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.keyboard.press('Tab');

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify venn legend and pattern fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/radar-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify looks good when some items disabled by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
