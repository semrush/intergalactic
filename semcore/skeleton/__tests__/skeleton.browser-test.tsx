import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const BASE_EXAMPLE = 'stories/components/skeleton/tests/examples/chart-skeletons.tsx';

/** every chart skeleton rendered by the example, in DOM order */
const CHARTS = [
  'LineChartSkeleton',
  'AreaChartSkeleton',
  'BarChartSkeleton',
  'HistogramChartSkeleton',
  'CompactHorizontalBarChartSkeleton',
  'DonutChartSkeleton',
  'ScatterPlotChartSkeleton',
  'BubbleChartSkeleton',
  'VennChartSkeleton',
  'RadialTreeChartSkeleton',
] as const;

export const locators = {
  skeleton: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SkeletonSVG"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  chartSkeleton: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Skeleton"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  // areas of the example, so every screenshot is scoped to its own skeleton
  area: (page: Page, testId: string) => page.locator(`[data-testid="${testId}"]`),
  chart: (page: Page, name: string) => page.locator(`[data-testid="chart-${name}"]`),
};

const computed = (locator: Locator, property: string) =>
  locator.evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), property);

/* =====================================================
@visual
Visual states and snapshots.
Every snapshot is taken from a [data-testid] area, never from the whole page.
The pulse animation is frozen with duration=0 to keep screenshots stable.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify every chart skeleton pattern', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 0 });

    for (const name of CHARTS) {
      await test.step(`Verify ${name}`, async () => {
        const chart = locators.chart(page, name);

        await chart.scrollIntoViewIfNeeded();
        await expect(chart).toBeVisible();
        await expect(chart).toHaveScreenshot(`${name}.png`);
      });
    }
  });

  test('Verify type=monotone for Line and Area', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 0, type: 'monotone' });

    await expect(locators.chart(page, 'LineChartSkeleton')).toHaveScreenshot(
      'LineChartSkeleton-monotone.png',
    );
    await expect(locators.chart(page, 'AreaChartSkeleton')).toHaveScreenshot(
      'AreaChartSkeleton-monotone.png',
    );
  });

  test('Verify layout=vertical for Bar and Histogram', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 0, layout: 'vertical' });

    await expect(locators.chart(page, 'BarChartSkeleton')).toHaveScreenshot(
      'BarChartSkeleton-vertical.png',
    );
    await expect(locators.chart(page, 'HistogramChartSkeleton')).toHaveScreenshot(
      'HistogramChartSkeleton-vertical.png',
    );
  });

  test('Verify halfsize donut', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 0, halfsize: true });

    await expect(locators.chart(page, 'DonutChartSkeleton')).toHaveScreenshot(
      'DonutChartSkeleton-halfsize.png',
    );
  });

  const textCases = [
    { theme: 'default', amount: 1, textWidth: '60%' },
    { theme: 'invert', amount: 1, textWidth: '60%' },
    { theme: 'default', amount: 3, textWidth: '100%' },
    { theme: 'invert', amount: 5, textWidth: '30%' },
  ] as const;

  textCases.forEach((item) => {
    test(`Verify theme=${item.theme}, amount=${item.amount}`, {
      tag: [TAG.PRIORITY_HIGH, '@skeleton'],
    }, async ({ page }) => {
      await loadPage(page, BASE_EXAMPLE, 'en', {
        ...item,
        duration: 0,
        invertedBackground: item.theme === 'invert',
      });

      await expect(locators.skeleton(page, 0)).toBeVisible();
      await expect(locators.area(page, 'plain-skeleton')).toHaveScreenshot();
    });
  });

  test('Verify chart skeletons on inverted background', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', {
      duration: 0,
      theme: 'invert',
      invertedBackground: true,
    });

    await expect(locators.area(page, 'chart-skeletons')).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Attributes, props forwarding, locales and resizing - no snapshots here.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify root attributes', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en');

    const skeleton = locators.skeleton(page, 0);

    await expect(skeleton).toBeVisible();
    await expect(skeleton).toHaveAttribute('role', 'img');
    await expect(skeleton).toHaveAttribute('aria-label', 'Loading…');
    await expect(skeleton).toHaveAttribute('preserveAspectRatio', 'none');
  });

  test('Verify duration prop drives the pulse animation', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 500 });

    const skeleton = locators.skeleton(page, 0);

    expect(await skeleton.getAttribute('style')).toContain('500ms');
    expect(await computed(skeleton, 'animation-duration')).toBe('0.5s');
  });

  test('Verify hidden prop renders nothing', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { hidden: true });

    await expect(locators.skeleton(page)).toHaveCount(0);
    await expect(locators.chartSkeleton(page)).toHaveCount(0);
  });

  test('Verify aria-label is localized', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'de', { locale: 'de' });

    expect(await locators.skeleton(page, 0).getAttribute('aria-label')).not.toBe('Loading…');
  });

  test('Verify Skeleton.Text amount renders the requested number of lines', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { amount: 4 });

    // 4 lines from the first Skeleton.Text plus a single line from the second one
    await expect(locators.area(page, 'plain-skeleton').locator('rect[rx="4"]')).toHaveCount(5);
  });

  test('Verify theme changes the fill of Skeleton', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const defaultFill = await computed(locators.skeleton(page, 0), 'fill');

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });
    const invertFill = await computed(locators.skeleton(page, 0), 'fill');

    expect(defaultFill).not.toBe('');
    expect(invertFill).not.toBe(defaultFill);
  });

  test('Verify theme changes the color of chart skeletons', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    // KNOWN BUG: the chart background
    // stays --intergalactic-skeleton-bg for any theme
    test.fail();

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const defaultBackground = await computed(locators.chartSkeleton(page, 1), 'background-color');

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });
    const invertBackground = await computed(locators.chartSkeleton(page, 1), 'background-color');

    expect(invertBackground).not.toBe(defaultBackground);
  });

  test('Verify observeParentSize follows the parent width', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { observeParentSize: true, parentWidth: 200 });

    const skeleton = locators.skeleton(page, 0);
    await expect(skeleton).toHaveAttribute('width', '100%');

    const narrow = (await skeleton.boundingBox())!.width;

    await locators.area(page, 'skeleton-parent').evaluate((el) => {
      (el as HTMLElement).style.width = '600px';
    });

    await expect(async () => {
      const wide = (await skeleton.boundingBox())!.width;
      expect(wide).toBeGreaterThan(narrow);
    }).toPass();

    await expect(skeleton).toHaveAttribute('width', '100%');
  });

  test('Verify w prop pins the skeleton width regardless of the parent', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { w: 300, parentWidth: 200 });

    expect(await computed(locators.skeleton(page, 0), 'width')).toBe('300px');
  });
});
