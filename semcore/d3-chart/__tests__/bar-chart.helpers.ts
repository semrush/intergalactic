import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect } from '@semcore/testing-utils/playwright';

export const BAR_STORY = 'stories/components/d3-chart/tests/examples/bar-chart/basic-usage.tsx';

const nthOrAll = (selector: string) => (page: Page, index?: number) => {
  const base = page.locator(selector);
  return typeof index === 'number' ? base.nth(index) : base;
};

export const locators = {
  plot: (page: Page) => page.locator('svg[data-ui-name="Plot"]').first(),
  groupBarBar: nthOrAll('[data-ui-name="GroupBar.Bar"]'),
  groupBarHorizontalBar: nthOrAll('[data-ui-name="GroupBar.HorizontalBar"]'),
  bar: nthOrAll('[data-ui-name="Bar"]'),
  horizontalBar: nthOrAll('[data-ui-name="HorizontalBar"]'),
  stackBarBar: nthOrAll('[data-ui-name="StackBar.Bar"]'),
  stackBarHorizontalBar: nthOrAll('[data-ui-name="StackBar.HorizontalBar"]'),
  stackGroupBar: nthOrAll('[data-ui-name="StackGroupBar"]'),
  stackGroupBarBar: nthOrAll('[data-ui-name="StackGroupBar.Bar"]'),
  lineDots: nthOrAll('[data-ui-name="Line.Dots"]'),
  hoverRect: (page: Page) => page.locator('[data-ui-name="Tooltip.Trigger"]'),
  highlights: (page: Page) => page.locator('path[mask="url(#fadeMask)"]'),
  forecastBars: (page: Page) => page.locator('[data-ui-name][mask$="-forecast-mask)"]'),
  potentialBars: (page: Page) => page.locator('[data-ui-name][mask$="-potential-mask)"]'),
  legend: (page: Page) => page.getByLabel('Chart legend'),
  tooltip: (page: Page) => page.locator('[data-ui-name="Bar.Tooltip"], [data-ui-name="HoverLine.Tooltip"], [data-ui-name="HoverRect.Tooltip"]'),
};

export type Box = { x: number; y: number; width: number; height: number };

export const getBarBoxes = async (locator: Locator, axis: 'x' | 'y' = 'x') => {
  await expect(locator.first()).toBeAttached();

  const boxes = await locator.evaluateAll((elements) =>
    elements.map((element) => {
      const { x, y, width, height } = (element as unknown as SVGGraphicsElement).getBBox();
      return { x, y, width, height };
    }),
  );

  return boxes.sort((a, b) => a[axis] - b[axis]);
};

/** Gaps between neighbouring bars along the given axis. */
export const getGaps = (boxes: Box[], axis: 'x' | 'y' = 'x') => {
  const size = axis === 'x' ? 'width' : 'height';

  return boxes
    .slice(1)
    .map((box, index) => Number((box[axis] - (boxes[index][axis] + boxes[index][size])).toFixed(2)));
};

/** Moves the mouse to the centre of the element. */
export const hoverCenter = async (page: Page, locator: Locator) => {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Bounding box not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
};

/** Number of rounded corners in a `d` path: arcs (`a`, bars) and `Q` curves (HoverRect, reference areas). */
export const countRoundedCorners = (d: string | null) => (d?.match(/a[\d.]|Q/g) ?? []).length;

/** Radius of the first rounded corner of a `d` path. */
export const getCornerRadius = (d: string | null) => {
  const arc = d?.match(/a([\d.]+),/);
  if (arc) return Number(arc[1]);

  const curve = d?.match(/Q\s*([-\d.]+),([-\d.]+)\s+([-\d.]+),([-\d.]+)/);
  if (!curve) return 0;

  const [x1, y1, x2, y2] = curve.slice(1).map(Number);
  return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
};

/** Width and height of every `Q` corner in an absolute `M/H/V/Q/Z` path (HoverRect, reference areas). */
export const getCurveCornerSizes = (d: string | null) => {
  const commands = d?.match(/[MHVQZ][^MHVQZ]*/g) ?? [];
  const sizes: Array<[number, number]> = [];
  let [x, y] = [0, 0];

  for (const command of commands) {
    const values = command.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);

    if (command[0] === 'M') [x, y] = values;
    if (command[0] === 'H') x = values[0];
    if (command[0] === 'V') y = values[0];
    if (command[0] === 'Q') {
      const [endX, endY] = values.slice(2);
      sizes.push([Number(Math.abs(endX - x).toFixed(2)), Number(Math.abs(endY - y).toFixed(2))]);
      [x, y] = [endX, endY];
    }
  }

  return sizes;
};

/**
 * Story knobs of `bar-chart/basic-usage.tsx`: `highlightDots` is applied to Category 0–2,
 * `dataType` to Category 3–4.
 */
export const dataTypeCases = [
  { dataType: 'none', highlightDots: 'none', forecast: 0, potential: 0, highlights: 0 },
  { dataType: 'forecast', highlightDots: 'good', forecast: 2, potential: 0, highlights: 3 },
  { dataType: 'potential', highlightDots: 'bad', forecast: 0, potential: 2, highlights: 3 },
  { dataType: 'both', highlightDots: 'insightful', forecast: 1, potential: 1, highlights: 3 },
  { dataType: 'both', highlightDots: 'mixed', forecast: 1, potential: 1, highlights: 3 },
] as const;

/** `segments` is the number of bars per category: every stack segment repeats the row data type. */
export const expectDataTypes = async (page: Page, expected: (typeof dataTypeCases)[number], segments = 1) => {
  await expect(locators.forecastBars(page)).toHaveCount(expected.forecast * segments);
  await expect(locators.potentialBars(page)).toHaveCount(expected.potential * segments);
  await expect(locators.highlights(page)).toHaveCount(expected.highlights * segments);

  if (expected.potential > 0) {
    await expect(locators.potentialBars(page).first()).toHaveCSS('fill', /-potential-gradient/);
  }
};
