import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const BASIC_USAGE_STORY = 'stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx';
const TIME_AXIS_STORY = 'stories/components/d3-chart/docs/examples/d3-chart/reference-line.tsx';

export const locators = {
  chart: (page: Page) => page.locator('[data-ui-name="Chart.Line"]').first(),
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]').first(),
  dots: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Line.Dots"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page) => page.locator('[data-ui-name="Line.Tooltip"], [data-ui-name="HoverLine.Tooltip"]'),
  referenceLine: (page: Page) => page.locator('[data-ui-name="ReferenceLine"]'),
  referenceLineArea: (page: Page) => page.locator('path[fill$="-pattern)"]:not([value])'),
  referenceArea: (page: Page) => page.locator('path[fill$="-pattern)"][value]'),
  referenceShapes: (page: Page) => page.locator('path[fill$="-pattern)"]'),
  gradients: (page: Page) => page.locator('linearGradient[id$="-pattern"]'),
  plotText: (page: Page, text: string) => page.locator('svg[data-ui-name="Plot"] text', { hasText: text }),
};

const expectEachToBeHiddenFromA11y = async (locator: Locator) => {
  await expect(locator).not.toHaveCount(0);

  const exposed = await locator.evaluateAll((elements) =>
    elements
      .map((element, index) => (element.closest('[aria-hidden="true"]') ? null : index))
      .filter((index) => index !== null),
  );

  expect(exposed).toEqual([]);
};

/** SVG user-space box; WebKit's `boundingBox()` is unreliable for `<text>`. */
const getSvgBox = (locator: Locator) =>
  locator.evaluate((element) => {
    const { x, width } = (element as SVGGraphicsElement).getBBox();
    return { x, width };
  });

const getBox = async (locator: Locator) => {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Bounding box not found');
  return box;
};

/** Horizontal centre of the dot that sits on `x` of the first series. */
const dotCenterX = async (page: Page, x: number) => {
  const box = await getBox(locators.dots(page, x));
  return box.x + box.width / 2;
};

const RANGES = {
  left: [0, 3],
  middle: [8, 12],
  right: [16, 19],
} as const;

const SHORT_TITLE = 'Good';
const SUB_TITLE = '+10%';

type PairwiseCase = {
  name: string;
  use: 'neutral' | 'good' | 'bad' | 'insight';
  title: '' | typeof SHORT_TITLE;
  subTitle: '' | typeof SUB_TITLE;
  range: keyof typeof RANGES;
  line: 'off' | 'plain' | 'area40';
  lineValue?: number;
  width: 500 | 300;
};

/**
 * Pairwise set over use × title × subTitle × range × line × line position × plot width:
 * every pair of values meets in at least one case (13 cases instead of 864).
 */
const pairwiseCases: PairwiseCase[] = [
  { name: '#1 bad, middle, no titles', use: 'bad', title: '', subTitle: '', range: 'middle', line: 'off', width: 500 },
  { name: '#2 good, right, titles, line area inside', use: 'good', title: SHORT_TITLE, subTitle: SUB_TITLE, range: 'right', line: 'area40', lineValue: 18, width: 500 },
  { name: '#3 insight, left, titles, plain line outside, narrow', use: 'insight', title: SHORT_TITLE, subTitle: SUB_TITLE, range: 'left', line: 'plain', lineValue: 10, width: 300 },
  { name: '#4 neutral, right, title, narrow', use: 'neutral', title: SHORT_TITLE, subTitle: '', range: 'right', line: 'off', width: 300 },
  { name: '#5 neutral, middle, subTitle only, plain line inside', use: 'neutral', title: '', subTitle: SUB_TITLE, range: 'middle', line: 'plain', lineValue: 10, width: 500 },
  { name: '#6 insight, middle, title, line area outside, narrow', use: 'insight', title: SHORT_TITLE, subTitle: '', range: 'middle', line: 'area40', lineValue: 4, width: 300 },
  { name: '#7 good, left, no titles, plain line inside, narrow', use: 'good', title: '', subTitle: '', range: 'left', line: 'plain', lineValue: 1, width: 300 },
  { name: '#8 bad, left, titles, line area inside', use: 'bad', title: SHORT_TITLE, subTitle: SUB_TITLE, range: 'left', line: 'area40', lineValue: 1, width: 500 },
  { name: '#9 neutral, left, titles', use: 'neutral', title: SHORT_TITLE, subTitle: SUB_TITLE, range: 'left', line: 'off', width: 500 },
  { name: '#10 bad, right, title, plain line outside, narrow', use: 'bad', title: SHORT_TITLE, subTitle: '', range: 'right', line: 'plain', lineValue: 6, width: 300 },
  { name: '#11 insight, right, no titles', use: 'insight', title: '', subTitle: '', range: 'right', line: 'off', width: 500 },
  { name: '#12 good, middle, titles, narrow', use: 'good', title: SHORT_TITLE, subTitle: SUB_TITLE, range: 'middle', line: 'off', width: 300 },
  { name: '#13 neutral, left, subTitle only, line area outside', use: 'neutral', title: '', subTitle: SUB_TITLE, range: 'left', line: 'area40', lineValue: 10, width: 500 },
];

const toStoryProps = (c: PairwiseCase) => ({
  duration: 0,
  useExplicitPlotWidth: true,
  plotWidth: c.width,
  withReferenceArea: true,
  referenceAreaStart: RANGES[c.range][0],
  referenceAreaEnd: RANGES[c.range][1],
  referenceAreaUse: c.use,
  referenceAreaTitle: c.title,
  referenceAreaSubTitle: c.subTitle,
  withReferenceLine: c.line !== 'off',
  ...(c.lineValue !== undefined ? { referenceLineValue: c.lineValue } : {}),
  ...(c.line === 'area40' ? { referenceLineArea: 40 } : {}),
});

const expectLineAreaWidth = async (page: Page, area: number) => {
  const areaBox = await getBox(locators.referenceLineArea(page));
  const lineBox = await getBox(locators.referenceLine(page).locator('line').nth(1));

  expect(Math.abs(areaBox.width - area)).toBeLessThanOrEqual(1);
  expect(Math.abs(areaBox.x + areaBox.width / 2 - (lineBox.x + lineBox.width / 2))).toBeLessThanOrEqual(1);
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  pairwiseCases.forEach((c) => {
    test(`Verify reference pairwise ${c.name}`, {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BASIC_USAGE_STORY, 'en', toStoryProps(c));
      await locators.plot(page).waitFor({ state: 'visible' });

      if (c.line === 'plain') {
        await test.step('Reference line without area renders no area shape', async () => {
          await expect(locators.referenceLine(page)).toHaveCount(1);
          await expect(locators.referenceLineArea(page)).toHaveCount(0);
        });
      }

      await test.step('Verify chart with reference renders correctly', async () => {
        await expect(locators.chart(page)).toHaveScreenshot();
      });
    });
  });

  test('Verify reference line with area 52', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineArea: 52,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Area is 52px wide and centred on the line', async () => {
      await expectLineAreaWidth(page, 52);
    });

    await test.step('Verify chart with reference line renders correctly', async () => {
      await expect(locators.chart(page)).toHaveScreenshot();
    });
  });

  test('Verify several reference lines passed as an array', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineCount: 3,
      referenceLineArea: 40,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Every line is rendered with its own area', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(3);
      await expect(locators.referenceLineArea(page)).toHaveCount(3);
    });

    await test.step('Every area has its own gradient', async () => {
      const ids = await locators.gradients(page).evaluateAll((elements) => elements.map((gradient) => gradient.id));

      expect(ids).toHaveLength(3);
      expect(new Set(ids).size).toBe(3);
    });

    await test.step('Verify chart with several reference lines renders correctly', async () => {
      await expect(locators.chart(page)).toHaveScreenshot();
    });
  });

  test('Verify reference line and area on a time axis', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart'],
  }, async ({ page }) => {
    await loadPage(page, TIME_AXIS_STORY, 'en');
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Date values render both lines and the area', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(2);
      await expect(locators.referenceLineArea(page)).toHaveCount(1);
      await expect(locators.referenceArea(page)).toHaveCount(1);
    });

    await test.step('No reference geometry has NaN', async () => {
      const ds = await locators.referenceShapes(page).evaluateAll((paths) =>
        paths.map((path) => path.getAttribute('d') ?? ''),
      );

      expect(ds.filter((d) => d.includes('NaN'))).toEqual([]);
    });

    await test.step('Area texts are rendered', async () => {
      await expect(locators.plotText(page, 'Wow!')).toHaveCount(1);
      await expect(locators.plotText(page, SUB_TITLE)).toHaveCount(1);
    });

    await test.step('Verify time axis chart with references renders correctly', async () => {
      await expect(locators.chart(page)).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify no reference is rendered without reference props', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', { duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await expect(locators.referenceLine(page)).toHaveCount(0);
    await expect(locators.referenceShapes(page)).toHaveCount(0);
    await expect(locators.gradients(page)).toHaveCount(0);
  });

  [40, 52].forEach((area) => {
    test(`Verify reference line with area ${area}`, {
      tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BASIC_USAGE_STORY, 'en', {
        duration: 0,
        withReferenceLine: true,
        referenceLineArea: area,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Line and its area are rendered', async () => {
        await expect(locators.referenceLine(page)).toHaveCount(1);
        await expect(locators.referenceLineArea(page)).toHaveCount(1);
      });

      await test.step(`Area is ${area}px wide and centred on the line`, async () => {
        await expectLineAreaWidth(page, area);
      });

      await test.step('Bottom notch is hidden when area is set', async () => {
        await expect(locators.referenceLine(page).locator('line')).toHaveCount(2);
      });
    });
  });

  test('Verify reference line without area renders only the line', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', { duration: 0, withReferenceLine: true });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Line keeps both notches', async () => {
      await expect(locators.referenceLine(page).locator('line')).toHaveCount(3);
    });

    await test.step('No area shape is rendered', async () => {
      await expect(locators.referenceLineArea(page)).toHaveCount(0);
    });

    await test.step('No path in the plot has NaN in its geometry', async () => {
      const ds = await locators.plot(page).locator('path').evaluateAll((paths) =>
        paths.map((path) => path.getAttribute('d') ?? ''),
      );

      expect(ds.filter((d) => d.includes('NaN'))).toEqual([]);
    });
  });

  test('Verify reference area spans from start to end value', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceArea: true,
      referenceAreaStart: 8,
      referenceAreaEnd: 12,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    const narrow = await getBox(locators.referenceArea(page));

    await test.step('Area edges match the x positions of start and end points', async () => {
      expect(Math.abs(narrow.x - (await dotCenterX(page, 8)))).toBeLessThanOrEqual(1);
      expect(Math.abs(narrow.x + narrow.width - (await dotCenterX(page, 12)))).toBeLessThanOrEqual(1);
    });

    await test.step('Doubling the range doubles the area width', async () => {
      await loadPage(page, BASIC_USAGE_STORY, 'en', {
        duration: 0,
        withReferenceArea: true,
        referenceAreaStart: 8,
        referenceAreaEnd: 16,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      const wide = await getBox(locators.referenceArea(page));
      expect(Math.abs(wide.width - narrow.width * 2)).toBeLessThanOrEqual(1);
    });
  });

  ([
    ['neutral', 'gray-50'],
    ['good', 'green-50'],
    ['bad', 'red-50'],
    ['insight', 'violet-50'],
  ] as const).forEach(([use, token]) => {
    test(`Verify reference area gradient color for use=${use}`, {
      tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BASIC_USAGE_STORY, 'en', {
        duration: 0,
        withReferenceArea: true,
        referenceAreaUse: use,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      const stops = locators.gradients(page).locator('stop');
      await expect(stops).not.toHaveCount(0);

      const colors = await stops.evaluateAll((elements) => elements.map((stop) => stop.getAttribute('stop-color')));
      colors.forEach((color) => {
        expect(color).toContain(`var(--${token}, `);
      });
    });
  });

  test('Verify reference gradients have unique ids', {
    tag: [TAG.PRIORITY_HIGH, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineArea: 40,
      withReferenceArea: true,
      referenceAreaUse: 'bad',
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    const ids = await locators.gradients(page).evaluateAll((elements) => elements.map((gradient) => gradient.id));

    await test.step('Line and area each have their own gradient', async () => {
      expect(ids).toHaveLength(2);
      expect(new Set(ids).size).toBe(ids.length);
    });

    await test.step('No gradient id is built from an undefined uid', async () => {
      expect(ids.filter((id) => id.startsWith('undefined'))).toEqual([]);
    });

    await test.step('Every reference shape points to an existing gradient', async () => {
      const fills = await locators.referenceShapes(page).evaluateAll((paths) =>
        paths.map((path) => path.getAttribute('fill')),
      );

      expect(fills).toHaveLength(2);
      fills.forEach((fill) => {
        expect(ids.map((id) => `url(#${id})`)).toContain(fill);
      });
    });
  });

  ([
    { title: '', subTitle: '' },
    { title: SHORT_TITLE, subTitle: '' },
    { title: '', subTitle: SUB_TITLE },
    { title: SHORT_TITLE, subTitle: SUB_TITLE },
  ]).forEach(({ title, subTitle }) => {
    test(`Verify reference area texts: title="${title}" subTitle="${subTitle}"`, {
      tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BASIC_USAGE_STORY, 'en', {
        duration: 0,
        withReferenceArea: true,
        referenceAreaStart: 8,
        referenceAreaEnd: 12,
        referenceAreaTitle: title,
        referenceAreaSubTitle: subTitle,
      });
      await locators.plot(page).waitFor({ state: 'visible' });

      const area = await getSvgBox(locators.referenceArea(page));

      for (const [text, isSet] of [[SHORT_TITLE, Boolean(title)], [SUB_TITLE, Boolean(subTitle)]] as const) {
        await test.step(`"${text}" is ${isSet ? 'rendered inside the area' : 'not rendered'}`, async () => {
          const node = locators.plotText(page, text);

          if (!isSet) {
            await expect(node).toHaveCount(0);
            return;
          }

          await expect(node).toHaveCount(1);
          const box = await getSvgBox(node);
          expect(box.x).toBeGreaterThanOrEqual(area.x);
          expect(box.x).toBeLessThan(area.x + area.width);
        });
      }
    });
  });

  test('Verify reference shapes are hidden from assistive technology', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.ACCESSIBILITY, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineArea: 40,
      withReferenceArea: true,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('Reference line is hidden', async () => {
      await expectEachToBeHiddenFromA11y(locators.referenceLine(page));
    });

    await test.step('Reference area is hidden', async () => {
      await expectEachToBeHiddenFromA11y(locators.referenceArea(page));
    });

    await test.step('Reference line area is hidden', async () => {
      await expectEachToBeHiddenFromA11y(locators.referenceLineArea(page));
    });
  });

  test('Verify tooltip appears when hovering inside the reference area', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineValue: 10,
      referenceLineArea: 40,
      withReferenceArea: true,
      referenceAreaStart: 8,
      referenceAreaEnd: 12,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    const area = await getBox(locators.referenceArea(page));
    await page.mouse.move(area.x + area.width / 4, area.y + area.height / 2);

    await expect(locators.tooltip(page)).toBeVisible();
  });

  test('Verify reference elements are not focusable', {
    tag: [TAG.PRIORITY_LOW, TAG.KEYBOARD, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_USAGE_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineArea: 40,
      withReferenceArea: true,
      referenceAreaTitle: SHORT_TITLE,
    });
    await locators.plot(page).waitFor({ state: 'visible' });

    const focusable = await page
      .locator('[data-ui-name="ReferenceLine"], [data-ui-name="ReferenceLine"] *, path[fill$="-pattern)"], svg[data-ui-name="Plot"] text')
      .evaluateAll((elements) => elements.filter((element) => element.hasAttribute('tabindex')).length);

    expect(focusable).toBe(0);
  });

  test('Verify a single-item array renders like a single reference line', {
    tag: [TAG.PRIORITY_MEDIUM, '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    const props = { duration: 0, withReferenceLine: true, referenceLineValue: 10, referenceLineArea: 40 };

    await loadPage(page, BASIC_USAGE_STORY, 'en', props);
    await locators.plot(page).waitFor({ state: 'visible' });
    const objectArea = await getBox(locators.referenceLineArea(page));

    await loadPage(page, BASIC_USAGE_STORY, 'en', { ...props, referenceLineCount: 1 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await test.step('One line and one area are rendered', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(1);
      await expect(locators.referenceLineArea(page)).toHaveCount(1);
    });

    await test.step('Area has the same position and size', async () => {
      const arrayArea = await getBox(locators.referenceLineArea(page));

      expect(Math.abs(arrayArea.x - objectArea.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(arrayArea.width - objectArea.width)).toBeLessThanOrEqual(1);
    });
  });
});
