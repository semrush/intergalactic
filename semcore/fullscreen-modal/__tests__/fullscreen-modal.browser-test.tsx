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

  const headerVariations = [
    // empty header (no title, no description)
    {
      closable: false,
      showClose: true,
      showBack: true,
      backText: 'Go Back',
      titleText: '',
      descriptionText: '',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'empty-header',
    },
    // Close + Short title + Short description
    {
      closable: true,
      showClose: false,
      showBack: false,
      backText: '',
      titleText: 'Modal Title',
      descriptionText: 'Short description',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'close-short-title-desc',
    },
    // Long title + Long description (word wrapping)
    {
      closable: false,
      showClose: true,
      showBack: true,
      backText: 'Go to Tool Name',
      titleText: 'An Amazing Journey Through Enchanted Worlds, Where Every Step Unveils New Horizons and Dreams Become Reality',
      descriptionText: 'In the bustling city of Eldoria, where the sun sets behind the towering spires of ancient castles, a mysterious event is about to unfold that will change the lives of everyone',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'long-title-desc-wrapping',
    },
    //  Close + Back + Title + Description + Tooltip
    {
      closable: true,
      showClose: false,
      showBack: true,
      backText: 'Go to Tool Name',
      titleText: 'Go to Tool Name Go to Tool Name',
      titleWidth: 200,
      descriptionText: 'Heading 6, 16px Heading 6, 16px',
      showDescriptionTooltip: true,
      hasBody: true,
      hasFooter: true,
      testName: 'close-back-title-desc-tooltip',
    },
    // No Close button + Back + Long title (but closable=true shows default close)
    {
      closable: true,
      showClose: false,
      showBack: true,
      backText: 'Go to Main Page',
      titleText: 'Modal Window Title Modal Window Title Modal Window Title Modal Window Title',
      descriptionText: 'Additional information',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: false,
      testName: 'back-long-title-no-custom-close',
    },
    // Close + No Back + Description only
    {
      closable: true,
      showClose: false,
      showBack: false,
      backText: '',
      titleText: '',
      descriptionText: 'This modal shows only description without title',
      showDescriptionTooltip: false,
      hasBody: false,
      hasFooter: true,
      testName: 'close-desc-only',
    },
    // All features enabled
    {
      closable: false,
      showClose: true,
      showBack: true,
      backText: 'Go to Tool Name long long long name',
      titleText: 'Product Configuration Settings with Very Long Title Text',
      descriptionText: 'This is a very long description that demonstrates the word wrapping behavior in the new vertical header layout',
      showDescriptionTooltip: true,
      hasBody: true,
      hasFooter: true,
      testName: 'all-features-enabled',
    },
    // closable=false + no Close button (only Escape can close)
    {
      closable: false,
      showClose: false,
      showBack: true,
      backText: 'Go Back',
      titleText: 'Modal with no close option',
      descriptionText: 'Only Escape key can close this modal',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'not-closable-no-close-button',
    },
  ];

  headerVariations.forEach((config) => {
    test(`Verify header configuration: ${config.testName}`, {
      tag: [TAG.PRIORITY_HIGH, '@fullscreen-modal'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

      await test.step('Open modal', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.modal(page).waitFor({ state: 'visible' });
      });

      if (config.showClose) {
        await test.step('Verify Close button is visible', async () => {
          await expect(locators.button(page, 'Close')).toBeVisible();
        });
      }

      if (config.showBack) {
        await test.step('Verify Back button is visible', async () => {
          const backButton = locators.button(page, config.backText);
          await expect(backButton).toBeVisible();
        });
      }

      if (config.titleText) {
        await test.step('Verify title renders and wraps correctly', async () => {
          const title = page.locator('[data-ui-name="FullscreenModal.Title"]');
          await expect(title).toBeVisible();
          const titleStyles = await title.evaluate((el) => {
            const computed = getComputedStyle(el);
            return {
              overflowWrap: computed.overflowWrap,
              whiteSpace: computed.whiteSpace,
            };
          });
          expect(titleStyles.overflowWrap).toBe('break-word');
        });
      }

      if (config.descriptionText) {
        await test.step('Verify description renders as <p> tag and wraps correctly', async () => {
          const description = page.locator('[data-ui-name="FullscreenModal.Description"]');
          await expect(description).toBeVisible();

          const tagName = await description.evaluate((el) => el.tagName.toLowerCase());
          expect(tagName).toBe('p');

          const descStyles = await description.evaluate((el) => {
            const computed = getComputedStyle(el);
            return {
              overflowWrap: computed.overflowWrap,
              whiteSpace: computed.whiteSpace,
            };
          });
          expect(descStyles.overflowWrap).toBe('break-word');
        });
      }

      await test.step('Verify header vertical layout', async () => {
        const header = page.locator('[data-ui-name="FullscreenModal.Header"]');
        const headerStyles = await header.evaluate((el) => {
          const computed = getComputedStyle(el);
          return {
            flexDirection: computed.flexDirection,
            gap: computed.gap,
            alignItems: computed.alignItems,
          };
        });

        expect(headerStyles.flexDirection).toBe('column');
        expect(headerStyles.gap).toBe('8px');
        expect(headerStyles.alignItems).toBe('flex-start');
      });

      await test.step('Take visual snapshot', async () => {
        if (config.showClose || config.closable) {
          const closeButton = locators.button(page, 'Close');
          await closeButton.hover();
        }
        await expect(page).toHaveScreenshot();
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
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
    await expect(locators.button(page, 'Close')).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await expect(locators.button(page, 'Close')).toBeFocused();

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
    const config = {
      closable: false,
      showClose: false,
      showBack: true,
      backText: 'Go Back',
      titleText: 'Modal Title',
      descriptionText: 'Description text',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
    };

    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

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
    const config = {

      showBack: true,
      backText: 'Go to Tool Name',
      titleText: 'Go to Tool Name Go to Tool Name',
      titleWidth: 200,
      descriptionText: 'Heading 6, 16px Heading 6, 16px',
      showDescriptionTooltip: true,
      hasBody: true,
      hasFooter: true,
    };

    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
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
    const config = {
      closable: true,
      showClose: false,
      showBack: true,
      backText: 'Go Back',
      titleText: 'Modal Title',
      descriptionText: 'Description text',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
    };

    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

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
    const config = {
      closable: false,
      showClose: false,
      showBack: true,
      backText: 'Go Back',
      titleText: 'Modal with no close option',
      descriptionText: 'Only Escape key can close this modal',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
    };

    await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.modal(page).waitFor({ state: 'visible' });

    const modalClose = page.locator('[data-ui-name="Modal.Close"]');
    const fullScreenModalClose = page.locator('[data-ui-name="FullscreenModal.Close"]');

    expect(await modalClose.count()).toBe(0);
    expect(await fullScreenModalClose.count()).toBe(0);
  });
});
