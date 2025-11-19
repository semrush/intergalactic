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
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify base example', {
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');

    await test.step('Verify chart renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const chart = locators.plot(page).first();
      await expect(chart).toBeVisible();
    });

    await test.step('Verify pie highlights on hover', async () => {
      await page.locator('path').nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  const variables = [
    { paddingAngle: 0.2, showTooltip: true, showLabel: true, duration: 0 },
    { innerRadius: 50, paddingAngle: 0.2, showTooltip: true, showLabel: true, duration: 0 },
    { innerRadius: 80, showTooltip: false, showLabel: true, duration: 0 },
    { outerRadius: 120, showTooltip: true, showLabel: false, duration: 0 },
    { outerRadius: 100, showTooltip: false, showLabel: false, duration: 0 },
    { patterns: true, showTooltip: true, showLabel: true, duration: 0 },
  ];

  variables.forEach((item, index) => {
    test(`Verify donut chart with config ${index + 1}`, {
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx',
        'en',
        item,
      );

      await test.step('Verify chart renders correctly', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pie highlights on hover', async () => {
        const pies = locators.pie(page);
        await pies.nth(1).hover();
        await page.waitForTimeout(300);

        if (item.showTooltip) {
          const tooltip = page.locator('[data-ui-name="Donut.Tooltip"]');
          await expect(tooltip).toBeVisible();
        } else
          await expect(page).toHaveScreenshot();
      });
    });
  });

  const halfsizeVariables = [
    { halfsize: true, showTooltip: true, showLabel: true, duration: 0 },
    { halfsize: true, innerRadius: 50, showTooltip: true, showLabel: true, duration: 0 },
    { halfsize: true, innerRadius: 80, showTooltip: false, showLabel: true, duration: 0 },
    { halfsize: true, outerRadius: 120, showTooltip: true, showLabel: false, duration: 0 },
    { halfsize: true, paddingAngle: 0.2, showTooltip: true, showLabel: true, duration: 0 },
    { halfsize: true, patterns: true, showTooltip: false, showLabel: false, duration: 0 },
  ];

  halfsizeVariables.forEach((item, index) => {
    test(`Verify semi-donut with config ${index + 1}`, {
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx',
        'en',
        item,
      );

      await test.step('Verify semi-donut renders correctly', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pie highlights on hover', async () => {
        const pies = locators.pie(page);
        await pies.nth(1).hover();
        await page.waitForTimeout(300);

        if (item.showTooltip) {
          const tooltip = page.locator('[data-ui-name="Donut.Tooltip"]');
          await expect(tooltip).toBeVisible();
        } else
          await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify donut controlled highlight interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@donut-chart', '@d3-chart'],
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

  test('Verify donut legend and pattern fill hover styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/donut-chart/basic-usage.tsx',
      'en',
      {
        patterns: true,
        showLegend: true,
      },
    );
    await locators.plot(page).waitFor({ state: 'visible' });

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
  });

  test('Verify donut legend and pattern fill focus styles', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/donut-chart/basic-usage.tsx',
      'en',
      {
        patterns: true,
        showLegend: true,
      },
    );

    await test.step('Verify chart renders', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
    });

    await test.step('Verify highlighted by focus', async () => {
      for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlighted by check and uncheck', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify semi-donut with labels', {
    tag: [TAG.PRIORITY_MEDIUM, '@donut-chart', '@d3-chart'],
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
  test('Verify aria-hidden attributes on pies', {
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');

    await test.step('Verify pies have aria-hidden attribute', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const pies = locators.pie(page);
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify aria-hidden attributes on pies and labels', {
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx', 'en', {
      showLabel: true,
      duration: 0,
    });

    await test.step('Verify pies have aria-hidden attribute', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      const pies = locators.pie(page);
      const count = await pies.count();

      for (let i = 0; i < count; i++) {
        const pie = pies.nth(i);
        await expect(pie).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify labels have aria-hidden attribute', async () => {
      const labels = locators.label(page);
      const countLabel = await labels.count();

      for (let i = 0; i < countLabel; i++) {
        const label = labels.nth(i);
        await expect(label).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('Verify showLegend prop logic', {
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart'],
  }, async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/donut-chart/basic-usage.tsx';
    const props: {
      showLegend?: boolean;
      data: { [key: string]: number };
    } = {
      showLegend: undefined,
      data: {
        a: 1,
        b: 2,
      },
    };

    await test.step('Verify legend shown when showLegend: undefined and >=2 items in legend', async () => {
      await loadPage(page, standPath, 'en', props);
      const legend = locators.legend(page);
      await expect(legend).toBeVisible();
    });

    await test.step('Verify legend hidden when showLegend: false and >=2 items in legend', async () => {
      props.showLegend = false;
      await loadPage(page, standPath, 'en', props);
      const legend = locators.legend(page);
      await expect(legend).toBeHidden();
    });

    await test.step('Verify legend hidden when showLegend: undefined and < 2 items in legend', async () => {
      props.showLegend = undefined;
      props.data = {
        a: 1,
      };
      await loadPage(page, standPath, 'en', props);
      const legend = locators.legend(page);
      await expect(legend).toBeHidden();
    });

    await test.step('Verify legend visible when showLegend: true and < 2 items in legend', async () => {
      props.showLegend = true;
      props.data = {
        a: 1,
      };
      await loadPage(page, standPath, 'en', props);
      const legend = locators.legend(page);
      await expect(legend).toBeVisible();
    });
  });

  test('Verify onClick callback in donut pie', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@donut-chart', '@d3-chart'],
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
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['I call on mount']);
    });
  });
});
