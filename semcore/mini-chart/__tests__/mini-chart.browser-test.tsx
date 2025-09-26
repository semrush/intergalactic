import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual-Score Donuts', () => {
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
    test(`Verify with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-donuts.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const donut = page.locator('[data-ui-name="MiniChart.ScoreDonut"]').first();
      const semiDonut = page.locator('[data-ui-name="MiniChart.ScoreSemiDonut"]').first();

      expect(donut).toHaveAttribute('value', String(item.value));
      expect(semiDonut).toHaveAttribute('value', String(item.value));

      const donutCircles = await donut.locator('circle');
      const semiDonutCircles = await semiDonut.locator('circle');
      const donutCirclesCount = await donutCircles.count();
      const semiDonutCirclesCount = await semiDonutCircles.count();

      if (item.value === 0) {
        await test.step('Verify Donut', async () => {
          expect(donutCirclesCount).toEqual(1);

          expect(donutCircles.first()).toHaveAttribute('stroke-dashoffset', '0');
          // there's no more nth(1) circle when value = 0
          // expect(donutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset', '0');

          // const firstAttr = await donutCircles.nth(0).getAttribute('stroke-dasharray');
          // const secondAttr = await donutCircles.nth(1).getAttribute('stroke-dasharray');

          // const firstValues = firstAttr?.split(' ').map(parseFloat) || [];
          // const secondValues = secondAttr?.split(' ').map(parseFloat) || [];

          // expect(secondValues[0]).toBe(0);

          // expect(firstValues[0]).toBe(secondValues[1]);
        });

        await test.step('Verify SemiDonut', async () => {
          expect(semiDonutCirclesCount).toEqual(1);

          const firstAttr = await semiDonutCircles.nth(0).getAttribute('stroke-dasharray');
          const secondAttr = await semiDonutCircles.nth(1).getAttribute('stroke-dasharray');

          const firstValues = firstAttr?.split(' ').map(parseFloat) || [];
          const secondValues = secondAttr?.split(' ').map(parseFloat) || [];

          expect(secondValues[0]).toBe(0);

          expect(firstValues[0]).toBe(secondValues[1]);
          expect(semiDonutCircles.first()).toHaveAttribute('stroke-dashoffset', '0');
          expect(semiDonutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset', '0');
        });
      } else if (item.value > 0 && item.value < 100) {
        expect(donutCirclesCount).toEqual(2);
        expect(semiDonutCirclesCount).toEqual(2);

        expect(await donutCircles.nth(0).getAttribute('stroke-dashoffset')).not.toBeNull();
        expect(await donutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset');

        expect(await semiDonutCircles.nth(0).getAttribute('stroke-dashoffset')).not.toBeNull();
        expect(await semiDonutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset');
      } else if (item.value === 100) {
        await test.step('Verify Donut', async () => {
          expect(donutCirclesCount).toEqual(2);

          expect(donutCircles.first()).toHaveAttribute('stroke-dashoffset');
          expect(donutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset', '0');

          const firstAttr = await donutCircles.nth(0).getAttribute('stroke-dasharray');
          const secondAttr = await donutCircles.nth(1).getAttribute('stroke-dasharray');

          const firstValues = firstAttr?.split(' ').map(parseFloat) || [];
          const secondValues = secondAttr?.split(' ').map(parseFloat) || [];

          expect(firstValues[0]).toBe(0);

          expect(firstValues[1]).toBe(secondValues[1]);
        });

        await test.step('Verify SemiDonut', async () => {
          expect(semiDonutCirclesCount).toEqual(2);

          const firstAttr = await semiDonutCircles.nth(0).getAttribute('stroke-dasharray');
          const secondAttr = await semiDonutCircles.nth(1).getAttribute('stroke-dasharray');

          const firstValues = firstAttr?.split(' ').map(parseFloat) || [];
          const secondValues = secondAttr?.split(' ').map(parseFloat) || [];

          expect(firstValues[0]).toBe(0);

          expect(firstValues[1]).toBe(secondValues[1]);
          expect(semiDonutCircles.first()).toHaveAttribute('stroke-dashoffset');
          expect(semiDonutCircles.nth(1)).not.toHaveAttribute('stroke-dashoffset', '0');
        });
      }

      await expect(page).toHaveScreenshot();
    });
  });

  const LoadingScoreDonut = [
    { value: 33, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined },
  ];
  LoadingScoreDonut.forEach((item) => {
    test(`Verify loading=${item.loading} with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-donuts.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Visual-Score Lines', () => {
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
    test(`Verify without segments with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
      const valueBox = scoreLine.locator('[data-ui-name="Box"]').first();
      const widthStyle = await valueBox.evaluate((el) => el.style.width);

      expect(widthStyle).toBe(`${item.value}%`);

      await expect(page).toHaveScreenshot();
    });
  });

  const ScoreLineNoSegmentsLoading = [
    { value: 33, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined },
    { value: 100, loading: true, color: undefined, baseBgColor: undefined },
  ];
  ScoreLineNoSegmentsLoading.forEach((item) => {
    test(`Verify loading=${item.loading} without segments with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

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
    test(`Verify with ${item.segments} segments with value=${item.value} color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
      expect(scoreLine).toHaveAttribute('value', String(item.value));

      await expect(page).toHaveScreenshot();
    });
  });

  const ScoreLineWithSegmentsLoading = [
    { value: 3, segments: 10, loading: true, color: 'chart-palette-order-4', baseBgColor: undefined, animate: false },
  ];

  ScoreLineWithSegmentsLoading.forEach((item) => {
    test(`Verify loading=${item.loading} Score Lines with ${item.segments} segments with value=${item.value}  color=${item.color} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const scoreLine = page.locator('[data-ui-name="MiniChart.ScoreLine"]');
      expect(scoreLine).toHaveAttribute('value', String(item.value));

      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Visual-Score Lines Segments', () => {
  const ScoreLineNoSegments = [
    { value1: 0, value2: 0, color1: 'chart-palette-order-2', color2: 'chart-palette-order-3', baseBgColor: undefined, animate: false },
    { value1: 30, value2: 70, color1: 'chart-palette-order-2', color2: 'chart-palette-order-3', baseBgColor: undefined, animate: false },
    { value1: 0, color1: undefined, baseBgColor: 'chart-palette-order-14', animate: false },
    { value1: 0, value2: 100, color1: 'chart-palette-order-5', color2: 'chart-palette-order-16', baseBgColor: 'chart-palette-order-14', animate: false },

  ];
  ScoreLineNoSegments.forEach((item) => {
    test(`Verify with value1=${item.value1} value2=${item.value2} color1=${item.color1} color2=${item.color2} baseBgColor=${item.baseBgColor}`, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/score-line-segments.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Loading state', async ({ page }) => {
    const standPath = 'stories/components/mini-chart/tests/examples/score-line-segments.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { loading: true, animate: false });

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Visual-Trend Bars', () => {
  const TrendBars = [
    { loading: true, animate: false },
    { loading: false, animate: false },

  ];
  TrendBars.forEach((item) => {
    test(`Verify loading=${item.loading} `, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/trend-bars.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Visual-Trend Lines', () => {
  const TrendBars = [
    { lastPointRadius: undefined, lastPointColor: undefined, color: undefined, animate: false },
    { lastPointRadius: 5, lastPointColor: undefined, color: 'chart-palette-order-14', animate: false },
    { lastPointRadius: 0, lastPointColor: 'chart-palette-order-14', color: 'chart-palette-order-14', animate: false },
    { lastPointRadius: undefined, lastPointColor: 'chart-palette-order-4', color: undefined, animate: false },
    { lastPointRadius: 7, lastPointColor: 'chart-palette-order-6', color: 'chart-palette-order-9', animate: false },

  ];
  TrendBars.forEach((item) => {
    test(`VerifylastPointRadius=${item.lastPointRadius} lastPointColor=${item.lastPointColor} color=${item.color} `, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/trend-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  const TrendBarsLoading = [
    { loading: true, lastPointRadius: undefined, lastPointColor: undefined, color: undefined, animate: false },
    { loading: true, lastPointRadius: 7, lastPointColor: 'chart-palette-order-6', color: 'chart-palette-order-9', animate: false },

  ];
  TrendBarsLoading.forEach((item) => {
    test(`Verify loading with lastPointRadius=${item.lastPointRadius} lastPointColor=${item.lastPointColor} color=${item.color} `, async ({ page }) => {
      const standPath = 'stories/components/mini-chart/tests/examples/trend-lines.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });
});
