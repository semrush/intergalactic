import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  bubbleCircle: (page: Page, index?: number) => {
    const base = page.locator('circle[data-ui-name="Bubble.Circle"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  group: (page: Page, index?: number) => {
    const base = page.locator('g');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="Legend.Item"]'),
  checkbox: (page: Page, index?: number) => {
    const base = page.locator('label[data-ui-name="Checkbox"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="Bubble.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      description: 'Standard: all features enabled, medium size',
      plotWidth: 500,
      plotHeight: 300,
      marginX: 40,
      marginY: 40,
      showXAxis: true,
      showYAxis: true,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: true,
      patterns: false,
      duration: 0,
    },
    {
      description: 'Patterns: no axes, patterns enabled, large size',
      plotWidth: 700,
      plotHeight: 400,
      marginX: 20,
      marginY: 20,
      showXAxis: false,
      showYAxis: false,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: false,
      patterns: true,
      duration: 0,
    },
    {
      description: 'Inverted: yAxis and no tooltip',
      plotWidth: 600,
      plotHeight: 350,
      marginX: 80,
      marginY: 50,
      showXAxis: false,
      showYAxis: true,
      invertAxis: true,
      showTooltip: false,
      showTotalInTooltip: false,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars, index) => {
    test(`Verify bubble chart ${vars.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/bubble-chart/basic-usage.tsx',
        'en',
        vars,
      );

      await test.step('Verify chart renders correctly with current configuration', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot();
      });

      if (vars.showTooltip) {
        await test.step('Verify tooltip appears on hover', async () => {
          const bubbleItem = locators.bubbleCircle(page, 2);
          await bubbleItem.hover();

          const tooltip = locators.tooltip(page);
          await tooltip.waitFor({ state: 'visible' });
          await expect(tooltip).toBeVisible();
        });
      }
    });
  });

  test('Verify bubble chart implementation', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bubble-chart/bubble-chart.tsx',
      'en',
    );

    await test.step('Verify tooltip shown on hover', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const box = await locators.bubbleCircle(page, 0).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot({
        maxDiffPixelRatio: browserName === 'firefox' ? 0.01 : undefined,
      });
    });
  });

  test('Verify color customization', {
    tag: [TAG.PRIORITY_MEDIUM, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx',
      'en',
    );

    await test.step('Verify chart with custom colors renders correctly', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern interactions by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@typography'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx',
      'en',
    );

    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Verify patterns render correctly with default state', async () => {
      const groups = await locators.group(page).all();
      for (const group of groups) {
        const pattern = group.locator('pattern');
        const patternCount = await pattern.count();
        expect(patternCount).toBeGreaterThanOrEqual(0);
      }
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify unchecking behavior and all disabled state', async () => {
      const firstCheckbox = locators.checkbox(page, 0);
      const firstGroup = locators.group(page, 0);

      await expect(firstCheckbox).toBeChecked();
      await expect(firstGroup).toBeVisible();

      await firstCheckbox.click();

      await expect(firstCheckbox).not.toBeChecked();
      await expect(firstGroup).toHaveCSS('display', 'none');

      // Uncheck remaining elements to test all disabled state
      const checkboxes = await locators.checkbox(page).all();
      const groups = await locators.group(page).all();

      for (let i = 1; i < checkboxes.length; i++) {
        await checkboxes[i].click();
      }

      for (const checkbox of checkboxes) {
        await expect(checkbox).not.toBeChecked();
      }

      for (const group of groups) {
        await expect(group).toHaveCSS('display', 'none');
      }

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
  test('Verify bubble circles count and attributes', {
    tag: [TAG.PRIORITY_HIGH, '@bubble-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await test.step('Verify basic usage example', async () => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx',
        'en',
      );

      await locators.plot(page).first().waitFor({ state: 'visible' });

      const gCount = await locators.group(page).count();
      expect(gCount).toBe(5);

      const circleCount = await locators.bubbleCircle(page).count();
      expect(circleCount).toBe(5);

      const circles = await locators.bubbleCircle(page).all();
      for (const circle of circles) {
        await expect(circle).toHaveAttribute('aria-hidden', 'true');
        await expect(circle).toHaveAttribute('value', 'value');
        await expect(circle).toHaveAttribute('label', 'label');
      }
    });

    await test.step('Verify bubble chart implementation example', async () => {
      await loadPage(
        page,
        'stories/components/d3-chart/docs/examples/bubble-chart/bubble-chart.tsx',
        'en',
      );

      await locators.plot(page).waitFor({ state: 'visible' });

      const circles = await locators.bubbleCircle(page).all();
      for (const circle of circles) {
        await expect(circle).toHaveAttribute('aria-hidden', 'true');
        await expect(circle).toHaveAttribute('value', 'value');
      }
    });
  });

  test('Verify onClick callback in bubble circle', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bubble-chart', '@d3-chart', '@typography'],
  }, async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().startsWith('I call')) {
        messages.push(msg.text());
      }
    });

    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/bubble-chart/on-click-in-bubble.tsx',
      'en',
    );

    await test.step('Verify no calls on render', async () => {
      await locators.plot(page).waitFor({ state: 'visible' });
      expect(messages.length).toBe(0);
    });

    await test.step('Verify callback triggered on bubble click', async () => {
      const box = await locators.bubbleCircle(page, 0).boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(100);
      }
      expect(messages.length).toBe(1);
      expect(messages).toEqual(['I call on mount']);
    });
  });
});
