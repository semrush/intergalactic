import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const ALL_SIZES_EXAMPLE = 'stories/components/spin/advanced/examples/all-sizes.tsx';
const BASE_EXAMPLE = 'stories/components/spin/tests/examples/spin-base.tsx';
const BASIC_EXAMPLE = 'stories/components/spin/docs/examples/basic_example.tsx';

/** size: [rendered box in px, stroke-width] */
const SIZES = {
  xs: [16, 2],
  s: [20, 2.5],
  m: [24, 3],
  l: [32, 3.5],
  xl: [48, 4],
  xxl: [72, 5],
} as const;

export const locators = {
  spin: (page: Page, index?: number) => {
    const base = page.locator('svg[role="img"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  circle: (spin: Locator) => spin.locator('circle'),
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  area: (page: Page, testId: string) => page.locator(`[data-testid="${testId}"]`),
};

const computed = (locator: Locator, property: string) =>
  locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );

const expectStableSpinScreenshot = async (page: Page, locator: Locator) => {
  await page.addStyleTag({
    content: `
      [data-ui-name="Spin"],
      [data-ui-name="Spin"] circle {
        animation-delay: -1s !important;
        animation-play-state: paused !important;
      }
    `,
  });
  await expect(locator).toHaveScreenshot();
};

/* =====================================================
@visual
Visual states, paddings, margins, and snapshots.
Snapshots are always scoped to the spin area, never the whole page.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify all sizes and stroke widths', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, ALL_SIZES_EXAMPLE, 'en');

    const entries = Object.entries(SIZES);

    // the example renders the full size scale twice: default theme, then invert theme
    for (const [themeIndex, themeName] of ['default', 'invert'].entries()) {
      for (const [sizeIndex, [size, [expectedPx, expectedStroke]]] of entries.entries()) {
        const spin = locators.spin(page, themeIndex * entries.length + sizeIndex);

        await test.step(`Verify size="${size}" (${themeName} theme)`, async () => {
          await expect(spin).toBeVisible();

          expect(await computed(spin, 'width')).toBe(`${expectedPx}px`);
          expect(await computed(spin, 'height')).toBe(`${expectedPx}px`);

          // size is driven by SVG attributes now, not by CSS rules
          await expect(spin).toHaveAttribute('width', String(expectedPx));
          await expect(spin).toHaveAttribute('height', String(expectedPx));

          const circle = locators.circle(spin);
          await expect(circle).toHaveAttribute('stroke-width', String(expectedStroke));
          // the arc must stay inside the viewport: r = (size - strokeWidth) / 2
          await expect(circle).toHaveAttribute('r', String((expectedPx - expectedStroke) / 2));
        });
      }
    }

    await test.step('Verify screenshot', async () => {
      await expectStableSpinScreenshot(page, locators.area(page, 'spin-all-sizes'));
    });
  });

  test('Verify default theme', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });

    const spin = locators.spin(page, 0);
    const style = await spin.getAttribute('style');
    expect(style).toContain('default');

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-default-bg'));
  });

  test('Verify invert theme on inverted background', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });

    const spin = locators.spin(page, 1);
    const style = await spin.getAttribute('style');
    expect(style).toContain('invert');

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-invert-bg'));
  });

  test('Verify custom color themes', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    test.slow();

    for (const [theme, expectedInStyle] of [
      ['blanchedalmond', 'blanchedalmond'],
      ['#3eeb4c', '3eeb4c'],
      ['dark-violet', '8649e1'],
      ['blue-400', ''],
    ] as const) {
      await test.step(`Verify theme="${theme}"`, async () => {
        await loadPage(page, BASE_EXAMPLE, 'en', { theme });

        const spin = locators.spin(page, 0);
        const style = await spin.getAttribute('style');

        if (expectedInStyle) {
          expect(style).toContain(expectedInStyle);
        }

        // whatever the input format, the stroke must resolve to a real color
        const stroke = await computed(locators.circle(spin), 'stroke');
        expect(stroke).not.toBe('');
        expect(stroke).not.toContain(theme);
      });
    }

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'blanchedalmond' });
    await expectStableSpinScreenshot(page, locators.area(page, 'spin-default-bg'));
  });

  test('Verify centered spin inside a flex parent', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { centered: true, size: 'xl' });

    const parent = locators.area(page, 'spin-centered-parent');
    const spin = locators.spin(page, 2);

    const parentBox = await parent.boundingBox();
    const spinBox = await spin.boundingBox();

    expect(parentBox).not.toBeNull();
    expect(spinBox).not.toBeNull();

    // margin: auto centers the spinner in both axes inside a flex parent
    const parentCenterX = parentBox!.x + parentBox!.width / 2;
    const spinCenterX = spinBox!.x + spinBox!.width / 2;
    const parentCenterY = parentBox!.y + parentBox!.height / 2;
    const spinCenterY = spinBox!.y + spinBox!.height / 2;

    expect(Math.abs(parentCenterX - spinCenterX)).toBeLessThanOrEqual(1);
    expect(Math.abs(parentCenterY - spinCenterY)).toBeLessThanOrEqual(1);

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-centered-parent'));
  });
});

/* =====================================================
@functional
Attributes, themes, locales - no snapshots here.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify aria-label is localized', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'de', { locale: 'de' });

    await expect(locators.spin(page, 0)).toHaveAttribute('aria-label', 'Wird geladen …');
  });

  test('Verify deprecated theme="dark" still renders as default', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const defaultStroke = await computed(locators.circle(locators.spin(page, 0)), 'stroke');

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'dark' });
    const darkStroke = await computed(locators.circle(locators.spin(page, 0)), 'stroke');

    expect(darkStroke).toBe(defaultStroke);
  });

  test('Verify invert theme resolves to a different color than default', {
    tag: [TAG.PRIORITY_HIGH, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const defaultStroke = await computed(locators.circle(locators.spin(page, 1)), 'stroke');

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });
    const invertStroke = await computed(locators.circle(locators.spin(page, 1)), 'stroke');

    expect(invertStroke).not.toBe('');
    expect(invertStroke).not.toBe(defaultStroke);
  });

  test('Verify animations are disabled with prefers-reduced-motion', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin'],
  }, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await loadPage(page, BASE_EXAMPLE, 'en');

    const spin = locators.spin(page, 0);

    expect(await computed(spin, 'animation-name')).toBe('none');
    expect(await computed(locators.circle(spin), 'animation-name')).toBe('none');

    await page.emulateMedia({ reducedMotion: null });
  });

  test('Verify spin attributes inside table', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@spin'],
  }, async ({ page }) => {
    await loadPage(page, BASIC_EXAMPLE, 'en');

    const div = page.locator('div[role="status"][aria-live="polite"]');
    const svg = div.locator('svg');

    await test.step('Verify spin visibility and attributes', async () => {
      await expect(svg).toBeVisible();

      await expect(svg).toHaveAttribute('role', 'img');
      await expect(svg).toHaveAttribute('aria-label', 'Loading…');
      // default size m: geometry comes from width/height attributes
      await expect(svg).toHaveAttribute('width', '20');
      await expect(svg).toHaveAttribute('height', '20');
    });

    await test.step('Verify spin hides after button click', async () => {
      await locators.button(page).click();
      await expect(svg).not.toBeVisible();
    });
  });
});
