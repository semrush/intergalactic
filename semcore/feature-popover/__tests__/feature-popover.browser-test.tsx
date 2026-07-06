import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  featurePopoverPopper: (page: Page) => page.getByRole('dialog'),
  hint: (page: Page) => page.getByText('Close'),
  featurePopover: (page: Page) => page.locator('[data-ui-name="FeaturePopover.Popper"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const placement = [
    { placement: 'auto-start' },
    { placement: 'auto' },
    { placement: 'auto-end' },
    { placement: 'top-start' },
    { placement: 'top' },
    { placement: 'top-end' },
    { placement: 'right-start' },
    { placement: 'right' },
    { placement: 'right-end' },
    { placement: 'bottom-end' },
    { placement: 'bottom' },
    { placement: 'bottom-start' },
    { placement: 'left-end' },
    { placement: 'left' },
    { placement: 'left-start' },

  ];
  placement.forEach((item) => {
    test(`Verify Feature popover when placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@feature-popover'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-popover/tests/examples/base-usage-with-all-props.tsx', 'en', item);

      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await test.step('Verify visual regression when focus inside feature popover', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Close')).toBeFocused();
        await locators.hint(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const closeIcon = [
    { closeIcon: true, theme: 'accent' },
    { closeIcon: false, theme: 'accent' },
    { closeIcon: true, theme: 'neutral' },
    { closeIcon: false, theme: 'neutral' },

  ];
  closeIcon.forEach((item) => {
    test(`Verify Feature popover styles with closeIcon = ${item.closeIcon} and theme = ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@feature-popover'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en', item);

      const spot = page.locator('[data-ui-name="FeaturePopover.Spot"]');

      await locators.featurePopover(page).waitFor({ state: 'visible' });

      await test.step('Verify spot styles', async () => {
        await expect(spot).toHaveCSS('width', '12px');
        await expect(spot).toHaveCSS('height', '12px');
      });

      await test.step('Verify Feature Popover Popper styles', async () => {
        await expect(locators.featurePopover(page)).toHaveCSS('padding-left', '16px');
        await expect(locators.featurePopover(page)).toHaveCSS('padding-top', '16px');
        await expect(locators.featurePopover(page)).toHaveCSS('padding-bottom', '16px');
        await expect(locators.featurePopover(page)).toHaveCSS('padding-right', '40px');
      });

      await test.step('Verify visual regression', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test(`Verify Feature popover styles with medium illustration`, {
    tag: [TAG.PRIORITY_HIGH,
      '@feature-popover'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/tests/examples/base-usage-with-medium-illustration.tsx', 'en', { disablePortal: false });

    await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
    await locators.button(page, 'Close').hover();
    await locators.hint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify Base example with Close keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feature-popover'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');

    await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });

    await test.step('Verify popper focused when opened', async () => {
      await expect(locators.featurePopoverPopper(page)).toBeFocused();
    });

    await test.step('Verify popper attributes', async () => {
      await expect(locators.featurePopoverPopper(page)).toHaveAttribute('tabindex', '0');
      await expect(locators.featurePopoverPopper(page)).toHaveAttribute('data-popper-placement');
    });
    await test.step('Verify close button focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Close')).toBeFocused();
      await locators.hint(page).waitFor({ state: 'visible' });
    });

    await test.step('Verify Feature Popper closed by Close button activating ', async () => {
      await page.keyboard.press('Enter');
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'Export')).toBeFocused();
    });

    await test.step('Verify Feature Popper not opened again by activating the trigger', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });

    await test.step('Verify Feature Popper opened and focused when reload page again', async () => {
      await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');

      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
      await expect(locators.featurePopoverPopper(page)).toBeFocused();
    });

    await test.step('Verify Feature Popper closed by ESC when focus is on the other focusable element inside ', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'Export')).toBeFocused();
    });

    await test.step('Verify focus in not looped inside Feature Popover and focused goes to next button when disablePortal = true', async () => {
      await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');
      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.featurePopoverPopper(page)).toBeVisible();
      await expect(locators.button(page, 'Reload page')).toBeFocused();
    });
  });

  test('Verify Base example without Close keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feature-popover'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en', { closeIcon: false });

    await locators.featurePopover(page).waitFor({ state: 'visible' });

    await test.step('Verify popper focused when shown', async () => {
      await expect(locators.featurePopoverPopper(page)).toBeFocused();
    });

    await test.step('Verify next focusable element focused by Tab pressing ', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();
    });

    await test.step('Verify Feature Popper closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'Export')).toBeFocused();
    });

    await test.step('Verify Feature Popper not opened again by activating the trigger', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });
  });

  test('Verify Base example with Close mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@feature-popover'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');

    const gotIt = page.getByText('Next');
    await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });

    await test.step('Verify Hint on hover Close', async () => {
      await locators.button(page, 'Close').hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
    });

    await test.step('Verify Feature Popper closed by click on Close button', async () => {
      await locators.button(page, 'Close').click();
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });

    await test.step('Verify Feature Popper not shown again by click on the trigger', async () => {
      await locators.button(page, 'Export').click();
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });

    await test.step('Verify Feature Popper closed by pressing Other button', async () => {
      await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');
      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
      await gotIt.click();
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });

    await test.step('Verify Feature Popper not closed by clicking outside', async () => {
      await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');
      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });
      await page.mouse.click(0, 0);
      await expect(locators.featurePopoverPopper(page)).not.toBeFocused();
      await page.keyboard.press('Escape');
      await expect(locators.featurePopoverPopper(page)).toHaveCount(1);
    });

    await test.step('Verify Feature Popper closed by clicking on trigger', async () => {
      await locators.button(page, 'Export').click();
      await locators.featurePopoverPopper(page).waitFor({ state: 'hidden' });
      await expect(locators.featurePopoverPopper(page)).toHaveCount(0);
    });
  });

  test('Verify Focus order when disablePortal = false', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feature-popover'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/tests/examples/base-usage-with-all-props.tsx', 'en', { disablePortal: false });

    await locators.featurePopover(page).waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.featurePopoverPopper(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reload page' })).not.toBeFocused();
  });

  const autoFocus = [
    { autoFocus: true },
    { autoFocus: false },
    { autoFocus: 'enforced' },

  ];
  autoFocus.forEach((item) => {
    test(`Verify Feature popover when autoFocus = ${item.autoFocus}`, {
      tag: [TAG.PRIORITY_MEDIUM,
        '@feature-popover'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/feature-popover/tests/examples/base-usage-with-all-props.tsx', 'en', item);

      await locators.featurePopoverPopper(page).waitFor({ state: 'visible' });

      if (!item.autoFocus) {
        await expect(locators.featurePopoverPopper(page)).not.toBeFocused();
      } else {
        await expect(locators.featurePopoverPopper(page)).toBeFocused();
      }
    });
  });
});
