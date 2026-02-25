import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  popper: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },

};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [

    { placement: 'auto', stretch: 'min' },
    { placement: 'top', stretch: 'min' },
    { placement: 'bottom', stretch: 'min' },
    { placement: 'left', stretch: 'min' },
    { placement: 'right', stretch: 'min' },

    { placement: 'auto-start', stretch: 'fixed' },
    { placement: 'top-start', stretch: 'fixed' },
    { placement: 'bottom-start', stretch: 'fixed' },
    { placement: 'left-start', stretch: 'fixed' },
    { placement: 'right-start', stretch: 'fixed' },

    { placement: 'auto-end', stretch: false },
    { placement: 'top-end', stretch: false },
    { placement: 'bottom-end', stretch: false },
    { placement: 'left-end', stretch: false },
    { placement: 'right-end', stretch: false },
  ];
  variables.forEach((item) => {
    test(`Verify Dropdown when placement=${item.placement} and stretch=${item.stretch}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@dropdown'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', item);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await locators.button(page, 'Export to PDF').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test(`Verify Dropdown with offSet`, {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { offset: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await locators.button(page, 'Export to PDF').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify keyboard interactios when interaction undefined', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/basic_usage.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();

    await page.keyboard.press('Space');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify mouse interactios when interaction undefined', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/basic_usage.tsx', 'en');

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.button(page)).not.toBeFocused();

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'hidden' });

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'visible' });

    await locators.popper(page).click();
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeVisible();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
  });

  test('Verify keyboard interaction when interaction = focus', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/focus_interaction.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Space');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).not.toBeFocused();
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify mouse interaction  when interaction = focus', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/focus_interaction.tsx', 'en');

    await locators.button(page).hover();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'visible' });

    await locators.button(page).click();
    await expect(locators.popper(page)).toHaveCount(1);

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
  });

  test('Verify keyboard and mouse interaction when interaction = hover', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { interaction: 'hover' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await locators.button(page, 'Export to PDF').waitFor({ state: 'visible' });
    await expect(locators.button(page).first()).not.toBeFocused();
    await expect(locators.button(page).nth(1)).not.toBeFocused();

    await expect(locators.popper(page)).toBeFocused();

    await page.mouse.click(0, 0);
    await locators.button(page, 'Export to PDF').waitFor({ state: 'hidden' });
    await expect.soft(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).hover();
    await locators.button(page, 'Export to PDF').waitFor({ state: 'visible' });
    await expect(locators.button(page).first()).not.toBeFocused();
    await expect(locators.popper(page)).toHaveCount(1);

    await page.keyboard.press('Escape');
    await locators.button(page, 'Export to PDF').waitFor({ state: 'hidden' });
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify keyboard and mouse interaction when interaction = click', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { interaction: 'click' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Space');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.button(page).first()).not.toBeFocused();
    await expect(locators.popper(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(1);

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await page.waitForTimeout(100);

    await page.mouse.click(0, 0);
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect.soft(locators.button(page)).not.toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).hover();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify keyboard and mouse interaction when interaction = none', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { interaction: 'none' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Space');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).hover();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).click();
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify keyboard and mouse interaction when visible = false', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { visible: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Space');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).hover();
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).click();
    await expect(locators.popper(page)).toHaveCount(0);
  });

  test('Verify dropdown when visible = true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { visible: true });

    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();
  });

  test('Verify dropdown when defaultVisible = true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { defaultVisible: true });

    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });

    await expect(locators.popper(page)).toHaveCount(0);
    await expect(locators.button(page)).toBeFocused();

    await locators.button(page).click();
    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
  });

  test('Verify dropdown when disableEnforceFocus = true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { disableEnforceFocus: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).not.toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.popper(page)).toHaveCount(0);
    await expect(locators.button(page)).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).not.toBeFocused();
    await expect(locators.button(page).first()).not.toBeFocused();

    await locators.button(page).first().click();
    await locators.popper(page).waitFor({ state: 'hidden' });
    await expect(locators.popper(page)).toHaveCount(0);

    await locators.button(page).first().click();
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
  });

  test('Verify dropdown when focusLoop = true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/example-with-props.tsx', 'en', { focusLoop: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(locators.button(page)).toBeFocused();
    await expect(locators.popper(page)).toHaveCount(0);

    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();
  });

  test('Verify dropdown when disableEnforceFocus=false and autoFocus =true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/disable-enforce-focus-and-auto-focus.tsx', 'en', { autoFocus: true, disableEnforceFocus: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();
  });

  test('Verify dropdown when disableEnforceFocus=true and autoFocus =true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/disable-enforce-focus-and-auto-focus.tsx', 'en', { autoFocus: true, disableEnforceFocus: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).not.toBeFocused();
  });

  test('Verify dropdown when disableEnforceFocus=false and autoFocus =false', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/disable-enforce-focus-and-auto-focus.tsx', 'en', { autoFocus: false, disableEnforceFocus: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).not.toBeFocused();

    await page.keyboard.press('Escape');
    await locators.popper(page).waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(locators.popper(page)).toHaveCount(1);
    await expect(locators.popper(page)).not.toBeFocused();
  });

  test('Verify dropdown keyboard interactions when trigger is input and Dropdown.Item inside', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/tests/examples/input-as-trigger.tsx', 'en');

    await test.step('Verify not opened when input focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.popper(page)).toHaveCount(0);
    });

    await test.step('Verify popper opened and focused', async () => {
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'visible' });
      await expect(locators.popper(page)).toHaveCount(1);
      await expect(locators.popper(page)).toBeFocused();
    });

    await test.step('Verify Navigation bettwenn items', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'set up first' })).toBeFocused();
    });

    await test.step('Verify Closes by ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.popper(page)).toHaveCount(0);
    });
  });
});
