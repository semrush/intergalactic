import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Area chart', () => {
  test('Verify basic implementations works and chart renders', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
        await expect(chart).toBeVisible();

    await test.step('Verify renders correctly', async () => {
      //add snapshot
    });

    await test.step('Verify tooltip shown on hover', async () => {
      const box = await chart.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 128.42;
      const targetY = 190.53;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);
      //snapshot
    });
  });

  test('Verify chart renders using the Area component', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/area.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
        await expect(chart).toBeVisible();

    await test.step('Verify renders correctly', async () => {
      //add snapshot
    });

    const dots = page.locator('circle[data-ui-name="Area.Dots"]');

    await test.step('Verify dots presents and have correct attributes', async () => {
      const count = await dots.count();

      for (let i = 0; i < count; i++) {
        const dot = dots.nth(i);
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });

    await test.step('Verify no tooltip shown on hover', async () => {
      await dots.nth(1);
      //snapshot
    });
  });

  test('Verify no data and single data rendering', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify cases render correctly', async () => {
      //add snapshot
    });

  });

  test('Verify area chart with custom line rendres', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/custom-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify renders', async () => {
      //snapshot
    });

  });

  test('Verify area chart looks good with interpolation function', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/area-chart/interpolation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

      //snapshot
  
  });


  test('Verify bar legend and pattern fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify area with legend patterns look good', async () => {
      //add snapshot
    });

    await test.step('Verify higlights by hover on label', async () => {
      const label = page.getByText('Line 1');
      await label.hover();
      //snapshot
    });

    await test.step('Verify looks good when all items disabledby keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      //snapshot
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
     
      //snapshot
    });
  });

  test('Verify bar props work correctly', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bar-chart/bar-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    //add snapshot
  });
});
