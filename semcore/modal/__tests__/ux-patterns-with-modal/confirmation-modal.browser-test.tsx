import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  modal: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
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
  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Confirmation modal dialog visual states', {
    tag: [TAG.PRIORITY_HIGH, '@modal', '@tooltip', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/confirmation-modal-dialog/docs/examples/confirmation-modal-example.tsx', 'en');

    await test.step('Verify modal opened state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Delete').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify error state when no data added', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByText('Please enter the correct project name').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(` ${TAG.FUNCTIONAL}`, () => {
  test('Verify Confirmation modal dialog keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@modal', '@tooltip', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/confirmation-modal-dialog/docs/examples/confirmation-modal-example.tsx', 'en');

    const trigger = page.getByRole('button', { name: 'Open confirmation modal' });

    await test.step('Verify opens by enter and Close is focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Delete').waitFor({ state: 'visible' });
      await expect(locators.modal(page)).toHaveCount(1);
      await expect(locators.close(page)).toBeFocused();
    });

    await test.step('Verify modal attributes', async () => {
      await expect(locators.modal(page)).toHaveAttribute('aria-modal', 'true');
      await expect(locators.modal(page)).toHaveAttribute('aria-labelledby');
      await expect(locators.close(page)).toHaveAttribute('aria-label', 'Close');
    });

    await test.step('Verify not closed when no data added', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.modal(page)).toHaveCount(1);
    });

    await test.step('Verify closed by ESC and focus returns', async () => {
      await page.keyboard.press('Escape');
      await locators.button(page, 'Delete').waitFor({ state: 'hidden' });
      await expect(locators.modal(page)).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify focus cycled inside the modal', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Delete').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Delete')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Cancel')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.close(page)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Cancel')).toBeFocused();
    });
  });
});
