import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Bar chart', () => {
  test('Verify bar chart base example and tooltip shown on hover', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bars aria-hidden', async () => {
      const count = await bars.count();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await bars.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bar with scaleBand and scaleLinear usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify cases render correctly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify pies aria-hidden', async () => {
      const count = await bars.count();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });

    await test.step('Verify no default tooltip when hover', async () => {
      await bars.nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify HoverRect component in bar chart', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/bar-hover.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bar do not render', async () => {
      const count = await bars.count();
      expect(count).toBe(0);
    });
  });

  test('Verify date format and tooltip in bar chart', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/bar-chart/date-format-with-tooltip.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify tooltip shown on hover', async () => {
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

  test('Verify negative values look good on bar charts', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/negative-values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify negative values rendering', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();

      const count = await bars.count();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });

    await test.step('Verify tooltip shown on hover', async () => {
      const box = await chart.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 128.42;
      const targetY = 190.53;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify trend line', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/trend-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.Bar"]');
    const dots = page.locator('[data-ui-name="Line.Dots"]');

    await expect(chart).toBeVisible();

    await test.step('Verify bar with trend line havs correct attributes', async () => {
      const count = await bars.count();
      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }

      const countDots = await dots.count();
      for (let i = 0; i < countDots; i++) {
        const dot = dots.nth(i);
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });

    await test.step('Verify looks good and tooltip shown on hover', async () => {
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

  test('Verify grouped bars', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/grouped-bars.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="GroupBar.Bar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bar with trend line havs correct attributes', async () => {
      const count = await bars.count();
      await expect(count).toBe(10);
      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
        await expect(bar).toHaveAttribute('r', '2');
      }
    });

    await test.step('Verify looks good and tooltip shown on hover', async () => {
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

  test('Verify bar legend and pattern fill', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/bar-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify higlights by hover on label', async () => {
      const label = page.getByText('Category 1');
      await label.hover();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });

    if (browserName === 'webkit') return;
    await test.step('Verify looks good when all items disabledby keyboatd', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
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

  test('Verify bar props work correctly', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/bars-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });
});
