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
  tooltip: (page: Page) => page.locator('[data-ui-name="Donut.Tooltip"]'),
  legend: (page: Page) => page.getByLabel('Chart legend'),
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

    test('Verify tooltip title uses the legend label', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS, '@chart-legend'],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 }, showLegend: true, legendLabel: 'Score' });

      await expect(locators.legendItem(page, 'Score')).toBeVisible();

      await hoverPieForTooltip(page, locators.valuePie(page));
      await expect(locators.tooltip(page)).toContainText('Score');
      await expect(locators.tooltip(page)).not.toContainText('value');
    });

    test('Verify no tooltip when showTooltip is false', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 }, showTooltip: false });

      await hoverPie(locators.valuePie(page));
      await page.waitForTimeout(300);
      await expect(locators.tooltip(page)).toBeHidden();
    });

    test('Verify no tooltip on the other pie', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 } });

      await test.step('Verify tooltip is shown on the value pie', async () => {
        await hoverPieForTooltip(page, locators.valuePie(page));
      });

      await test.step('Verify tooltip hides when the mouse moves to the other pie', async () => {
        await hoverPie(locators.otherPie(page));
        await expect(locators.tooltip(page)).toBeHidden();
      });

      await test.step('Verify tooltip does not appear on the other pie from outside', async () => {
        await page.mouse.move(0, 0);
        await hoverPie(locators.otherPie(page));
        await page.waitForTimeout(300);
        await expect(locators.tooltip(page)).toBeHidden();
      });
    });
  });

  test.describe('Legend', () => {
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
      await load(page, { showLegend: true });
      const idleRadius = await outerRadius(locators.valuePie(page));

      await locators.legendItem(page).hover();
      await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius + 4);

      await page.mouse.move(0, 0);
      await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius);
    });

    test('Verify value pie returns to its size after leaving the pie', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      // Hovering the pie itself animates the radius; the animation is skipped with duration 0
      // and until the mount animation ends, so the hover is retried.
      await load(page, { data: { value: 40 }, duration: 300 });
      const idleRadius = await outerRadius(locators.valuePie(page));

      await test.step('Verify value pie grows on hover', async () => {
        await expect(async () => {
          await page.mouse.move(0, 0);
          await hoverPie(locators.valuePie(page));
          await expect.poll(() => outerRadius(locators.valuePie(page)), { timeout: 1000 }).toBe(idleRadius + 4);
        }).toPass();
      });

      await test.step('Verify value pie shrinks back on leave', async () => {
        await page.mouse.move(0, 0);
        await expect.poll(() => outerRadius(locators.valuePie(page))).toBe(idleRadius);
      });
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
      await load(page, { data: { value: 40 }, halfsize: true });

      expect(await maskCoversOtherPie(page)).toBe(true);
    });

    test('Verify other pie is painted with the chart-data-null token', {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 } });

      const { fill, expected } = await locators.otherPie(page).evaluate((path) => {
        const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        probe.style.fill = 'var(--intergalactic-chart-data-null)';
        path.ownerSVGElement!.append(probe);
        const expected = getComputedStyle(probe).fill;
        probe.remove();

        return { fill: getComputedStyle(path).fill, expected };
      });

      expect(expected).not.toBe('rgb(0, 0, 0)');
      expect(fill).toBe(expected);
    });

    test('Verify other pie gets a single fill method with patterns', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await load(page, { data: { value: 40 }, patterns: true });

      const otherPie = locators.otherPie(page);
      const hasPattern = await otherPie.evaluate((path) => (path.getAttribute('pattern') ?? '').startsWith('url('));
      expect(hasPattern).toBe(false);
      await expect(otherPie).toHaveAttribute('mask', /^url\(#.+-mask\)$/);
      await expect(locators.valuePie(page)).toHaveAttribute('pattern', /^url\(/);
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

    test('Verify data summary contains the score', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      test.fixme(true, 'B10: the data summary always reads a hardcoded "20%" instead of data.value');
      await load(page, { data: { value: 40 } });

      await page.getByRole('button', { name: 'Open data summary' }).focus();
      await page.keyboard.press('Enter');

      await expect(page.getByText(/Chart represents/)).toHaveText('Chart represents 1 value: 40%.');
    });
  });
});
