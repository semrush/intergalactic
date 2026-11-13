import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const USAGE_METER = 'stories/components/limits/tests/examples/usage-meter.tsx';
const LONG_FEATURE = 'Site Audit pages crawled per month across all projects';
const COMPONENT_TAGS = ['@limits', '@base-components', '@typography'];

const locators = {
  stand: (page: Page) => page.locator('#root'),
  meter: (page: Page) => page.getByRole('meter'),
  root: (page: Page) => locators.meter(page).locator('..'),
  title: (page: Page) => locators.root(page).locator(':scope > :first-child > :first-child'),
  counter: (page: Page) => locators.root(page).locator(':scope > :first-child > :last-child'),
  fill: (page: Page) => locators.meter(page).locator(':scope > *'),
};

/** Pairwise cover of state × theme × fill level × feature length. */
const pairwiseMatrix = [
  { state: 'normal', theme: 'default', value: 0, feature: 'Audit' },
  { state: 'normal', theme: 'invert', value: 50, feature: LONG_FEATURE },
  { state: 'normal', theme: 'default', value: 100, feature: LONG_FEATURE },
  { state: 'warning', theme: 'default', value: 50, feature: 'Audit' },
  { state: 'warning', theme: 'invert', value: 100, feature: 'Audit' },
  { state: 'warning', theme: 'invert', value: 0, feature: LONG_FEATURE },
] as const;

/** Decision table: which token colors the fill and the text for each state × theme. The default theme inherits the text color. */
const colorTable = [
  { state: 'normal', theme: 'default', fill: '--intergalactic-limits-indicator-value-normal', text: undefined },
  { state: 'warning', theme: 'default', fill: '--intergalactic-limits-indicator-value-critical', text: undefined },
  { state: 'normal', theme: 'invert', fill: '--intergalactic-limits-indicator-value-normal-invert', text: '--intergalactic-text-primary-invert' },
  { state: 'warning', theme: 'invert', fill: '--intergalactic-limits-indicator-value-critical', text: '--intergalactic-text-primary-invert' },
] as const;

const resolveTokenColor = (page: Page, token: string) =>
  page.evaluate((name) => {
    const probe = document.createElement('div');
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();

    return color;
  }, token);

const getBox = async (locator: ReturnType<Page['locator']>) => {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();

  return box!;
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  pairwiseMatrix.forEach((item) => {
    const name = `${item.state}-${item.theme}-${item.value}-${item.feature === 'Audit' ? 'short' : 'long'}`;

    test(`Verify usage meter with state=${item.state}, theme=${item.theme}, value=${item.value}, ${item.feature === 'Audit' ? 'short' : 'long'} feature`, {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, USAGE_METER, 'en', item);
      await expect(locators.stand(page)).toHaveScreenshot(`${name}.png`);
    });
  });

  [1, 99].forEach((value) => {
    test(`Verify usage meter fill at the boundary value=${value}`, {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, USAGE_METER, 'en', { value, feature: 'Audit' });
      await expect(locators.stand(page)).toHaveScreenshot(`boundary-${value}.png`);
    });
  });
});

/* =====================================================
@functional
Functional behavior, interactions, and states.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  [
    { min: undefined, max: 100, value: 30 },
    { min: 50, max: 100, value: 75 },
    { min: undefined, max: 1000, value: 500 },
  ].forEach(({ min, max, value }) => {
    test(`Verify fill width is value/max for value=${value}, min=${min}, max=${max}`, {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, USAGE_METER, 'en', { min, max, value, feature: 'Audit' });

      const track = await getBox(locators.meter(page));
      const fill = await getBox(locators.fill(page));

      expect(fill.width).toBeCloseTo((track.width * value) / max, 0);
    });
  });

  test('Verify usage meter is not wider than 340px', {
    tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, USAGE_METER, 'en', { value: 10, feature: 'Audit', w: 600 });

    const root = await getBox(locators.root(page));
    expect(root.width).toBe(340);
  });

  colorTable.forEach(({ state, theme, fill, text }) => {
    test(`Verify fill and text colors for state=${state}, theme=${theme}`, {
      tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, USAGE_METER, 'en', { state, theme, value: 50, feature: 'Audit' });

      await test.step('Verify fill color', async () => {
        await expect(locators.fill(page)).toHaveCSS('background-color', await resolveTokenColor(page, fill));
      });

      await (text ? test.step : test.step.skip)('Verify title and counter colors', async () => {
        const color = await resolveTokenColor(page, text!);
        await expect(locators.title(page)).toHaveCSS('color', color);
        await expect(locators.counter(page)).toHaveCSS('color', color);
      });
    });
  });

  test.describe('Long values in a 246px container', () => {
    const figmaCase = { value: 732, max: 1000, feature: 'Titel des Indikators', w: 246 };

    test('Verify title wraps and stays top-aligned with the counter', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      await loadPage(page, USAGE_METER, 'de', { ...figmaCase, value: 1234567, max: 10000000 });

      const title = await getBox(locators.title(page));
      const counter = await getBox(locators.counter(page));

      expect(title.height).toBeGreaterThan(20);
      expect(counter.y).toBe(title.y);
    });

    test.fixme('Verify counter stays on one line', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      // The counter wraps word by word: "732 of / 1000 / used" next to a long title.
      await loadPage(page, USAGE_METER, 'de', { ...figmaCase, feature: LONG_FEATURE });

      const counter = await getBox(locators.counter(page));
      expect(counter.height).toBe(20);
    });

    test.fixme('Verify at least 4px gap between title and counter', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      // Only justify-content: space-between separates them, so a long word touches the counter.
      await loadPage(page, USAGE_METER, 'de', { ...figmaCase, feature: 'Seitenzugriffsberechtigungsverwaltung' });

      const title = await getBox(locators.title(page));
      const counter = await getBox(locators.counter(page));
      expect(counter.x - (title.x + title.width)).toBeGreaterThanOrEqual(4);
    });

    test.fixme('Verify long word in the title does not overflow the container', {
      tag: [TAG.PRIORITY_MEDIUM, ...COMPONENT_TAGS],
    }, async ({ page }) => {
      // An unbreakable title pushes the counter past the right edge of the root.
      await loadPage(page, USAGE_METER, 'de', { ...figmaCase, feature: 'Seitenzugriffsberechtigungsverwaltung' });

      const root = await getBox(locators.root(page));
      const counter = await getBox(locators.counter(page));
      expect(counter.x + counter.width).toBeLessThanOrEqual(root.x + root.width);
    });
  });
});

/* =====================================================
@accessibility
Roles, names and ARIA attributes.
===================================================== */
test.describe(`${TAG.ACCESSIBILITY}`, () => {
  test('Verify meter role, name and value attributes', {
    tag: [TAG.PRIORITY_HIGH, ...COMPONENT_TAGS],
  }, async ({ page }) => {
    await loadPage(page, USAGE_METER, 'en', { min: 50, max: 500, value: 120, feature: 'Audit' });

    const meter = page.getByRole('meter', { name: 'Audit' });
    await expect(meter).toBeVisible();
    await expect(meter).toHaveAttribute('aria-valuemin', '50');
    await expect(meter).toHaveAttribute('aria-valuemax', '500');
    await expect(meter).toHaveAttribute('aria-valuenow', '120');
  });
});
