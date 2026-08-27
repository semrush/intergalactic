import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  barItem: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Cigarette.BarItem"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  path: (page: Page, index?: number) => {
    const base = page.locator('path');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="HoverRect.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify tooltip shown on hover', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/cigarette-chart/tooltip-type.tsx',
      'en',
    );

    await test.step('Verify tooltip with all values shown', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await locators.plot(page).first().locator('path').nth(2).hover();
      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip with one value shown', async () => {
      await page.mouse.move(0, 0);
      await locators.tooltip(page).waitFor({ state: 'hidden' });

      await locators.plot(page).nth(1).locator('path').nth(3).hover();
      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify layouts and highlights on hover', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/cigarette-chart/layouts.tsx',
      'en',
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    const cats = page.getByText('Cats');

    await test.step('Verify horizontal highlighted section by hover legend item', async () => {
      await cats.first().hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify vertical highlighted section by hover legend item', async () => {
      await cats.nth(1).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify empty values', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/cigarette-chart/no-values.tsx',
      'en',
    );

    await test.step('Verify empty values not displayed', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
      await expect(locators.barItem(page)).toHaveCount(3);
    });

    await test.step('Verify unchecking the empty and non empty items', async () => {
      const cats = page.getByText('Cats');
      const hamsters = page.getByText('Hamsters');
      await cats.click();
      await hamsters.click();
      await expect(locators.barItem(page)).toHaveCount(2);
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify no tooltip when showTooltip=false', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { showTooltip: false },
    );

    await test.step('Verify tooltip with percent shown', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await locators.plot(page).first().locator('path').nth(2).hover();
      await expect(locators.tooltip(page)).toHaveCount(0);
      await expect(page).toHaveScreenshot();
    });
  });

  const tooltipViewTypeVariants = [
    {
      name: 'single with percent',
      props: {
        showPercentValueInTooltip: true,
        tooltipViewType: 'single',
      },
    },
    {
      name: 'single without percent',
      props: {
        showPercentValueInTooltip: false,
        tooltipViewType: 'single',
      },
    },
    {
      name: 'all with percent and total',
      props: {
        showPercentValueInTooltip: true,
        showTotalInTooltip: true,
        tooltipViewType: 'all',
      },
    },
    {
      name: 'all without percent',
      props: {
        showPercentValueInTooltip: false,
        tooltipViewType: 'all',
      },
    },
  ];

  tooltipViewTypeVariants.forEach((variant) => {
    test(`Verify tooltipViewType=${variant.name}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
        'en',
        variant.props,
      );

      await test.step('Verify tooltip shown correctly', async () => {
        await locators.plot(page).first().waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await locators.plot(page).first().locator('path').nth(2).hover();
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify empty state', {
    tag: [TAG.PRIORITY_MEDIUM, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await test.step('Verify horizontal empty state', async () => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
        'en',
        { data: { X: 0, Y: 0 }, duration: 0 },
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify vertical empty state', async () => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
        'en',
        { data: { X: 0, Y: 0 }, duration: 0, invertAxis: false },
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(300);
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
  test('Verify custom tooltip title', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    const tooltipTitle = 'Custom cigarette tooltip title';

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { tooltipTitle, tooltipViewType: 'all' },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    await locators.plot(page).first().locator('path').nth(2).hover();

    const tooltip = locators.tooltip(page);
    await expect(tooltip).toBeVisible();
    await expect(tooltip.getByText(tooltipTitle, { exact: true })).toBeVisible();
  });

  test('Verify items attributes', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/cigarette-chart/click-interaction.tsx',
      'en',
    );

    await test.step('Verify bar items attributes', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const items = await locators.barItem(page).all();
      expect(items.length).toBeGreaterThan(0);

      for (const item of items) {
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('direction', 'horizontal');
      }
    });
  });

  test('Verify tiny value invisible at minimalBarWidth=0', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { Large: 10000, Medium: 5000, Tiny: 1 }, minimalBarWidth: 0, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(3);

    const width = Number(await locators.barItem(page, 2).getAttribute('width'));
    expect(width).toBeLessThan(1);
  });

  test('Verify tiny value visible at minimalBarWidth=10', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { Large: 10000, Medium: 5000, Tiny: 1 }, minimalBarWidth: 10, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(3);

    const width = Number(await locators.barItem(page, 2).getAttribute('width'));
    expect(width).toBeGreaterThanOrEqual(10);
  });

  test('Verify multiple tiny values get minimalBarWidth from donor', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { Giant: 50000, Small1: 5, Small2: 3, Small3: 1 }, minimalBarWidth: 8, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(4);

    for (let index = 1; index < 4; index++) {
      const width = Number(await locators.barItem(page, index).getAttribute('width'));
      expect(width).toBeGreaterThanOrEqual(8);
    }
  });

  test('Verify equal values have equal width', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { A: 100, B: 100, C: 100, D: 100 }, minimalBarWidth: 2, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(4);

    const items = await locators.barItem(page).all();
    const widths = await Promise.all(
      items.map(async (item) => Number(await item.getAttribute('width'))),
    );
    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(0.001);
  });

  test('Verify zero value not in DOM', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { Present: 10000, Zero: 0, AlsoPresent: 5000 }, minimalBarWidth: 10, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(2);
  });

  test('Verify empty state when all values are zero', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { X: 0, Y: 0 }, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);

    await test.step('Verify a single placeholder bar replaces all data bars', async () => {
      await expect(locators.barItem(page)).toHaveCount(1);
    });

    await test.step('Verify the placeholder uses the null palette color', async () => {
      await expect(locators.barItem(page, 0)).toHaveAttribute(
        'color',
        '--intergalactic-chart-palette-order-null',
      );
    });

    await test.step('Verify the placeholder is visible and fully rounded', async () => {
      const width = Number(await locators.barItem(page, 0).getAttribute('width'));
      expect(width).toBeGreaterThan(0);

      // a standalone placeholder has no neighbours, so all four corners are rounded
      const d = (await locators.barItem(page, 0).getAttribute('d')) ?? '';
      expect((d.match(/a/g) ?? []).length).toBe(4);
    });

    await test.step('Verify no tooltip is shown in the empty state', async () => {
      await locators.barItem(page, 0).hover();
      await page.waitForTimeout(300);
      await expect(locators.tooltip(page)).toHaveCount(0);
    });
  });

  test('Verify all tiny values get minimalBarWidth without donors', {
    tag: [TAG.PRIORITY_HIGH, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/cigarette-chart/basic-usage.tsx',
      'en',
      { data: { A: 1, B: 1, C: 1, D: 1, E: 1 }, minimalBarWidth: 8, duration: 0 },
    );

    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    await expect(locators.barItem(page)).toHaveCount(5);

    const items = await locators.barItem(page).all();
    for (const item of items) {
      const width = Number(await item.getAttribute('width'));
      expect(width).toBeGreaterThanOrEqual(8);
    }
  });

  test('Verify onClick callback', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@cigarette-chart', '@d3-chart'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/cigarette-chart/click-interaction.tsx',
      'en',
    );

    await test.step('Verify no callbacks on render', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });
      const initialMessages = messages.filter((msg) => msg.includes('click'));
      expect(initialMessages.length).toBe(0);
    });

    await test.step('Verify onClick callback triggered on path click', async () => {
      await locators.path(page, 2).click();
      await page.waitForTimeout(100);

      const clickLogs = messages.filter((msg) => msg.includes('click Capybaras'));
      expect(clickLogs).toHaveLength(1);
    });
  });
});
