import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]'),
  line: (page: Page, index?: number) => {
    const base = page.locator('line');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dots: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Line.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  lineNull: (page: Page) => page.locator('[data-ui-name="Line.Null"]'),
  group: (page: Page, index?: number) => {
    const base = page.locator('g');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  legend: (page: Page) => page.getByLabel('Chart legend'),
  legendItem: (page: Page, text?: string) =>
    text ? page.getByText(text) : page.locator('[data-ui-name="LegendFlex.LegendItem"]'),
  checkbox: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Checkbox"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="Line.Tooltip"], [data-ui-name="HoverLine.Tooltip"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify hoverLine works well', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/hover-line.tsx',
      'en',
    );

    await test.step('Verify hover line appears on mouse move', async () => {
      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });

      const box = await chart.boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 128.42;
      const targetY = 190.53;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      const lines = locators.line(page);
      const count = await lines.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const line = lines.nth(i);
        await expect(line.first()).toHaveAttribute('aria-hidden', 'true');
      }
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify interpolation renders correctly when dots can be hovered', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/interpolation.tsx',
      'en',
    );
    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await test.step('Verify tooltip on dot hover', async () => {
      await locators.dots(page, 4).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  const variables = [
    {
      name: 'All features enabled, standard size',
      plotWidth: 500,
      plotHeight: 300,
      marginX: 40,
      marginY: 40,
      showXAxis: true,
      showYAxis: true,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: true,
      showLegend: true,
      showDots: true,
      patterns: false,
      duration: 0,
    },
    {
      name: 'Large size, minimal margins, no axes',
      plotWidth: 700,
      plotHeight: 400,
      marginX: 20,
      marginY: 20,
      showXAxis: false,
      showYAxis: false,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: false,
      showLegend: true,
      showDots: false,
      patterns: true,
      duration: 0,
    },
    {
      name: 'Inverted axis, small size, no tooltip',
      plotWidth: 400,
      plotHeight: 250,
      marginX: 60,
      marginY: 60,
      showXAxis: true,
      showYAxis: false,
      invertAxis: true,
      showTooltip: false,
      showTotalInTooltip: false,
      showLegend: false,
      showDots: true,
      patterns: false,
      duration: 0,
    },
    {
      name: 'Inverted, large margins, patterns',
      plotWidth: 600,
      plotHeight: 350,
      marginX: 80,
      marginY: 50,
      showXAxis: false,
      showYAxis: true,
      invertAxis: true,
      showTooltip: true,
      showTotalInTooltip: true,
      showLegend: false,
      showDots: false,
      patterns: true,
      duration: 0,
    },
    {
      name: ' Minimal features, medium size',
      plotWidth: 450,
      plotHeight: 280,
      marginX: 30,
      marginY: 70,
      showXAxis: true,
      showYAxis: true,
      invertAxis: false,
      showTooltip: false,
      showTotalInTooltip: true,
      showLegend: true,
      showDots: false,
      patterns: true,
      duration: 0,
    },
    {
      name: ' No legend, mixed features',
      plotWidth: 550,
      plotHeight: 320,
      marginX: 45,
      marginY: 35,
      showXAxis: true,
      showYAxis: false,
      invertAxis: false,
      showTooltip: true,
      showTotalInTooltip: false,
      showLegend: false,
      showDots: true,
      patterns: false,
      duration: 0,
    },
  ];

  variables.forEach((vars) => {
    test(`Verify line chart with config ${vars.name}`, {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
        'en',
        vars,
      );
      await locators.plot(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      if (!vars.showTooltip) {
        await test.step('Verify chart renders correctly', async () => {
          await expect(page).toHaveScreenshot();
        });
      } else if (vars.showTooltip) {
        await test.step('Verify tooltip appears on hover', async () => {
          const chart = locators.plot(page).first();
          const box = await chart.boundingBox();
          if (box) {
            await page.mouse.move(box.x + 50, box.y + 50);
          }

          const tooltip = locators.tooltip(page);
          await tooltip.waitFor({ state: 'visible' });
          await expect(tooltip).toBeVisible();
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });

  test('Verify render and interactions with Line and Dots', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/line.tsx',
      'en',
    );

    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    await test.step('Verify renders correctly', async () => {
      await locators.dots(page, 4).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify area with empty line renders and looks good', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/line-area-with-empty.tsx',
      'en',
    );

    await test.step('Verify renders correctly', async () => {
      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify area default props looks good', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/line-with-area.tsx',
      'en',
    );

    await test.step('Verify renders correctly', async () => {
      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify curve prop', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/curve.tsx',
      'en',
    );

    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await test.step('Verify tooltip shown correctly with dots', async () => {
      const box = await chart.first().boundingBox();
      if (!box) throw new Error('Bounding box not found');

      const targetX = 50;
      const targetY = 50;

      const hoverX = box.x + targetX;
      const hoverY = box.y + targetY;

      await page.mouse.move(hoverX, hoverY);

      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify dots partial display', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/dots-display-function.tsx',
      'en',
    );

    await test.step('Verify dots render partly', async () => {
      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify time scale with tooltip', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/time.tsx',
      'en',
    );

    await test.step('Verify chart with time scale renders correctly', async () => {
      const chart = locators.plot(page).first();
      await chart.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shows formatted date on hover', async () => {
      const chart = locators.plot(page).first();
      const box = await chart.boundingBox();
      if (box) {
        await page.mouse.move(box.x + 50, box.y + 50);
      }

      const tooltip = locators.tooltip(page);
      await tooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom tooltip', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/tooltip.tsx',
      'en',
    );
    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await test.step('Verify custom tooltip appears on hover', async () => {
      const chart = locators.plot(page).first();
      const box = await chart.boundingBox();
      if (box) {
        await page.mouse.move(box.x + 50, box.y + 50);
      }

      const tooltip = locators.tooltip(page);
      await tooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify patterns and symbols for dots mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/legend-and-symbols-for-dots.tsx',
      'en',
    );

    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await test.step('Verify highlights when hover the checkbox', async () => {
      await locators.checkbox(page, 1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not highlights when hover unchecked checkbox', async () => {
      await locators.checkbox(page, 1).click();
      await locators.checkbox(page, 1).hover();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify patterns and symbols for dots keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/legend-and-symbols-for-dots.tsx',
      'en',
    );
    const chart = locators.plot(page).first();
    await chart.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    await test.step('Verify highlights when focus the checkbox', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlights when check and uncheck the checkbox', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlights focus next checkbox', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
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
  test('Verify duration props applies to all lines inside the chart', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/docs/examples/line-chart/line.tsx',
      'en',
    );

    await test.step('Verify duration attribute on groups', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      await expect(locators.group(page, 0)).toHaveAttribute('duration', '500ms');
    });
  });

  test('Verify Line.Null attributes', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/line-area-with-empty.tsx',
      'en',
    );

    await test.step('Verify Line.Null aria-hidden attribute', async () => {
      await locators.plot(page).first().waitFor({ state: 'visible' });

      const nullLine = locators.lineNull(page);
      await expect(nullLine).toHaveAttribute('aria-hidden', 'true');
    });
  });

  /* -----------------------------------------------------
  Responsiveness — high-level Chart.* are now responsive by default.
  plotWidth/plotHeight are optional: when omitted the chart fills its parent
  and auto-derives the plot size. `aspect` sets height = width / aspect,
  `hMin`/`hMax` clamp it, `onResize` reports the measured size. We assert on
  the svg[data-ui-name="Plot"] width/height attributes (the plot size actually
  used) plus the story's data-testid="responsive-size" readout.
  ----------------------------------------------------- */
  test.describe('responsiveness', () => {
    const STORY = 'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx';

    const readPlotSize = async (page: Page) => {
      const plot = locators.plot(page).first();
      await plot.waitFor({ state: 'visible' });
      const width = Number(await plot.getAttribute('width'));
      const height = Number(await plot.getAttribute('height'));
      return { width, height };
    };

    test('Verify chart auto-sizes to its container and aspect derives the height', {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive'],
    }, async ({ page }) => {
      await test.step('Without plotWidth/plotHeight the Plot renders with a measured (non-zero) size', async () => {
        // useExplicitPlotWidth is false by default - chart receives no plotWidth/plotHeight.
        await loadPage(page, STORY, 'en');
        await page.waitForTimeout(500);

        const { width, height } = await readPlotSize(page);
        expect(width).toBeGreaterThan(0);
        expect(height).toBeGreaterThan(0);
      });

      await test.step('With aspect the Plot height equals width / aspect, and onResize reports the size', async () => {
        await loadPage(page, STORY, 'en', { aspect: 2 });
        await page.waitForTimeout(500);

        const { width, height } = await readPlotSize(page);
        expect(width).toBeGreaterThan(0);
        expect(Math.abs(height - width / 2)).toBeLessThanOrEqual(2);

        await expect(page.getByTestId('responsive-size')).toHaveText(
          /Measured plot size: [1-9]\d* x [1-9]\d*/,
        );
      });
    });

    test('Verify hMin clamps the aspect-derived height to the minimum', {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive'],
    }, async ({ page }) => {
      // aspect 10 -> computed height (~width/10) is well below 120, so hMin must clamp it
      await loadPage(page, STORY, 'en', { aspect: 10, hMin: 120 });
      await page.waitForTimeout(500);

      await test.step('Plot height is clamped up to hMin', async () => {
        const { height } = await readPlotSize(page);
        expect(Math.abs(height - 120)).toBeLessThanOrEqual(1);
      });
    });

    test('Verify hMax clamps the aspect-derived height to the maximum', {
      tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart', '@responsive'],
    }, async ({ page }) => {
      // aspect 0.5 -> computed height (~2*width) is well above 180, so hMax must clamp it
      await loadPage(page, STORY, 'en', { aspect: 0.5, hMax: 180 });
      await page.waitForTimeout(500);

      await test.step('Plot height is clamped down to hMax', async () => {
        const { height } = await readPlotSize(page);
        expect(Math.abs(height - 180)).toBeLessThanOrEqual(1);
      });
    });

    test('Verify explicit plotWidth takes priority over container measurement', {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive'],
    }, async ({ page }) => {
      // useExplicitPlotWidth passes plotWidth straight to the chart; the 500px Box is ignored for width
      await loadPage(page, STORY, 'en', { useExplicitPlotWidth: true, plotWidth: 250 });
      await page.waitForTimeout(500);

      await test.step('Plot width equals the explicit plotWidth, not the container width', async () => {
        const { width } = await readPlotSize(page);
        expect(width).toBe(250);
      });
    });
  });
});
