import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Modal interactions', () => {
  test('Verify basic usage keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const close = page.locator('[data-ui-name="Modal.Close"]');
    const modal = page.locator('[data-ui-name="Modal"]');

    const bths = modal.locator('[data-ui-name="Button"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Do you want to save your changes?');
      await expect(modal).toHaveCount(1);
      await expect(close).toBeFocused();
    });

    await test.step('Verify closes by pressing Enter on Close', async () => {
      await page.keyboard.press('Enter');
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify opens by space and Close is focused', async () => {
      await page.keyboard.press('Space');
      await page.waitForSelector('text=Do you want to save your changes?');
      await expect(modal).toHaveCount(1);
      await expect(close).toBeFocused();
    });

    await test.step('Verify focus cycled inside the modal', async () => {
      await page.keyboard.press('Tab');
      await expect(bths.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(bths.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(bths.nth(1)).toBeFocused();
    });

    await test.step('Verify modal closed when pressing ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify modal closed when you firstly click on a modal and then pressing ESC', async () => {
      await trigger.click();
      await modal.waitFor({ state: 'attached' });

      await modal.click();
      await page.keyboard.press('Escape');

      await expect(modal).toHaveCount(0);
    });
  });

  test('Verify basic usage mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const close = page.locator('[data-ui-name="Modal.Close"]');
    const modal = page.locator('[data-ui-name="Modal"]');
    const bths = modal.locator('[data-ui-name="Button"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });
    const overlay = page.locator('[data-ui-name="Modal.Overlay"]');

    await test.step('Verify opens click on trigger', async () => {
      await trigger.click();
      await page.waitForSelector('text=Do you want to save your changes?');
      await expect(modal).toHaveCount(1);
    });

    await test.step('Verify closes by clicking Close', async () => {
      await close.hover();
      await expect(page).toHaveScreenshot();
      await close.click();
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify closed by clicking outside modal', async () => {
      await trigger.click();
      await page.waitForSelector('text=Do you want to save your changes?');

      const overlayBox = await overlay.boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await expect(modal).toHaveCount(0);
      // await expect(trigger).toBeFocused();
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await trigger.click();
      await page.waitForSelector('text=Do you want to save your changes?');
      const modal = page.locator('[data-ui-name="Modal"]');
      const modalBox = await modal.boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }

      await expect(modal).toBeVisible();
    });

    await test.step('Verify closes by clicking On Buttons', async () => {
      await bths.first().click();
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  });

  test('Verify modal in modal keyboard interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const close = page.locator('[data-ui-name="Modal.Close"]');
    const modal = page.locator('[data-ui-name="Modal"]');

    const bths = modal.locator('[data-ui-name="Button"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Open one more window');
      await expect(modal).toHaveCount(1);
      await expect(close).toBeFocused();
    });

    await test.step('Verify 2ns modal opened and X is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Save changes');
      await expect(modal).toHaveCount(2);
    });

    await test.step('Verify only one modal closed by activating Close', async () => {
      await page.keyboard.press('Enter');
      await modal.nth(1).waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(1);
      await expect(modal.getByRole('button', { name: 'Open modal' })).toBeFocused();
    });

    await test.step('Verify only one modal closed by ESC', async () => {
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Save changes');

      await page.keyboard.press('Escape');
      await modal.nth(1).waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(1);
      await expect(modal.getByRole('button', { name: 'Open modal' })).toBeFocused();
    });

    await test.step('Verify last one modal closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await modal.nth(0).waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  });

  test('Verify modal without interactive elements inside mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/tests/examples/modal-without-focusable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const modal = page.locator('[data-ui-name="Modal"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });
    const overlay = page.locator('[data-ui-name="Modal.Overlay"]');

    await test.step('Verify opens click on trigger', async () => {
      await trigger.click();
      await modal.waitFor({ state: 'visible' });
      await expect(modal).toHaveCount(1);
    });

    await test.step('Verify closed by clicking outside modal', async () => {
      const overlayBox = await overlay.boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await modal.waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(0);
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await trigger.click();
      await modal.waitFor({ state: 'visible' });
      const modalBox = await modal.boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }
      await expect(modal).toBeVisible();
    });

    await test.step('Verify closes by Pressing Escape', async () => {
      await page.keyboard.press('Escape');
      await modal.waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  });

  test('Verify modal without interactive elements inside keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/tests/examples/modal-without-focusable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const modal = page.locator('[data-ui-name="Modal"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });

    await test.step('Verify opens click on trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await modal.waitFor({ state: 'visible' });
      await expect(modal).toHaveCount(1);
    });

    await test.step('Verify closes by Pressing Escape', async () => {
      await page.keyboard.press('Escape');
      await modal.waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  });

  test('Verify modal in modal mouse interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const modal = page.locator('[data-ui-name="Modal"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });
    const overlay = page.locator('[data-ui-name="Modal.Overlay"]');

    await test.step('Verify opens click on trigger', async () => {
      await trigger.click();
      await page.waitForSelector('text=Open one more window');
      await expect(modal).toHaveCount(1);
    });

    await test.step('Verify 2nd opened', async () => {
      await modal.getByRole('button', { name: 'Open modal' }).click();
      await page.waitForSelector('text=Save changes');

      await expect(modal).toHaveCount(2);
    });

    await test.step('Verify one closed by clicking outside modal', async () => {
      const overlayBox = await overlay.nth(1).boundingBox();
      if (overlayBox) {
        await page.mouse.click(overlayBox.x + 5, overlayBox.y + 5);
      }
      await modal.nth(1).waitFor({ state: 'hidden' });
      await expect(modal).toHaveCount(1);
      // await expect(trigger).toBeFocused();
    });

    await test.step('Verify not closed when clicking inside modal', async () => {
      await modal.getByRole('button', { name: 'Open modal' }).click();
      await page.waitForSelector('text=Save changes');

      const modalBox = await modal.nth(1).boundingBox();
      if (modalBox) {
        await page.mouse.click(modalBox.x + modalBox.width / 2, modalBox.y + modalBox.height / 2);
      }

      await expect(modal).toHaveCount(2);
    });

    await test.step('Verify closes by clicking On Buttons', async () => {
      const bths = modal.nth(1).locator('[data-ui-name="Button"]');
      await bths.first().click();
      await expect(modal).toHaveCount(1);
    });
  });

  test('Verify Modal with iframe inside keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/advanced/examples/modal_iframe.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = page.locator('input');
    const modal = page.locator('[data-ui-name="Modal"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Do you want to save your changes?');

    if (browserName !== 'chromium') {
      await page.keyboard.press('Tab');
    }

    await page.keyboard.press('Tab');

    await page.keyboard.press('Escape');
    await expect(modal).toBeVisible();
    await page.keyboard.type('Hello world');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Verify Modal with prevent focus keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/advanced/examples/modal_prevent_focus.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = page.locator('input');
    const modal = page.locator('[data-ui-name="Modal"]');
    const trigger = page.getByRole('button', { name: 'Open modal' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Do you want to save your changes?');

    if (browserName !== 'chromium') {
      await page.keyboard.press('Tab');
    }

    await page.keyboard.press('Tab');

    await page.keyboard.press('Escape');
    await expect(modal).toBeVisible();
    await page.keyboard.type('Hello world');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
});

test.describe('Modal positioning ans styles', () => {
  test('Verify modal Overlay paddings on different page sizes', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/tests/examples/modal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const overlay = page.locator('[data-ui-name="Modal.Overlay"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Got it!');

    await expect(overlay).toHaveCSS('padding', '40px');

    await page.setViewportSize({ width: 1280, height: 320 });

    await expect(overlay).toHaveCSS('padding', '40px');

    await page.setViewportSize({ width: 320, height: 320 });

    await expect(overlay).toHaveCSS('padding', '12px');

    await expect(page).toHaveScreenshot();
  });

  test('Verify modal when height is bigger than browser page', async ({ page, browserName }) => {
    const standPath =
      'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const overlay = page.locator('[data-ui-name="Modal.Overlay"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Got it!');

    await expect(overlay).toHaveCSS('padding', '40px');

    await page.mouse.wheel(0, 600);
    await new Promise((resolve) => setTimeout(resolve, 500));

    await expect(page).toHaveScreenshot();
  });

  test('Verify modal styles with access to internal html nodes', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/docs/examples/access_to_internal_html_nodes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Lorem Title');

    await expect(page).toHaveScreenshot();
  });

  test('Verify modal inside modal styles', async ({ page, browserName }) => {
    const standPath =
      'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Open one more window');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=Save changes');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Escape');

    await expect(page).toHaveScreenshot();
  });

  test('Verify modal modal nested', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/tests/examples/modal-nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.waitForSelector('text=Test nested');

    await expect(page).toHaveScreenshot();
  });

  test('Verify select height inside modal', async ({ page, browserName }) => {
    const standPath = 'stories/components/modal/advanced/examples/modal_with_select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.waitForSelector('text=Do you want to save your changes?');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=option1');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Escape');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('text=option1');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Confirmation modal dialog pattern', () => {
  test('Verify Confirmation modal dialog keyboard interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/patterns/ux-patterns/confirmation-modal-dialog/docs/examples/confirmation-modal-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const close = page.locator('[data-ui-name="Modal.Close"]');
    const modal = page.locator('[data-ui-name="Modal"]');

    const bths = modal.locator('[data-ui-name="Button"]');
    const trigger = page.getByRole('button', { name: 'Open confirmation modal' });

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Delete project?');
      await expect(page).toHaveScreenshot();
      await expect(modal).toHaveCount(1);
      await expect(close).toBeFocused();
    });

    await test.step('Verify modal attributes', async () => {
      await expect(modal).toHaveAttribute('role', 'dialog');
      await expect(modal).toHaveAttribute('aria-modal', 'true');
      await expect(modal).toHaveAttribute('aria-labelledby');

      await expect(close).toHaveAttribute('aria-label', 'Close');
    });

    await test.step('Verify not closed and focus in input by Save when no data added', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Please enter the correct project name');

      await expect(modal).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify focus cycled inside the modal', async () => {
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=Delete project?');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(bths.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(bths.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(bths.nth(1)).toBeFocused();
    });
  });
});
