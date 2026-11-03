import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { expectEachToHaveAttribute, loadPage } from '@semcore/testing-utils/shared/helpers';
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

/**
The center of a donut pie is empty, so .hover() misses the segment and times out.
Hover over the middle of the ring instead.
*/
const getRingPoint = async (pie: Locator) => {
  // Wait for the pie animation to finish, otherwise the point is taken from a moving arc
  await expect.poll(async () => {
    const before = await pie.getAttribute('d');
    await pie.page().waitForTimeout(100);
    return before === await pie.getAttribute('d');
  }).toBe(true);

  const box = await pie.boundingBox();

  if (!box) throw new Error('Donut.Pie is not rendered');

  const point = await pie.evaluate((path: SVGPathElement) => {
    const totalLength = path.getTotalLength();
    const onOuterArc = path.getPointAtLength(totalLength * 0.25);
    const onInnerArc = path.getPointAtLength(totalLength * 0.75);
    const svgPoint = path.ownerSVGElement!.createSVGPoint();

    svgPoint.x = (onOuterArc.x + onInnerArc.x) / 2;
    svgPoint.y = (onOuterArc.y + onInnerArc.y) / 2;

    const { x, y } = svgPoint.matrixTransform(path.getScreenCTM()!);

    return { x, y };
  });

  return { x: point.x - box.x, y: point.y - box.y };
};

const hoverPie = async (pie: Locator) => {
  await pie.hover({ position: await getRingPoint(pie) });
};

const clickPie = async (pie: Locator) => {
  await pie.click({ position: await getRingPoint(pie) });
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
        await hoverPie(pies.nth(1));

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
        await hoverPie(pies.nth(1));

        if (item.showTooltip) {
          const tooltip = page.locator('[data-ui-name="Donut.Tooltip"]');
          await tooltip.waitFor({ state: 'visible' });
        }

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify donut legend and pattern fill interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
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
    tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography', '@checkbox'],
  }, async ({ page }) => {
    await test.step('Verify pies have aria-hidden attribute in basic usage', async () => {
      await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');
      await locators.plot(page).waitFor({ state: 'visible' });

      await expectEachToHaveAttribute(locators.pie(page), 'aria-hidden', 'true');
    });

    await test.step('Verify pies and labels have aria-hidden attribute', async () => {
      await loadPage(page, 'stories/components/d3-chart/tests/examples/donut-chart/donut-props.tsx', 'en', {
        showLabel: true,
        duration: 0,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      await expectEachToHaveAttribute(locators.pie(page), 'aria-hidden', 'true');
      await expectEachToHaveAttribute(locators.label(page), 'aria-hidden', 'true');
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
      tag: [TAG.PRIORITY_HIGH, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
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

  test('Verify legend and pie highlight the same item after unchecking a legend item', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx', 'en');
    await locators.plot(page).waitFor({ state: 'visible' });

    const legendRow = (name: string) =>
      page.locator('div[data-ui-name="LegendTable.LegendItem"]').filter({ hasText: name });
    const pieByName = (name: string) => page.locator(`[data-ui-name="Donut.Pie"][name="${name}"]`);

    await test.step('Uncheck the first legend item', async () => {
      await legendRow('a').click();
      await expect(page.getByRole('checkbox', { name: 'a' })).not.toBeChecked();
      await expect(pieByName('a')).toHaveCount(0);
    });

    await test.step('Verify hover on pie highlights its own legend row', async () => {
      await hoverPie(pieByName('c'));

      await expect(legendRow('c')).toHaveCSS('opacity', '1');
      await expect(legendRow('b')).toHaveCSS('opacity', '0.3');
    });

    await test.step('Verify hover on legend row highlights its own pie', async () => {
      await page.mouse.move(0, 0);
      await legendRow('b').hover();

      await expect(pieByName('b')).toHaveCSS('opacity', '1');
      await expect(pieByName('c')).toHaveCSS('opacity', '0.3');
    });
  });

  [true, false].forEach((showLabel) => {
    test(`Verify onClick callback in donut pie ${showLabel ? 'with' : 'without'} label`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@donut-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox', '@typography'],
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
        { showLabel },
      );

      await page.waitForTimeout(500);

      await test.step('Verify no calls on render', async () => {
        await locators.plot(page).waitFor({ state: 'visible' });
        await expect(locators.label(page)).toHaveCount(showLabel ? 1 : 0);
        expect(messages.length).toBe(0);
      });

      await test.step('Verify no calls on legend click', async () => {
        await locators.legendItem(page, 'Option A').click();
        expect(messages.length).toBe(0);
      });

      await test.step('Verify callback triggered on pie click', async () => {
        await clickPie(locators.pie(page, 0));

        await expect.poll(() => messages).toEqual(['I call onClick with key: a']);
      });
    });
  });
});
