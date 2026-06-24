import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  modal: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Modal"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  close: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Modal.Close"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  overlay: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Modal.Overlay"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  overlayContentWrapper: (page: Page) => page.locator('[data-ui-name="Modal.Overlay.ContentWrapper"]'),
  dialog: (page: Page, name?: string) => (
    name ? page.getByRole('dialog', { name }) : page.getByRole('dialog')
  ),
  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, styles, paddings, margins, and snapshots.
===================================================== */
test.describe(` ${TAG.VISUAL}`, () => {
  test('Verify modal close button hover state', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx', 'en');

    await test.step('Open modal', async () => {
      await locators.button(page).click();
      await locators.close(page).waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify close button hover state', async () => {
      await locators.close(page).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify modal Overlay paddings on different page sizes', {
    tag: [TAG.PRIORITY_MEDIUM, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/tests/examples/basic_usage.tsx', 'en', { content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus facere iste praesentium quae quia repudiandae tempore! Assumenda consequatur cum ducimus, fuga incidunt necessitatibus nulla odit placeat praesentium quidem rerum vero? quidem rerum vero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus facere iste praesentium quae quia repudiandae tempore' });

    await test.step('Open modal and verify default padding', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.close(page).waitFor({ state: 'visible' });
      await expect(locators.overlayContentWrapper(page)).toHaveCSS('padding', '40px');
    });

    await test.step('Verify padding at 1280x320 viewport', async () => {
      await page.setViewportSize({ width: 1280, height: 320 });
      await expect(locators.overlayContentWrapper(page)).toHaveCSS('padding', '40px');
    });

    await test.step('Verify padding at 320x320 viewport', async () => {
      await page.setViewportSize({ width: 320, height: 320 });
      await expect(locators.overlayContentWrapper(page)).toHaveCSS('padding', '12px');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify modal when height is bigger than browser page', {
    tag: [TAG.PRIORITY_MEDIUM, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx', 'en');

    await test.step('Open modal and verify padding', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Got it!').waitFor({ state: 'visible' });
      await expect(locators.overlayContentWrapper(page)).toHaveCSS('padding', '40px');
    });

    await test.step('Scroll and verify visual state', async () => {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(300);
      // Wait for scroll to complete by checking if the overlay has been scrolled
      await page.waitForFunction(() => {
        const overlay = document.querySelector('[data-ui-name="Modal.Overlay"]');
        return overlay && overlay.scrollTop > 0;
      });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify modal styles with access to internal html nodes', {
    tag: [TAG.PRIORITY_LOW, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/access_to_internal_html_nodes.tsx', 'en');

    await test.step('Open modal and verify custom styles', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('heading', { name: 'Customized modal window' }).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify modal inside modal styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');

    await test.step('Open first modal', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Open modal', 1).waitFor({ state: 'visible' });
    });

    await test.step('Open second modal and verify both visible', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Open modal', 1)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Close second modal and verify first still visible', async () => {
      await page.keyboard.press('Escape');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify modal nested', {
    tag: [TAG.PRIORITY_MEDIUM, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/tests/examples/modal-nested.tsx', 'en');

    await test.step('Verify nested modal visual state', async () => {
      await locators.close(page, 1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  const variables = [
    { ghost: false, w: undefined, closable: true },
    { ghost: true, w: undefined, closable: true },
    { ghost: false, w: 800, closable: false },
    { ghost: true, w: 600, closable: false },
  ];

  variables.forEach((item) => {
    test(`Verify modal with ghost=${item.ghost}, w=${item.w}, closable=${item.closable}`, {
      tag: [TAG.PRIORITY_HIGH, '@modal'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/modal/tests/examples/basic_usage.tsx', 'en', item);

      await test.step('Open modal', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.modal(page).waitFor({ state: 'visible' });
      });

      await test.step('Verify default visual state', async () => {
        await expect(page).toHaveScreenshot();
      });

      if (item.closable) {
        await test.step('Verify close button is visible', async () => {
          await expect(locators.close(page)).toBeVisible();
        });
      } else {
        await test.step('Verify close button is not visible', async () => {
          await expect(locators.close(page)).toHaveCount(0);
        });
      }
    });
  });

  test('Verify select height inside modal', {
    tag: [TAG.PRIORITY_LOW, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_with_select.tsx', 'en');

    await test.step('Verify select dropdown height with keyboard', async () => {
      await locators.close(page, 0).waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Reopen and verify select dropdown height again', async () => {
      await page.keyboard.press('Escape');
      await page.getByRole('option').first().waitFor({ state: 'hidden' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Modal with iframe inside keyboard interactions', {
    tag: [TAG.PRIORITY_LOW, TAG.KEYBOARD, '@modal'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_iframe.tsx', 'en');

    await test.step('Open modal and navigate to iframe', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });

      if (browserName == 'firefox') {
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Tab');
    });
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`@modal ${TAG.FUNCTIONAL}`, () => {
  test('Verify Closable modal keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx', 'en');

    const buttons = locators.modal(page).locator('[data-ui-name="Button"]');

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });

      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.close(page)).toBeFocused();
    });

    await test.step('Verify closes by pressing Enter on Close', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Save changes').waitFor({ state: 'hidden' });

      await expect(locators.modal(page)).toHaveCount(0);
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify opens by space and Close is focused', async () => {
      await page.keyboard.press('Space');
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.close(page)).toBeFocused();
    });

    await test.step('Verify focus cycled inside the modal', async () => {
      await page.keyboard.press('Tab');
      await expect(buttons.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.close(page)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(buttons.nth(1)).toBeFocused();
    });

    await test.step('Verify modal closed when pressing ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.button(page, 'Save changes').waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify modal closed when you firstly click on a modal and then pressing ESC', async () => {
      await locators.button(page).click();
      await locators.modal(page).waitFor({ state: 'attached' });
      await locators.modal(page).click();
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).toHaveCount(0);
    });
  });

  test('Verify Modal with iframe inside keyboard interactions', {
    tag: [TAG.PRIORITY_LOW, TAG.KEYBOARD, '@modal'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_iframe.tsx', 'en');

    await test.step('Open modal and navigate to iframe', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });
      if (browserName == 'firefox') {
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Tab');
    });

    await test.step('Verify ESC does not close modal when focus is in iframe', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).toBeVisible();
      await page.keyboard.type('Hello world');
    });

    await test.step('Verify ESC closes modal after leaving iframe', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).not.toBeVisible();
    });
  });

  test('Verify Modal with prevent focus keyboard interactions', {
    tag: [TAG.PRIORITY_LOW, TAG.KEYBOARD, '@modal'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_prevent_focus.tsx', 'en');

    await test.step('Open modal and navigate to input', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });

      if (browserName !== 'chromium') {
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Tab');
    });

    await test.step('Verify ESC does not close modal when focus is in input', async () => {
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).toBeVisible();
    });

    await test.step('Verify ESC closes modal after leaving input and returns focus', async () => {
      await page.keyboard.type('Hello world');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await expect(locators.modal(page)).not.toBeVisible();
      await expect(locators.button(page, 'Open modal')).toBeFocused();
    });
  });

  test('Verify Closable modal mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx', 'en');

    await test.step('Verify opens click on trigger', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify closes by clicking Close', async () => {
      await locators.close(page).click();
      await locators.button(page, 'Save changes').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify closed by clicking outside modal', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });

      const overlayBox = await locators.overlay(page).boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await expect(locators.modal(page)).toHaveCount(0);
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Save changes').waitFor({ state: 'visible' });
      const modalBox = await locators.modal(page).boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }
      await expect(locators.modal(page)).toBeVisible();
    });

    await test.step('Verify closes by clicking On Buttons', async () => {
      await locators.button(page, 'Save changes').click();
      await locators.button(page, 'Save changes').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify modal in modal keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Open modal', 1).waitFor({ state: 'visible' });
      await expect(locators.close(page)).toBeFocused();
      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify 2nd modal opened and X is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Open modal', 1)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'visible' });
      await expect(locators.close(page).nth(1)).toBeFocused();

      await expect(locators.modal(page)).toHaveCount(2);
    });

    await test.step('Verify only one modal closed by activating Close', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'hidden' });
      await locators.modal(page, 1).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.button(page, 'Open modal', 1)).toBeFocused();
    });

    await test.step('Verify only one modal closed by ESC', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'visible' });
      await expect(locators.close(page).nth(1)).toBeFocused();

      await page.keyboard.press('Escape');
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'hidden' });

      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.button(page, 'Open modal', 1)).toBeFocused();
    });

    await test.step('Verify last one modal closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.modal(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify modal without interactive elements inside mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/tests/examples/basic_usage.tsx', 'en', { showCloseButton: false, closable: false });

    await test.step('Verify opens click on trigger', async () => {
      await locators.button(page).click();
      await locators.modal(page).waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.modal(page)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify closed by clicking outside modal', async () => {
      const overlayBox = await locators.overlay(page).boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await locators.modal(page).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await locators.button(page).click();
      await locators.modal(page).waitFor({ state: 'visible' });
      const modalBox = await locators.modal(page).boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }
      await expect(locators.modal(page)).toBeVisible();
      await expect(locators.modal(page)).toBeFocused();
    });

    await test.step('Verify closes by Pressing Escape', async () => {
      await page.keyboard.press('Escape');
      await locators.modal(page).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
    });
  });

  test('Verify modal without interactive elements inside keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/tests/examples/basic_usage.tsx', 'en', { showCloseButton: false, closable: false });

    await test.step('Verify opens click on trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.modal(page).waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.modal(page)).toHaveAttribute('tabindex', '0');
      await expect(locators.modal(page)).toBeFocused();
    });

    await test.step('Verify closes by Pressing Escape', async () => {
      await page.keyboard.press('Escape');
      await locators.modal(page).waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify modal in modal mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');

    await test.step('Verify opens click on trigger', async () => {
      await locators.button(page).click();
      await locators.button(page, 'Open modal', 1).waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify 2nd opened', async () => {
      await locators.button(page, 'Open modal', 1).click();
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'visible' });

      await expect(locators.modal(page)).toHaveCount(2);
    });

    await test.step('Verify one closed by clicking outside modal', async () => {
      const overlayBox = await locators.overlay(page, 1).boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'hidden' });

      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await locators.button(page, 'Open modal', 1).click();
      await locators.dialog(page, 'Modal window inside a modal window').waitFor({ state: 'visible' });

      const modalBox = await locators.modal(page, 1).boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }
      await expect(locators.modal(page)).toHaveCount(2);
    });

    await test.step('Verify closes by clicking On Buttons', async () => {
      await locators
        .dialog(page, 'Modal window inside a modal window')
        .getByRole('button', { name: 'Close' })
        .last()
        .click();
      await expect(locators.modal(page)).toHaveCount(1);
    });
  });

  test('Verify modal with focusable input inside by mouse', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal', '@input'],
  }, async ({ page, browserName }) => {
    if (browserName == 'webkit') test.skip(); // works unstable in playwright webkit
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_with_auto_focus_input', 'en');

    await test.step('Verify input focused', async () => {
      await locators.button(page).click();
      await page.getByRole('textbox').waitFor({ state: 'visible' });
      await expect(async () => {
        await expect(page.getByRole('textbox')).toBeFocused();
      }).toPass({ timeout: 5000 }); // focus first moves to the close button and then to the input
    });
  });

  test('Verify modal with focusable input inside by keyboard', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@modal', '@input'],
  }, async ({ page, browserName }) => {
    if (browserName === 'webkit' || browserName === 'chromium') test.skip(); // works unstable in playwright webkit and chromium
    await loadPage(page, 'stories/components/modal/advanced/examples/modal_with_auto_focus_input', 'en');

    await test.step('Verify input focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await page.keyboard.press('Enter');

      await page.getByRole('textbox').waitFor({ state: 'visible' });
      await expect(async () => {
        await expect(page.getByRole('textbox')).toBeFocused();
      }).toPass({ timeout: 5000 }); // focus first moves to the close button and then to the input
    });

    await test.step('Verify closed by escape', async () => {
      await page.keyboard.press('Escape');
      await page.getByRole('textbox').waitFor({ state: 'hidden' });
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test.describe('Modal outside click interaction', () => {
    test('Verify modal keeps focus when outside click is ignored', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@modal'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/modal/advanced/examples/close_only_esc_or_close_button.tsx', 'en');
      const dialog = page.getByRole('dialog');

      await test.step('Click outside modal and verify modal keeps focus', async () => {
        await dialog.waitFor({ state: 'visible' });

        const overlayBox = await locators.overlay(page).boundingBox();
        expect(overlayBox).toBeTruthy();

        await page.mouse.click(overlayBox!.x + 5, overlayBox!.y + 5);
        await expect(dialog).toBeVisible();
        await expect(dialog).toBeFocused();
      });

      await test.step('Verify modal still closes by Escape', async () => {
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
      });
    });

    test('Verify click near scrollbar closes modal', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx', 'en');

      await test.step('Open modal', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Got it!').waitFor({ state: 'visible' });
      });

      await test.step('Click near scrollbar to close modal', async () => {
        const overlayBox = await locators.overlay(page).boundingBox();
        expect(overlayBox).toBeTruthy();

        // 16px - approximate scrollbar width, click 20px from right edge
        const x = overlayBox!.x + overlayBox!.width - 20;
        const y = overlayBox!.y + overlayBox!.height / 2;
        await page.mouse.click(x, y);
        await expect(locators.modal(page)).toBeHidden();
      });
    });

    test('Verify click very close to edge does not close modal', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx', 'en');

      await test.step('Open modal', async () => {
        await locators.button(page).click();
        await locators.button(page, 'Got it!').waitFor({ state: 'visible' });
      });

      await test.step('Click very close to edge should keep modal open', async () => {
        const overlayBox = await locators.overlay(page).boundingBox();
        expect(overlayBox).toBeTruthy();

        // Click 8px from right edge (within scrollbar area)
        const x = overlayBox!.x + overlayBox!.width - 8;
        const y = overlayBox!.y + overlayBox!.height / 2;
        await page.mouse.click(x, y);
        await expect(locators.modal(page)).toBeVisible();
      });
    });
  });

  test.describe('Modal body scroll lock', () => {
    const getBodyInlineStyles = (page: Page) =>
      page.evaluate(() => ({
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        boxSizing: document.body.style.boxSizing,
      }));

    test('Verify modal does not cause layout shift when body overflow is hidden', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
    }, async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Scroll-lock logic is engine-independent; covered by unit tests');
      await loadPage(page, 'stories/components/modal/advanced/examples/modal_causes_layout_shift.tsx', 'en');

      await test.step('Switch body overflow to hidden', async () => {
        await locators.button(page, 'Toggle body overflow').click();
        await expect(page.getByText('Current overflow value: hidden')).toBeVisible();
      });

      await test.step('Open modal and verify body styles are untouched', async () => {
        await locators.button(page, 'Open modal').click();
        await expect(locators.dialog(page)).toBeVisible();

        const styles = await getBodyInlineStyles(page);
        expect(styles.boxSizing).toBe('');
        expect(styles.paddingRight).toBe('');
        expect(styles.overflow).toBe('hidden');
      });

      await test.step('Close modal and verify body overflow is preserved', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.dialog(page)).toBeHidden();
        expect((await getBodyInlineStyles(page)).overflow).toBe('hidden');
      });
    });

    test('Verify stacked modals keep body locked until both close', {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@modal'],
    }, async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Scroll-lock logic is engine-independent; covered by unit tests');
      await loadPage(page, 'stories/components/modal/advanced/examples/modal_causes_layout_shift.tsx', 'en');

      await test.step('Open first modal — body gets locked', async () => {
        await locators.button(page, 'Open modal').click();
        await expect(locators.modal(page, 0)).toBeVisible();
        expect((await getBodyInlineStyles(page)).overflow).toBe('hidden');
      });

      await test.step('Open nested modal over the first one', async () => {
        await locators.button(page, 'Open modal over modal').click();
        await expect(locators.dialog(page, 'Nested modal')).toBeVisible();
        expect((await getBodyInlineStyles(page)).overflow).toBe('hidden');
      });

      await test.step('Close nested modal — body stays locked by the first modal', async () => {
        await locators.button(page, 'Close nested modal').click();
        await expect(locators.dialog(page, 'Nested modal')).toBeHidden();
        await expect(locators.modal(page, 0)).toBeVisible();
        expect((await getBodyInlineStyles(page)).overflow).toBe('hidden');
      });

      await test.step('Close first modal — body is unlocked and restored', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.modal(page)).toBeHidden();
        expect((await getBodyInlineStyles(page)).overflow).toBe('visible');
      });
    });
  });
});
