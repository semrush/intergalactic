import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  modal: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tabpanel: (page: Page, index?: number) => {
    const base = page.getByRole('tabpanel');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tab: (page: Page, index?: number) => {
    const base = page.getByRole('tab');
    return typeof index === 'number' ? base.nth(index) : base;
  }, region: (page: Page, index?: number) => {
    const base = page.getByRole('region');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tablist: (page: Page, index?: number) => {
    const base = page.getByRole('tablist');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  img: (page: Page, index?: number) =>
    page.locator('div[role="tabpanel"] img[role="button"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const indicators = [
    { indicators: 'default', zoomWidth: 300, defaultIndex: undefined, index: undefined },
    { indicators: 'hide', zoomWidth: 300, defaultIndex: undefined, index: 1 },
    { indicators: 'preview', zoomWidth: 500, defaultIndex: 2, undefined: undefined },

  ];
  indicators.forEach((item) => {
    test(`Verify Carousel with indicators= ${item.indicators}, zoomiWidth= ${item.zoomWidth} and defaultIndex=${item.defaultIndex} or index = =${item.index}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@carousel'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en', item);

      await locators.img(page).nth(0).waitFor({ state: 'visible' });

      await test.step('Verify Prev and Next buttons Focus and Hover styles', async () => {
        await page.keyboard.press('Tab');
        await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
        await locators.button(page, 'Next slide').hover();
        await page.locator('[data-ui-name="Hint"]').nth(1).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Carousel area focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      if (await locators.tablist(page).isVisible()) {
        await test.step('Verify Tabs hover and focus styles', async () => {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          const tab = page.getByRole('tab');
          await tab.nth(2).hover();
          await expect(page).toHaveScreenshot();

          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
        });
      }

      await test.step('Verify zoom prev and next hover styles', async () => {
        await page.keyboard.press('Space');
        await locators.modal(page).waitFor({ state: 'visible' });
        await locators.img(page).nth(4).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('Tab');
        await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
        await locators.button(page, 'Next slide').nth(1).hover();
        await page.locator('[data-ui-name="Hint"]').nth(1).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Tabs in zoom mode hover and focus styles', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const tab = page.getByRole('tab');
        if (await locators.tablist(page).count() === 2) {
          await tab.nth(5).hover();
        } else {
          await tab.nth(2).hover();
        }

        await expect(page).toHaveScreenshot();
      });
    });
  });

  const bounded = [
    { indicators: 'default', bounded: true, defaultIndex: 0 },
    { indicators: 'preview', bounded: true, defaultIndex: 2 },

  ];
  bounded.forEach((item) => {
    test(`Verify Carousel prev and next buttons when indicators= ${item.indicators}, bounded= ${item.bounded}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@carousel'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en', item);

      await locators.img(page).nth(0).waitFor({ state: 'visible' });

      await test.step('Verify Prev and Next buttons when one is disabled', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('VerifyPrev and Next buttons when one is disabled in zoom mode', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await locators.img(page).nth(4).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify carousel with indicators only', {
    tag: [TAG.PRIORITY_HIGH,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_indicators_only.tsx', 'en');

    await locators.img(page).nth(0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify carousel with custom Prev and Next', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_prev_next.tsx', 'en');

    await locators.img(page).nth(0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify keyboard interactions with indicators and zoom', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en');

    await locators.img(page).nth(0).waitFor({ state: 'visible' });

    await test.step('Verify prev button focused first', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Previous slide')).toBeFocused();
      await expect(page.locator('[data-ui-name="Carousel.Prev"]')).toHaveAttribute('aria-controls');
    });

    await test.step('Verify carousel focused after prev button', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tabpanel(page, 0)).toBeFocused();
      await expect(locators.region(page)).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify Arrow Left switch between tabs', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Arrow Right switch between tabs', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify next button focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Next slide')).toBeFocused();
      await expect(page.locator('[data-ui-name="Carousel.Next"]')).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Next switches between tabs', async () => {
      await page.keyboard.press('Space');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify indicators focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tablist(page)).toBeFocused();
      await expect(locators.tablist(page)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Arrow Right switch between tabs when indicators focused', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode opened by Space', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');

      await locators.modal(page).waitFor({ state: 'visible' });
      await expect(page.locator('[data-ui-name="Modal.Close"]')).toBeFocused();
    });

    await test.step('Verify Zoom mode closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).not.toBeVisible();
    });

    await test.step('Verify Zoom mode opened by Enter', async () => {
      await page.keyboard.press('Enter');

      await locators.modal(page).waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Prev Button in zoom mode focused by Tab and switch tabs by Enter', async () => {
      await page.keyboard.press('Tab');

      await expect(locators.button(page, 'Previous slide').nth(1)).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify tabpanel focused and Right Arrow switch the tab', async () => {
      await page.keyboard.press('Tab');

      await expect(locators.tabpanel(page, 4)).toBeFocused();

      await page.keyboard.press('ArrowRight');

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Next Button in zoom mode focused by Tab and switch tabs by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.button(page, 'Next slide').nth(1)).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify indicators in zoom mode focused by Tab and switch tabs by Arrows', async () => {
      await page.keyboard.press('Tab');

      await expect(locators.tablist(page, 1)).toBeFocused();
      await page.keyboard.press('ArrowLeft');

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify indicators in zoom mode focused by Tab and switch tabs by Arrows', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');

      await expect(locators.modal(page)).not.toBeVisible();
    });
  });

  test('Verify mouse interactions with Carousel with  indicators and zoom', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en');

    await locators.img(page).nth(0).waitFor({ state: 'visible' });

    await test.step('Verify prev button activating switch tabs', async () => {
      await locators.button(page, 'Previous slide').click();
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify next button activating switch tabs', async () => {
      await locators.button(page, 'Next slide').click();

      await expect(locators.region(page)).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify clicking on tab switch tabs', async () => {
      await locators.tab(page, 2).click();
      await expect(locators.region(page)).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode opened by click on tab panel', async () => {
      await locators.tabpanel(page, 2).click();

      await locators.modal(page).waitFor({ state: 'visible' });
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode closed by click anywhere on the screen', async () => {
      await page.mouse.click(0, 0);
      await expect(locators.modal(page)).not.toBeVisible();
    });

    await test.step('Verify tabs switch by click on Prev button im zoom mode', async () => {
      await locators.tabpanel(page, 2).click();
      await locators.modal(page).waitFor({ state: 'visible' });

      await locators.button(page, 'Previous slide').nth(1).click();

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify tabs switch by click on Next button im zoom mode', async () => {
      await locators.button(page, 'Next slide').nth(1).click();

      await expect(locators.tabpanel(page, 3)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 3)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 4)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 4)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 5)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode closed by click on Close', async () => {
      await page.locator('[data-ui-name="Modal.Close"]').click();

      await expect(locators.modal(page)).not.toBeVisible();
    });

    await test.step('Verify Zoom mode closed by click on tabpanel', async () => {
      await locators.tabpanel(page, 2).click();
      await locators.modal(page).waitFor({ state: 'visible' });

      await locators.tabpanel(page, 5).click();

      await expect(locators.modal(page)).not.toBeVisible();
    });
  });

  test('Verify mouse and keyboard interactions when zoom:false (modal not opened)', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD, TAG.MOUSE,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en', { zoom: false });

    await locators.img(page).nth(0).waitFor({ state: 'visible' });

    await test.step('Verify Modal not opened by keyboard', async () => {
      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await expect(locators.tabpanel(page, 0)).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(locators.modal(page)).not.toBeVisible();
    });

    await test.step('Verify Modal not opened by mouse click', async () => {
      const box = await locators.tabpanel(page, 0).boundingBox();
      if (box) {
        await page.mouse.click(box.x + 10, box.y + 10);
      }
      await expect(locators.modal(page)).not.toBeVisible();
    });
  });

  test('Verify keyboard interactions when Carousel with indicators only', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_indicators_only.tsx', 'en');

    await locators.img(page).nth(0).waitFor({ state: 'visible' });

    await test.step('Verify tabpanel focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tabpanel(page, 0)).toBeFocused();
    });

    await test.step('Verify tabs switch by Arrow', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify tab switch by clicking on indicators', async () => {
      await locators.tab(page, 0).click();
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('aria-current', 'true');
      await expect(locators.tabpanel(page, 0)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabpanel(page, 1)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 1)).toHaveAttribute('tabindex', '-1');

      await expect(locators.tabpanel(page, 2)).toHaveAttribute('aria-current', 'false');
      await expect(locators.tabpanel(page, 2)).toHaveAttribute('tabindex', '-1');
    });
  });

  test('Verify CSS override for preview indicator sizes', {
    tag: [TAG.PRIORITY_HIGH,
      '@carousel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_props.tsx', 'en', {
      indicators: 'preview',
      zoom: false,
    });

    await locators.img(page).nth(0).waitFor({ state: 'visible' });

    await test.step('Verify default preview indicator size is 100px', async () => {
      const indicator = locators.tab(page, 0);
      const box = await indicator.boundingBox();

      expect(box?.width).toBeCloseTo(100, 0);
      expect(box?.height).toBeCloseTo(100, 0);

      await expect(indicator).toHaveAttribute('aria-roledescription', 'slide');
    });

    await test.step('Verify CSS override changes indicator size', async () => {
      await page.addStyleTag({
        content: `
          [aria-roledescription="slide"] {
            width: 150px !important;
            height: 150px !important;
          }
        `,
      });

      // Wait for styles to apply
      await page.waitForTimeout(100);

      const indicator = locators.tab(page, 0);
      const box = await indicator.boundingBox();

      // the size  overridden
      expect(box?.width).toBeCloseTo(150, 0);
      expect(box?.height).toBeCloseTo(150, 0);
    });
  });
});
