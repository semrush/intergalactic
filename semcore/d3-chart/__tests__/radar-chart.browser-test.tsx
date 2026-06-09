import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  polygonLabels: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Polygon.Labels"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  linePolygon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Radar.Polygon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  polygonLine: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Polygon.Line"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="Radar.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify basic usage', {
    tag: [TAG.PRIORITY_HIGH, '@radar-chart', '@d3-chart'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/basic-usage.tsx', 'en');

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const chart = locators.plot(page).first();
      await expect(chart).toBeVisible();
    });

    await test.step('Verify highlights and tooltip on hover', async () => {
      const chart = locators.plot(page).first();
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

  test('Verify scale', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/scale.tsx', 'en');

    await test.step('Verify chart with scale renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify color', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/color.tsx', 'en');

    await test.step('Verify chart with custom colors renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify fill="transparent"', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/background-color.tsx', 'en');

    await test.step('Verify chart with transparent fill renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify long label', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/label-long.tsx', 'en');

    await test.step('Verify chart with long labels renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom label', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@radar-chart', '@d3-chart'],
  }, async ({ page, browserName }) => {
    if (browserName === 'webkit') return;

    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/label-custom.tsx', 'en');

    await test.step('Verify chart with custom labels and focus', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Radar.Tooltip', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/tooltip.tsx', 'en');

    await test.step('Verify tooltip appears on hover', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const chart = locators.plot(page).first();
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

  test('Verify circle radar', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/circle.tsx', 'en');

    await test.step('Verify circular radar renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify tick-size', {
    tag: [TAG.PRIORITY_MEDIUM, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/tick-size.tsx', 'en');

    await test.step('Verify chart with custom tick size renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify rotation', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@radar-chart', '@d3-chart'],
  }, async ({ page, browserName }) => {
    if (browserName === 'webkit') return;

    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/rotated.tsx', 'en');

    await test.step('Verify rotated chart with keyboard navigation', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radar-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify looks good when some items disabled by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify aria-hidden attributes', {
    tag: [TAG.PRIORITY_HIGH, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/basic-usage.tsx', 'en');

    await test.step('Verify labels have aria-hidden attribute', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const labels = locators.polygonLabels(page);
      const count = await labels.count();

      for (let i = 0; i < count; i++) {
        const label = labels.nth(i);
        await expect(label.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify Line.Polygon elements have aria-hidden attribute', async () => {
      const linePolygons = locators.linePolygon(page);
      const count = await linePolygons.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const linePoly = linePolygons.nth(i);
        await expect(linePoly.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify Polygon.Line elements have aria-hidden attribute', async () => {
      const polygonLines = locators.polygonLine(page);
      const count = await polygonLines.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const polyLine = polygonLines.nth(i);
        await expect(polyLine.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify tooltip interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radar-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/radar-chart/tooltip.tsx', 'en');

    await test.step('Verify tooltip appears on hover', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const chart = locators.plot(page).first();
      const box = await chart.boundingBox();

      if (box) {
        await page.mouse.move(box.x + 200, box.y + 200);
        await page.waitForTimeout(500);

        const tooltip = locators.tooltip(page);
        await expect(tooltip).toBeVisible();
      }
    });
  });
});
