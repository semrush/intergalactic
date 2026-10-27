import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const STORY = 'stories/components/d3-chart/tests/examples/score-donut-chart/basic-usage.tsx';

const COMPONENT_TAGS = ['@score-donut-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'];

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  pie: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Donut.Pie"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  otherPie: (page: Page) => page.locator('[data-ui-name="Donut.Pie"][mask]'),
  valuePie: (page: Page) => page.locator('[data-ui-name="Donut.Pie"]:not([mask])'),
  emptyData: (page: Page) => page.locator('[data-ui-name="Donut.EmptyData"]'),
  tooltip: (page: Page) => page.locator('[data-ui-name="Donut.Tooltip"]'),
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendCheckbox: (page: Page, name = 'value') => page.getByLabel('Chart legend').getByRole('checkbox', { name }),
  legendItem: (page: Page, text = 'value') => page.getByLabel('Chart legend').getByText(text, { exact: true }),
};

const load = async (page: Page, props: Record<string, unknown> = {}) => {
  await loadPage(page, STORY, 'en', { duration: 0, ...props });
  await locators.plot(page).waitFor({ state: 'visible' });
  // The chart measures its container first and re-renders with the final radius.
  await page.waitForTimeout(300);
};

/**
Hovers the middle of the ring at a point of the outer arc. The midpoint between the outer and
inner arcs used by the Donut tests falls into the hole for wide arcs, so the point is taken in
the middle of the outer arc (a quarter of the path, which starts with the outer arc) and moved
halfway into the ring. The mouse is moved directly:
hovering starts the radius animation, and locator.hover() never sees the pie stable.
*/
const hoverPie = async (pie: Locator) => {
  const point = await pie.evaluate((path: SVGPathElement) => {
    const onOuterArc = path.getPointAtLength(path.getTotalLength() * 0.25);
    const radius = Math.hypot(onOuterArc.x, onOuterArc.y);
    const scale = (radius - 8) / radius;
    const svgPoint = path.ownerSVGElement!.createSVGPoint();

    svgPoint.x = onOuterArc.x * scale;
    svgPoint.y = onOuterArc.y * scale;

    const { x, y } = svgPoint.matrixTransform(path.getScreenCTM()!);

    return { x, y };
  });

  await pie.page().mouse.move(point.x, point.y, { steps: 5 });
};

/** Hovers a pie until its tooltip is shown: the first mouse events can land before the chart settles. */
const hoverPieForTooltip = async (page: Page, pie: Locator) => {
  await expect(async () => {
    await page.mouse.move(0, 0);
    await hoverPie(pie);
    await expect(locators.tooltip(page)).toBeVisible({ timeout: 1000 });
  }).toPass();
};

const outerRadius = (pie: Locator) =>
  pie.evaluate((path) => {
    const radii = [...(path.getAttribute('d') ?? '').matchAll(/A([\d.]+),/g)].map((match) => Number(match[1]));

    return Math.max(...radii);
  });

/**
Resolves the mask rectangle of the `other` pie into the pie's user space, where percentages
are taken from the svg viewport, and compares it with the pie's bounding box.
*/
const maskCoversOtherPie = (page: Page) =>
  locators.otherPie(page).evaluate((path: SVGPathElement) => {
    const svg = path.ownerSVGElement!;
    const id = (path.getAttribute('mask') ?? '').replace(/^url\(#(.+)\)$/, '$1');
    const rect = svg.querySelector(`mask[id="${id}"] rect`)!;
    const { width, height } = svg.getBoundingClientRect();
    const resolve = (value: string | null, base: number) =>
      value?.endsWith('%') ? (Number.parseFloat(value) / 100) * base : Number(value ?? 0);

    const maskX = resolve(rect.getAttribute('x'), width);
    const maskY = resolve(rect.getAttribute('y'), height);
    const maskWidth = resolve(rect.getAttribute('width'), width);
    const maskHeight = resolve(rect.getAttribute('height'), height);
    const box = path.getBBox();

    return (
      box.x >= maskX &&
      box.y >= maskY &&
      box.x + box.width <= maskX + maskWidth &&
      box.y + box.height <= maskY + maskHeight
    );
  });

/* =====================================================
@visual
Visual states, hover styles and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const values = [
    { description: 'value 0: only the other pie', data: { value: 0 } },
    { description: 'value 50: two equal halves', data: { value: 50 } },
    { description: 'value 100: only the value pie', data: { value: 100 } },
    { description: 'innerRadius 0: full pie', data: { value: 40 }, innerRadius: 0 },
  ];

  values.forEach((item) => {
    test(`Verify score donut ${item.description}`, {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      const { description: _, ...props } = item;
      await load(page, props);

      await test.step('Verify chart renders correctly', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  // Pairwise coverage of halfsize × innerLabel × patterns × legendType × showTooltip × locale.
  const pairwise = [
    { halfsize: false, withInnerLabel: false, patterns: false, legendType: 'Table', showTooltip: true, locale: 'en' },
    { halfsize: false, withInnerLabel: true, patterns: true, legendType: 'Flex', showTooltip: false, locale: 'ja' },
    { halfsize: true, withInnerLabel: false, patterns: true, legendType: 'Table', showTooltip: false, locale: 'ja' },
    { halfsize: true, withInnerLabel: true, patterns: false, legendType: 'Flex', showTooltip: true, locale: 'en' },
    { halfsize: false, withInnerLabel: false, patterns: true, legendType: 'Flex', showTooltip: true, locale: 'en' },
    { halfsize: true, withInnerLabel: true, patterns: false, legendType: 'Table', showTooltip: false, locale: 'ja' },
    { halfsize: false, withInnerLabel: true, patterns: false, legendType: 'Table', showTooltip: true, locale: 'ja' },
    { halfsize: true, withInnerLabel: false, patterns: true, legendType: 'Flex', showTooltip: true, locale: 'en' },
  ] as const;

  pairwise.forEach((item, index) => {
    test(`Verify score donut pairwise combination ${index + 1}`, {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS, '@chart-legend'],
    }, async ({ page }) => {
      const { legendType, ...props } = item;
      await load(page, { ...props, 'showLegend': true, 'legendProps.legendType': legendType });

      await test.step('Verify chart renders correctly', async () => {
        await expect(page).toHaveScreenshot();
      });

      if (item.showTooltip) {
        await test.step('Verify value pie highlights on hover', async () => {
          await hoverPieForTooltip(page, locators.valuePie(page));
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Tooltip', () => {
    test('Verify tooltip shows the value on the value pie', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 } });

      await test.step('Verify tooltip appears on hover', async () => {
        await hoverPieForTooltip(page, locators.valuePie(page));
        await expect(locators.tooltip(page)).toContainText('value');
        await expect(locators.tooltip(page)).toContainText('40');
      });

      await test.step('Verify tooltip disappears on leave', async () => {
        await page.mouse.move(0, 0);
        await expect(locators.tooltip(page)).toBeHidden();
      });
    });

    test('Verify tooltip uses a custom value formatter', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 }, useCustomValueFormatter: true });

      await hoverPieForTooltip(page, locators.valuePie(page));
      await expect(locators.tooltip(page)).toContainText('40% score');
    });

    test('Verify no tooltip when showTooltip is false', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 }, showTooltip: false });

      await hoverPie(locators.valuePie(page));
      await page.waitForTimeout(300);
      await expect(locators.tooltip(page)).toBeHidden();
    });

    test('Verify tooltip shows the rest of the score on the other pie', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B1: tooltip on the other pie shows data.value instead of 100 - value');
      await load(page, { data: { value: 40 } });

      await hoverPieForTooltip(page, locators.otherPie(page));
      await expect(locators.tooltip(page)).toContainText('60');
      await expect(locators.tooltip(page)).not.toContainText('other');
    });
  });

  test.describe('Legend', () => {
    test('Verify legend toggles the value pie by mouse', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...COMPONENT_TAGS, '@chart-legend', '@checkbox'],
    }, async ({ page }) => {
      await load(page, { showLegend: true });

      await test.step('Verify value pie is drawn by default', async () => {
        await expect(locators.legendCheckbox(page)).toBeChecked();
        await expect(locators.valuePie(page)).toHaveCount(1);
      });

      await test.step('Verify unchecking hides the value pie', async () => {
        await locators.legendItem(page).click();
        await expect(locators.legendCheckbox(page)).not.toBeChecked();
        await expect(locators.valuePie(page)).toHaveCount(0);
        await expect(locators.emptyData(page)).toHaveCount(1);
      });

      await test.step('Verify checking again brings the value pie back', async () => {
        await locators.legendItem(page).click();
        await expect(locators.legendCheckbox(page)).toBeChecked();
        await expect(locators.valuePie(page)).toHaveCount(1);
        await expect(locators.emptyData(page)).toHaveCount(0);
      });
    });

    test('Verify legend toggles the value pie by keyboard', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, ...COMPONENT_TAGS, '@chart-legend', '@checkbox'],
    }, async ({ page, browserName }) => {
      test.skip(browserName === 'webkit', 'Tab does not focus checkboxes in WebKit by default');
      await load(page, { showLegend: true });

      await test.step('Verify checkbox receives focus by Tab', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.legendCheckbox(page)).toBeFocused();
      });

      await test.step('Verify Space toggles the value pie', async () => {
        await page.keyboard.press('Space');
        await expect(locators.legendCheckbox(page)).not.toBeChecked();
        await expect(locators.valuePie(page)).toHaveCount(0);

        await page.keyboard.press('Space');
        await expect(locators.legendCheckbox(page)).toBeChecked();
        await expect(locators.valuePie(page)).toHaveCount(1);
      });
    });

    test('Verify unchecked value item does not look like a 100% other ring', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...COMPONENT_TAGS, '@chart-legend'],
    }, async ({ page }) => {
      test.fixme(true, 'B3: the other pie is drawn over EmptyData when the value item is unchecked');
      await load(page, { showLegend: true });

      await locators.legendItem(page).click();
      await expect(locators.otherPie(page)).toHaveCount(0);
    });

    test('Verify hover on the legend item highlights the value pie', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS, '@chart-legend'],
    }, async ({ page }) => {
      await load(page, { showLegend: true });
      const idleRadius = await outerRadius(locators.valuePie(page));

      await locators.legendItem(page).hover();
      await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius + 4);
    });

    test('Verify value pie returns to its size after leaving the legend item', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS, '@chart-legend'],
    }, async ({ page }) => {
      test.fixme(true, 'B9: the value pie stays highlighted after the mouse leaves the legend item');
      await load(page, { showLegend: true });
      const idleRadius = await outerRadius(locators.valuePie(page));

      await locators.legendItem(page).hover();
      await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius + 4);

      await page.mouse.move(0, 0);
      await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius);
    });

    test('Verify side metric layout hides the legend', {
      tag: [TAG.PRIORITY_LOW, ...COMPONENT_TAGS, '@divider'],
    }, async ({ page }) => {
      await load(page, { withSideMetric: true, data: { value: 3 } });

      await expect(locators.legend(page)).toBeHidden();
      await expect(page.getByText('71,286')).toBeVisible();
      await expect(page.getByText('value name')).toBeVisible();
    });
  });

  test.describe('Other pie', () => {
    test('Verify mask covers the other pie in a full donut', {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 } });

      expect(await maskCoversOtherPie(page)).toBe(true);
    });

    test('Verify mask covers the other pie in a semi donut', {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B2: the mask rect is sized from the svg, so the top of a semi-donut arc is cut off');
      await load(page, { data: { value: 40 }, halfsize: true });

      expect(await maskCoversOtherPie(page)).toBe(true);
    });

    test('Verify other pie is not painted black', {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B5: token chart-palette-order-other-data was renamed to chart-data-other-value');
      await load(page, { data: { value: 40 } });

      const fill = await locators.otherPie(page).evaluate((path) => getComputedStyle(path).fill);
      expect(fill).not.toBe('rgb(0, 0, 0)');
    });

    test('Verify other pie gets a single fill method with patterns', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B4: with patterns the other pie gets both a pattern fill and the hatch mask');
      await load(page, { data: { value: 40 }, patterns: true });

      const otherPie = locators.otherPie(page);
      const hasPattern = await otherPie.evaluate((path) => (path.getAttribute('pattern') ?? '').startsWith('url('));
      expect(hasPattern).toBe(false);
    });
  });

  test.describe('Layout', () => {
    test('Verify chart follows the container size', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { plotWidth: 500, plotHeight: 300 });
      const initialWidth = (await locators.plot(page).boundingBox())!.width;

      await page.locator('[data-testid="TEST"]').evaluate((chart) => {
        (chart.parentElement as HTMLElement).style.width = '400px';
      });

      await expect.poll(async () => (await locators.plot(page).boundingBox())!.width).toBeLessThan(initialWidth);
    });
  });

  test.describe('Accessibility', () => {
    test('Verify aria attributes', {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page);

      await expect(locators.plot(page)).toHaveAttribute('aria-label', 'Score donut chart');
      await expect(page.locator('[data-testid="TEST"]')).toHaveAttribute('role', 'group');
      await expect(page.locator('[data-ui-name="Donut"]')).toHaveAttribute('aria-hidden', 'true');
    });

    test('Verify data summary contains both values', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 } });

      await page.getByRole('button', { name: 'Open data summary' }).focus();
      await page.keyboard.press('Enter');

      const summary = page.getByText(/Chart represents/);
      await expect(summary).toBeVisible();
      await expect(summary).toContainText('40');
      await expect(summary).toContainText('60');
    });

    test('Verify data summary uses human-readable names', {
      tag: [TAG.PRIORITY_LOW, TAG.KEYBOARD, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B8: the data summary reads raw keys ("other of value 60 and value of value 40")');
      await load(page, { data: { value: 40 } });

      await page.getByRole('button', { name: 'Open data summary' }).focus();
      await page.keyboard.press('Enter');

      await expect(page.getByText(/Chart represents/)).not.toContainText('of value');
    });
  });
});
