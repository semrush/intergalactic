import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  pie: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Donut.Pie"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  label: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Donut.Label"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"], [data-ui-name="LegendTable.LegendItem"], [data-ui-name="LegendFlex.LegendItem"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      description: 'Standard: default with tooltip and label',
      paddingAngle: 0.2,
      showTooltip: true,
      showLabel: true,
      duration: 0,
    },
    {
      description: 'Custom radius: inner and outer radius variations',
      innerRadius: 50,
      outerRadius: 120,
      showTooltip: true,
      showLabel: false,
      duration: 0,
    },
    {
      description: 'Patterns: patterns enabled, no tooltip',
      patterns: true,
      showTooltip: false,
      showLabel: true,
      duration: 0,
    },
  ];

  variables.forEach((item) => {
    test(`Verify donut chart ${item.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx',
        'en',
        item,
      );

      await test.step('Verify chart renders correctly', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pie highlights on hover', async () => {
        const pies = locators.pie(page);
        await pies.nth(1).hover();

        if (item.showTooltip) {
          const tooltip = page.locator('[data-ui-name="Donut.Tooltip"]');
          await tooltip.waitFor({ state: 'visible' });
        }
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const halfsizeVariables = [
    {
      description: 'Standard: halfsize with tooltip and label',
      halfsize: true,
      showTooltip: true,
      showLabel: true,
      duration: 0,
    },
    {
      description: 'Custom radius: innerRadius and paddingAngle',
      halfsize: true,
      innerRadius: 50,
      paddingAngle: 0.2,
      showTooltip: true,
      showLabel: false,
      duration: 0,
    },
    {
      description: 'Patterns: patterns enabled, no tooltip',
      halfsize: true,
      patterns: true,
      showTooltip: false,
      showLabel: false,
      duration: 0,
    },
  ];

  halfsizeVariables.forEach((item, index) => {
    test(`Verify semi-donut ${item.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx',
        'en',
        item,
      );

      await test.step('Verify semi-donut renders correctly', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pie highlights on hover', async () => {
        const pies = locators.pie(page);
        await pies.nth(1).hover();

        if (item.showTooltip) {
          const tooltip = page.locator('[data-ui-name="Donut.Tooltip"]');
          await tooltip.waitFor({ state: 'visible' });
        }

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify donut controlled highlight interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/donut-chart/donut-controlled-highlight.tsx',
      'en',
    );

    await test.step('Verify highlights by default in controlled mode', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);// wait for animation
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify added highlighted section by checkbox click', async () => {
      const pie0 = page.getByText('Option C');
      await pie0.click();
      await page.waitForTimeout(200);// wait for animation
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify donut legend and pattern fill interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/donut-chart/legend-and-pattern-fill.tsx',
      'en',
    );
    await locators.plot(page).waitFor({ state: 'visible' });
    await page.waitForTimeout(300);

    await test.step('Verify highlights by hover on legend item', async () => {
      const label = locators.legendItem(page).first();
      await label.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify no highlights by hover on unchecked label', async () => {
      const label = locators.legendItem(page).first();
      await label.click();
      await label.hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify looks good when all items unchecked', async () => {
      const label2 = locators.legendItem(page).nth(1);
      const label3 = locators.legendItem(page).nth(2);
      await label3.click();
      await label2.click();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlighted by keyboard focus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });
  test('Verify semi-donut with labels', {
    tag: [TAG.PRIORITY_MEDIUM, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/semi-donut.tsx', 'en');

    await test.step('Verify semi-donut renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
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
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await test.step('Verify pies have aria-hidden attribute in basic usage', async () => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');
      await locators.plot(page).waitFor({ state: 'visible' });
      const pies = locators.pie(page);
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify pies and labels have aria-hidden attribute', async () => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx', 'en', {
        showLabel: true,
        duration: 0,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      const pies = locators.pie(page);
      const pieCount = await pies.count();
      for (let i = 0; i < pieCount; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }

      const labels = locators.label(page);
      const labelCount = await labels.count();
      for (let i = 0; i < labelCount; i++) {
        const label = labels.nth(i);
        await expect(label).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  const showLegendCombinations = [
    {
      description: 'legend shown when showLegend: undefined and >=2 items',
      showLegend: undefined,
      data: { a: 1, b: 2 },
      expectedVisible: true,
    },
    {
      description: 'legend hidden when showLegend: false and >=2 items',
      showLegend: false,
      data: { a: 1, b: 2 },
      expectedVisible: false,
    },
    {
      description: 'legend shown when showLegend: true and >=2 items',
      showLegend: true,
      data: { a: 1, b: 2 },
      expectedVisible: true,
    },
    {
      description: 'legend hidden when showLegend: undefined and 1 item',
      showLegend: undefined,
      data: { a: 1 },
      expectedVisible: false,
    },
    {
      description: 'legend hidden when showLegend: false and 1 item',
      showLegend: false,
      data: { a: 1 },
      expectedVisible: false,
    },
    {
      description: 'legend visible when showLegend: true and 1 item',
      showLegend: true,
      data: { a: 1 },
      expectedVisible: true,
    },
  ];

  showLegendCombinations.forEach((item) => {
    test(`Verify showLegend prop: ${item.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      const testProps: any = {
        data: item.data,
      };

      if (item.showLegend !== undefined) {
        testProps.showLegend = item.showLegend;
      }

      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/donut-chart/basic-usage.tsx',
        'en',
        testProps,
      );

      const legend = locators.legend(page);
      if (item.expectedVisible) {
        await expect(legend).toBeVisible();
      } else {
        await expect(legend).toBeHidden();
      }
    });
  });

  test('Verify onClick callback in donut pie', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('I call')) {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/donut-chart/on-click-pie.tsx',
      'en',
    );

    await page.waitForTimeout(500);

    await test.step('Verify no calls on render', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      expect(messages.length).toBe(0);
    });

    await test.step('Verify no calls on legend click', async () => {
      await locators.legendItem(page, 'Option A').click();
      expect(messages.length).toBe(0);
    });

    await test.step('Verify callback triggered on pie click', async () => {
      const box = await locators.pie(page, 0).boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
      expect(messages).toEqual(['I call on mount']);
      expect(messages.length).toBe(1);
    });
  });
});
