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
  sections: (page: Page) => page.locator('[data-ui-name="FullscreenModal.Section"]'),
  closeElements: (page: Page) => ({
    modalClose: page.locator('[data-ui-name="Modal.Close"]'),
    fullscreenModalClose: page.locator('[data-ui-name="FullscreenModal.Close"]'),
  }),
};

type HeaderConfig = {
  closable?: boolean;
  showClose?: boolean;
  showBack: boolean;
  backText: string;
  backWMax?: number;
  titleText: string;
  titleWidth?: number;
  descriptionText: string;
  showDescriptionTooltip: boolean;
  hasBody: boolean;
  hasFooter: boolean;
  testName?: string;
  skipSnapshot?: boolean;
};

const openModalByKeyboard = async (page: Page) => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await locators.modal(page).waitFor({ state: 'visible' });
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify body paddings', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });

    for (const [index, name] of ['first', 'second'].entries()) {
      await test.step(`Verify paddings for ${name} section`, async () => {
        const section = locators.sections(page).nth(index);
        await expect(section).toHaveCSS('padding-top', '24px');
        await expect(section).toHaveCSS('padding-right', '40px');
        await expect(section).toHaveCSS('padding-bottom', '24px');
        await expect(section).toHaveCSS('padding-left', '40px');
      });
    }
  });

  test('Verify navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await test.step('Verify Close focused and hovered after opening', async () => {
      await openModalByKeyboard(page);
      await expect(locators.button(page, 'Close')).toBeFocused();
      await locators.button(page, 'Close').hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Back button focused by Tab and hovered', async () => {
      await page.keyboard.press('Tab');
      await locators.button(page, 'Go to Tool Name').hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify dual zone render and styles', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@fullscreen-modal',
      '@button',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await locators.button(page).click();
    await locators.modal(page).waitFor({ state: 'visible' });

    await test.step('Verify Back button on hover', async () => {
      await locators.button(page, 'Go to Tool Name').hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Close button on hover', async () => {
      await locators.button(page, 'Close').hover();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify header is fixed when scrolling body', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button',
      '@typography'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Keyboard focus on the scrollable section is not reliable in WebKit');
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await test.step('Focus the scrollable section', async () => {
      await openModalByKeyboard(page);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.sections(page).nth(1)).toBeFocused();
    });

    await test.step('Verify header stays fixed after scrolling by arrows', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(250);
      await expect(page).toHaveScreenshot();
    });
  });

  const headerVariations: HeaderConfig[] = [
    // empty header (no title, no description)
    {
      closable: false,
      showClose: true,
      showBack: true,
      backText: 'Go to Tool',
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
      backText: 'Go to Tool',
      titleText: 'Modal with no close option',
      descriptionText: 'Only Escape key can close this modal',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'not-closable-no-close-button',
    },
    // Long back text + small wMax — verifies ellipsis truncation on Back button
    {
      closable: false,
      showClose: true,
      showBack: true,
      backText: 'This is a very long Back navigation label that must be truncated',
      backWMax: 80,
      titleText: 'Modal Title',
      descriptionText: 'Description text',
      showDescriptionTooltip: false,
      hasBody: true,
      hasFooter: true,
      testName: 'back-long-text-small-wmax-ellipsis',
      skipSnapshot: true,
    },
  ];

  headerVariations.forEach((config) => {
    test(`Verify header configuration: ${config.testName}`, {
      tag: [TAG.PRIORITY_HIGH, '@fullscreen-modal',
        '@button',
        '@button-link',
        '@description-tooltip',
        '@link',
        '@tooltip',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/fullscreen-modal/tests/examples/header/configurable-header.tsx', 'en', config);

      await test.step('Open modal', async () => {
        await openModalByKeyboard(page);
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

        if (config.backWMax !== undefined) {
          const backWMax = config.backWMax;
          await test.step('Verify Back text is truncated when wMax is constrained', async () => {
            const back = page.locator('[data-ui-name="FullscreenModal.Back"]');
            const backBox = await back.boundingBox();
            expect(backBox!.width).toBeLessThanOrEqual(backWMax + 1);
            const textNode = back.locator('[data-ui-name="ButtonLink.Text"]');
            const isTruncated = await textNode.evaluate(
              (el) => el.scrollWidth > el.clientWidth,
            );
            expect(isTruncated).toBe(true);
          });
        }
      }

      if (config.titleText) {
        await test.step('Verify title renders and wraps correctly', async () => {
          const title = page.locator('[data-ui-name="FullscreenModal.Title"]');
          await expect(title).toBeVisible();
          await expect(title).toHaveCSS('overflow-wrap', 'break-word');
        });
      }

      if (config.descriptionText) {
        await test.step('Verify description renders as <p> tag and wraps correctly', async () => {
          const description = page.locator('[data-ui-name="FullscreenModal.Description"]');
          await expect(description).toBeVisible();
          await expect(description).toHaveJSProperty('tagName', 'P');
          await expect(description).toHaveCSS('overflow-wrap', 'break-word');
        });
      }

      await test.step('Verify header vertical layout', async () => {
        const header = page.locator('[data-ui-name="FullscreenModal.Header"]');
        await expect(header).toHaveCSS('flex-direction', 'column');
        await expect(header).toHaveCSS('gap', '8px');
        await expect(header).toHaveCSS('align-items', 'flex-start');
      });

      if (!config.skipSnapshot) {
        await test.step('Take visual snapshot', async () => {
          if (config.showClose || config.closable) {
            const closeButton = locators.button(page, 'Close');
            await closeButton.hover();
          }
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify keyboard navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await test.step('Verify Close focused when opened', async () => {
      await openModalByKeyboard(page);
      await expect(locators.button(page, 'Close')).toBeFocused();
    });

    await test.step('Verify closed by Enter on Close and focus returns to trigger', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify closed by Escape and focus returns to trigger', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();

      await page.keyboard.press('Escape');
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify closed by Enter on Back and focus returns to trigger', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Go to Tool Name')).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify mouse navigation when no footer and 1 zone in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@fullscreen-modal',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await test.step('Verify closed by Close click', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await locators.button(page, 'Close').click();
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    });

    await test.step('Verify closed by Back click', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await locators.button(page, 'Go to Tool Name').click();
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
    });

    await test.step('Verify closed by Escape after opening by click', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.button(page, 'Close').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify keyboard navigation with footer and 2 zones in body', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal',
      '@button',
      '@typography'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Keyboard focus on the scrollable section is not reliable in WebKit');
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

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

  test('Verify modal can be closed by Escape when no closable button', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal',
      '@button',
      '@button-link',
      '@description-tooltip',
      '@link',
      '@tooltip',
      '@typography'],
  }, async ({ page }) => {
    const config: HeaderConfig = {
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

    await test.step('Verify closed by Escape after opening by keyboard', async () => {
      await openModalByKeyboard(page);
      await page.keyboard.press('Escape');
      await locators.modal(page).waitFor({ state: 'hidden' });
    });

    await test.step('Verify closed by Escape after opening by click', async () => {
      await locators.button(page).click();
      await locators.modal(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.modal(page).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
    });
  });

  test('Verify description tooltip keyboard interaction in header', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@fullscreen-modal',
      '@button',
      '@link',
      '@button-link',
      '@description-tooltip',
      '@tooltip',
      '@typography'],
  }, async ({ page }) => {
    const config: HeaderConfig = {
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

    const tooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await test.step('Verify description tooltip opened by Enter', async () => {
      await openModalByKeyboard(page);
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await tooltipPopper.waitFor({ state: 'visible' });
    });

    await test.step('Verify Escape closes tooltip and returns focus to its trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await tooltipPopper.waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
    });
  });

  test('Verify there is only one closable element when closable = true and no Close button', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button',
      '@button-link',
      '@description-tooltip',
      '@link',
      '@tooltip',
      '@typography'],
  }, async ({ page }) => {
    const config: HeaderConfig = {
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

    await openModalByKeyboard(page);

    const { modalClose, fullscreenModalClose } = locators.closeElements(page);
    await expect(modalClose).toHaveCount(0);
    await expect(fullscreenModalClose).toHaveCount(1);
    await expect(fullscreenModalClose).toBeVisible();
  });

  test('Verify no closable elements when closable = false and no Close button', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button',
      '@button-link',
      '@description-tooltip',
      '@link',
      '@tooltip',
      '@typography'],
  }, async ({ page }) => {
    const config: HeaderConfig = {
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

    await openModalByKeyboard(page);

    const { modalClose, fullscreenModalClose } = locators.closeElements(page);
    await expect(modalClose).toHaveCount(0);
    await expect(fullscreenModalClose).toHaveCount(0);
  });

  test('Verify body scroll is restored after modal close (no inline style pollution)', {
    tag: [TAG.PRIORITY_HIGH,
      '@fullscreen-modal',
      '@button'],
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

      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    });
  });
});
