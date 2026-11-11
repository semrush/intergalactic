import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { BAR_STORY, locators as barLocators } from './bar-chart.helpers';

const locators = {
  ...barLocators,
  chart: (page: Page) => page.locator('[data-ui-name="Chart.Bar"]').first(),
  referenceLine: (page: Page) => page.locator('[data-ui-name="ReferenceLine"]'),
  referenceArea: (page: Page) => page.locator('path[fill$="-pattern)"][value]'),
  referenceShapes: (page: Page) => page.locator('path[fill$="-pattern)"]'),
  plotText: (page: Page, text: string) => page.locator('svg[data-ui-name="Plot"] text', { hasText: text }),
};

const getBox = async (locator: Locator) => {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Bounding box not found');
  return box;
};

/** x of the main (middle) line of a reference line. */
const lineX = async (line: Locator) => {
  const box = await getBox(line.locator('line').nth(1));
  return box.x + box.width / 2;
};

const TITLE = 'Campaign';
const SUB_TITLE = '+10%';

type PairwiseCase = {
  name: string;
  reference: 'line' | 'lineArea' | 'area' | 'lines';
  use: 'neutral' | 'good' | 'bad' | 'insight';
  title: '' | typeof TITLE;
  subTitle: '' | typeof SUB_TITLE;
};

/**
 * Vertical only: each reference kind, area use, title and subTitle value appears in at least one case.
 * Horizontal reference is out of scope for now.
 */
const pairwiseCases: PairwiseCase[] = [
  { name: '#1 vertical, line', reference: 'line', use: 'neutral', title: '', subTitle: '' },
  { name: '#2 vertical, line with area, good area, titles', reference: 'lineArea', use: 'good', title: TITLE, subTitle: SUB_TITLE },
  { name: '#3 vertical, bad area, title', reference: 'area', use: 'bad', title: TITLE, subTitle: '' },
  { name: '#4 vertical, 3 lines, insight area, subTitle', reference: 'lines', use: 'insight', title: '', subTitle: SUB_TITLE },
];

const toStoryProps = (c: PairwiseCase) => ({
  duration: 0,
  withReferenceLine: c.reference !== 'area',
  ...(c.reference === 'lineArea' ? { referenceLineArea: 40 } : {}),
  ...(c.reference === 'lines' ? { referenceLineCount: 3 } : {}),
  withReferenceArea: c.reference !== 'line' || c.title !== '' || c.subTitle !== '',
  referenceAreaUse: c.use,
  referenceAreaTitle: c.title,
  referenceAreaSubTitle: c.subTitle,
});

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  pairwiseCases.forEach((c) => {
    test(`Verify bar chart reference pairwise ${c.name}`, {
      tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_STORY, 'en', toStoryProps(c));
      await locators.plot(page).waitFor({ state: 'visible' });

      await test.step('Verify chart with reference renders correctly', async () => {
        await expect(locators.chart(page)).toHaveScreenshot(`bar-reference-${c.name.split(' ')[0].slice(1)}.png`);
      });
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
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0 });
    await locators.plot(page).waitFor({ state: 'visible' });

    await expect(locators.referenceLine(page)).toHaveCount(0);
    await expect(locators.referenceShapes(page)).toHaveCount(0);
  });

  test('Verify vertical reference line sits on the category centre', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0, withReferenceLine: true, referenceLineCategory: 'Category 2' });

    await test.step('Verify the line x equals the centre of the Category 2 bar', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(1);
      const bar = await getBox(locators.groupBarBar(page, 2));

      expect(Math.abs(await lineX(locators.referenceLine(page)) - (bar.x + bar.width / 2))).toBeLessThanOrEqual(1);
    });
  });

  test('Verify chart renders every reference line from an array', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0, withReferenceLine: true, referenceLineCount: 3 });

    await test.step('Verify 3 lines at 3 different positions', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(3);

      const positions = await Promise.all([0, 1, 2].map((index) => lineX(locators.referenceLine(page).nth(index))));
      expect(new Set(positions.map(Math.round)).size).toBe(3);
    });
  });

  test('Verify single-item array renders like a single reference line', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', { duration: 0, withReferenceLine: true });
    const single = await lineX(locators.referenceLine(page));

    await loadPage(page, BAR_STORY, 'en', { duration: 0, withReferenceLine: true, referenceLineCount: 1 });

    await test.step('Verify one line at the same position', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(1);
      expect(await lineX(locators.referenceLine(page))).toBeCloseTo(single, 0);
    });
  });

  test('Verify vertical reference area spans from the start to the end category', {
    tag: [TAG.PRIORITY_HIGH, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceArea: true,
      referenceAreaStartCategory: 'Category 0',
      referenceAreaEndCategory: 'Category 4',
    });

    await test.step('Verify area edges match the centres of the first and the last bar', async () => {
      const area = await getBox(locators.referenceArea(page));
      const first = await getBox(locators.groupBarBar(page, 0));
      const last = await getBox(locators.groupBarBar(page, 4));

      expect(Math.abs(area.x - (first.x + first.width / 2))).toBeLessThanOrEqual(1);
      expect(Math.abs(area.x + area.width - (last.x + last.width / 2))).toBeLessThanOrEqual(1);
    });
  });

  test('Verify reference area renders its title and subtitle', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceArea: true,
      referenceAreaTitle: TITLE,
      referenceAreaSubTitle: SUB_TITLE,
    });

    await expect(locators.plotText(page, TITLE)).toHaveCount(1);
    await expect(locators.plotText(page, SUB_TITLE)).toHaveCount(1);
  });

  test('Verify reference shapes are hidden from assistive technology and not focusable', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineArea: 40,
      withReferenceArea: true,
    });

    await test.step('Verify every reference element is inside an aria-hidden element', async () => {
      const shapes = page.locator('[data-ui-name="ReferenceLine"], path[fill$="-pattern)"]');
      await expect(shapes).not.toHaveCount(0);

      const exposed = await shapes.evaluateAll((elements) =>
        elements.filter((element) => !element.closest('[aria-hidden="true"]')).length,
      );
      expect(exposed).toBe(0);
    });

    await test.step('Verify no reference element has a tabindex', async () => {
      const focusable = await page
        .locator('[data-ui-name="ReferenceLine"], [data-ui-name="ReferenceLine"] *, path[fill$="-pattern)"]')
        .evaluateAll((elements) => elements.filter((element) => element.hasAttribute('tabindex')).length);
      expect(focusable).toBe(0);
    });
  });

  test.fixme('Verify reference area on a single category is visible', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B9: width = centre(end) − centre(start) = 0, the area path runs backwards and only the title is visible',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceArea: true,
      referenceAreaStartCategory: 'Category 2',
      referenceAreaEndCategory: 'Category 2',
    });

    await test.step('Verify the area top edge runs forward and is not empty', async () => {
      const d = await locators.referenceArea(page).getAttribute('d');
      const match = d?.match(/^M\s*([-\d.]+),[-\d.]+\s*Q\s*[-\d.]+,[-\d.]+\s+([-\d.]+),[-\d.]+\s*H\s*([-\d.]+)/);
      expect(match).not.toBeNull();

      const [startX, curveEndX, topEdgeEndX] = match!.slice(1).map(Number);
      expect(topEdgeEndX).toBeGreaterThanOrEqual(curveEndX);
      expect(topEdgeEndX).toBeGreaterThan(startX);
    });
  });

  test.fixme('Verify overlapping reference lines do not produce duplicate React keys', {
    tag: [TAG.PRIORITY_LOW, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Bug doc B5: BarChart.renderReference uses value.toString() as the key',
    },
  }, async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (message) => {
      if (message.text().includes('same key')) warnings.push(message.text());
    });

    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceLine: true,
      referenceLineCount: 2,
      referenceLinesOverlap: true,
    });

    await test.step('Verify both lines render and React reports no duplicate keys', async () => {
      await expect(locators.referenceLine(page)).toHaveCount(2);
      expect(warnings).toEqual([]);
    });
  });
});
