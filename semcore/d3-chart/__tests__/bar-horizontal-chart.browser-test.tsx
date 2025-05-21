import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Horizontal Bar chart', () => {
  test('Verify Chart.Bar renders and tooltip shown on hover', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.HorizontalBar"]');
    await expect(chart).toBeVisible();
    await page.waitForTimeout(500);

    await test.step('Verify bars aria-hidden', async () => {
      const count = await bars.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await bars.nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();    
    });

  });

  test('Verify HorizontalBar implementation', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/horizontal-bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="HorizontalBar"]');
    await expect(chart).toBeVisible();
    await page.waitForTimeout(200);

    await test.step('Verify bars aria-hidden', async () => {
      const count = await bars.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await bars.nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();    
    });
  });

  test('Verify custom labels', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/bar-labels.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();    
  });

  test('Verify background', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/background.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const backgrounds = page.locator('[data-ui-name="HorizontalBar.Background"]');


    await test.step('Verify backgrounds aria-hidden', async () => {
      const count = await backgrounds.count();

      for (let i = 0; i < count; i++) {
        const background = backgrounds.nth(i);
        await expect(background).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await backgrounds.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();    
    });

  });

  test('Verify grouped horizontal bar', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/grouped-horizontal-bars.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();


    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
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

  });

  test('Verify horizontal bar transparent radius maxsize', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-horizontal/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();


    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();    
 
  });

  test('Verify horizontal bar legend and pattern fill', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/bar-horizontal/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const label = page.getByText('Bar 2');


    await test.step('Verify higlights by hover on label', async () => {
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();    
    });

    if(browserName==='webkit') return;
    await test.step('Verify looks good when all items disabledby keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();    
    });
  });
});
