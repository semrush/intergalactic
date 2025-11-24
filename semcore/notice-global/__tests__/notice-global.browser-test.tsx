import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  notice: (page: Page) => page.getByRole('region'),
  closeButton: (page: Page) => page.getByLabel('Close notification'),
  buttonTrigger: (page: Page, text: string) =>
    page.locator(`[data-ui-name="Button"]`, { hasText: text }),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variablesClosable = [
    { theme: 'neutral', closable: true },
    { theme: 'info', closable: true },
    { theme: 'success', closable: true },
    { theme: 'warning', closable: true },
    { theme: 'danger', closable: true },
  ];

  variablesClosable.forEach((item) => {
    test(`Verify Notice Global without Custom Close and closable=${item.closable} theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@notice-global'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx',
        'en',
        item,
      );

      await test.step('Verify notice appearance with close button hover', async () => {
        await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
        await locators.notice(page).waitFor({ state: 'visible' });
        await locators.closeButton(page).hover();
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const variablesNotClosable = [
    { theme: 'neutral', closable: false },
    { theme: 'info', closable: false },
    { theme: 'success', closable: false },
    { theme: 'warning', closable: false },
    { theme: 'danger', closable: false },
  ];

  variablesNotClosable.forEach((item) => {
    test(`Verify Notice Global without Custom Close and closable=${item.closable} theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@notice-global'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx',
        'en',
        item,
      );

      await test.step('Verify notice appearance without close button', async () => {
        await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
        await locators.notice(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const variablesWithCustomClose = [
    { theme: 'neutral', closable: false },
    { theme: 'info', closable: false },
    { theme: 'success', closable: false },
    { theme: 'warning', closable: false },
    { theme: 'danger', closable: false },
  ];

  variablesWithCustomClose.forEach((item) => {
    test(`Verify Notice Global with Custom Close and theme=${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH, '@notice-global'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/notice-global/tests/examples/with-close-subcomponent-all-props.tsx',
        'en',
        item,
      );

      await test.step('Verify notice with custom close button hover', async () => {
        await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
        await locators.notice(page).waitFor({ state: 'visible' });
        await locators.closeButton(page).hover();
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
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Notice Global mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@notice-global'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx',
      'en',
    );

    await test.step('Verify notice opens and has correct attributes', async () => {
      await locators.buttonTrigger(page, 'Open NoticeGlobal').click();
      await locators.notice(page).waitFor({ state: 'visible' });
      await expect(locators.notice(page)).toHaveAccessibleName('Notification');
      await expect(locators.notice(page)).toHaveAttribute('aria-live', 'polite');
    });

    await test.step('Verify notice closes on close button click', async () => {
      await locators.closeButton(page).click();
      await expect(locators.notice(page)).toBeHidden();
    });
  });

  test('Verify Notice Global keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@notice-global'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/notice-global/tests/examples/no-close-subcomponent-all-props.tsx',
      'en',
    );

    await test.step('Verify notice opens with Enter key', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.notice(page).waitFor({ state: 'visible' });

      await expect(locators.closeButton(page)).not.toBeFocused();
      await expect(locators.buttonTrigger(page, 'Do something')).not.toBeFocused();
      await expect(locators.buttonTrigger(page, 'Don\'t do anything')).not.toBeFocused();
    });

    await test.step('Verify Escape key does not close notice', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.notice(page)).toBeVisible();
    });

    await test.step('Verify keyboard navigation to close button', async () => {
      await locators.buttonTrigger(page, 'Don\'t do anything').click();
      await page.keyboard.press('Tab');
      await expect(locators.closeButton(page)).toBeFocused();
    });

    await test.step('Verify notice closes with Enter on close button', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.notice(page)).toBeHidden();
      await expect(locators.buttonTrigger(page, 'Open NoticeGlobal')).not.toBeFocused();
    });
  });
});
