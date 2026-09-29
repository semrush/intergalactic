import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const expectEachToBeHiddenFromA11y = async (locator: Locator) => {
  await expect(locator).not.toHaveCount(0);

  const exposed = await locator.evaluateAll((elements) =>
    elements
      .map((element, index) => (element.closest('[aria-hidden="true"]') ? null : index))
      .filter((index) => index !== null),
  );

  expect(exposed).toEqual([]);
};

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

const BASIC_USAGE_STORY = 'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx';

/** Hovers the middle of the plot, which lands on some point of the series. */
const hoverPlotCentre = async (page: Page) => {
  const plot = locators.plot(page).first();
  await plot.waitFor({ state: 'visible' });

  const box = await plot.boundingBox();
  if (!box) throw new Error('Plot bounding box not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
};

const hoverFirstPoint = async (page: Page) => {
  const plot = locators.plot(page).first();
  await plot.waitFor({ state: 'visible' });

  const dot = await locators.dots(page, 0).boundingBox();
  if (!dot) throw new Error('First dot bounding box not found');

  await page.mouse.move(dot.x + dot.width / 2, dot.y + dot.height / 2);
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

      await expectEachToBeHiddenFromA11y(locators.line(page));
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
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box'],
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
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@typography'],
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
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend'],
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
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@chart-legend'],
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

  /**
   * The redesign's three data-level decorations in one shot: the dashed forecast tail, the
   * gradient-filled potential tail, and the highlight rings.
   *
   * The functional tests next door already assert the wiring — that the dash attribute is
   * there and that the gradient reference resolves to a real `linearGradient`. What no
   * attribute can say is whether the gradient actually paints a visible ramp, whether the
   * dash rhythm reads as a forecast, and whether the ring sits concentric with its dot.
   * That is what this baseline is for.
   *
   * Deliberately one test rather than three, so the branch gains 3 PNGs instead of 9.
   */
  test('Verify forecast, potential and highlighted dots render', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
      'en',
      { dataType: 'both', highlightDots: 'mixed', duration: 0 },
    );
    await locators.plot(page).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot();
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

  /**
   * Guards the redesign value rather than just letting the screenshots carry it: the data
   * line went from 3 to 2. Snapshots do notice a change in line weight, but only as pixels
   * that moved, and this branch regenerated 427 of them at once — exactly the setting in
   * which a wrong stroke width gets baked into the baselines unnoticed.
   *
   * `stroke-width: 2` in the stylesheet is unitless, which in SVG means user units. The
   * Plot carries no viewBox, so one user unit is one pixel and `toHaveCSS` reads back
   * '2px'.
   *
   * Asserted on every line, not just the first: the forecast and potential segments added
   * by the redesign are separate `SLine` paths, and they have to keep the same weight as
   * the main line or the series visibly changes thickness partway along.
   */
  test('Verify data line stroke width is 2px', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
      'en',
      { dataType: 'both' },
    );
    await locators.plot(page).first().waitFor({ state: 'visible' });

    const lines = page.locator('path[data-ui-name="Line"]');
    await expect(lines).not.toHaveCount(0);

    for (let i = 0; i < (await lines.count()); i++) {
      await expect(lines.nth(i)).toHaveCSS('stroke-width', '2px');
    }
  });

  /**
   * `DATA_TYPE` markers pull points out of the main line into their own segments
   * (`Line.renderForecast` / `Line.renderPotential`), which is what lets them be dashed
   * while the rest of the series stays solid.
   *
   * The point count is the part worth asserting: it is the only thing that distinguishes
   * "the tail was moved into its own path" from "the tail is drawn twice, once in the main
   * path and once on top of it". The two look identical in a screenshot.
   *
   * Only the dash is checked on the forecast segment, not its colour — see the note on
   * `renderForecast` about the gradient it defines but never references.
   */
  test('Verify forecast and potential render as separate dashed segments', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
      'en',
      { dataType: 'both', duration: 0 },
    );
    await locators.plot(page).first().waitFor({ state: 'visible' });

    const lines = page.locator('svg[data-ui-name="Plot"] path');

    await test.step('Each series renders a main, a forecast and a potential path', async () => {
      // Two series in the story dataset, three paths each.
      await expect(lines).toHaveCount(6);
    });

    await test.step('The tail segments are dashed and the main line is not', async () => {
      const dashed = await lines.evaluateAll((paths) =>
        paths.map((path) => path.getAttribute('stroke-dasharray')),
      );

      expect(dashed.filter((value) => value === '4 4')).toHaveLength(4);
      expect(dashed.filter((value) => value === null)).toHaveLength(2);
    });

    await test.step('The main line stops before the tail instead of drawing it twice', async () => {
      // The generator is curveLinear, so `d` is "M x,y L x,y …" and the number of `L`
      // commands is one less than the number of points on that path.
      const pointCounts = await lines.evaluateAll((paths) =>
        paths
          .map((path) => path.getAttribute('d'))
          .filter((d): d is string => Boolean(d))
          .map((d) => (d.match(/L/g)?.length ?? 0) + 1),
      );

      expect(pointCounts.filter((count) => count === 15)).toHaveLength(2);
      expect(pointCounts.filter((count) => count === 3)).toHaveLength(2);
      expect(pointCounts.filter((count) => count === 4)).toHaveLength(2);
    });
  });

  /**
   * The potential segment is the one place in Line that paints with a gradient rather than
   * the series colour, so the reference has to resolve — a typo in the id would leave the
   * path silently unpainted, which a screenshot shows as "the line is missing" without
   * saying why.
   *
   * The id is built from a generated `uid`, so it cannot be hardcoded: the reference is
   * read off the path and the gradient is then looked up by it.
   */
  test('Verify the potential segment is painted by a gradient that exists', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx',
      'en',
      { dataType: 'potential', duration: 0 },
    );
    await locators.plot(page).first().waitFor({ state: 'visible' });

    const potential = page
      .locator('svg[data-ui-name="Plot"] path[stroke-dasharray="4 4"][d]')
      .first();
    const stroke = await potential.evaluate((el) => getComputedStyle(el).stroke);

    expect(stroke).toMatch(/^url\(".*-potential-gradient-line"\)$/);

    const gradientId = stroke.slice('url("#'.length, -'")'.length);
    await expect(page.locator(`linearGradient[id="${gradientId}"]`)).toHaveCount(1);
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

  test('Verify Line.Null is painted with the null-series palette colour', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/d3-chart/tests/examples/line-chart/line-area-with-empty.tsx',
      'en',
    );
    await locators.plot(page).first().waitFor({ state: 'visible' });

    await expect(locators.lineNull(page).first()).toHaveCSS('stroke', 'oklch(0.9 0.002 177)');
    await expect(locators.lineNull(page).first()).toHaveCSS('stroke-dasharray', '4px');
  });

  test('Verify interpolated points are dropped from the series without breaking it', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', { withInterpolatedGaps: true, duration: 0 });
    await locators.plot(page).first().waitFor({ state: 'visible' });

    const lines = page.locator('path[data-ui-name="Line"]');
    await expect(lines).toHaveCount(2);

    const pointCounts = await lines.evaluateAll((paths) =>
      paths
        .map((path) => path.getAttribute('d'))
        .filter((d): d is string => Boolean(d))
        .map((d) => (d.match(/L/g)?.length ?? 0) + 1),
    );

    await test.step('The untouched series keeps all 20 points', async () => {
      expect(pointCounts).toContain(20);
    });

    await test.step('The gapped series is short by exactly the three marked points', async () => {
      // A gap drops the point from the path; the line closes over it rather than breaking,
      // so this stays a single path of 17 points instead of several segments.
      expect(pointCounts).toContain(17);
    });

    await test.step('No gap leaks into the geometry as NaN', async () => {
      const ds = await lines.evaluateAll((paths) => paths.map((path) => path.getAttribute('d') ?? ''));

      expect(ds.filter((d) => d.includes('NaN'))).toEqual([]);
    });
  });

  /* -----------------------------------------------------
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
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive', '@base-components', '@flex-box'],
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
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive', '@base-components', '@flex-box'],
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
      tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart', '@responsive', '@base-components', '@flex-box'],
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
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@responsive', '@base-components', '@flex-box'],
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
