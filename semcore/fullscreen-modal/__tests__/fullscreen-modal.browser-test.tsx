import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';
export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  modal: (page: Page) => page.getByRole('dialog'),
  hint: (page: Page, text: string) => page.getByText(text),
  sections: (page: Page) => page.locator('[data-ui-name="FullscreenModal.Section"]'),

  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify body paddings', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });

    await test.step('Verify paddings for first section', async () => {
      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      } = await locators.sections(page)
        .first()
        .evaluate((el) => {
          const styles = getComputedStyle(el);
          return {
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
            paddingLeft: styles.paddingLeft,
            paddingRight: styles.paddingRight,
          };
        });

      expect(paddingTop).toBe('24px');
      expect(paddingRight).toBe('32px');
      expect(paddingBottom).toBe('24px');
      expect(paddingLeft).toBe('32px');
    });

    await test.step('Verify paddings for second section', async () => {
      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      } = await locators.sections(page)
        .nth(1)
        .evaluate((el) => {
          const styles = getComputedStyle(el);
          return {
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
            paddingLeft: styles.paddingLeft,
            paddingRight: styles.paddingRight,
          };
        });

      expect(paddingTop).toBe('24px');
      expect(paddingRight).toBe('32px');
      expect(paddingBottom).toBe('24px');
      expect(paddingLeft).toBe('32px');
    });
  });

  test('Verify navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });

    await expect(locators.button(page, 'Close')).toBeFocused();
    await locators.button(page, 'Close').hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await locators.button(page, 'Go to Tool Name').hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify dual zone render and styles', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });

    await test.step('Verify backButton on Hover ', async () => {
      await locators.button(page, 'Go to Tool Name').hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify closeButton on Hover ', async () => {
      await locators.button(page, 'Close').hover();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify header is fixed when scrolling body', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    if (browserName === 'webkit') test.skip();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.sections(page).nth(1)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(250);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Close, LongTitle and Description with interactive element', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button',
      '@toooltip',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/close-title-description.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Long Title with Ellipsis ', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/title-description.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });

    await page.locator('[data-ui-name="FullscreenModal.Title"]').hover();
    await locators.hint(page, 'Go to Tool Name Go to Tool Name').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Close Back without Header ', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/back-no-text-close-no-header-1bth-footer.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();
  });

  test('Verify Back and title with long text and with Header', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/back-and-title-bodyh400-2btn-footer.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify aria-describedby', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/modal-props.tsx', 'en');

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });
    await expect(locators.modal(page)).toHaveAttribute('aria-labelledby', /title/i);
    await expect(locators.modal(page)).toHaveAttribute('aria-describedby', 'my-modal-description');
  });

  test('Verify keyboard navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });

    await expect(locators.button(page, 'Close')).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await page.keyboard.press('Escape');
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Go to Tool Name')).toBeFocused();
    await page.keyboard.press('Enter');

    await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
  });

  test('Verify mouse navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await locators.button(page).click();
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await locators.button(page, 'Close').click();
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });

    await locators.button(page).click();
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await locators.button(page, 'Go to Tool Name').click();
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });

    await locators.button(page).click();
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await page.keyboard.press('Escape');
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });

    await expect(locators.button(page)).toBeFocused();
  });

  test('Verify keyboard navigation footer and 2 zones in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    if (browserName === 'webkit') return;
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });

    await expect(locators.button(page, 'Close')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Go to Tool Name')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.sections(page).nth(1)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Submit')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Cancel')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Close')).toBeFocused();
  });

  test('Verify modal can be closed by ESC when no closable button', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/modal-props.tsx', 'en', { closable: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.modal(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await locators.modal(page).waitFor({ state: 'hidden' });

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await locators.modal(page).waitFor({ state: 'hidden' });

    await expect(locators.modal(page)).toHaveCount(0);
  });

  test('Verify Close, LongTitle and Description with interactive element', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal',
      '@button',
      '@toooltip',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/close-title-description.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
  });

  test('Verify there is only one closable element when closable = true and no Close button', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/modal-props.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });

    const modalClose = page.locator('[data-ui-name="Modal.Close"]');
    const fullScreenModalClose = page.locator('[data-ui-name="FullscreenModal.Close"]');

    expect(await modalClose.count()).toBe(0);
    expect(await fullScreenModalClose.count()).toBe(1);

    expect(fullScreenModalClose.first()).toBeVisible();
  });

  test('Verify no closable elements when closable = false and no Close button', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/modal-props.tsx', 'en', { closable: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });

    const modalClose = page.locator('[data-ui-name="Modal.Close"]');
    const fullScreenModalClose = page.locator('[data-ui-name="FullscreenModal.Close"]');

    expect(await modalClose.count()).toBe(0);
    expect(await fullScreenModalClose.count()).toBe(0);
  });

  test('Verify body scroll is restored after modal close (no inline style pollution)', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/scroll-test.tsx', 'en');

    await test.step('Open and close modal', async () => {
      await locators.button(page, 'Open FullscreenModal').click();
      await locators.modal(page).waitFor({ state: 'visible' });
      await locators.button(page, 'Close').click();
      await locators.modal(page).waitFor({ state: 'hidden' });
    });

    await test.step('Verify no inline overflow left and page is scrollable', async () => {
      const inlineOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(inlineOverflow).toBe('');

      const bottomMarker = page.getByTestId('bottom-marker');
      await bottomMarker.scrollIntoViewIfNeeded();
      await expect(bottomMarker).toBeVisible();
    });

    await test.step('Verify CSS-based scroll lock still works after modal close', async () => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator('input[type="checkbox"]').check();

      const overflowAfterCheck = await page.evaluate(() =>
        window.getComputedStyle(document.body).overflow,
      );
      expect(overflowAfterCheck).toBe('hidden');
    });
  });
});
