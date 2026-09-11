import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  vennCircle: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Venn.Circle"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  circle: (page: Page, index?: number) => {
    const base = page.locator('circle');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify basic usage', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@venn-chart', '@d3-chart', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/venn-chart/basic-usage.tsx', 'en');

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step('Verify highlights on hover', async () => {
      await locators.circle(page, 2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Venn usage', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@venn-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/venn-chart/venn.tsx', 'en');

    await locators.plot(page).first().waitFor({ state: 'visible' });

    await test.step('Verify highlights on hover and tooltip shown', async () => {
      await locators.circle(page, 2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom intersection styles', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@venn-chart', '@d3-chart'],
  }, async ({ page, browserName }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/venn-chart/custom-intersection-styles.tsx',
      'en',
    );

    if (browserName == 'webkit') test.skip();
    await test.step('Verify chart with custom styles on hover', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      const chart = locators.plot(page).first();
      const box = await chart.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 128.42;
      const targetY = 190.53;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify setting orientation', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@venn-chart', '@d3-chart', '@base-components', '@flex-box', '@button'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/venn-chart/setting-orientation.tsx',
      'en',
    );

    await test.step('Verify chart renders with default orientation', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify orientation switches on button click', async () => {
      await locators.button(page).first().click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify order switches on button click', async () => {
      await locators.button(page, 1).click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill hover styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@venn-chart', '@d3-chart', '@chart-legend', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/venn-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
    });

    await test.step('Verify highlights by hover on legend item', async () => {
      const label = locators.legendItem(page, 'Good');
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill focus styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@venn-chart', '@d3-chart', '@chart-legend', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/venn-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
    });

    await test.step('Verify highlights when focused', async () => {
      await page.keyboard.press('Tab');
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
  test('Verify aria-hidden attributes on venn circles', {
    tag: [TAG.PRIORITY_HIGH, '@venn-chart', '@d3-chart', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/venn-chart/basic-usage.tsx', 'en');

    await test.step('Verify venn circles have aria-hidden attribute', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      const venns = locators.vennCircle(page);
      const count = await venns.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const venn = venns.nth(i);
        await expect(venn.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify onClick callback in venn circle', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@venn-chart', '@d3-chart'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('I call')) {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/venn-chart/on-click-venn.tsx',
      'en',
    );

    await test.step('Verify no calls on render', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      expect(messages.length).toBe(0);
    });

    await test.step('Verify callback triggered on circle click', async () => {
      const box = await locators.circle(page).first().boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(100);
      }
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['I call on mount']);
    });
  });
});
