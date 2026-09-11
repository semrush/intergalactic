import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page) => page.getByRole('textbox'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),

  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    // active
    { size: 'm', state: 'normal', disabled: false, autoFocus: true, readOnly: false, placeholder: 'Placeholder', w: undefined },
    { size: 'm', state: 'valid', disabled: false, autoFocus: false, readOnly: false, placeholder: undefined, w: 200 },
    { size: 'm', state: 'invalid', disabled: false, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 150 },

    { size: 'l', state: 'normal', disabled: false, autoFocus: false, readOnly: false, placeholder: undefined, w: 200 },
    { size: 'l', state: 'valid', disabled: false, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 120 },
    { size: 'l', state: 'invalid', disabled: false, autoFocus: true, readOnly: false, placeholder: 'Placeholder', w: undefined },

    // disabled
    { size: 'm', state: 'normal', disabled: true, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 200 },
    { size: 'l', state: 'valid', disabled: true, autoFocus: true, readOnly: false, placeholder: undefined, w: undefined },
    { size: 'm', state: 'invalid', disabled: true, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 120 },

    // readOnly
    { size: 'm', state: 'normal', disabled: false, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 200 },
    { size: 'l', state: 'valid', disabled: false, autoFocus: true, readOnly: true, placeholder: undefined, w: undefined },
    { size: 'l', state: 'invalid', disabled: false, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 120 },

    // readOnly + disabled
    { size: 'm', state: 'normal', disabled: true, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 120 },

  ];
  variablesActive.forEach((item) => {
    test(`Verify input base state=${item.size} state=${item.state} disabled=${item.disabled} readOnly=${item.readOnly} autoFocus=${item.autoFocus} placeholder = ${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input',
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input/tests/examples/input-base-example.tsx', 'en', item);

      const flex = page.locator('[data-testid="wrap"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      const count = await locators.input(page).count();

      await test.step('Verify Default ', async () => {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      });

      if (item.size == 'm') {
        await test.step('Verify m styles ', async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.input(page).nth(i)).toHaveCSS('height', '30px');
          }
        });
      }

      if (item.size == 'l') {
        await test.step('Verify l styles ', async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.input(page).nth(i)).toHaveCSS('height', '42px');
          }
        });
      }

      if (!item.disabled && !item.readOnly) {
        await test.step('Verify Focused ', async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('k');
        });
      }
      if (item.readOnly) {
        await test.step('Verify readOnly Rocused ', async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        });
      }
    });

    test(`Verify input with neighbor-location state=${item.size} state=${item.state} disabled=${item.disabled} readOnly=${item.readOnly} autoFocus=${item.autoFocus} placeholder = ${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input',
        '@badge',
        '@base-components',
        '@neighbor-locatioon'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input/tests/examples/input-with-neighborlocation.tsx', 'en', item);

      const flex = page.locator('[data-testid="wrap"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await test.step('Verify Default ', async () => {
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      });

      if (!item.disabled && !item.readOnly) {
        await test.step('Verify Focused ', async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
          await page.keyboard.press('k');
        });
      }
      if (item.readOnly) {
        await test.step('Verify readOnly Rocused ', async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot({ clip: screenshotsClip });
        });
      }
    });
  });

  test('Verify Input with submit button', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await page.keyboard.press('Tab');
    await locators.hint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify password input', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');
    await hintTrigger.click();
    await locators.hint(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify input loading state ', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@spin'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/loading_state_in_the_input.tsx', 'en');

    await expect(locators.addon(page)).toHaveAttribute('role', 'status');
    await expect(locators.addon(page)).toHaveAttribute('aria-live', 'polite');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input Text with addon keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@spin'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_text_addon.tsx', 'en');

    if (browserName === 'firefox') return; // issue - long text in input not alwasy truncated in ff

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world Hello world Hello world Hello world');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input with counter and badge keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@tag',
      '@badge'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_other_component_inside.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify focus return back to Input after keyboard interactions with Close button', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx', 'en');

    const addonButton = page.locator('[data-ui-name="Input.Addon"] button');
    await test.step('Verify focus return back to Input by Enter press on Close button', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();

      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toBeFocused();
      await expect(addonButton).toBeHidden();
      expect(await locators.input(page).inputValue()).toBe('');
    });

    await test.step('Verify focus return back to Input by Enter press on Close button ', async () => {
      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Space');

      await expect(locators.input(page)).toBeFocused();
      await expect(addonButton).toBeHidden();
      expect(await locators.input(page).inputValue()).toBe('');
    });
  });

  test('Verify Input with submit button keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');
    await test.step('Verify focus return back to Input by Enter press on Submit button ', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await expect(locators.input(page)).toHaveAttribute('type', 'text');

      await page.keyboard.type('Hello world');
      await expect(locators.input(page)).toHaveValue('Hello world');

      await page.keyboard.press('Tab');
      await expect(hintTrigger).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });

      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveValue('');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).not.toBeVisible();
    });

    await test.step('Verify focus return back to Input by Space press on Submit button ', async () => {
      await page.keyboard.type('Hello world');
      await expect(await locators.input(page).inputValue()).toBe('Hello world');

      await page.keyboard.press('Tab');
      await expect(hintTrigger).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });
      await page.keyboard.press('Space');

      await expect(await locators.input(page).inputValue()).toBe('');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).not.toBeVisible();
    });
  });

  test('Verify Input with submit button mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await locators.input(page).click();
    await expect(locators.input(page)).toBeFocused();

    await page.keyboard.type('Hello world');
    await expect(await locators.input(page).inputValue()).toBe('Hello world');

    await expect(hintTrigger).toBeVisible();

    await hintTrigger.hover();
    await page.getByText('Submit').waitFor({ state: 'visible' });
    await expect(await locators.input(page).inputValue()).toBe('Hello world');

    await hintTrigger.click();
    await expect(await locators.input(page).inputValue()).toBe('');
    await expect(locators.input(page)).toBeFocused();
    await expect(hintTrigger).not.toBeVisible();
  });

  test('Verify password input keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).toBeFocused();
    await expect(hintTrigger).toBeVisible();
    await expect(hintTrigger).not.toBeFocused();

    await expect(locators.input(page)).toHaveAttribute('autocomplete', 'current-password');
    await expect(locators.input(page)).toHaveAttribute('value', 'I_like_cats');

    await page.keyboard.press('Backspace');
    await expect(locators.input(page)).toHaveValue('');

    await page.keyboard.type('Hello world');
    await expect(locators.input(page)).toHaveValue('Hello world');

    await page.keyboard.press('Tab');
    await expect(hintTrigger).toBeFocused();
    await page.getByText('Show password').waitFor({ state: 'visible' });

    await page.keyboard.down('Enter');

    await expect(locators.input(page)).toHaveValue('Hello world');
    await page.getByText('Hide password').waitFor({ state: 'visible' });
    await expect(hintTrigger).toBeVisible();

    await page.keyboard.press('Shift+Tab');
    await expect(locators.input(page)).toBeFocused();
  });

  test('Verify password input mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await expect(hintTrigger).toBeVisible();

    await expect(locators.input(page)).toHaveAttribute('autocomplete', 'current-password');
    await expect(locators.input(page)).toHaveAttribute('value', 'I_like_cats');

    await hintTrigger.hover();
    await page.getByText('Show password').waitFor({ state: 'visible' });
    await expect(locators.input(page)).not.toBeFocused();
    await expect(hintTrigger).not.toBeFocused();

    await hintTrigger.click();
    await expect(await locators.input(page).inputValue()).toBe('I_like_cats');
    await page.getByText('Hide password').waitFor({ state: 'visible' });
    await expect(locators.input(page)).toBeFocused();
    await expect(hintTrigger).not.toBeFocused();

    await locators.input(page).click();
    await expect(await locators.input(page).inputValue()).toBe('I_like_cats');
    await expect(locators.input(page)).toBeFocused();
    await expect(hintTrigger).not.toBeFocused();
  });

  test('Verify Input Text addon mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_text_addon.tsx', 'en');

    // input focused by click on the text addon
    await locators.addon(page).first().click();
    await expect(locators.input(page).first()).toBeFocused();
    await expect(locators.addon(page).first()).not.toBeFocused();
    await page.keyboard.type('Hello world');
    // input focused by click on the input

    await locators.input(page).nth(1).click();
    await expect(locators.input(page).first()).not.toBeFocused();
    await expect(locators.input(page).nth(1)).toBeFocused();
    await expect(locators.addon(page).nth(1)).not.toBeFocused();
  });

  test('Verify Input with counter and badge mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@tag',
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_other_component_inside.tsx', 'en');

    // input focused by click on the text addon
    await locators.addon(page).first().click();
    await expect(locators.input(page).first()).toBeFocused();
    await expect(locators.addon(page).first()).not.toBeFocused();
    await page.keyboard.type('Hello world');
    // input focused by click on the input

    await locators.input(page).nth(1).click();
    await expect(locators.input(page).first()).not.toBeFocused();
    await expect(locators.input(page).nth(1)).toBeFocused();
    await expect(locators.addon(page).nth(1)).not.toBeFocused();
  });

  test('Verify Input multiple addon focus order', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip',
      '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_multiple_addons.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');
    const link = page.locator('[data-ui-name="Link"]');

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).toBeFocused();
    await expect(hintTrigger).not.toBeFocused();
    await expect(link).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).not.toBeFocused();
    await expect(link).toBeFocused();
    await expect(hintTrigger).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).not.toBeFocused();
    await expect(link).not.toBeFocused();
    await expect(hintTrigger).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(locators.input(page)).not.toBeFocused();
    await expect(link).toBeFocused();
    await expect(hintTrigger).not.toBeFocused();
  });
});
