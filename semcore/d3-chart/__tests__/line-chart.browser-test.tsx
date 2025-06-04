import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Line chart', () => {
  test('Verify hoverLine works well', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/line-chart/hover-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = await page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    const box = await chart.boundingBox();
    if (!box) throw new Error('Bounding box not found');

    const targetX = 128.42;
    const targetY = 190.53;

    const hoverX = box.x + targetX;
    const hoverY = box.y + targetY;

    await page.mouse.move(hoverX, hoverY);

    const lines = page.locator('line');
    const count = await lines.count();
    await expect(count).not.toBeNull();

    for (let i = 0; i < count; i++) {
      const line = lines.nth(i);
      await expect(line.first()).toHaveAttribute('aria-hidden', 'true');
    }
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify interpolation renders correctly when dost can be hovered', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/line-chart/interpolation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dots = page.locator('[data-ui-name="Line.Dots"]');

    await dots.nth(4).hover();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify basic usage with legend ui and interactions', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const legendTitle = page.locator('[data-ui-name="LegendFlex.LegendItem"]');
    const checkbox = page.locator('[data-ui-name="Checkbox"]');
    const chart = page.locator('svg[data-ui-name="Plot"]');
    await expect(chart.first()).toBeVisible();

    await test.step('Veriry highlight changes when hover the checkbox', async () => {
      await checkbox.first().hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry line disappears when uncheck the checkbox', async () => {
      await legendTitle.first().click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry line added when uncheck checked and tooltip without total by def', async () => {
      const legendTitle = page.locator('[data-ui-name="LegendFlex.LegendItem"]');
      await legendTitle.first().click();

      const box = await chart.first().boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 50;
      const targetY = 50;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry line not highlight on hover when props is false', async () => {
      await checkbox.nth(3).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry tooltip with total looks well', async () => {
      const box = await chart.nth(1).boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 50;
      const targetY = 50;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify render and interactions with Line and Dots ', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/line-chart/line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const legendTitle = page.locator('[data-ui-name="LegendFlex.LegendItem"]');
    const lines = page.locator('g');
    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify renders correctly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry duration props applies to all lines inside the chart', async () => {
      await expect(lines.first()).toHaveAttribute('duration', '0ms');
      await expect(lines.nth(1)).toHaveAttribute('duration', '0ms');
    });
  });

  test('Verify area with empty line renders and looks good', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/line-chart/line-area-with-empty.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify renders correctly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Veriry Line.Null attributes', async () => {
      const nullLune = page.locator('[data-ui-name="Line.Null"]');
      await expect(nullLune).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Verify area default props looks good', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/line-chart/line-with-area.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify renders correctly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify curve prop', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/line-chart/curve.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]');

    await test.step('Verify tooltip shown correctly with dots', async () => {
      const box = await chart.first().boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 50;
      const targetY = 50;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shown correctly without dots', async () => {
      const box = await chart.nth(1).boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 50;
      const targetY = 50;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify dots partial display', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/line-chart/dots-display-function.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]');

    await test.step('Verify dots render partly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify patterns and symbols for dots', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/line-chart/legend-and-symbols-for-dots.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const checkbox = page.locator('[data-ui-name="Checkbox"]');

    await test.step('Verify disable highlights when hover the checkbox', async () => {
      await checkbox.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
