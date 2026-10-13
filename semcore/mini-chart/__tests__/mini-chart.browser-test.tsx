import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test.describe('Score Donuts', () => {
    const ScoreDonut = [
      { value: 0, color: undefined, baseBgColor: undefined, animate: false },
      { value: 0.5, color: 'chart-palette-order-2', baseBgColor: 'chart-palette-order-10', animate: false },
      { value: 1, color: 'chart-palette-order-3', baseBgColor: 'chart-palette-order-11', animate: false },
      { value: 33, color: 'chart-palette-order-4', baseBgColor: undefined, animate: false },
      { value: 69.5, color: undefined, baseBgColor: 'chart-palette-order-12', animate: false },
      { value: 99, color: 'chart-palette-order-6', baseBgColor: 'chart-palette-order-13', animate: false },
      { value: 99.6, color: 'chart-palette-order-7', baseBgColor: 'chart-palette-order-14', animate: false },
      { value: 100, color: undefined, baseBgColor: undefined, animate: false },
      { value: 120, color: undefined, baseBgColor: undefined, animate: false },

    ];
    ScoreDonut.forEach((item) => {
      test(`Verify with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-donuts.tsx', 'en', item);

        const charts = {
          Donut: page.locator('[data-ui-name="MiniChart.ScoreDonut"]').first(),
          SemiDonut: page.locator('[data-ui-name="MiniChart.ScoreSemiDonut"]').first(),
        };
        const hasValue = item.value > 0;
        const hasBase = item.value < 100;
        const color = item.color ?? 'chart-palette-order-1';

        for (const [name, chart] of Object.entries(charts)) {
          await test.step(`Verify ${name}`, async () => {
            await expect(chart).toHaveAttribute('value', String(item.value));

            const valuePath = chart.locator('svg > path');
            await expect(valuePath).toHaveCount(1);
            await expect(valuePath).toHaveAttribute('fill', new RegExp(`--intergalactic-${color},`));

            await expect(chart.locator('svg > g > path')).toHaveCount(hasBase ? 1 : 0);
            await expect(chart.locator('svg > defs > mask')).toHaveCount(hasValue ? 1 : 0);

            if (hasValue && hasBase) {
              await expect(chart.locator('svg > g')).toHaveAttribute('mask', /^url\(#.+-base-mask\)$/);
            }

            if (hasBase) {
              const basePath = chart.locator('svg > g > path');

              if (item.baseBgColor) {
                await expect(chart.locator('svg > defs > pattern')).toHaveCount(0);
                await expect(basePath).toHaveAttribute('fill', new RegExp(`--intergalactic-${item.baseBgColor},`));
              } else {
                await expect(chart.locator('svg > defs > pattern')).toHaveCount(1);
                await expect(basePath).toHaveAttribute('fill', /^url\(#.+-base-pattern\)$/);
              }
            }
          });
        }

        await expect(page).toHaveScreenshot();
      });
    });

    const LoadingScoreDonut = [
      { value: 33, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined },
    ];
    LoadingScoreDonut.forEach((item) => {
      test(`Verify loading=${item.loading} with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-donuts.tsx', 'en', item);
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Score Lines', () => {
    const ScoreLineNoSegments = [
      { value: 0, color: undefined, baseBgColor: undefined },
      { value: 0.5, color: 'chart-palette-order-2', baseBgColor: 'chart-palette-order-16', animate: false },
      { value: 1, color: 'chart-palette-order-3', baseBgColor: 'chart-palette-order-15', animate: false },
      { value: 33, color: 'chart-palette-order-4', baseBgColor: undefined, animate: false },
      { value: 69.5, color: undefined, baseBgColor: 'chart-palette-order-5', animate: false },
      { value: 99, color: 'chart-palette-order-6', baseBgColor: 'chart-palette-order-14', animate: false },
      { value: 99.6, color: 'chart-palette-order-7', baseBgColor: 'chart-palette-order-13', animate: false },
      { value: 100, color: undefined, baseBgColor: undefined, animate: false },
      { value: 120, color: undefined, baseBgColor: undefined, animate: false },

    ];
    ScoreLineNoSegments.forEach((item) => {
      test(`Verify without segments with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-lines.tsx', 'en', item);

        const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
        const normalizedValue = Math.max(Math.min(item.value, 100), 0);
        const color = item.color ?? 'chart-palette-order-1';
        const baseBgColor = item.baseBgColor ?? 'chart-grid-bar-base-bg';

        await expect(scoreLine).toHaveAttribute('value', String(item.value));

        await test.step('Verify value rect', async () => {
          const valueRect = scoreLine.locator('svg > rect');

          if (normalizedValue > 0) {
            await expect(valueRect).toHaveCount(1);
            await expect(valueRect).toHaveAttribute('width', `${normalizedValue}%`);
            await expect(valueRect).toHaveAttribute('fill', new RegExp(`--intergalactic-${color},`));
          } else {
            await expect(valueRect).toHaveCount(0);
          }
        });

        await test.step('Verify base rect', async () => {
          await expect(scoreLine.locator('svg > g > rect')).toHaveCount(normalizedValue < 100 ? 1 : 0);
          await expect(scoreLine.locator('svg > defs > mask')).toHaveCount(normalizedValue > 0 ? 1 : 0);
          await expect(scoreLine.locator('svg > defs > pattern > rect').first())
            .toHaveAttribute('fill', new RegExp(`--intergalactic-${baseBgColor},`));
        });

        await expect(page).toHaveScreenshot();
      });
    });

    const ScoreLineNoSegmentsLoading = [
      { value: 33, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined },
      { value: 100, loading: true, color: undefined, baseBgColor: undefined },
    ];
    ScoreLineNoSegmentsLoading.forEach((item) => {
      test(`Verify loading=${item.loading} without segments with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-lines.tsx', 'en', item);
        await expect(page).toHaveScreenshot();
      });
    });

    const ScoreLineWithSegments = [
      { value: 0, segments: 5, color: undefined, baseBgColor: undefined, animate: false },
      { value: 0.5, segments: 3, color: 'chart-palette-order-2', baseBgColor: 'chart-palette-order-16', animate: false },
      { value: 1, segments: 1, color: 'chart-palette-order-3', baseBgColor: 'chart-palette-order-15', animate: false },
      { value: 33, segments: 10, color: 'chart-palette-order-4', baseBgColor: undefined, animate: false },
      { value: 3, segments: 10, color: undefined, baseBgColor: 'chart-palette-order-5', animate: false },
      { value: 49, segments: 50, color: 'chart-palette-order-6', baseBgColor: 'chart-palette-order-14', animate: false },

    ];

    ScoreLineWithSegments.forEach((item) => {
      test(`Verify with ${item.segments} segments with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-lines.tsx', 'en', item);

        const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
        await expect(scoreLine).toHaveAttribute('value', String(item.value));

        const segments = scoreLine.locator('[data-ui-name="Flex"] > [data-ui-name="Box"]');
        await expect(segments).toHaveCount(item.segments);

        await test.step('Verify segments are filled by value and base segments are visible', async () => {
          const filledCount = Math.min(Math.ceil(item.value), item.segments);
          const backgrounds = await segments.evaluateAll((els) =>
            els.map((el) => getComputedStyle(el).backgroundColor));

          for (const background of backgrounds) {
            expect(background).not.toBe('rgba(0, 0, 0, 0)');
          }

          const filled = new Set(backgrounds.slice(0, filledCount));
          const base = new Set(backgrounds.slice(filledCount));

          expect(filled.size).toBeLessThanOrEqual(1);
          expect(base.size).toBeLessThanOrEqual(1);
          if (filled.size && base.size) {
            expect([...filled][0]).not.toBe([...base][0]);
          }
        });

        await expect(page).toHaveScreenshot();
      });
    });

    const ScoreLineWithSegmentsLoading = [
      { value: 3, segments: 10, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined, animate: false },
    ];

    ScoreLineWithSegmentsLoading.forEach((item) => {
      test(`Verify loading=${item.loading} Score Lines with ${item.segments} segments with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-lines.tsx', 'en', item);

        const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
        await expect(scoreLine).toHaveAttribute('value', String(item.value));
        await expect(scoreLine.locator('svg > rect')).toHaveAttribute('fill', /--intergalactic-skeleton-bg/);

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Score Lines Segments', () => {
    const ScoreLineNoSegments = [
      { value1: 0, value2: 0, color1: 'chart-palette-order-2', color2: 'chart-palette-order-3', baseBgColor: undefined, animate: false },
      { value1: 30, value2: 70, color1: 'chart-palette-order-2', color2: 'chart-palette-order-3', baseBgColor: undefined, animate: false },
      { value1: 0, color1: undefined, baseBgColor: 'chart-palette-order-14', animate: false },
      { value1: 0, value2: 100, color1: 'chart-palette-order-5', color2: 'chart-palette-order-16', baseBgColor: 'chart-palette-order-14', animate: false },

    ];
    ScoreLineNoSegments.forEach((item) => {
      test(`Verify with value1=${item.value1} value2=${item.value2} color1=${item.color1} color2=${item.color2} baseBgColor=${item.baseBgColor}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-line-segments.tsx', 'en', item);
        await expect(page).toHaveScreenshot();
      });
    });

    const SegmentsWidths = [
      { value1: 30, value2: 70 },
      { value1: 20, value2: 20 },
      { value1: 0, value2: 100 },
    ];
    SegmentsWidths.forEach((item) => {
      test(`Verify segments widths are proportional to values value1=${item.value1} value2=${item.value2}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/score-line-segments.tsx', 'en', { ...item, animate: false });

        const values = [item.value1, item.value2].filter((value) => value > 0);
        const segments = page.locator('[data-ui-name="MiniChart.ScoreLine"]').first().locator('[data-ui-name="ScoreLine.Segment"]');
        await expect(segments).toHaveCount(values.length);

        const widths = await segments.evaluateAll((els) =>
          els.map((el) => el.getBoundingClientRect().width));
        const totalWidth = widths.reduce((sum, width) => sum + width, 0);
        const totalValue = values.reduce((sum, value) => sum + value, 0);

        widths.forEach((width, index) => {
          expect(width / totalWidth).toBeCloseTo(values[index] / totalValue, 1);
        });
      });
    });

    test('Verify Loading state', {
      tag: [TAG.PRIORITY_HIGH,
        '@mini-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/mini-chart/tests/examples/score-line-segments.tsx', 'en', { loading: true, animate: false });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Trend Bars', () => {
    const TrendBars = [
      { loading: true, animate: false },
      { loading: false, animate: false },

    ];
    TrendBars.forEach((item) => {
      test(`Verify loading=${item.loading} `, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/trend-bars.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Trend Lines', () => {
    const TrendBars = [
      { lastPointRadius: undefined, lastPointColor: undefined, color: undefined, animate: false },
      { lastPointRadius: 5, lastPointColor: undefined, color: 'chart-palette-order-14', animate: false },
      { lastPointRadius: 0, lastPointColor: 'chart-palette-order-14', color: 'chart-palette-order-14', animate: false },
      { lastPointRadius: undefined, lastPointColor: 'chart-palette-order-4', color: undefined, animate: false },
      { lastPointRadius: 7, lastPointColor: 'chart-palette-order-6', color: 'chart-palette-order-9', animate: false },

    ];
    TrendBars.forEach((item) => {
      test(`VerifylastPointRadius=${item.lastPointRadius} lastPointColor=${item.lastPointColor} color=${item.color} `, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/trend-lines.tsx', 'en', item);
        await expect(page).toHaveScreenshot();
      });
    });

    const TrendBarsLoading = [
      { loading: true, lastPointRadius: undefined, lastPointColor: undefined, color: undefined, animate: false },
      { loading: true, lastPointRadius: 7, lastPointColor: 'chart-palette-order-6', color: 'chart-palette-order-9', animate: false },

    ];
    TrendBarsLoading.forEach((item) => {
      test(`Verify loading with lastPointRadius=${item.lastPointRadius} lastPointColor=${item.lastPointColor} color=${item.color} `, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/trend-lines.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Trend Area', () => {
    const TrendArea = [
      { chartType: 'area', color: undefined, lastPointColor: undefined, lastPointRadius: undefined, loading: false, animate: false },
      { chartType: 'area', color: 'chart-palette-order-9', lastPointColor: 'chart-palette-order-6', lastPointRadius: 7, loading: false, animate: false },
      { chartType: 'area', color: 'chart-palette-order-9', lastPointColor: undefined, lastPointRadius: undefined, loading: true, animate: false },
    ];
    TrendArea.forEach((item) => {
      test(`Verify loading=${item.loading} lastPointRadius=${item.lastPointRadius} lastPointColor=${item.lastPointColor} color=${item.color}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@mini-chart',
          '@base-components',
          '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/mini-chart/tests/examples/trend-lines.tsx', 'en', item);

        const area = page.locator('[data-ui-name="MiniChart.TrendArea"]');
        await expect(area).toHaveCount(1);

        if (!item.loading) {
          const color = item.color ?? 'chart-palette-order-1';
          const [areaPolyline, linePolyline] = [area.locator('svg > polyline').nth(0), area.locator('svg > polyline').nth(1)];

          await expect(areaPolyline).toHaveAttribute('fill', /^url\(#.+-area-gradient\)$/);
          await expect(linePolyline).toHaveAttribute('stroke', new RegExp(`--intergalactic-${color},`));
          await expect(area.locator('svg linearGradient stop')).toHaveCount(3);
          await expect(area.locator('svg linearGradient stop').first()).toHaveAttribute('stop-color', new RegExp(`--intergalactic-${color},`));
        }

        await expect(page).toHaveScreenshot();
      });
    });
  });
});

/* =====================================================
  @functional
  No snapshots here. We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Accessibility', () => {
    test('Verify ScoreDonut passes aria-label to svg with role img', {
      tag: [TAG.PRIORITY_HIGH,
        '@mini-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/mini-chart/tests/examples/score-donuts.tsx', 'en', { value: 33, animate: false });

      const donut = page.locator('[data-ui-name="MiniChart.ScoreDonut"]');
      await expect(donut.locator('svg')).toHaveAttribute('role', 'img');
      await expect(donut.locator('svg')).toHaveAttribute('aria-label', 'test');
      await expect(donut).not.toHaveAttribute('aria-label');
    });

    test('Verify TrendHistogram passes aria-label to svg with role img', {
      tag: [TAG.PRIORITY_HIGH,
        '@mini-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/mini-chart/tests/examples/trend-bars.tsx', 'en', { animate: false });

      const histogram = page.locator('[data-ui-name="MiniChart.TrendHistogram"]');
      await expect(histogram.locator('svg')).toHaveAttribute('role', 'img');
      await expect(histogram.locator('svg')).toHaveAttribute('aria-label', 'mylabel1');
      await expect(histogram).not.toHaveAttribute('aria-label');
    });
  });
});
