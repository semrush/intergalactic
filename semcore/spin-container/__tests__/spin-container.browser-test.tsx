import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const ALL_SIZES_EXAMPLE = 'stories/components/spin-container/advanced/examples/all-sizes.tsx';
const BASE_EXAMPLE = 'stories/components/spin-container/tests/examples/spin-container-base.tsx';
const CONTENT_EXAMPLE = 'stories/components/spin-container/docs/examples/usage_in_content.tsx';

/** size: rendered box of the nested Spin */
const SIZES = {
  xs: '16px',
  s: '20px',
  m: '24px',
  l: '32px',
  xl: '48px',
  xxl: '72px',
} as const;

export const locators = {
  spinContainer: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spinContainerContent: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer.Content"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spinContainerOverlay: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SpinContainer.Overlay"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  spin: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Spin"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Input.Value"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  fadeInOut: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="FadeInOut"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  // areas of the examples, so screenshots stay scoped to the container itself
  area: (page: Page, testId: string) => page.locator(`[data-testid="${testId}"]`),
};

const computed = (locator: Locator, property: string) =>
  locator.evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), property);

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
Snapshots are always scoped to the container area, never the whole page.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify all sizes and themes', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, ALL_SIZES_EXAMPLE, 'en');

    const sizes = Object.entries(SIZES);

    // the example renders the full size scale twice: default theme, then invert theme
    for (const [themeIndex, theme] of ['default', 'invert'].entries()) {
      for (const [sizeIndex, [size, expectedPx]] of sizes.entries()) {
        const spinner = locators.spin(page, themeIndex * sizes.length + sizeIndex);

        await test.step(`Verify size="${size}" (${theme} theme)`, async () => {
          await expect(spinner).toBeVisible();

          expect(await computed(spinner, 'height')).toBe(expectedPx);
          expect(await computed(spinner, 'width')).toBe(expectedPx);

          const style = await spinner.getAttribute('style');
          expect(style).toContain(`${theme};`);
        });
      }
    }

    await test.step('Verify screenshot', async () => {
      await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-all-sizes'));
    });
  });

  test('Verify default theme overlay', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });

    const overlay = locators.spinContainerOverlay(page, 0);
    await expect(overlay).toBeVisible();
    expect(await computed(overlay, 'background-color')).not.toBe('rgba(0, 0, 0, 0)');

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-static'));
  });

  test('Verify invert theme overlay on inverted background', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });

    const spinner = locators.spin(page, 2);
    const style = await spinner.getAttribute('style');
    expect(style).toContain('invert');

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-invert-bg'));
  });

  test('Verify custom overlay backgrounds', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin-container'],
  }, async ({ page }) => {
    test.slow();

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const themeBackground = await computed(
      locators.spinContainerOverlay(page, 0),
      'background-color',
    );

    for (const [background, expectedInStyle] of [
      ['blanchedalmond', 'blanchedalmond'],
      ['#3eeb4c', '3eeb4c'],
      ['dark-violet', '8649e1'],
    ] as const) {
      await test.step(`Verify background="${background}"`, async () => {
        await loadPage(page, BASE_EXAMPLE, 'en', { background });

        const overlay = locators.spinContainerOverlay(page, 0);
        const style = await overlay.getAttribute('style');
        expect(style).toContain(expectedInStyle);

        // a custom background must win over the theme background
        expect(await computed(overlay, 'background-color')).not.toBe(themeBackground);
      });
    }

    await loadPage(page, BASE_EXAMPLE, 'en', { background: 'blanchedalmond' });
    await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-static'));
  });

  test('Verify overlay is not rendered when loading is false', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { loading: false });

    await expect(locators.fadeInOut(page)).toHaveCount(0);
    await expect(locators.spin(page)).toHaveCount(0);

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-static'));
  });

  test('Verify advanced mode with custom overlay content', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', {
      advancedMode: true,
      overlayText: 'Loading data…',
    });

    const overlay = locators.spinContainerOverlay(page, 0);

    await expect(locators.spinContainerContent(page, 0)).toBeVisible();
    await expect(overlay).toContainText('Loading data…');
    // custom children replace the default spinner
    await expect(overlay.locator('[data-ui-name="Spin"]')).toHaveCount(0);

    await expectStableSpinScreenshot(page, locators.area(page, 'spin-container-static'));
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions, attributes and prop forwarding - no snapshots here.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify content is inert and unreachable by keyboard while loading', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { loading: true });

    await test.step('Verify content is inert', async () => {
      await expect(locators.spinContainerContent(page, 1)).toHaveAttribute('inert', '');
    });

    await test.step('Verify input cannot be focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page, 0)).not.toBeFocused();
    });

    await test.step('Verify overlay is not focusable', async () => {
      await expect(locators.spinContainerOverlay(page, 0)).not.toBeFocused();
    });
  });

  test('Verify content is reachable by keyboard when not loading', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { loading: false });

    await expect(locators.spinContainerContent(page, 1)).not.toHaveAttribute('inert', '');

    await page.keyboard.press('Tab');
    await expect(locators.input(page, 0)).toBeFocused();
  });

  test('Verify size and theme are forwarded to the nested Spin', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await test.step('Verify size', async () => {
      await loadPage(page, BASE_EXAMPLE, 'en', { size: 'xs' });

      const spinner = locators.spin(page, 0);
      expect(await computed(spinner, 'width')).toBe('16px');
      expect(await computed(spinner, 'height')).toBe('16px');
    });

    await test.step('Verify theme', async () => {
      await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'invert' });

      const style = await locators.spin(page, 0).getAttribute('style');
      expect(style).toContain('invert');
    });
  });

  test('Verify deprecated theme="dark" renders as default', {
    tag: [TAG.PRIORITY_HIGH, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'default' });
    const defaultBackground = await computed(
      locators.spinContainerOverlay(page, 0),
      'background-color',
    );

    await loadPage(page, BASE_EXAMPLE, 'en', { theme: 'dark' });
    const darkBackground = await computed(
      locators.spinContainerOverlay(page, 0),
      'background-color',
    );

    expect(darkBackground).toBe(defaultBackground);
  });

  test('Verify duration prop drives the overlay animation', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { duration: 1000 });

    expect(await computed(locators.fadeInOut(page, 0), 'animation-duration')).toBe('1s');
  });

  test('Verify box props', {
    tag: [TAG.PRIORITY_MEDIUM, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, BASE_EXAMPLE, 'en', { w: 250, h: 250, m: 4, p: 4 });

    const spinContainer = locators.spinContainer(page, 0);

    expect(await computed(spinContainer, 'width')).toBe('250px');
    expect(await computed(spinContainer, 'height')).toBe('250px');
    expect(await computed(spinContainer, 'margin')).toBe('16px');
    expect(await computed(spinContainer, 'padding')).toBe('16px');
  });

  test('Verify spin container attributes when loading and not loading', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@spin-container'],
  }, async ({ page }) => {
    await loadPage(page, CONTENT_EXAMPLE, 'en');

    await test.step('Verify spin container attributes when loading', async () => {
      await expect(locators.spinContainer(page)).toHaveAttribute('aria-live', 'polite');
      await expect(locators.spinContainer(page)).toHaveAttribute('role', 'status');
    });

    await test.step('Verify content is inert when loading', async () => {
      await expect(locators.spinContainerContent(page)).toHaveAttribute('inert', '');
    });

    await test.step('Verify animation and spin attributes', async () => {
      await expect(locators.fadeInOut(page)).toHaveCount(1);

      const svg = locators.fadeInOut(page).locator('[data-ui-name="Spin"]');
      await expect(svg).toHaveAttribute('aria-label', 'Loading…');
      await expect(svg).toHaveAttribute('role', 'img');
    });

    await test.step('Verify attributes after stopping loading', async () => {
      await locators.button(page).click();
      await expect(locators.spinContainerContent(page)).not.toHaveAttribute('inert', '');
      await expect(locators.fadeInOut(page)).toHaveCount(0);

      const svg = locators.fadeInOut(page).locator('[data-ui-name="Spin"]');
      await expect(svg).not.toBeVisible();
    });
  });
});
