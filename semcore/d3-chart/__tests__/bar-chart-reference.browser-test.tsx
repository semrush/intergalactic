import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { BAR_STORY, getCurveCornerSizes, hoverCenter, locators as barLocators } from './bar-chart.helpers';

const locators = {
  ...barLocators,
  chart: (page: Page) => page.locator('[data-ui-name="Chart.Bar"]').first(),
  referenceLine: (page: Page) => page.locator('[data-ui-name="ReferenceLine"]'),
  // The area path carries its own aria-hidden; the reference line background is hidden by its parent group.
  referenceArea: (page: Page) => page.locator('path[fill$="-pattern)"][aria-hidden]'),
  referenceLineBackground: (page: Page) => page.locator('path[fill$="-pattern)"]:not([aria-hidden])'),
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

const HIDDEN_TAB_STORY = 'stories/components/d3-chart/tests/examples/bar-chart/hidden-tab-panel.tsx';

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

  const areaRangeCases = [
    { start: 'Category 0', end: 'Category 4' },
    { start: 'Category 1', end: 'Category 2' },
  ];

  areaRangeCases.forEach(({ start, end }) => {
    test(`Verify vertical reference area covers the categories from ${start} to ${end}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, BAR_STORY, 'en', {
        duration: 0,
        withReferenceArea: true,
        referenceAreaStartCategory: start,
        referenceAreaEndCategory: end,
      });
      const area = await getBox(locators.referenceArea(page));

      const categoryBand = async (category: string) => {
        await hoverCenter(page, locators.groupBarBar(page, Number(category.slice(-1))));
        await expect(locators.hoverRect(page)).toBeVisible();
        return getBox(locators.hoverRect(page));
      };

      await test.step('Verify the area starts at the left edge of the start category', async () => {
        const startBand = await categoryBand(start);
        expect(Math.abs(area.x - startBand.x)).toBeLessThanOrEqual(1);
      });

      await test.step('Verify the area ends at the right edge of the end category', async () => {
        const endBand = await categoryBand(end);
        expect(Math.abs(area.x + area.width - (endBand.x + endBand.width))).toBeLessThanOrEqual(1);
      });
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

  test('Verify reference area on a single category is visible', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
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

  test.fixme('Verify reference area and reference line background use the hover rect radius', {
    tag: [TAG.PRIORITY_LOW, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'Reference.jsx calls getVerticalPathFromRect with the default radius 12, the hover rect uses 6',
    },
  }, async ({ page }) => {
    await loadPage(page, BAR_STORY, 'en', {
      duration: 0,
      withReferenceArea: true,
      withReferenceLine: true,
      referenceLineArea: 40,
    });
    await expect(locators.referenceShapes(page)).toHaveCount(2);

    await hoverCenter(page, locators.groupBarBar(page, 1));
    await expect(locators.hoverRect(page)).toBeVisible();
    const hoverCorners = getCurveCornerSizes(await locators.hoverRect(page).getAttribute('d'));

    await test.step('Verify the reference area corners match the hover rect', async () => {
      expect.soft(getCurveCornerSizes(await locators.referenceArea(page).getAttribute('d'))).toEqual(hoverCorners);
    });

    await test.step('Verify the reference line background corners match the hover rect', async () => {
      expect.soft(getCurveCornerSizes(await locators.referenceLineBackground(page).getAttribute('d'))).toEqual(hoverCorners);
    });
  });

  test.fixme('Verify reference area uses the gradient of its own chart when an earlier chart is in a hidden tab', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@bar-chart', '@d3-chart', '@base-components', '@flex-box', '@tab-line'],
    annotation: {
      type: 'issue',
      description: 'ReferenceArea is created from Area without uniqueIDEnhancement, so every area uses the id undefined-pattern',
    },
  }, async ({ page }) => {
    await loadPage(page, HIDDEN_TAB_STORY, 'en', { withReferenceArea: true });

    const insightsTab = page.getByRole('tab', { name: 'Insights' });
    const insightsPanel = page.locator('#panel-insights');

    await test.step('Open the second tab while the first chart stays mounted and hidden', async () => {
      await expect(page.locator('#panel-traffic svg[data-ui-name="Plot"]')).toBeVisible();
      await insightsTab.click();
      await expect(insightsTab).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('#panel-traffic')).toBeHidden();
    });

    await test.step('Verify the area gradient resolves inside the visible panel', async () => {
      const area = insightsPanel.locator('path[fill$="-pattern)"][aria-hidden]');
      await expect(area).toHaveCount(1);

      const gradientOwner = await area.evaluate((element) => {
        const id = element.getAttribute('fill')!.match(/url\(#(.+)\)/)![1];
        return document.getElementById(id)?.closest('[role="tabpanel"]')?.id;
      });
      expect(gradientOwner).toBe('panel-insights');
    });
  });

  test.fixme('Verify reference area title looks the same as in the line chart', {
    tag: [TAG.PRIORITY_MEDIUM, '@bar-chart', '@line-chart', '@d3-chart', '@base-components', '@flex-box', '@checkbox'],
    annotation: {
      type: 'issue',
      description: 'ReferenceArea is created from Area without the reference styles, so the title and subtitle are unstyled',
    },
  }, async ({ page }) => {
    const titleStyle = async (story: string) => {
      await loadPage(page, story, 'en', { duration: 0, withReferenceArea: true, referenceAreaTitle: TITLE });
      await expect(locators.plotText(page, TITLE)).toHaveCount(1);
      return locators.plotText(page, TITLE).evaluate((element) => {
        const { fill, fontSize } = getComputedStyle(element);
        return { fill, fontSize };
      });
    };

    const lineChartTitle = await titleStyle('stories/components/d3-chart/tests/examples/line-chart/basic-usage.tsx');
    const barChartTitle = await titleStyle(BAR_STORY);

    expect(barChartTitle).toEqual(lineChartTitle);
  });
});
