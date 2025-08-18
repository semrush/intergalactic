import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const indicators = [
    { indicators: 'default', zoomWidth: 300, defaultIndex: undefined, index: undefined },
    { indicators: 'hide', zoomWidth: 300, defaultIndex: undefined, index: 1 },
    { indicators: 'preview', zoomWidth: 500, defaultIndex: 2, undefined: undefined },

  ];
  indicators.forEach((item) => {
    test(`Verify Carousel with indicators= ${item.indicators}, zoomiWidth= ${item.zoomWidth} and defaultIndex=${item.defaultIndex} or index = =${item.index}`, async ({ page }) => {
      const standPath = 'stories/components/carousel/tests/examples/carousel_with_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      const img = page.locator('div[role="tabpanel"] img[role="button"]');
      await img.nth(0).waitFor({ state: 'visible' });

      const next = page.locator('[data-ui-name="Carousel.Next"]');
      const indicators = page.getByRole('tablist');
      const modal = page.getByRole('dialog');

      await test.step('Verify Prev and Next buttons Focus and Hover styles', async () => {
        await page.keyboard.press('Tab');
        await page.waitForSelector('text="Previous slide"');
        await next.hover();
        await page.waitForSelector('text="Next slide"');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Carousel area focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      if (await indicators.isVisible()) {
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
        await modal.waitFor({ state: 'visible' });
        await img.nth(4).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('Tab');
        await page.waitForSelector('text="Previous slide"');
        await next.nth(1).hover();
        await page.waitForSelector('text="Next slide"');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Tabs in zoom mode hover and focus styles', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const tab = page.getByRole('tab');
        if (await indicators.count() === 2)

          await tab.nth(5).hover();
        else await tab.nth(2).hover();

        await expect(page).toHaveScreenshot();
      });
    });
  });

  const bounded = [
    { indicators: 'default', bounded: true, defaultIndex: 0 },
    { indicators: 'preview', bounded: true, defaultIndex: 2 },

  ];
  bounded.forEach((item) => {
    test(`Verify Carousel prev and next buttons when indicators= ${item.indicators}, bounded= ${item.bounded}`, async ({ page }) => {
      const standPath = 'stories/components/carousel/tests/examples/carousel_with_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      const img = page.locator('div[role="tabpanel"] img[role="button"]');
      await img.nth(0).waitFor({ state: 'visible' });

      const modal = page.getByRole('dialog');

      await test.step('Verify Prev and Next buttons when one is disabled', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('VerifyPrev and Next buttons when one is disabled in zoom mode', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await modal.waitFor({ state: 'visible' });
        await img.nth(4).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify carousel with indicators only', async ({ page }) => {
    const standPath =
      'stories/components/carousel/tests/examples/carousel_with_indicators_only.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify carousel with custom Prev and Next', async ({ page }) => {
    const standPath =
      'stories/components/carousel/tests/examples/carousel_with_prev_next.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactions with indicators and zoom', async ({ page }) => {
    const standPath = 'stories/components/carousel/tests/examples/carousel_with_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });

    const carousel = page.getByRole('region');
    const prev = page.getByLabel('Previous slide');
    const next = page.getByLabel('Next slide');
    const indicators = page.getByRole('tablist');
    const tabpanel = page.getByRole('tabpanel');
    const modal = page.getByRole('dialog');

    await test.step('Verify prev button focused first', async () => {
      await page.keyboard.press('Tab');
      await expect(prev).toBeFocused();
      await expect(page.locator('[data-ui-name="Carousel.Prev"]')).toHaveAttribute('aria-controls');
    });

    await test.step('Verify carousel focused after prev button', async () => {
      await page.keyboard.press('Tab');
      await expect(tabpanel.first()).toBeFocused();
      await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify Arrow Left switch between tabs', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Arrow Right switch between tabs', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify next button focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(next).toBeFocused();
      await expect(page.locator('[data-ui-name="Carousel.Next"]')).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Next switches between tabs', async () => {
      await page.keyboard.press('Space');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify indicators focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(indicators).toBeFocused();
      await expect(indicators).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Arrow Right switch between tabs when indicators focused', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode opened by Space', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');

      await modal.waitFor({ state: 'visible' });
      await expect(page.locator('[data-ui-name="Modal.Close"]')).toBeFocused();
    });

    await test.step('Verify Zoom mode closed by Escape', async () => {
      await page.keyboard.press('Escape');

      await expect(modal).not.toBeVisible();
    });

    await test.step('Verify Zoom mode opened by Enter', async () => {
      await page.keyboard.press('Enter');

      await modal.waitFor({ state: 'visible' });
      await expect(page.locator('[data-ui-name="Modal.Close"]')).toBeFocused();
      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Prev Button in zoom mode focused by Tab and switch tabs by Enter', async () => {
      await page.keyboard.press('Tab');

      await expect(prev.nth(1)).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify tabpanel focused and Right Arrow switch the tab', async () => {
      await page.keyboard.press('Tab');

      await expect(tabpanel.nth(4)).toBeFocused();

      await page.keyboard.press('ArrowRight');

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Next Button in zoom mode focused by Tab and switch tabs by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(next.nth(1)).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify indicators in zoom mode focused by Tab and switch tabs by Arrows', async () => {
      await page.keyboard.press('Tab');

      await expect(indicators.nth(1)).toBeFocused();
      await page.keyboard.press('ArrowLeft');

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify indicators in zoom mode focused by Tab and switch tabs by Arrows', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');

      await expect(modal).not.toBeVisible();
    });
  });

  test('Verify mouse interactions with Carousel with  indicators and zoom', async ({ page }) => {
    const standPath = 'stories/components/carousel/tests/examples/carousel_with_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });

    const carousel = page.getByRole('region');
    const prev = page.getByLabel('Previous slide');
    const next = page.getByLabel('Next slide');
    const tabpanel = page.getByRole('tabpanel');
    const tab = page.getByRole('tab');
    const modal = page.getByRole('dialog');

    await test.step('Verify prev button activating switch tabs', async () => {
      await prev.click();
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify next button activating switch tabs', async () => {
      await next.click();

      await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify clicking on tab switch tabs', async () => {
      await tab.nth(2).click();
      await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode opened by click on tab panel', async () => {
      await tabpanel.nth(2).click();

      await modal.waitFor({ state: 'visible' });
      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode closed by click anywhere on the screen', async () => {
      await page.mouse.click(0, 0);
      await expect(modal).not.toBeVisible();
    });

    await test.step('Verify tabs switch by click on Prev button im zoom mode', async () => {
      await tabpanel.nth(2).click();
      await modal.waitFor({ state: 'visible' });

      await prev.nth(1).click();

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify tabs switch by click on Next button im zoom mode', async () => {
      await next.nth(1).click();

      await expect(tabpanel.nth(3)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(3)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(4)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(4)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(5)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(5)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Zoom mode closed by click on Close', async () => {
      await page.locator('[data-ui-name="Modal.Close"]').click();

      await expect(modal).not.toBeVisible();
    });

    await test.step('Verify Zoom mode closed by click on tabpanel', async () => {
      await tabpanel.nth(2).click();
      await modal.waitFor({ state: 'visible' });

      await tabpanel.nth(5).click();

      await expect(modal).not.toBeVisible();
    });
  });

  test('Verify modal not opened by mouse and keyboard when zoom:false', async ({ page }) => {
    const standPath = 'stories/components/carousel/tests/examples/carousel_with_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { zoom: false });

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });

    const tabpanel = page.getByRole('tabpanel');
    const modal = page.getByRole('dialog');

    await test.step('Verify Modal not opened by keyboard', async () => {
      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await expect(tabpanel.first()).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(modal).not.toBeVisible();
    });

    await test.step('Verify Modal not opened by mouse click', async () => {
      const box = await tabpanel.first().boundingBox();
      if (box) {
        await page.mouse.click(box.x + 10, box.y + 10);
      }
      await expect(modal).not.toBeVisible();
    });
  });

  test('Verify interactions when Carousel with indicators only', async ({ page }) => {
    const standPath = 'stories/components/carousel/tests/examples/carousel_with_indicators_only.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const img = page.locator('div[role="tabpanel"] img[role="button"]');
    await img.nth(0).waitFor({ state: 'visible' });

    const tabpanel = page.getByRole('tabpanel');
    const tab = page.getByRole('tab');

    await test.step('Verify tabpanel focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(tabpanel.first()).toBeFocused();
    });

    await test.step('Verify tabs switch by Arrow', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify tab switch by clicking on indicators', async () => {
      await tab.nth(0).click();
      await expect(tabpanel.nth(0)).toHaveAttribute('aria-current', 'true');
      await expect(tabpanel.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(tabpanel.nth(1)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(1)).toHaveAttribute('tabindex', '-1');

      await expect(tabpanel.nth(2)).toHaveAttribute('aria-current', 'false');
      await expect(tabpanel.nth(2)).toHaveAttribute('tabindex', '-1');
    });
  });
});
