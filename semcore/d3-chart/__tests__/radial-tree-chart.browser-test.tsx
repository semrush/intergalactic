import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  label: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="RadialTreeRadian.Label"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  line: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="RadialTreeRadian.Line"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  cap: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="RadialTreeRadian.Cap"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  title: (page: Page) => page.locator('[data-ui-name="RadialTree.Title"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify basic usage', {
    tag: [TAG.PRIORITY_HIGH, '@radial-tree-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radial-tree-chart/basic-usage.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom svg in center', {
    tag: [TAG.PRIORITY_MEDIUM, '@radial-tree-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radial-tree-chart/custom-svg-in-center.tsx',
      'en',
    );

    await test.step('Verify chart with custom SVG renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multicolor', {
    tag: [TAG.PRIORITY_MEDIUM, '@radial-tree-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radial-tree-chart/multicolor-and-accessibility.tsx',
      'en',
    );

    await test.step('Verify multicolor chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multiline', {
    tag: [TAG.PRIORITY_MEDIUM, '@radial-tree-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radial-tree-chart/multiline-text.tsx',
      'en',
    );

    await test.step('Verify chart with multiline text renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
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
    tag: [TAG.PRIORITY_HIGH, '@radial-tree-chart', '@d3-chart', '@base-components', '@flex-box', '@select'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/radial-tree-chart/basic.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
    });

    await test.step('Verify title has aria-hidden attribute', async () => {
      const title = locators.title(page).first();
      await expect(title).toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify labels have aria-hidden attribute', async () => {
      const labels = locators.label(page);
      const count = await labels.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const label = labels.nth(i);
        await expect(label).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify caps have aria-hidden attribute', async () => {
      const caps = locators.cap(page);
      const count = await caps.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const cap = caps.nth(i);
        await expect(cap).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify lines have aria-hidden attribute', async () => {
      const lines = locators.line(page);
      const count = await lines.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const line = lines.nth(i);
        await expect(line).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });
});
